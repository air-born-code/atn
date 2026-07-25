#!/usr/bin/env python3
"""Turn raw collected chatter into a small, honest feed.

Most of what the collector picks up is noise. Claude reads the batch and keeps
only things that would change what you actually do at the festival — a secret
set, a stage-time change, a road or weather warning — and rates how confident
the source justifies being.

Falls back to a keyword pass when ANTHROPIC_API_KEY isn't set, so the workflow
still publishes something rather than failing.

Writes latest.json.
"""
import json, os, re, sys
from datetime import datetime, timezone

MODEL = "claude-opus-5"

SYSTEM = """You are triaging chatter about the All Together Now music festival at \
Curraghmore Estate, Co. Waterford, 30 July – 2 August 2026, for a guide used by \
people who are physically at the festival.

Keep only items that would change what someone actually does: a surprise or secret \
set, a stage time or lineup change, a cancellation, a road/traffic/parking problem, \
a weather warning, a site closure, or a genuinely notable thing happening on site.

Discard: ticket touting and resale, generic hype, "can't wait" posts, merchandise, \
old news about the lineup announcement, anything about a different festival, and \
anything not about this festival in 2026.

Rate confidence honestly and conservatively:
  confirmed  - official festival channel, or an established publication reporting it
  reported   - a named outlet or credible account, not the festival itself
  rumour     - unverified chatter, a single anonymous post, or hearsay

A rumour that sends someone across a large hilly site at 1am is worse than no item \
at all, so when in doubt rate lower and say what is unverified. Never present a \
rumour as fact. Write each summary as one plain sentence a tired person can read in \
the dark. Return at most 12 items, most useful first. Return an empty list if \
nothing qualifies — that is a perfectly good answer."""

SCHEMA = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "headline": {"type": "string"},
                    "summary": {"type": "string"},
                    "confidence": {"type": "string", "enum": ["confirmed", "reported", "rumour"]},
                    "category": {"type": "string",
                                 "enum": ["secret_set", "schedule_change", "travel",
                                          "weather", "site", "other"]},
                    "source": {"type": "string"},
                    "url": {"type": "string"},
                },
                "required": ["headline", "summary", "confidence", "category", "source", "url"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["items"],
    "additionalProperties": False,
}


def keyword_fallback(raw):
    """No API key — keep page changes and obviously-relevant articles, unrated."""
    out = []
    for i in raw["items"]:
        if i["kind"] == "page_change":
            conf, cat = "confirmed", "schedule_change"
        elif i["kind"] == "article":
            conf, cat = "reported", "other"
        else:
            continue
        out.append({"headline": (i["title"] or i["text"])[:110],
                    "summary": i["text"][:240] or i["title"],
                    "confidence": conf, "category": cat,
                    "source": i["source"], "url": i["url"]})
    return out[:12]


def claude_parse(raw):
    import anthropic

    client = anthropic.Anthropic()
    payload = json.dumps(raw["items"], ensure_ascii=False)[:120000]
    user = ("Here is today's collected chatter as JSON. Triage it.\n\n" + payload)

    kwargs = dict(
        model=MODEL,
        max_tokens=8000,
        system=SYSTEM,
        messages=[{"role": "user", "content": user}],
        output_config={"effort": "low", "format": {"type": "json_schema", "schema": SCHEMA}},
    )

    # Server-side fallback keeps an unattended run alive if a classifier declines.
    # If the beta combination is rejected, retry plainly rather than failing the run.
    try:
        resp = client.beta.messages.create(
            betas=["server-side-fallback-2026-07-01"], fallbacks="default", **kwargs)
    except Exception as e:
        print("beta call rejected (%s) — retrying without fallbacks" % type(e).__name__)
        resp = client.messages.create(**kwargs)

    if resp.stop_reason == "refusal":
        print("model declined to triage this batch; publishing nothing")
        return []

    text = next((b.text for b in resp.content if b.type == "text"), "")
    return json.loads(text).get("items", [])


def main():
    raw = json.load(open("raw_items.json"))

    if not raw["items"]:
        items, how = [], "nothing collected"
    elif os.environ.get("ANTHROPIC_API_KEY"):
        try:
            items, how = claude_parse(raw), "triaged by Claude"
        except Exception as e:
            print("Claude parse failed (%s) — falling back to keywords" % e, file=sys.stderr)
            items, how = keyword_fallback(raw), "keyword fallback (AI step failed)"
    else:
        items, how = keyword_fallback(raw), "keyword fallback (no API key set)"

    out = {
        "updated": datetime.now(timezone.utc).isoformat(),
        "method": how,
        "sources": raw.get("sources", {}),
        "collected": len(raw["items"]),
        "items": items,
    }
    json.dump(out, open("latest.json", "w"), indent=1, ensure_ascii=False)
    print("wrote latest.json — %d items (%s)" % (len(items), how))


if __name__ == "__main__":
    main()
