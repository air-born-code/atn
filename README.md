# All Together Now 2026 — The Guide

A phone-first, offline-capable guide to All Together Now at Curraghmore Estate,
30 July – 2 August 2026. Curated day-by-day picks, the full 398-set schedule
across all 17 stages, clash detection and a personal shortlist.

## Using it on your phone

Open the site, then **Share → Add to Home Screen** (iPhone) or **menu → Install app**
(Android). It runs full-screen and works with no signal once it's been opened
once on wifi — Curraghmore has almost no coverage.

Tap **↺** in the top right when you have signal to pull the latest version.

## The committee

Every curated act is scored in `committee.py` on three axes — **heritage**
(catalogue depth and influence), **legend** (status), and **live now** (evidence
of form over the last year, drawn from the reviews collected in
`curate_tables.py`). Four judges weight those axes differently:

| Judge | Heritage | Legend | Live now | Irish bonus |
| --- | --- | --- | --- | --- |
| The Archivist | 0.50 | 0.30 | 0.20 | — |
| The Headliner | 0.20 | 0.50 | 0.30 | — |
| The Gig-Goer | 0.20 | 0.20 | 0.60 | — |
| The Local | 0.30 | 0.25 | 0.45 | +0.4 |

The composite is the mean of all four, so no single perspective dominates. Every
overlapping pair of picks is then resolved into a verdict; where the gap is under
0.3 the call is treated as a coin flip and goes to the Irish act.

Each act also carries a **confidence** figure for its live score: `2` = cited
written review, `1` = aggregate or audience reports, `0` = reputation only. The
app shows this, so you can tell a scored judgement from a hunch.

Regenerate with:

```bash
python3 committee.py && python3 curate.py
```

That writes `acts.csv` (the scoring database — open it in Numbers or Excel),
`clashes.csv` (every resolved clash) and `committee.json` (consumed by the app).

## Updating it during the week

Times move. To update:

1. Edit the picks, notes, reviews or songs in `curate_tables.py`, the scores in
   `committee.py`, or the written game plans in `guide.js` (the `PLANS` object).
2. If stage times themselves have changed, re-scrape into `_schedule_raw.json`.
3. Run `python3 committee.py && python3 curate.py` to rebuild `data.js`.
4. `git commit && git push` — GitHub Pages redeploys in about a minute.

Bump `CACHE` in `sw.js` (e.g. `atn26-v3`) if a change doesn't show up for people
who already have it installed.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Shell, all styles |
| `guide.js` | App logic, site map + walk model, written day-by-day game plans |
| `curate_tables.py` | Picks, live-review notes, signature songs — the stuff you edit |
| `committee.py` | Scores every act, resolves clashes, writes the CSVs |
| `curate.py` | Merges schedule + curation + scores into `data.js` |
| `data.js` | Generated — don't hand-edit |
| `acts.csv` / `clashes.csv` | Generated scoring database and clash verdicts |
| `_schedule_raw.json` | Raw scraped schedule, 398 sets |
| `sw.js` | Service worker for offline use |
| `serve.mjs` | Local preview server only, not used in production |

## Walking distances

ATN publishes zone names but not stage-to-stage distances, so the walk times in
the Map tab are **estimates** derived from ATN's own zone breakdown, deliberately
generous. Stages ATN doesn't place in a published zone show no estimate at all
rather than an invented one.

Run locally with `node serve.mjs` and open <http://localhost:8123>.

## Source & accuracy

Stage times come from the published lineup and the community Clashfinder for
ATN 2026. Sets get moved — always sanity-check against the official ATN app or
the stage boards on the day.
