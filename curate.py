#!/usr/bin/env python3
"""Turn the raw clashfinder scrape into data.js for the guide app.

Re-run after editing PICKS:  python3 curate.py
"""
import json, re

# tier: 1 = must see, 2 = big call, 3 = worth a punt
# genre: rock | indie | dj | global | trad | other
PICKS = {
# ---------------- THURSDAY ----------------
"Annie Mac":            (1, "dj",     "Arena barely open and she's already the biggest party on site. Perfect opening night."),
"Getdown Edits":        (2, "dj",     "Warm-up before Annie Mac on the same stage. Stay put, don't move."),
"Lúnasa":               (2, "trad",   "World-class trad instrumental. The classy end of Thursday."),
"Ailbhe Reddy":         (2, "indie",  "Sharp Dublin indie songwriting to close out the small stage."),
"David Keenan":         (2, "indie",  "Wild, poetic Dundalk performer. Also plays Saturday if you miss this."),
"Zaska":                (2, "indie",  "Neo-soul and funk guitar. Easy landing after the drive down."),
"Niamh Bury":           (3, "trad",   "Gorgeous, quiet folk voice. Good decompression."),
"Mantle":               (3, "rock",   "Kildare indie rock, Pearl Jam and Wunderhorse in the DNA. Early doors."),
"Justyna":              (3, "dj",     "The Last City going properly late on night one."),
"Madonna Kebab":        (3, "dj",     "Ping Pong Disco being exactly as daft as it sounds."),
"Corcra":               (3, "dj",     "House, prog and disco to open the weekend."),
"Bull Horris":          (3, "rock",   "Loose, rowdy Irish outfit."),
"All Things Eve":       (3, "indie",  "One to say you saw early."),

# ---------------- FRIDAY ----------------
"Pulp":                 (1, "indie",  "First festival headline in 15 years. Jarvis, the hits, a field full of people losing it. The single biggest set of the weekend."),
"Floating Points (Live)":(1,"dj",     "Live, not a DJ set — builds from ambient to full euphoria. The best possible thing to do after Pulp."),
"Friendly Fires":       (1, "indie",  "Indie you can actually rave to. 'Paris' and 'Blue Cassette' in a tent at half eight is the sweet spot."),
"Floorplan":            (1, "dj",     "Robert Hood's gospel-house project. Detroit techno royalty and genuinely joyous."),
"Kerri Chandler":       (1, "dj",     "Deep house godfather closing the Bandstand at 1:30am. If you only do one late set Friday, this."),
"Gurriers":             (1, "rock",   "Dublin post-punk on the main stage right before Pulp. Loud, mean and the best homegrown guitar band going."),
"Dry Cleaning":         (2, "rock",   "Deadpan spoken vocals over brilliant angular guitars. Very much your thing."),
"Cardinals":            (2, "rock",   "Cork guitar band with big widescreen tunes. Rising fast."),
"Job Jobse":            (2, "dj",     "Dutch selector who does the euphoric long-form thing better than almost anyone. Arcadia at midnight."),
"O'Flynn":              (2, "dj",     "Percussive, melodic, tribal house. Road To Nowhere after dark."),
"Brògeal":              (2, "trad",   "Folk-punk singalongs. Think a rowdier, scrappier trad night."),
"PVA":                  (2, "rock",   "Post-punk welded to hard electronics. Genuinely heavy in a live room."),
"Anish Kumar":          (2, "dj",     "UK breaks and bass with a big grin on it."),
"Sunil Sharpe x Kev Freeney Presents Spineless": (2,"dj","Ireland's hardest techno operator. Go if you want it fast and unrelenting."),
"Jamz Supernova":       (2, "dj",     "Broken beat, soul, bass. Superb late selector."),
"New Jackson":          (2, "dj",     "David Kitt's electronic alias. Hypnotic Irish house in the dome."),
"Sam Alfred":           (2, "dj",     "Sets up Kerri Chandler on the Bandstand. Don't wander off."),
"Trinity Orchestra":    (2, "other",  "Orchestra doing a full pop/dance album live. Brilliant, silly, great way to open Friday."),
"Jacob Alon":           (2, "indie",  "Fragile, spellbinding folk. Ten minutes in and the tent goes silent."),
"Lullahush":            (2, "indie",  "Irish electronic-folk producer. Beautiful and strange live show."),
"Black Nylon":          (3, "rock",   "Dark, driving Irish guitar music. Late slot on a small stage."),
"Swimming Paul":        (3, "dj",     "Weird, warm Irish electronics at 2am."),
"Surusinghe":           (3, "dj",     "Fast, bass-heavy, no mercy. Closing Arcadia."),
"Kelly Anne Byrne 'Prince Tribute'": (3,"other","Two hours of Prince. Exactly as good as it sounds."),
"megaTRAD":             (3, "trad",   "Trad turned up to eleven. The Last City gets rowdy."),
"Trad Folkin'Raves feat Annie Craic": (3,"trad","Trad rave until 4am. Chaos in the best way."),
"The New Eves":         (3, "indie",  "Odd, ritualistic, brilliant. Not like anything else on."),
"Hank":                 (3, "rock",   "Scrappy guitar band, early afternoon, low commitment."),
"The Awning":           (3, "indie",  "Solid Irish indie on the Hidden Sounds stage."),
"Rory Sweeney (Live)":  (3, "dj",     "Live electronics in The Circle."),
"Rose Betts":           (3, "indie",  "Big-voiced songwriting."),
"Peach":                (3, "dj",     "Reliably great house selector, early IMMERSE slot."),
"Huartan":              (3, "trad",   "Trad with teeth."),
"MIKE":                 (3, "other",  "Cult New York rapper. Hazy, heavy, worth the detour."),
"Sexy Tadhg":           (3, "other",  "An absolute lunatic on the main stage. Pure Irish festival chaos."),
"Dublin Disco All Dayer DJ's": (3,"dj","Disco all night in Ping Pong."),

# ---------------- SATURDAY ----------------
"Maruja":               (1, "rock",   "The heaviest thing on the entire bill. Sax-driven noise-rock that goes full doom. If you want something genuinely punishing, this is it."),
"Gilla Band":           (1, "rock",   "Ireland's greatest noise band. Physically overwhelming live — a wall of broken electronics and screaming. Unmissable."),
"W.I.T.C.H.":           (1, "global", "Zambian psych-rock legends, back after 40 years. Fuzzed-out guitars and afro-rock grooves. A total joy."),
"Hot 8 Brass Band":     (1, "global", "New Orleans brass with a sub-bass tuba. Impossible not to move. Perfect early evening main stage."),
"Ezra Collective":      (1, "global", "Mercury-winning London jazz that plays like a carnival. One of the best live bands on earth right now."),
"Sprints":              (1, "rock",   "Dublin punk, absolutely relentless. Karla Chubb is a proper frontperson."),
"THUMPER":              (1, "rock",   "Two drummers, huge noise-pop hooks. The Last City will come apart at the seams."),
"Maribou State (Live)": (1, "dj",     "Full live band version of their soulful electronica. Gorgeous and huge."),
"The Avalanches (DJ Set)": (1,"dj",   "Sample-collage legends going back-to-back on records until 3am. A once-in-a-while thing."),
"Mall Grab":            (1, "dj",     "Raw, rowdy lo-fi house and rave. Closing the Bandstand at 1:30."),
"Joy Orbison":          (1, "dj",     "UK bass and house royalty. Arcadia at 1am is where he belongs."),
"Greentea Peng":        (1, "global", "Psychedelic neo-soul with heavy dub and reggae bones. Smoky and brilliant."),
"Bicurious":            (2, "rock",   "Irish math-rock duo. Absurdly heavy for two people."),
"Call Super":           (2, "dj",     "Left-field, textured, beautiful club music to close Arcadia."),
"DJ Nobu":              (2, "dj",     "Japanese techno master. Deep, dark, disciplined."),
"Dan Shake":            (2, "dj",     "House, disco and boogie. Guaranteed good time."),
"Jyoty":                (2, "dj",     "Everything from garage to bashment. Total party selector."),
"Or:la":                (2, "dj",     "Derry-born, wonky and hard-hitting."),
"Say She She":          (2, "global", "NYC disco-soul trio. Live band, huge harmonies, midnight slot."),
"KhakiKid":             (2, "other",  "Dublin hip hop with a great sense of humour."),
"David Kitt":           (2, "indie",  "Irish indie-electronic elder statesman. Lovely early afternoon set."),
"Muireann Bradley":     (2, "trad",   "Teenage Donegal fingerpicker playing 1920s country blues. Jaw-dropping."),
"Colleen Cosmo Murphy": (2, "dj",     "Three hours of proper disco to open the dome. Best early-day option on site."),
"Moving Still":         (2, "dj",     "Irish-Saudi DJ mixing SWANA sounds with house. Excellent."),
"Cromby":               (2, "dj",     "Belfast house, always delivers."),
"The Wild Geeze - Comedy Cabaret": (2,"other","Three hours of Irish comedy. Best possible hangover cure."),
"Sassy 009":            (3, "indie",  "Norwegian dream-pop-meets-club. Odd and lovely."),
"The Itch":             (3, "rock",   "Young, snotty and loud. Early doors guitar hit."),
"Seamus Fogarty":       (3, "indie",  "Wry Irish folk-electronica."),
"Yankari Afrobeat Collective": (3,"global","Afrobeat until half three in the morning."),
"Franz Scala":          (3, "dj",     "Italo, cosmic disco, weirdness."),
"Gaff E":               (3, "dj",     "Irish DJ closing Ping Pong Disco at 4am."),
"Governess":            (3, "dj",     "Great Irish selector, plays Friday and Saturday."),
"DJ Deece":             (3, "dj",     "Late one in the dome."),
"Æ MAK":                (3, "indie",  "Art-pop with a real edge."),
"Maykay":               (3, "rock",   "Big voice, big songs."),
"Ria Rua":              (3, "rock",   "Electronic-punk crossover. Aggressive and good."),
"One Leg One Eye":      (3, "trad",   "Trad drone. Genuinely unsettling and brilliant."),
"Glasshouse presents: Bjork": (3,"other","Björk covers by a live collective. Bold move, usually works."),
"Nialler9":             (3, "dj",     "The Irish music blogger. Excellent, tasteful selections."),
"Takuya Nakamura (Live)": (3,"dj",    "Live trumpet over dub and house."),
"Bedlam":               (3, "dj",     "Late and loud in The Last City."),
"LOST at The Last City": (3,"dj",     "Legendary Irish rave crew. 1am to 4am."),
"Spray":                (3, "dj",     "Hard, fast IMMERSE slot."),
"EMA":                  (3, "dj",     "Irish techno, late."),
"Sing Along Social":    (3, "other",  "Mass karaoke, no talent required. Genuinely great craic at 3pm."),
"Sun Studio Collective":(3, "rock",   "Rock'n'roll revivalists."),
"Acid Granny Presents Schindler's Fist": (3,"other","Exactly as unhinged as the name suggests."),
"Felispeaks":           (3, "other",  "Powerful Irish-Nigerian performer."),
"Trá Pháidín":          (3, "trad",   "Trad session done properly."),

# ---------------- SUNDAY ----------------
"Underworld":           (1, "dj",     "Third time at ATN and they still turn a field into a rave. 'Born Slippy' outdoors on a Sunday night is the weekend's peak moment."),
"Disclosure (DJ)":      (1, "dj",     "Main stage midnight DJ set to close the whole festival. Hits, house, everyone."),
"Mogwai":               (1, "rock",   "Scottish post-rock at absolutely crushing volume. The closest thing to metal all weekend, and the loudest set on site. Clashes with Underworld's tail — see the plan."),
"Barrington Levy":      (1, "global", "Genuine reggae and dancehall royalty. 'Here I Come' in the afternoon sun. The reggae set of the weekend, no contest."),
"Anna von Hausswolff":  (1, "rock",   "Pipe organ doom. Gothic, monolithic, genuinely heavy. Metal fans get this immediately."),
"King Kong Company":    (1, "dj",     "Waterford's own. Live electronic mayhem on home turf at 1:30am — this will be the most unhinged room at the festival."),
"Hot Chip (DJ Set)":    (1, "dj",     "Hot Chip playing records. Nailed-on party."),
"Altern-8":             (1, "dj",     "Original 1991 rave. Dust masks, hoovers, breakbeats. Pure nostalgia and pure energy."),
"Soichi Terada (Live)": (1, "dj",     "The happiest man in house music playing live. Impossible to watch without grinning."),
"Talks in the Tent: John Cooper Clarke": (1, "other", "The punk poet. Ferociously funny, still razor sharp. Best non-music thing on the bill."),
"Self Esteem":          (2, "indie",  "Huge, theatrical pop with a proper live show."),
"Kate Nash":            (2, "indie",  "'Foundations' and a much heavier live band than you'd expect."),
"Chet Faker":           (2, "indie",  "Smoky electronic soul, ideal Sunday evening."),
"Soda Blonde":          (2, "indie",  "Dublin indie-pop with real craft. Opens the main stage."),
"Damien Dempsey":       (2, "indie",  "An Irish institution. Thousands of people singing every word. A moment."),
"Eats Everything":      (2, "dj",     "Big-room house, closing Arcadia at 4am."),
"The Dare (DJ Set)":    (2, "dj",     "Sleazy electroclash revival. Very fun, very late."),
"Weval (Live)":         (2, "dj",     "Dutch duo, live and melodic. Beautiful visuals."),
"Prosumer":             (2, "dj",     "Warm, soulful house from a true master. Perfect Sunday teatime."),
"Gabrielle Kwarteng":   (2, "dj",     "Rolling, groovy house."),
"Anz b2b Jio":          (2, "dj",     "Rapid, colourful UK club music."),
"Ms Dynamite":          (2, "global", "Garage and dancehall legend. 'Booo!' still hits."),
"Moonchild Sanelly":    (2, "global", "South African gqom-punk. Absolutely wild live."),
"Getdown Services":     (2, "rock",   "Sardonic Bristol post-punk. Very funny, very tight."),
"Kean Kavanagh":        (2, "indie",  "Softboy Records, smooth Irish alt-pop."),
"Alabaster DePlume":    (2, "other",  "Spoken word and saxophone. Odd, gentle, hypnotic."),
"SOAK":                 (2, "indie",  "Derry songwriter, quietly devastating."),
"Playback Presents: Stop Making Sense": (2,"other","Talking Heads' concert film, live band treatment. Guaranteed singalong."),
"Bazza Ranks":          (2, "global", "Reggae and dancehall selector. Two hours of pure sunshine."),
"BIIRD":                (2, "indie",  "Irish supergroup-ish indie. Building real buzz."),
"Freak Slug":           (3, "indie",  "Hazy Manchester bedroom-pop."),
"Monjola":              (3, "other",  "Irish R&B with big hooks."),
"Mango":                (3, "other",  "Dublin hip hop stalwart."),
"Róis":                 (3, "trad",   "Experimental Irish keening. Haunting."),
"Gently Tender":        (3, "indie",  "Ex-Palma Violets, loose and lovely."),
"Sell Everything":      (3, "rock",   "Loud, closing the Flourish stage."),
"Daniel Wang":          (3, "dj",     "Disco obsessive closing Ping Pong at 4am."),
"Stevie G":             (3, "dj",     "Cork legend, hip hop and soul."),
"Marcus O'Laoire":      (3, "dj",     "Great taste, great Sunday evening groove."),
"Grooveline":           (3, "dj",     "Funk and soul on the Bandstand."),
"Burt Bacharach by Paddy Hanna": (3,"other","Bacharach songbook, sincerely done."),
"Toshín":               (3, "global", "Irish-Nigerian soul."),
"Elikya":               (3, "global", "Congolese-Irish, late and joyous."),
"Qbanaa":               (3, "global", "Cuban energy on Global Roots."),
"I Draw Slow":          (3, "trad",   "Irish bluegrass, done well."),
"Winemoms":             (3, "dj",     "1am to 4am, last stand of the weekend."),
"Tony Cantwell":        (3, "other",  "Very funny Irish comedian."),
"Organ Freeman (Live Jazz)": (3,"other","Live jazz to open Sunday gently."),
"Shrem's Madonnathon":  (3, "dj",     "Two hours of Madonna. No notes."),
"The Calvinists":       (3, "rock",   "Rowdy guitars on Global Roots."),
"Sloucho":              (3, "dj",     "Irish producer, late IMMERSE."),
}

# Acts deliberately left out of the curated picks. They still appear in the full
# schedule browser — this list only controls what gets recommended.
EXCLUDE = {
    "KNEECAP", "Kae Tempest", "For Those I Love", "Jinx Lennon",
    "Joshua Idehen", "Christy Moore", "The Mary Wallopers",
}

DAY_KEY = {
    "Thursday 30th July": "thu",
    "Friday 31st July":   "fri",
    "Saturday 1st August":"sat",
    "Sunday 2nd August":  "sun",
}

raw = json.load(open("_schedule_raw.json"))

STAGE_NAMES = {
    "the-big-romance-dome-x-altos": "Big Romance Dome x Altos",
}

sets = []
for r in raw:
    a = r["artist"]
    tier, genre, note = PICKS.get(a, (0, "", ""))
    if a in EXCLUDE:
        tier, genre, note = 0, "", ""
    sets.append({
        "a": a,
        "s": STAGE_NAMES.get(r["stage"], r["stage"]),
        "d": DAY_KEY[r["day"]],
        "t": r["time"],
        "st": r["start"],
        "en": r["end"],
        "tr": tier,
        "g": genre,
        "n": note,
    })

sets.sort(key=lambda x: x["st"])

unmatched = sorted(set(PICKS) - set(s["a"] for s in sets))
if unmatched:
    print("!! PICKS with no matching set (typo?):")
    for u in unmatched:
        print("   -", u)

out = "// Generated by curate.py — do not hand-edit.\nwindow.ATN_DATA = " + \
      json.dumps(sets, ensure_ascii=False, separators=(",", ":")) + ";\n" + \
      "window.ATN_BUILD = " + json.dumps(__import__("datetime").datetime.now().strftime("%d %b %Y, %H:%M")) + ";\n"
open("data.js", "w", encoding="utf-8").write(out)

from collections import Counter
print(f"wrote data.js — {len(sets)} sets, {sum(1 for s in sets if s['tr'])} curated picks")
print(Counter(s["g"] for s in sets if s["g"]))
