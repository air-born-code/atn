# All Together Now 2026 — The Guide

A phone-first, offline-capable guide to All Together Now at Curraghmore Estate,
30 July – 2 August 2026. Curated day-by-day picks, the full 398-set schedule
across all 17 stages, clash detection and a personal shortlist.

## Using it on your phone

Open the site, then **Share → Add to Home Screen** (iPhone) or **menu → Install app**
(Android). It runs full-screen and works with no signal once it's been opened
once on wifi — Curraghmore has almost no coverage.

Tap **↺** in the top right when you have signal to pull the latest version.

## Updating it during the week

Times move. To update:

1. Edit the picks, notes or game plans in `curate.py` (the `PICKS` dict) or
   `guide.js` (the `PLANS` object).
2. If stage times themselves have changed, re-scrape into `_schedule_raw.json`,
   then run `python3 curate.py` to regenerate `data.js`.
3. `git commit && git push` — GitHub Pages redeploys in about a minute.

Bump `CACHE` in `sw.js` (e.g. `atn26-v2`) if a change doesn't show up for people
who already have it installed.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Shell, all styles |
| `guide.js` | App logic + the written day-by-day game plans |
| `data.js` | Generated schedule data — don't hand-edit |
| `curate.py` | Turns `_schedule_raw.json` + curation into `data.js` |
| `_schedule_raw.json` | Raw scraped schedule, 398 sets |
| `sw.js` | Service worker for offline use |
| `serve.mjs` | Local preview server only, not used in production |

Run locally with `node serve.mjs` and open <http://localhost:8123>.

## Source & accuracy

Stage times come from the published lineup and the community Clashfinder for
ATN 2026. Sets get moved — always sanity-check against the official ATN app or
the stage boards on the day.
