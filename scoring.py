#!/usr/bin/env python3
"""The scoring model — tuned for fresh material over legacy.

    base      = 0.35*fresh + 0.35*recent + 0.20*peak + 0.10*bench
    composite = base + legend_bonus

  fresh  how current and vital their material is right now — a strong album in
         the last year or two scores high, a heritage act coasting on the back
         catalogue scores low. Weighted joint-heaviest by design.
  recent quality of concerts over roughly the last year
  peak   quality of their best album — the high-water mark
  bench  depth across the whole catalogue. Deliberately the lightest weight:
         it was previously letting veterans with deep discographies outrank
         bands playing the best shows of their lives right now.

`legend_bonus` is additive, halved from the earlier model so that legacy
tops up a score rather than deciding it, and only awarded where a genuinely
legendary concert can be named and dated. If we can't name it, it's zero.

Three judges then weight the same axes differently. They don't set the headline
number; their spread is reported as a consensus check, and where they disagree
sharply that's usually the interesting acts.

The judges are ROLES, not real people. Each stands for a different kind of
musical expertise — the studio ear, the dancefloor ear, the live-sound ear —
so a score isn't one taste pretending to be objective. They are deliberately
not modelled on named critics or musicians: inventing verdicts and attributing
them to real people would be putting words in their mouths.
"""

# The headline weights. fresh + recent = 70% of the base score.
W_FRESH, W_RECENT, W_PEAK, W_BENCH = 0.35, 0.35, 0.20, 0.10

# The committee — a hip-hop ear, a rock ear and a punk ear. name, fresh, recent,
# peak, bench, blurb.
#
# These are ROLES, deliberately not real named producers or musicians. Inventing
# a score and attaching a real person's name to it would be putting words in
# their mouth, on a page that gets shared.
JUDGES = [
    ("The Beatmaker", 0.15, 0.20, 0.40, 0.25,
     "The hip-hop ear. Grew up on records, not gigs — judges an act on the strength "
     "of what they actually made: production, arrangement, whether the catalogue "
     "runs deep enough to pull a set from. Will take a flawed great over a hot newcomer."),
    ("The Lifer", 0.20, 0.55, 0.15, 0.10,
     "The rock ear. Thirty years of shows from side-of-stage, and only trusts what "
     "survives a field — PA, stagecraft, daylight, a crowd half of whom wandered in. "
     "The only one who reads the festival-form table."),
    ("The Punk", 0.50, 0.35, 0.10, 0.05,
     "The punk ear. Openly hostile to coasting: doesn't care what you did in 1995, "
     "cares whether you've got something out now and whether you mean it tonight. "
     "Rates urgency over polish and legacy barely counts."),
    ("The Selector", 0.20, 0.50, 0.10, 0.20,
     "The dance ear — a booth lifer who has closed more rooms than they can count. "
     "Judges by the floor: does a set build, does it read a crowd, does it land at "
     "2am. Values a deep record bag over a hot single, and knows the DJ and "
     "electronic bill better than anyone else here."),
]

# Only The Lifer reads the festival-form table — that's the whole reason they're
# on the committee. Applied on top of their weighted score.
FEST_ADJUSTMENT = {"built": 0.6, "proven": 0.3, "caution": -0.6, "unknown": 0.0, "": 0.0}
ROAD_HAND = "The Lifer"

# The Selector knows the dance bill best, so their read on a DJ or electronic act
# carries more weight than a generalist's.
SELECTOR = "The Selector"
SELECTOR_GENRE_BONUS = {"dj": 0.5}

# How fresh their current material is. Default 6.0 where not listed.
# High = a strong record in the last year or two and actively touring it.
FRESH = {
"Maruja": 9.5,                  # Pain To Power, 2025 — debut album
"Sprints": 9.5,                 # All That Is Over, 2025
"Gurriers": 9.0,                # Come And See, 2024
"THUMPER": 9.0,                 # second-album era, 2025–26
"Self Esteem": 9.0,             # A Complicated Woman, 2025
"Anna von Hausswolff": 9.0,     # Iconoclasts, 2025
"Maribou State (Live)": 9.0,    # Hallucinating Love, 2025
"Greentea Peng": 9.0,           # TELL DEM IT'S SUNNY, 2025
"Mogwai": 8.5,                  # The Bad Fire, Jan 2025
"Pulp": 8.5,                    # More, 2025 — first in 24 years
"Moonchild Sanelly": 8.5,       # Full Moon, 2025
"Dry Cleaning": 8.5,            # Secret Love
"Floating Points (Live)": 8.5,  # Cascade, 2024
"Ezra Collective": 8.5,         # Dance, No One's Watching, 2024
"Cardinals": 8.5,               # debut, 2025
"Muireann Bradley": 8.5,
"Hot 8 Brass Band": 8.0,        # Big Tuba, Feb 2025
"Getdown Services": 8.0,
"Underworld": 7.5,              # Strawberry Hotel, 2024
"Kate Nash": 7.5,               # 9 Sad Symphonies, 2024
"PVA": 7.5,
"W.I.T.C.H.": 7.0,              # Sogolo, 2023
"Mall Grab": 7.0,
"Disclosure (DJ)": 7.0,
"King Kong Company": 7.0,
"Bicurious": 7.0,
"SOAK": 7.0,
"Gilla Band": 6.5,              # Most Normal, 2022
"Jacob Alon": 8.5,
"Alabaster DePlume": 7.5,
"Say She She": 7.5,
"Soichi Terada (Live)": 6.0,
"Hot Chip (DJ Set)": 6.0,
"Talks in the Tent: John Cooper Clarke": 6.0,
"Kerri Chandler": 5.5,          # Spaces and Places, 2022
"Floorplan": 5.5,
"The Avalanches (DJ Set)": 4.5, # last album 2020
"Damien Dempsey": 5.0,
"Altern-8": 3.0,                # a legacy rave act, and that's the point
"Barrington Levy": 3.0,         # no recent record — touring the back catalogue
"Ms Dynamite": 3.5,
"Chet Faker": 6.0,
"Colleen Cosmo Murphy": 5.5,
"Prosumer": 5.5,
"Rahann": 5.5,
"Trinity Orchestra": 5.0,
"Playback Presents: Stop Making Sense": 4.0,
"Sing Along Social": 5.0,
}
FRESH_DEFAULT = 6.0

# conf: 2 = cited written review, 1 = aggregate/audience reports, 0 = reputation only
# artist: (peak, bench, recent, conf)
SCORES = {
"Pulp":                            (9.5, 8.5, 9.0, 2),
"Underworld":                      (9.0, 8.5, 9.0, 2),
"Mogwai":                          (8.5, 9.0, 8.5, 2),
"Disclosure (DJ)":                 (7.5, 6.0, 6.5, 0),
"Barrington Levy":                 (8.5, 8.0, 5.5, 1),
"Ezra Collective":                 (7.5, 6.0, 9.5, 2),
"Gilla Band":                      (8.0, 7.0, 9.5, 2),
"Maruja":                          (6.0, 3.5, 9.5, 2),
"W.I.T.C.H.":                      (8.5, 7.5, 8.5, 2),
"Hot 8 Brass Band":                (7.0, 6.5, 7.5, 0),
"Sprints":                         (6.0, 4.0, 9.0, 2),
"THUMPER":                         (5.5, 4.0, 9.0, 2),
"Self Esteem":                     (7.5, 5.5, 9.0, 2),
"Kate Nash":                       (7.0, 5.0, 7.0, 1),
"Anna von Hausswolff":             (7.5, 6.5, 9.0, 2),
"Chet Faker":                      (6.5, 5.0, 6.5, 0),
"Soda Blonde":                     (5.0, 3.5, 6.0, 0),
"Damien Dempsey":                  (7.5, 6.5, 7.0, 0),
"King Kong Company":               (5.5, 4.5, 7.5, 0),
"Hot Chip (DJ Set)":               (8.0, 7.5, 7.5, 0),
"Altern-8":                        (7.0, 5.5, 7.0, 0),
"Soichi Terada (Live)":            (8.0, 6.5, 9.0, 1),
"Talks in the Tent: John Cooper Clarke": (8.5, 7.0, 9.0, 2),
"Floating Points (Live)":          (8.0, 6.5, 9.5, 2),
"Friendly Fires":                  (7.5, 5.0, 7.5, 1),
"Floorplan":                       (7.5, 6.5, 7.5, 0),
"Kerri Chandler":                  (8.5, 8.5, 8.0, 1),
"Rahann":                          (6.5, 7.0, 8.0, 2),
"Gurriers":                        (6.5, 3.0, 8.5, 2),
"Dry Cleaning":                    (7.5, 5.0, 8.0, 1),
"Cardinals":                       (5.0, 2.0, 6.0, 0),
"Maribou State (Live)":            (7.0, 5.5, 8.5, 2),
"The Avalanches (DJ Set)":         (9.5, 6.0, 6.0, 0),
"Mall Grab":                       (6.0, 5.0, 8.5, 2),
"Joy Orbison":                     (7.0, 6.5, 7.5, 0),
"Greentea Peng":                   (6.5, 5.0, 8.5, 2),
"Moonchild Sanelly":               (6.5, 5.0, 9.0, 2),
"Bicurious":                       (5.5, 3.0, 6.0, 0),
"Call Super":                      (6.5, 6.0, 7.0, 0),
"DJ Nobu":                         (6.5, 6.5, 7.5, 0),
"Or:la":                           (5.5, 4.5, 7.0, 0),
"Jyoty":                           (5.0, 4.0, 7.5, 0),
"Say She She":                     (6.0, 4.0, 7.0, 0),
"Muireann Bradley":                (6.5, 2.5, 8.0, 0),
"David Kitt":                      (6.5, 6.0, 6.5, 0),
"KhakiKid":                        (5.0, 2.5, 6.0, 0),
"Ms Dynamite":                     (7.5, 5.5, 6.5, 0),
"SOAK":                            (6.5, 5.0, 6.5, 0),
"Getdown Services":                (5.5, 3.0, 6.5, 0),
"Alabaster DePlume":               (6.5, 5.5, 7.5, 0),
"Prosumer":                        (6.0, 6.5, 7.0, 0),
"Eats Everything":                 (5.5, 5.5, 6.5, 0),
"The Dare (DJ Set)":               (5.5, 3.0, 6.5, 0),
"Weval (Live)":                    (6.0, 4.5, 6.5, 0),
"Colleen Cosmo Murphy":            (6.0, 6.5, 7.0, 0),
"Trinity Orchestra":               (4.0, 3.0, 6.5, 0),
"PVA":                             (5.5, 3.0, 6.5, 0),
"Brògeal":                         (5.0, 2.5, 6.0, 0),
"Jacob Alon":                      (5.5, 2.0, 6.5, 0),
"Job Jobse":                       (5.0, 5.5, 7.0, 0),
"O'Flynn":                         (5.5, 4.5, 6.5, 0),
"New Jackson":                     (6.0, 4.5, 6.5, 0),
"Sunil Sharpe x Kev Freeney Presents Spineless": (5.5, 6.0, 7.0, 0),
"Jamz Supernova":                  (4.5, 4.5, 6.5, 0),
"Anish Kumar":                     (5.0, 3.5, 6.5, 0),
"Sam Alfred":                      (4.0, 2.5, 6.0, 0),
"Lullahush":                       (5.5, 3.0, 6.5, 0),
"Dan Shake":                       (5.5, 4.5, 6.5, 0),
"Cromby":                          (4.5, 4.0, 6.5, 0),
"Moving Still":                    (5.0, 4.0, 6.5, 0),
"BIIRD":                           (5.0, 2.5, 6.0, 0),
"Kean Kavanagh":                   (5.5, 3.0, 6.0, 0),
"Bazza Ranks":                     (4.5, 3.5, 6.0, 0),
"Sing Along Social":               (3.0, 2.0, 6.5, 0),
"The Wild Geeze - Comedy Cabaret": (3.5, 2.0, 6.0, 0),
"Playback Presents: Stop Making Sense": (5.0, 3.0, 6.5, 0),
}

# Legend bonus, added on top of the base score. Only awarded where a specific
# legendary concert (or equivalent moment) can be named and dated.
# artist: (bonus, what it was, when)
LEGEND = {
"Pulp": (1.25,
  "Glastonbury, Pyramid Stage — stepped in for The Stone Roses at a week's notice "
  "after John Squire broke his collarbone. Widely rated one of the greatest sets in "
  "the festival's history.", "24 June 1995"),
"Underworld": (1.1,
  "London Olympics Opening Ceremony — Rick Smith was musical director for Danny "
  "Boyle's ceremony, and 'Caliban's Dream' played as the cauldron was lit.",
  "27 July 2012"),
"Barrington Levy": (1.0,
  "Reggae Sunsplash, Jamaica — the performances that made his name and cemented his "
  "standing in reggae. He went on playing Sunsplash through to 1995.", "1980 and 1981"),
"Talks in the Tent: John Cooper Clarke": (1.0,
  "Opened for the Sex Pistols and Buzzcocks at the height of punk — including 45 "
  "minutes holding a 2,000-strong Buzzcocks crowd at Leeds University Refectory. He "
  "was also in the room for the Pistols' Lesser Free Trade Hall gig in 1976.",
  "18 March 1978"),
"Altern-8": (0.9,
  "The Activ-8 rave — performed at 2am from the back of an articulated lorry in a "
  "club car park, in chemical warfare suits. Also the Shelley's car park set.", "1991"),
"Ezra Collective": (0.8,
  "First jazz act ever to win the Mercury Prize, for 'Where I'm Meant To Be', at the "
  "Eventim Apollo. An award rather than a gig, but it changed their standing.",
  "7 September 2023"),
"Mogwai": (0.75,
  "No single canonical night — instead a documented reputation as one of the loudest "
  "live bands on earth, built on 'Like Herod' and 'Mogwai Fear Satan'. Braithwaite "
  "openly tells audiences to wear earplugs.", "ongoing since the late 1990s"),
"Kerri Chandler": (0.75,
  "His reel-to-reel shows — mixing live off four tape machines, a nod to watching "
  "Frankie Knuckles work — most visibly at the Roundhouse in London.", "2022"),
"W.I.T.C.H.": (0.75,
  "Pioneered Zamrock in 1970s Zambia, then reunited and returned to touring after "
  "roughly four decades away.", "1970s, reunited 2010s"),
"Hot 8 Brass Band": (0.65,
  "After Hurricane Katrina scattered the band, they regrouped and toured the US to "
  "support displaced New Orleanians. Featured in Spike Lee's 'When the Levees Broke'.",
  "2005–06"),
"The Avalanches (DJ Set)": (0.6,
  "'Since I Left You' is one of the most celebrated sample records ever made, though "
  "no single legendary live night stands out — they toured it rarely.", "2000"),
"Floorplan": (0.6,
  "Robert Hood is a founder of Underground Resistance and one of the architects of "
  "minimal Detroit techno; Floorplan is his gospel-house project.", "UR from 1989"),
}

DEFAULT = (4.0, 3.0, 6.0, 0)   # tier-3 acts with no specific evidence
