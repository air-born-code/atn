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

The model lives in `scoring.py`. Every curated act gets a consolidated score:

```
base      = (best album + bench strength + recent concerts) / 3
composite = base + legend bonus
```

- **best album** — quality of their high-water mark
- **bench strength** — depth across the whole catalogue
- **recent concerts** — live form over roughly the last year, from the reviews
  gathered in `curate_tables.py`

The **legend bonus** is additive and only awarded where a genuinely legendary
concert can be named and dated. Those citations are in `LEGEND` in `scoring.py`,
and the app shows them — Pulp's Glastonbury '95, Underworld's Olympic ceremony,
Barrington Levy at Reggae Sunsplash, John Cooper Clarke opening for the Pistols.
If we can't name one, the bonus is zero. No bonus is handed out on vibes.

Four judges then weight the same three axes differently, as a consensus check.
They don't set the headline number; their spread is reported alongside it:

| Judge | Best album | Bench | Recent | Irish bonus |
| --- | --- | --- | --- | --- |
| The Archivist | 0.30 | 0.45 | 0.25 | — |
| The Headliner | 0.45 | 0.25 | 0.30 | — |
| The Gig-Goer | 0.20 | 0.15 | 0.65 | — |
| The Local | 0.30 | 0.25 | 0.45 | +0.4 |

Each act carries a **confidence** figure for its recent score: `2` = cited written
review, `1` = aggregate or audience reports, `0` = reputation only. The app shows
it, so a sourced judgement reads differently to a hunch.

The committee then walks each day hour by hour and names the best gig on site in
every hour. Where two are within 0.3 of each other it's treated as a coin flip and
goes to the Irish act.

Regenerate with:

```bash
python3 committee.py && python3 curate.py
```

That writes `acts.csv` (the scoring database — open it in Numbers or Excel),
`hours.csv` (the hour-by-hour verdicts) and `committee.json` (consumed by the app).

## Updating it during the week

Times move. To update:

1. Edit the picks, notes, reviews or songs in `curate_tables.py`, the scores and
   legend citations in `scoring.py`, or the game plans in `guide.js` (`PLANS`).
2. If stage times themselves have changed, re-scrape into `_schedule_raw.json`.
3. Run `python3 committee.py && python3 curate.py` to rebuild `data.js`.
4. `git commit && git push` — GitHub Pages redeploys in about a minute.

Bump `CACHE` in `sw.js` (e.g. `atn26-v4`) if a change doesn't show up for people
who already have it installed.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Shell, all styles |
| `guide.js` | App logic, site map + walk model, written day-by-day game plans |
| `curate_tables.py` | Picks, live-review notes, signature songs — the stuff you edit |
| `scoring.py` | The scoring model — axes, judge weights, legend citations |
| `committee.py` | Scores every act, picks an hourly winner, writes the CSVs |
| `curate.py` | Merges schedule + curation + scores into `data.js` |
| `data.js` | Generated — don't hand-edit |
| `acts.csv` / `hours.csv` | Generated scoring database and hourly verdicts |
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
