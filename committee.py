#!/usr/bin/env python3
"""The committee.

Four judges score every curated act on three axes, the scores are cross-referenced
against the recent-live-review evidence gathered in curate.py, and every genuine
timeslot clash is resolved into a verdict.

Outputs:
  acts.csv        the scoring database, one row per act (open it in Numbers/Excel)
  clashes.csv     every overlapping pair of curated picks, with the verdict
  committee.json  consumed by curate.py -> data.js -> the app

Run before curate.py:   python3 committee.py && python3 curate.py
"""
import json, csv, itertools

# ---------------------------------------------------------------- the judges
# Each weights the three axes differently. The composite is the mean of all four,
# which stops any single perspective dominating.
JUDGES = [
    # name,             heritage, legend, recent, irish_bonus
    ("The Archivist",       0.50,   0.30,   0.20,  0.0),
    ("The Headliner",       0.20,   0.50,   0.30,  0.0),
    ("The Gig-Goer",        0.20,   0.20,   0.60,  0.0),
    ("The Local",           0.30,   0.25,   0.45,  0.4),
]

# ---------------------------------------------------------------- the evidence
# heritage  = depth of catalogue and influence
# legend    = status / "would you regret missing this"
# recent    = evidence of live form over the last year
# conf      = confidence in the `recent` figure:
#             2 = cited written review, 1 = aggregate/audience reports, 0 = reputation only
SCORES = {
# artist:                      (heritage, legend, recent, conf)
"Pulp":                            (9.5, 9.5, 9.0, 2),
"Underworld":                      (9.0, 9.0, 9.0, 2),
"Mogwai":                          (9.0, 8.5, 8.5, 2),
"Disclosure (DJ)":                 (7.0, 7.5, 6.5, 0),
"Barrington Levy":                 (9.0, 8.5, 5.5, 1),
"Ezra Collective":                 (6.5, 7.0, 9.5, 2),
"Gilla Band":                      (7.5, 7.0, 9.5, 2),
"Maruja":                          (4.5, 5.0, 9.5, 2),
"W.I.T.C.H.":                      (8.5, 7.5, 8.5, 2),
"Hot 8 Brass Band":                (7.0, 7.0, 7.5, 0),
"Sprints":                         (4.0, 5.0, 9.0, 2),
"THUMPER":                         (4.0, 4.5, 9.0, 2),
"Self Esteem":                     (5.5, 6.5, 9.0, 2),
"Kate Nash":                       (6.0, 6.0, 7.0, 1),
"Anna von Hausswolff":             (6.5, 6.5, 9.0, 2),
"Chet Faker":                      (5.5, 5.5, 6.5, 0),
"Soda Blonde":                     (3.5, 4.0, 6.0, 0),
"Damien Dempsey":                  (7.0, 7.5, 7.0, 0),
"King Kong Company":               (4.5, 6.0, 7.5, 0),
"Hot Chip (DJ Set)":               (7.5, 7.5, 7.5, 0),
"Altern-8":                        (7.5, 7.0, 7.0, 0),
"Soichi Terada (Live)":            (7.5, 7.0, 9.0, 1),
"Talks in the Tent: John Cooper Clarke": (8.5, 8.5, 9.0, 2),
"Floating Points (Live)":          (7.0, 7.5, 9.5, 2),
"Friendly Fires":                  (6.0, 6.0, 7.5, 1),
"Floorplan":                       (8.0, 7.5, 7.5, 0),
"Kerri Chandler":                  (9.0, 8.5, 8.0, 1),
"Rahann":                          (7.5, 6.5, 8.0, 2),
"Gurriers":                        (3.5, 4.5, 8.5, 2),
"Dry Cleaning":                    (5.5, 5.5, 8.0, 1),
"Cardinals":                       (2.5, 3.0, 6.0, 0),
"Maribou State (Live)":            (6.0, 6.0, 8.5, 2),
"The Avalanches (DJ Set)":         (8.5, 8.0, 6.0, 0),
"Mall Grab":                       (5.0, 6.0, 8.5, 2),
"Joy Orbison":                     (7.0, 7.0, 7.5, 0),
"Greentea Peng":                   (5.0, 5.5, 8.5, 2),
"Moonchild Sanelly":               (5.0, 5.5, 9.0, 2),
"Bicurious":                       (3.0, 3.5, 6.0, 0),
"Call Super":                      (6.0, 6.0, 7.0, 0),
"DJ Nobu":                         (7.0, 7.0, 7.5, 0),
"Or:la":                           (4.5, 5.0, 7.0, 0),
"Jyoty":                           (4.0, 5.5, 7.5, 0),
"Say She She":                     (4.0, 4.5, 7.0, 0),
"Muireann Bradley":                (3.0, 4.0, 8.0, 0),
"David Kitt":                      (5.5, 5.0, 6.5, 0),
"KhakiKid":                        (2.5, 3.0, 6.0, 0),
"Ms Dynamite":                     (7.0, 7.0, 6.5, 0),
"SOAK":                            (4.5, 5.0, 6.5, 0),
"Getdown Services":                (3.0, 3.5, 6.5, 0),
"Alabaster DePlume":               (4.5, 5.0, 7.5, 0),
"Prosumer":                        (6.5, 6.0, 7.0, 0),
"Eats Everything":                 (5.5, 6.0, 6.5, 0),
"The Dare (DJ Set)":               (3.5, 5.0, 6.5, 0),
"Weval (Live)":                    (4.5, 4.5, 6.5, 0),
"Colleen Cosmo Murphy":            (6.5, 6.0, 7.0, 0),
"Trinity Orchestra":               (3.0, 4.0, 6.5, 0),
"PVA":                             (3.0, 3.5, 6.5, 0),
"Brògeal":                         (2.5, 3.0, 6.0, 0),
"Jacob Alon":                      (2.0, 3.0, 6.5, 0),
"Job Jobse":                       (5.0, 5.5, 7.0, 0),
"O'Flynn":                         (4.5, 4.5, 6.5, 0),
"New Jackson":                     (4.5, 4.5, 6.5, 0),
"Sunil Sharpe x Kev Freeney Presents Spineless": (6.0, 5.5, 7.0, 0),
"Jamz Supernova":                  (4.0, 4.5, 6.5, 0),
"Anish Kumar":                     (3.5, 4.0, 6.5, 0),
"Sam Alfred":                      (2.5, 3.0, 6.0, 0),
"Lullahush":                       (3.0, 3.5, 6.5, 0),
"Dan Shake":                       (4.5, 4.5, 6.5, 0),
"Cromby":                          (4.0, 4.0, 6.5, 0),
"Moving Still":                    (4.0, 4.0, 6.5, 0),
"BIIRD":                           (2.5, 3.5, 6.0, 0),
"Kean Kavanagh":                   (3.0, 3.5, 6.0, 0),
"Bazza Ranks":                     (3.0, 3.5, 6.0, 0),
"Sing Along Social":               (2.0, 3.5, 6.5, 0),
"The Wild Geeze - Comedy Cabaret": (2.0, 3.0, 6.0, 0),
"Playback Presents: Stop Making Sense": (3.0, 4.5, 6.5, 0),
"Say She She ":                    (4.0, 4.5, 7.0, 0),
}

# Irish (or Irish-based) acts — used only as a tiebreaker by The Local.
IRISH = {
"Gilla Band", "Sprints", "THUMPER", "Gurriers", "Cardinals", "Bicurious",
"King Kong Company", "Soda Blonde", "Damien Dempsey", "David Kitt", "KhakiKid",
"SOAK", "BIIRD", "Kean Kavanagh", "Muireann Bradley", "Brògeal", "New Jackson",
"Sunil Sharpe x Kev Freeney Presents Spineless", "Cromby", "Moving Still", "Or:la",
"Lullahush", "Sam Alfred", "Bazza Ranks", "Trinity Orchestra", "Jacob Alon",
"Sing Along Social", "The Wild Geeze - Comedy Cabaret",
}

DEFAULT = (3.0, 3.5, 6.0, 0)   # tier-3 acts with no specific evidence


def judge_scores(artist):
    h, l, r, conf = SCORES.get(artist, DEFAULT)
    irish = artist in IRISH
    out = {}
    for name, wh, wl, wr, wi in JUDGES:
        s = h * wh + l * wl + r * wr
        if irish:
            s += wi
        out[name] = round(min(s, 10.0), 2)
    return out, h, l, r, conf, irish


def main():
    raw = json.load(open("_schedule_raw.json"))
    import curate_tables as T   # PICKS / LIVE, shared with curate.py

    DAY = {"Thursday 30th July": "thu", "Friday 31st July": "fri",
           "Saturday 1st August": "sat", "Sunday 2nd August": "sun"}

    acts, seen = [], set()
    for r in raw:
        a = r["artist"]
        if a not in T.PICKS or a in T.EXCLUDE or a in seen:
            continue
        seen.add(a)
        js, h, l, rec, conf, irish = judge_scores(a)
        composite = round(sum(js.values()) / len(js), 2)
        lv, lu, ls = T.LIVE.get(a, ("", "", ""))
        acts.append({
            "artist": a, "day": DAY[r["day"]], "stage": r["stage"],
            "time": r["time"], "start": r["start"], "end": r["end"],
            "tier": T.PICKS[a][0], "genre": T.PICKS[a][1], "irish": int(irish),
            "heritage": h, "legend": l, "recent": rec, "confidence": conf,
            "composite": composite, "evidence_src": ls, "evidence_url": lu,
            **{k.replace("The ", "j_").lower(): v for k, v in js.items()},
        })

    acts.sort(key=lambda x: -x["composite"])
    with open("acts.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(acts[0].keys()))
        w.writeheader()
        w.writerows(acts)

    # ---- resolve every genuine clash between curated picks on the same day
    clashes, verdicts = [], {}
    for day in ("fri", "sat", "sun"):
        day_acts = [a for a in acts if a["day"] == day and a["tier"] <= 2]
        for x, y in itertools.combinations(day_acts, 2):
            if x["start"] < y["end"] and y["start"] < x["end"]:
                gap = round(abs(x["composite"] - y["composite"]), 2)
                win, lose = (x, y) if x["composite"] >= y["composite"] else (y, x)
                reason = "clear on the scores"
                if gap < 0.30:
                    if win["irish"] != lose["irish"]:
                        if lose["irish"]:
                            win, lose = lose, win
                        reason = "too close to call — Irish tiebreak"
                    else:
                        reason = "effectively a coin flip"
                clashes.append({
                    "day": day, "a": x["artist"], "a_score": x["composite"],
                    "b": y["artist"], "b_score": y["composite"],
                    "gap": gap, "verdict": win["artist"], "reason": reason,
                })
                key = day + "|" + win["artist"]
                verdicts.setdefault(key, []).append(lose["artist"])

    clashes.sort(key=lambda c: (c["day"], c["gap"]))
    with open("clashes.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(clashes[0].keys()))
        w.writeheader()
        w.writerows(clashes)

    json.dump({
        "judges": [j[0] for j in JUDGES],
        "scores": {a["artist"]: {
            "c": a["composite"], "h": a["heritage"], "l": a["legend"],
            "r": a["recent"], "cf": a["confidence"], "ir": a["irish"],
            "j": {k: a[k] for k in a if k.startswith("j_")},
        } for a in acts},
        "clashes": clashes,
        "beats": verdicts,
    }, open("committee.json", "w"), indent=1)

    print("acts.csv        %d acts scored" % len(acts))
    print("clashes.csv     %d overlapping pairs resolved" % len(clashes))
    print("top 8 composite:")
    for a in acts[:8]:
        print("   %-42s %.2f  (h%.1f l%.1f r%.1f conf%d)" %
              (a["artist"], a["composite"], a["heritage"], a["legend"],
               a["recent"], a["confidence"]))


if __name__ == "__main__":
    main()
