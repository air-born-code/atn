#!/usr/bin/env python3
"""The scoring model.

Headline score is an equal three-way split:

    base = (peak + bench + recent) / 3
    composite = base + legend_bonus

  peak   quality of their best album — the high-water mark
  bench  total bench strength — depth across the whole catalogue
  recent quality of concerts over roughly the last year

`legend_bonus` is additive on top, and is only awarded where there is a
genuinely legendary concert (or equivalent moment) to point at. If we can name it,
it's in LEGEND with the year. If we can't, the bonus is zero — no bonus is handed
out on vibes.

Four judges then weight the same three axes differently. They don't set the
headline number; their spread is reported as a consensus check.
"""

# name,            peak, bench, recent, irish_bonus
JUDGES = [
    ("The Archivist",  0.30, 0.45, 0.25, 0.0),
    ("The Headliner",  0.45, 0.25, 0.30, 0.0),
    ("The Gig-Goer",   0.20, 0.15, 0.65, 0.0),
    ("The Local",      0.30, 0.25, 0.45, 0.4),
]

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
"Pulp": (2.5,
  "Glastonbury, Pyramid Stage — stepped in for The Stone Roses at a week's notice "
  "after John Squire broke his collarbone. Widely rated one of the greatest sets in "
  "the festival's history.", "24 June 1995"),
"Underworld": (2.2,
  "London Olympics Opening Ceremony — Rick Smith was musical director for Danny "
  "Boyle's ceremony, and 'Caliban's Dream' played as the cauldron was lit.",
  "27 July 2012"),
"Barrington Levy": (2.0,
  "Reggae Sunsplash, Jamaica — the performances that made his name and cemented his "
  "standing in reggae. He went on playing Sunsplash through to 1995.", "1980 and 1981"),
"Talks in the Tent: John Cooper Clarke": (2.0,
  "Opened for the Sex Pistols and Buzzcocks at the height of punk — including 45 "
  "minutes holding a 2,000-strong Buzzcocks crowd at Leeds University Refectory. He "
  "was also in the room for the Pistols' Lesser Free Trade Hall gig in 1976.",
  "18 March 1978"),
"Altern-8": (1.8,
  "The Activ-8 rave — performed at 2am from the back of an articulated lorry in a "
  "club car park, in chemical warfare suits. Also the Shelley's car park set.", "1991"),
"Ezra Collective": (1.6,
  "First jazz act ever to win the Mercury Prize, for 'Where I'm Meant To Be', at the "
  "Eventim Apollo. An award rather than a gig, but it changed their standing.",
  "7 September 2023"),
"Mogwai": (1.5,
  "No single canonical night — instead a documented reputation as one of the loudest "
  "live bands on earth, built on 'Like Herod' and 'Mogwai Fear Satan'. Braithwaite "
  "openly tells audiences to wear earplugs.", "ongoing since the late 1990s"),
"Kerri Chandler": (1.5,
  "His reel-to-reel shows — mixing live off four tape machines, a nod to watching "
  "Frankie Knuckles work — most visibly at the Roundhouse in London.", "2022"),
"W.I.T.C.H.": (1.5,
  "Pioneered Zamrock in 1970s Zambia, then reunited and returned to touring after "
  "roughly four decades away.", "1970s, reunited 2010s"),
"Hot 8 Brass Band": (1.3,
  "After Hurricane Katrina scattered the band, they regrouped and toured the US to "
  "support displaced New Orleanians. Featured in Spike Lee's 'When the Levees Broke'.",
  "2005–06"),
"The Avalanches (DJ Set)": (1.2,
  "'Since I Left You' is one of the most celebrated sample records ever made, though "
  "no single legendary live night stands out — they toured it rarely.", "2000"),
"Floorplan": (1.2,
  "Robert Hood is a founder of Underground Resistance and one of the architects of "
  "minimal Detroit techno; Floorplan is his gospel-house project.", "UR from 1989"),
}

DEFAULT = (4.0, 3.0, 6.0, 0)   # tier-3 acts with no specific evidence
