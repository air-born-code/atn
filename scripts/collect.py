#!/usr/bin/env python3
"""Collect raw festival chatter from sources that work without a logged-in session.

Runs unattended on GitHub Actions — no laptop required. Every source is wrapped
so one dead endpoint can never take the whole run down; we record what worked and
what didn't and publish anyway, so a thin feed is distinguishable from a broken one.

Writes raw_items.json for parse.py.
"""
import json, re, html, hashlib, urllib.request, urllib.parse, urllib.error
from datetime import datetime, timezone

UA = "atn-2026-guide/1.0 (+https://github.com/air-born-code/atn)"
TIMEOUT = 25

TERMS = ["all together now", "alltogethernow", "atn2026", "atn 2026", "curraghmore"]

RSS_FEEDS = [
    ("Nialler9", "https://nialler9.com/feed/"),
    ("Hot Press", "https://www.hotpress.com/feed/"),
    ("WLR FM", "https://wlrfm.com/feed/"),
    ("The Thin Air", "https://thethinair.net/feed/"),
]

# Pages we diff for changes — the highest-value signal of the lot, because a
# stage-time change matters more than any rumour.
WATCH_PAGES = [
    ("ATN lineup", "https://www.alltogethernow.ie/lineup"),
    ("ATN info", "https://www.alltogethernow.ie/information"),
    ("ATN news", "https://www.alltogethernow.ie/atnnews"),
    ("Clashfinder", "https://clashfinder.com/m/atn2026/"),
]


def get(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.read().decode("utf-8", "replace")


def relevant(text):
    t = text.lower()
    return any(term in t for term in TERMS)


def clean(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


# ---------------------------------------------------------------- sources
def from_rss(status):
    out = []
    for name, url in RSS_FEEDS:
        try:
            xml = get(url)
        except Exception as e:
            status[f"rss:{name}"] = "failed: %s" % type(e).__name__
            continue
        def tag(block, name_):
            m = re.search(r"<%s[^>]*>(.*?)</%s>" % (name_, name_), block, re.S | re.I)
            return clean(m.group(1)) if m else ""

        items = re.findall(r"<item[^>]*>(.*?)</item>", xml, re.S | re.I)
        hits = 0
        for it in items[:40]:
            title, desc = tag(it, "title"), tag(it, "description")
            if not relevant(title + " " + desc):
                continue
            hits += 1
            out.append({"source": name, "kind": "article", "title": title,
                        "text": desc[:700], "url": tag(it, "link") or url})
        status[f"rss:{name}"] = "ok (%d relevant of %d)" % (hits, len(items))
    return out


def from_bluesky(status):
    """Public AppView — no auth, no API key."""
    out = []
    for term in ["All Together Now festival", "ATN2026", "Curraghmore"]:
        try:
            q = urllib.parse.urlencode({"q": term, "limit": 25, "sort": "latest"})
            data = json.loads(get("https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?" + q))
        except Exception as e:
            status["bluesky"] = "failed: %s" % type(e).__name__
            return out
        for p in data.get("posts", []):
            text = (p.get("record") or {}).get("text", "")
            if not relevant(text):
                continue
            handle = (p.get("author") or {}).get("handle", "?")
            rkey = (p.get("uri") or "").rsplit("/", 1)[-1]
            out.append({"source": "Bluesky @%s" % handle, "kind": "post", "title": "",
                        "text": text[:700],
                        "url": "https://bsky.app/profile/%s/post/%s" % (handle, rkey)})
    status["bluesky"] = "ok (%d posts)" % len(out)
    return out


def from_reddit(status):
    """Public JSON. Often blocked from datacentre IPs — treated as best-effort."""
    out = []
    try:
        q = urllib.parse.urlencode({"q": '"all together now" festival', "sort": "new",
                                    "limit": 25, "restrict_sr": 0, "t": "month"})
        data = json.loads(get("https://www.reddit.com/search.json?" + q))
    except Exception as e:
        status["reddit"] = "failed (often IP-blocked): %s" % type(e).__name__
        return out
    for c in data.get("data", {}).get("children", []):
        d = c.get("data", {})
        body = (d.get("title", "") + " " + d.get("selftext", ""))[:700]
        if not relevant(body):
            continue
        out.append({"source": "Reddit r/%s" % d.get("subreddit", "?"), "kind": "post",
                    "title": d.get("title", ""), "text": body,
                    "url": "https://reddit.com" + d.get("permalink", "")})
    status["reddit"] = "ok (%d posts)" % len(out)
    return out


def page_diffs(status, prev):
    """Hash-diff the official pages. Highest-signal source we have."""
    out, hashes = [], {}
    for name, url in WATCH_PAGES:
        try:
            body = get(url)
        except Exception as e:
            status["watch:%s" % name] = "failed: %s" % type(e).__name__
            hashes[name] = prev.get(name, "")
            continue
        text = clean(body)
        h = hashlib.sha256(text.encode()).hexdigest()[:16]
        hashes[name] = h
        was = prev.get(name)
        status["watch:%s" % name] = "ok"
        if was and was != h:
            out.append({"source": name, "kind": "page_change", "title": "%s page changed" % name,
                        "text": "The %s page changed since the last check. This is where stage-time "
                                "and lineup changes show up first." % name,
                        "url": url})
    return out, hashes


def main():
    try:
        prev = json.load(open("page_hashes.json"))
    except Exception:
        prev = {}

    status = {}
    items = []
    items += from_rss(status)
    items += from_bluesky(status)
    items += from_reddit(status)
    diffs, hashes = page_diffs(status, prev)
    items += diffs

    # de-dupe on url
    seen, uniq = set(), []
    for i in items:
        k = i["url"]
        if k in seen:
            continue
        seen.add(k)
        uniq.append(i)

    json.dump(hashes, open("page_hashes.json", "w"), indent=1)
    json.dump({"collected_at": datetime.now(timezone.utc).isoformat(),
               "sources": status, "items": uniq},
              open("raw_items.json", "w"), indent=1, ensure_ascii=False)

    print("collected %d items" % len(uniq))
    for k, v in sorted(status.items()):
        print("  %-24s %s" % (k, v))


if __name__ == "__main__":
    main()
