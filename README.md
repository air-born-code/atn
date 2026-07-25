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

The model lives in `scoring.py`, and it is deliberately biased toward fresh
material over legacy:

```
base      = 0.35*fresh + 0.35*recent gigs + 0.20*best album + 0.10*bench
composite = base + legend bonus
```

- **fresh** — how current and vital their material is. A strong record in the
  last year or two scores high; a heritage act coasting on the back catalogue
  scores low. Joint-heaviest weight, by design.
- **recent gigs** — live form over roughly the last year, from the reviews
  gathered in `curate_tables.py`
- **best album** — quality of their high-water mark
- **bench** — depth across the whole catalogue. Deliberately the lightest
  weight: it was previously letting veterans with deep discographies outrank
  bands playing the best shows of their lives right now.

The **legend bonus** is additive, halved from the first version of this model so
legacy tops a score up rather than deciding it, and only awarded where a
genuinely legendary concert can be named and dated. Those citations are in
`LEGEND` in `scoring.py` and the app shows them — Pulp's Glastonbury '95,
Underworld's Olympic ceremony, Barrington Levy at Reggae Sunsplash, John Cooper
Clarke opening for the Pistols. If we can't name one, the bonus is zero. No
bonus is handed out on vibes.

The committee is four ears with different expertise, weighting the same four
axes differently, so a score isn't one taste pretending to be objective:

| Judge | Fresh | Live | Album | Bench | The ear |
| --- | --- | --- | --- | --- | --- |
| The Beatmaker | 15% | 20% | 40% | 25% | hip-hop — judges the records and the catalogue |
| The Lifer | 20% | 55% | 15% | 10% | rock — thirty years side-of-stage; only trusts what survives a field |
| The Punk | 50% | 35% | 10% | 5% | punk — urgency over polish, legacy barely counts |
| The Selector | 20% | 50% | 10% | 20% | dance — a booth lifer; judges by the floor, deep bag over hot single |

Two judges carry a specialism the others don't: **The Lifer** is the only one who
reads the festival-form table, docking acts whose show needs a room a field can't
give it; **The Selector** gets extra weight on DJ and electronic acts, because
that's the half of the bill they actually know. It shows — on Kerri Chandler the
Selector is highest at 8.15 and the Punk lowest at 6.83; on Sprints that inverts.

**They are roles, not real people.** No real producer or musician is named or
modelled, because inventing a verdict and attaching someone's actual name to it
would be putting words in their mouth on a page that gets shared.

Where they split hardest is where the interesting acts are — Barrington Levy
scores Beatmaker 6.95 / Lifer 5.10 / Punk 4.68 (great records, nothing new), and
Maruja is almost exactly inverted. Any act with a spread over 1.5 shows a
**They disagree** badge on its detail sheet.

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

## The Latest tab

A GitHub Actions cron job scans for festival chatter and publishes `latest.json`,
which the app fetches. **It runs on GitHub's servers, so it keeps working with your
laptop shut** — every 30 minutes during festival week, hourly in the run-up, plus a
manual trigger from the Actions tab.

```
scripts/collect.py  →  raw_items.json  →  scripts/parse.py  →  latest.json  →  the app
```

**Sources.** RSS (Nialler9, Hot Press, WLR, The Thin Air), Bluesky's public search API
(no auth needed), Reddit's public JSON (often IP-blocked from datacentres — treated as
best-effort), and hash-diffing ATN's own lineup/info/news pages plus the Clashfinder.
That last one is the highest-value signal: a stage-time change matters more than any
rumour.

**Instagram and TikTok are not included and can't be.** Both require a logged-in
session and block datacentre IPs, so an unattended job can't read them — which is
awkward, because that's where most festival rumours live. ATN's own Instagram stays
the fastest official channel; it's linked on the Info tab.

**AI triage.** `parse.py` sends the batch to Claude, which keeps only items that would
change what you actually do — secret sets, schedule changes, travel, weather — and
rates each `confirmed` / `reported` / `rumour`. Rumours render with an explicit
"don't cross the site for this" warning. Set `ANTHROPIC_API_KEY` in the repo's
**Settings → Secrets → Actions**; without it the job falls back to a keyword pass and
still publishes.

Every source is wrapped so one dead endpoint can't take the run down, and the tab shows
per-source health — a thin feed reads as *quiet*, not *broken*. The app caches the last
copy in `localStorage`, so the tab still works with no signal.

## Hourly picks and per-phone individualisation

There are no accounts. Each phone keeps its own state in `localStorage`:

- **`atn_who`** — a name for the phone. Purely cosmetic, but it labels shared plans
  so the group can tell whose is whose.
- **`atn_hourpicks`** — one chosen act per hour (`"sat|22:00": "THUMPER"`). Set from
  the **Choose this hour** button on the hour-by-hour list. Once chosen it sticks, and
  the committee's suggestion stays visible underneath so you can see where you
  disagreed.
- **`atn_stars`**, **`atn_notes`**, **`atn_latest`** — shortlist, notes, cached feed.

Because `localStorage` is per-device, everyone naturally gets their own plan — which
is what you want most of the time. To put the group on the *same* plan, **Share my
plan** encodes the picks into a link (`#plan=<base64>`) that can be pasted into
WhatsApp. Opening it asks before overwriting, so nobody loses their own picks by
tapping a link. No server, no accounts, and it survives being forwarded.
