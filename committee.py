#!/usr/bin/env python3
"""The committee.

Scores every curated act (see scoring.py for the model), consolidates to a single
number, then walks each festival day hour by hour and names the best gig on site
in every one of those hours.

Outputs:
  acts.csv        one row per act — the scoring database
  hours.csv       hour-by-hour verdict for each day
  committee.json  consumed by curate.py -> data.js -> the app

Run before curate.py:   python3 committee.py && python3 curate.py
"""
import json, csv, datetime

from scoring import (JUDGES, SCORES, LEGEND, DEFAULT, FRESH, FRESH_DEFAULT,
                     W_FRESH, W_RECENT, W_PEAK, W_BENCH,
                     FEST_ADJUSTMENT, ROAD_HAND)
import curate_tables as T

DAY_KEY = {"Thursday 30th July": "thu", "Friday 31st July": "fri",
           "Saturday 1st August": "sat", "Sunday 2nd August": "sun"}
DAYS = ("fri", "sat", "sun")

IRISH = {
"Gilla Band", "Sprints", "THUMPER", "Gurriers", "Cardinals", "Bicurious",
"King Kong Company", "Soda Blonde", "Damien Dempsey", "David Kitt", "KhakiKid",
"SOAK", "BIIRD", "Kean Kavanagh", "Muireann Bradley", "Brògeal", "New Jackson",
"Sunil Sharpe x Kev Freeney Presents Spineless", "Cromby", "Moving Still", "Or:la",
"Lullahush", "Sam Alfred", "Bazza Ranks", "Trinity Orchestra", "Jacob Alon",
"Sing Along Social", "The Wild Geeze - Comedy Cabaret",
}


def score(artist):
    peak, bench, recent, conf = SCORES.get(artist, DEFAULT)
    fresh = FRESH.get(artist, FRESH_DEFAULT)
    base = fresh * W_FRESH + recent * W_RECENT + peak * W_PEAK + bench * W_BENCH
    bonus, what, when = LEGEND.get(artist, (0.0, "", ""))
    irish = artist in IRISH
    fest_verdict = T.FEST.get(artist, ("", ""))[0]

    views = {}
    for name, wf, wr, wp, wb, _blurb in JUDGES:
        v = fresh * wf + recent * wr + peak * wp + bench * wb
        # The live-sound ear is the only one who docks an act for not travelling.
        if name == ROAD_HAND:
            v += FEST_ADJUSTMENT.get(fest_verdict, 0.0)
        views[name] = round(max(0.0, min(v, 10.0)), 2)

    spread = round(max(views.values()) - min(views.values()), 2)
    return {
        "fresh": fresh, "peak": peak, "bench": bench, "recent": recent, "conf": conf,
        "base": round(base, 2), "bonus": bonus,
        "composite": round(base + bonus, 2),
        "legend_what": what, "legend_when": when,
        "fest": fest_verdict,
        "irish": int(irish), "spread": spread,
        **{"j_" + n.replace("The ", "").lower().replace(" ", "_"): v
           for n, v in views.items()},
    }


def main():
    raw = json.load(open("_schedule_raw.json"))

    acts, seen = [], set()
    for r in raw:
        a = r["artist"]
        day = DAY_KEY[r["day"]]
        if a not in T.PICKS or a in T.EXCLUDE or day not in DAYS or (a, day) in seen:
            continue
        seen.add((a, day))
        lv, lu, ls = T.LIVE.get(a, ("", "", ""))
        stage = T.STAGE_NAMES.get(r["stage"], r["stage"])
        row = {"artist": a, "day": day, "stage": stage, "time": r["time"],
               "start": r["start"], "end": r["end"],
               "tier": T.PICKS[a][0], "genre": T.PICKS[a][1]}
        row.update(score(a))
        row["evidence_src"] = ls
        row["evidence_url"] = lu
        acts.append(row)

    acts.sort(key=lambda x: -x["composite"])
    with open("acts.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(acts[0].keys()))
        w.writeheader(); w.writerows(acts)

    # ---- hour by hour, who wins the site
    hours, by_hour = [], {}
    for day in DAYS:
        day_acts = [a for a in acts if a["day"] == day]
        if not day_acts:
            continue
        lo = min(a["start"] for a in day_acts)
        hi = max(a["end"] for a in day_acts)
        t = lo - (lo % 3600000)
        while t < hi:
            nxt = t + 3600000
            on = [a for a in day_acts if a["start"] < nxt and a["end"] > t]

            # How much of this hour each set actually covers. A set that clips the
            # hour by ten minutes shouldn't win it — you can't go and see it.
            for a in on:
                a["_cover"] = (min(a["end"], nxt) - max(a["start"], t)) / 60000.0
            solid = [a for a in on if a["_cover"] >= 30]
            on = solid or on

            if on:
                on.sort(key=lambda x: -x["composite"])
                win = on[0]
                ups = on[1:4]
                gap = round(win["composite"] - ups[0]["composite"], 2) if ups else None
                # a genuine coin flip goes to the Irish act
                note = ""
                if ups and gap is not None and gap < 0.30:
                    tied = [x for x in on if win["composite"] - x["composite"] < 0.30]
                    irish_tied = [x for x in tied if x["irish"]]
                    if irish_tied and not win["irish"]:
                        win = irish_tied[0]
                        ups = [x for x in on if x is not win][:3]
                        note = "too close to call — Irish tiebreak"
                    else:
                        note = "close call"
                label = datetime.datetime.fromtimestamp(t / 1000).strftime("%H:%M")
                rec = {"day": day, "hour": label,
                       "winner": win["artist"], "stage": win["stage"],
                       "time": win["time"], "score": win["composite"],
                       "gap": gap if gap is not None else "",
                       "note": note,
                       "runners_up": " / ".join("%s (%.2f)" % (u["artist"], u["composite"])
                                                for u in ups)}
                hours.append(rec)
                by_hour.setdefault(day, []).append({
                    "h": label, "w": win["artist"], "s": win["stage"],
                    "t": win["time"], "sc": win["composite"], "n": note,
                    "r": [{"a": u["artist"], "sc": u["composite"]} for u in ups],
                })
            t = nxt

    with open("hours.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(hours[0].keys()))
        w.writeheader(); w.writerows(hours)

    json.dump({
        "judges": [{"name": j[0], "blurb": j[5],
                    "w": {"fresh": j[1], "recent": j[2], "album": j[3], "bench": j[4]}}
                   for j in JUDGES],
        "model": "composite = 0.35 fresh + 0.35 recent gigs + 0.20 best album + 0.10 bench, + legend bonus",
        "scores": {a["artist"]: {
            "c": a["composite"], "b": a["base"], "bn": a["bonus"],
            "f": a["fresh"], "p": a["peak"], "bs": a["bench"], "r": a["recent"], "cf": a["conf"],
            "ir": a["irish"], "sp": a["spread"],
            "lw": a["legend_what"], "ln": a["legend_when"],
            "jv": {k[2:]: a[k] for k in a if k.startswith("j_")},
        } for a in acts},
        "hours": by_hour,
    }, open("committee.json", "w"), indent=1)

    print("acts.csv   %d acts scored" % len(acts))
    print("hours.csv  %d hourly verdicts" % len(hours))
    print("\ntop 10 consolidated:")
    for a in acts[:10]:
        star = (" +%.1f legend" % a["bonus"]) if a["bonus"] else ""
        print("   %-40s %5.2f  (base %.2f%s)" % (a["artist"][:40], a["composite"], a["base"], star))


if __name__ == "__main__":
    main()
