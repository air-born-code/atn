/* ATN 2026 — The Guide */
(function () {
"use strict";

var D = window.ATN_DATA || [];
var DAYS = [
  { k: "fri", n: "Fri", d: "31 Jul" },
  { k: "sat", n: "Sat", d: "1 Aug" },
  { k: "sun", n: "Sun", d: "2 Aug" }
];
var GENRES = [
  { k: "all",    n: "Everything" },
  { k: "rock",   n: "Rock / Punk / Heavy" },
  { k: "indie",  n: "Indie" },
  { k: "dj",     n: "DJs / Electronic" },
  { k: "global", n: "Reggae / Global" },
  { k: "trad",   n: "Trad / Folk" },
  { k: "other",  n: "Comedy / Other" }
];

/* ---------------- the game plans ---------------- */
var PLANS = {
fri: {
  title: "Friday — Guitars, then Jarvis, then house until dawn",
  intro: "The strongest day for you top to bottom: a proper run of guitar bands in the afternoon, the weekend's biggest headline set at 22:45, and then a genuinely elite late-night electronic bill. One real clash to manage at 20:30.",
  walk: "<b>Walking: very low.</b> Everything from 15:45 through to Floating Points at 00:15 is inside the Main Arena bowl — PVA, Cardinals, Dry Cleaning, Friendly Fires, Gurriers, Pulp and Floating Points are all a 3–5 minute stroll apart. You don't leave the arena until 01:30. Easily the least walking of the three days.",
  legs: [
    { t: "14:00", b: "<b>Ease in.</b> Coffee, site recon, The Last City has trad and daftness running from 11am.<em>Citizen Ceili at 14:00 if you want something ridiculous to start on.</em>" },
    { t: "15:45", b: "<b>PVA</b> — Road To Nowhere<em>First real hit of the day. Post-punk welded to hard electronics — heavy in a live room.</em>" },
    { t: "17:00", b: "<b>Trinity Orchestra</b> — Main Stage<em>Orchestra playing a full pop/dance album live. Big, daft, and the best way to open the main stage.</em>" },
    { t: "18:45", b: "<b>Cardinals</b> — Road To Nowhere<em>Cork guitar band with widescreen tunes, rising fast. Stay on this stage.</em>" },
    { t: "19:45", b: "<b>Dry Cleaning</b> — Something Kind of Wonderful<em>Deadpan spoken vocals over brilliantly angular guitars. Squarely your thing.</em>" },
    { clash: 1, t: "20:30", b: "<span class='clashtag'>Clash</span><b>Friendly Fires (20:30, Road To Nowhere) vs Gurriers (20:45, Main Stage)</b><em>You can have both, and they're four minutes apart inside the arena: Friendly Fires 20:30–21:10 for 'Paris' and 'Blue Cassette', then over to the Main Stage for the back half of Gurriers — which leaves you already in position for Pulp. If you're forced to pick just one, take <b>Friendly Fires</b> — 6.67 to 6.00, too wide a gap for the Irish tiebreak, and a far deeper catalogue to draw a festival set from. Gurriers are the better band for your taste and they're on right before Pulp anyway, so in practice you get both.</em>" },
    { t: "21:30", b: "<b>Hold the main stage.</b> If you'd rather not wait, <b>Floorplan</b> starts 21:30 at IMMERSE — Robert Hood's gospel-house project, genuinely joyous — and you can peel off at 22:35.<em>Don't cut it fine. Pulp will pull the biggest crowd of the weekend.</em>" },
    { t: "22:45", b: "<b>PULP</b> — Main Stage<em>First festival headline in 15 years. Jarvis, the hits, a field full of people losing it. Non-negotiable. This is the set of the weekend.</em>" },
    { t: "00:15", b: "<b>Floating Points (Live)</b> — Something Kind of Wonderful<em>Live, not a DJ set. Builds from ambient into full euphoria. The single best thing to do straight after Pulp.</em>" },
    { t: "00:15", b: "<b>Alternates:</b> <b>Job Jobse</b> (Arcadia, 00:00) for long-form euphoria, <b>O'Flynn</b> (Road To Nowhere, 00:15) for percussive house, <b>New Jackson</b> (Big Romance Dome, 00:15) for hypnotic Irish house." },
    { clash: 1, t: "00:30", b: "<span class='clashtag'>Do both</span><b>Rahaan (00:30–04:00, Ping Pong Disco) and Kerri Chandler (01:30–03:30, Temporary Bandstand)</b><em>You don't have to choose. Rahaan plays three and a half hours, Kerri only two, so: <b>Rahaan 00:30–01:20</b>, walk over (about 10 min, Fire &amp; Disco back to the Well Field), <b>Kerri Chandler 01:30–03:30</b>, then back to Rahaan for the last half hour. Both are Chicago/New Jersey house royalty and neither will disappoint — Rahaan came up dancing to Ron Hardy at the Music Box, Kerri has been shaping house for thirty years.</em>" },
    { t: "01:30", b: "<b>Kerri Chandler</b> — Temporary Bandstand, till 03:30<em>Deep house godfather. The 5-minute hop from the arena to the Well Field is the only real walk you do all day.</em>" },
    { t: "02:00", b: "<b>If you want it harder:</b> <b>Sunil Sharpe</b> (IMMERSE, 01:00) for unrelenting Irish techno, or <b>Surusinghe</b> (Arcadia, 02:00) for fast and bass-heavy.<em>Trad Folkin' Raves runs at The Last City until 4am if you want chaos instead.</em>" }
  ]
},
sat: {
  title: "Saturday — The heavy day",
  intro: "Saturday is where the loud stuff lives. Zamrock, New Orleans brass, noise-rock and the two heaviest sets of the weekend all land between 5pm and midnight, then a world-class late-night bill. It's also the most clash-dense day on the bill — three of them matter.",
  walk: "<b>Walking: this is the expensive day.</b> The bill keeps pulling you between the Main Arena and the Woods — Maruja, Bicurious and THUMPER are all in the trees, roughly 10 minutes each way and uphill coming back. The committee's top three today — W.I.T.C.H., Ezra Collective and The Avalanches — are all inside the arena, so following the scores also happens to be the low-mileage route. If you do want the Woods, make it <em>one</em> trip: out at 19:45 for Maruja, stay for Bicurious at 20:30, then walk back for Gilla Band. Doing arena–woods–arena–woods costs you the best part of an hour on your feet.",
  legs: [
    { t: "12:00", b: "<b>Colleen Cosmo Murphy</b> — Big Romance Dome, till 15:00<em>Three hours of proper disco. Comfortably the best thing on site before mid-afternoon.</em>" },
    { t: "13:30", b: "<b>Muireann Bradley</b> — Something Kind of Wonderful<em>Teenage Donegal fingerpicker playing 1920s country blues. Jaw-dropping, and over before you know it.</em>" },
    { t: "15:00", b: "<b>Sing Along Social</b> — Main Stage, or <b>David Kitt</b> (Road To Nowhere, 14:00)<em>Mass karaoke with no talent required, or Irish indie-electronic done properly. Both good hangover territory.</em>" },
    { t: "15:30", b: "<b>KhakiKid</b> — Road To Nowhere<em>Dublin hip hop with a genuinely funny streak.</em>" },
    { clash: 1, t: "17:00", b: "<span class='clashtag'>Clash</span><b>W.I.T.C.H. (17:00, Road To Nowhere) vs Hot 8 Brass Band (17:30, Main Stage)</b><em>Both are brilliant and both are short. The call: W.I.T.C.H. 17:00–17:35 for the Zambian psych-rock fuzz, then over to the Main Stage for the bulk of Hot 8. New Orleans brass with a sub-bass tuba — impossible to stand still to.</em>" },
    { clash: 1, t: "18:30", b: "<span class='clashtag'>Coin flip &rarr; Sprints</span><b>Greentea Peng (18:30, Road To Nowhere) vs Sprints (18:45, Something Kind of Wonderful)</b><em>Genuinely too close to call on merit — so it goes to the Irish act. <b>Sprints</b>, relentless Dublin punk, fresh off a sold-out Vicar Street homecoming. Greentea Peng is the psychedelic dub-and-reggae option if you'd rather sit in the sun, and both stages are in the arena so the group can split and regroup at 20:00 for nothing.</em>" },
    { clash: 1, t: "19:15", b: "<span class='clashtag'>Ezra 9.20 &ndash; 8.20 Maruja</span><b>Ezra Collective (19:15, Main Stage) vs Maruja (19:45, The Circle)</b><em>Much closer than it used to look: Maruja score 9.5 on both freshness and recent gigs, the joint-highest on the bill, and 'Pain To Power' is a 2025 debut. Ezra still edge it on the legend bonus and it's on the main stage for no walking. <b>The call is Ezra</b> &mdash; but if your head is in Pixies and Therapy? territory, Maruja is the one you'll still be talking about in a year. Send the heavy contingent to the woods and regroup at 20:45.</em>" },
    { t: "20:30", b: "<b>Bicurious</b> — The Last City<em>Irish math-rock duo. Absurdly heavy for two people. Good bridge into the night.</em>" },
    { clash: 1, t: "22:00", b: "<span class='clashtag'>Best hour of the weekend</span><b>Gilla Band (22:00, Road To Nowhere) vs THUMPER (22:00, The Last City) vs Maribou State Live (22:15, Something Kind of Wonderful)</b><em>The call: <b>Gilla Band</b>. Ireland's greatest noise band, physically overwhelming, a wall of broken electronics and screaming — and they play rarely. THUMPER (two drummers, huge noise-pop hooks) will take the roof off The Last City. Maribou State's full live band is the gorgeous option if you want something more expansive.</em>" },
    { t: "23:30", b: "<b>Cromby</b> (The Circle) or <b>Moving Still</b> (Big Romance Dome, 22:00)<em>Belfast house, or Irish-Saudi DJ mixing SWANA sounds into house. Good places to be while the main stage does its thing.</em>" },
    { t: "00:00", b: "<b>Say She She</b> — Road To Nowhere<em>NYC disco-soul trio, live band, huge harmonies. Underrated midnight slot.</em>" },
    { clash: 1, t: "01:00", b: "<span class='clashtag'>Pick one</span><b>The Avalanches (Something Kind of Wonderful) vs Joy Orbison (Arcadia) vs Mall Grab (Bandstand, 01:30)</b><em>Avalanches for pure fun and two hours of sample-collage records — and it's the one that keeps you in the arena, so it's also the lazy-legs choice. Joy Orbison for the club heads, though Arcadia is a 12-minute walk. Mall Grab for raw, rowdy rave. If you want to keep it Irish, <b>Or:la</b> (The Circle, 00:30) and <b>Cromby</b> (The Circle, 23:30) are both excellent and in the same corner of the woods.</em>" },
    { t: "02:30", b: "<b>Call Super</b> — Arcadia, till 04:00<em>Left-field, textured and beautiful. The classiest way to close Saturday.</em>" }
  ]
},
sun: {
  title: "Sunday — Reggae in the sun, rave at the end",
  intro: "The most complete day: a genuine reggae legend in the afternoon, the punk poet, then a closing run of Underworld, Mogwai and Disclosure. The 22:00–01:30 stretch needs planning — get it right and it's the best three hours of the weekend.",
  walk: "<b>Walking: almost none, if you want it that way.</b> John Cooper Clarke, Barrington Levy, Kate Nash, Damien Dempsey, Self Esteem, Anna von Hausswolff, Underworld, Mogwai, Disclosure and King Kong Company are <em>every one</em> inside the Main Arena. You can do the whole of Sunday, start to finish, without leaving the bowl. Worth knowing on day three when your legs are gone — the Underworld → Mogwai → Disclosure → King Kong run is about four minutes of walking in total.",
  legs: [
    { t: "12:00", b: "<b>Organ Freeman</b> (Big Romance Dome) live jazz, or <b>Shrem's Madonnathon</b> from 13:00<em>Two hours of Madonna. No notes.</em>" },
    { t: "14:00", b: "<b>John Cooper Clarke</b> — Something Kind of Wonderful<em>The punk poet. Ferociously funny and still razor sharp. Best non-music thing on the whole bill — start here.</em>" },
    { t: "15:30", b: "<b>Alabaster DePlume</b> — Flourish<em>Spoken word and saxophone. Odd, gentle, hypnotic. Stay where you are, Barrington Levy is next door.</em>" },
    { t: "16:00", b: "<span class='clashtag'>Go</span><b>Barrington Levy</b> — Something Kind of Wonderful<em>Genuine reggae and dancehall royalty, and 'Here I Come' in the afternoon sun is the reggae moment of the weekend. He scores modestly on the model — no recent record, and his 2025 US shows drew mixed reports — but that's a judgement about a whole career, not about this hour. In this slot he's the committee's pick and there's very little on against him: Soda Blonde on the Main Stage and Getdown Services at Road To Nowhere, both decent, neither a legend. Free hit. Go.</em>" },
    { t: "16:30", b: "<b>Getdown Services</b> — Road To Nowhere<em>Sardonic Bristol post-punk. Very funny, very tight.</em>" },
    { t: "17:30", b: "<b>Kate Nash</b> — Something Kind of Wonderful<em>'Foundations', and a much heavier live band than you'd expect.</em>" },
    { t: "18:00", b: "<b>Damien Dempsey</b> (Main) or <b>Moonchild Sanelly</b> (Road To Nowhere) or <b>Prosumer</b> (Big Romance Dome, till 20:00)<em>Damo is an Irish institution and thousands will sing every word. Moonchild Sanelly is wild South African gqom-punk. Prosumer is warm, soulful house from a true master.</em>" },
    { t: "19:30", b: "<b>Soichi Terada (Live)</b> — IMMERSE<em>The happiest man in house music, playing live. Impossible to watch without grinning. Also on: SOAK (The Circle, 19:00) and a live-band Stop Making Sense (Bandstand, 19:00).</em>" },
    { t: "20:15", b: "<b>Self Esteem</b> — Main Stage<em>Huge, theatrical pop with a proper show. Good place to plant yourself before the headliner.</em>" },
    { clash: 1, t: "21:15", b: "<span class='clashtag'>Heavy option</span><b>Anna von Hausswolff</b> — Road To Nowhere<em>Pipe organ doom. Gothic, monolithic, genuinely heavy — metal heads get it instantly. Ends 22:30, so you'll catch the back half of Underworld. If you'd rather not miss a note of Underworld, Chet Faker (Something Kind of Wonderful) is the smoother option and finishes the same time.</em>" },
    { t: "22:00", b: "<b>UNDERWORLD</b> — Main Stage<em>Third time at ATN and they still turn a field into a rave. 'Born Slippy' outdoors on a Sunday night is the peak moment of the festival. Non-negotiable.</em>" },
    { clash: 1, t: "23:15", b: "<span class='clashtag'>The big decision</span><b>Mogwai (23:15, Something Kind of Wonderful) vs Disclosure DJ (00:00, Main Stage)</b><em>Mogwai are Scottish post-rock at crushing volume — the loudest set on site and the closest thing to metal all weekend. They start as Underworld finishes, so you can walk straight over. Mogwai ends 00:30, which still leaves you an hour of Disclosure on the main stage. That's the route: <b>Underworld → Mogwai → last hour of Disclosure</b>. Best of all three.</em>" },
    { t: "00:00", b: "<b>If you skip Mogwai:</b> <b>Hot Chip (DJ Set)</b> (Bandstand) or <b>Altern-8</b> (Arcadia) for original 1991 rave — dust masks, hoovers, breakbeats.<em>Weval play live at Road To Nowhere at 23:30 if you want something melodic.</em>" },
    { clash: 1, t: "01:30", b: "<span class='clashtag'>Alarm</span><b>KING KONG COMPANY</b> — Something Kind of Wonderful, till 03:00<em>Waterford's own, on home turf, closing the weekend. Live electronic mayhem, and the most unhinged room at the festival. This is the one you came for &mdash; <b>set a phone alarm for 01:00</b>, because after three days it is a very easy set to sleep through. Everything else on Sunday night should bend around this.</em>" },
    { t: "02:00", b: "<b>Or:</b> <b>Eats Everything</b> closes Arcadia until 4am, and <b>Winemoms</b> hold The Last City until 4am.<em>Whatever you do, don't go to bed at midnight on the last night.</em>" }
  ]
}
};

/* ---------------- the one you must not miss ---------------- */
var PIN = {
  artist: "King Kong Company",
  why: "<b>Your one non-negotiable.</b> Last set of the weekend, and the easiest one on the bill to " +
       "sleep through — it starts at half one in the morning on the final night. " +
       "<b>Set a phone alarm for 01:00 on Sunday night</b> and make sure someone in the group has one too."
};

function pinnedSet() {
  for (var i = 0; i < D.length; i++) if (D[i].a === PIN.artist) return D[i];
  return null;
}

function countdown(s) {
  var now = Date.now();
  if (now >= s.st && now < s.en) return { t: "● ON NOW", live: true };
  if (now >= s.en) return null;
  var mins = Math.round((s.st - now) / 60000);
  if (mins < 60) return { t: "Starts in " + mins + " min" };
  var hrs = mins / 60;
  if (hrs < 24) return { t: "Starts in " + Math.floor(hrs) + " hr" };
  return { t: "In " + Math.floor(hrs / 24) + " days" };
}

function pinCard() {
  var s = pinnedSet();
  if (!s) return "";
  var cd = countdown(s);
  if (!cd) return ""; // over — stop nagging
  var dayName = { fri: "Fri", sat: "Sat", sun: "Sun" }[s.d] || "";
  return '<div class="pin">' +
    '<div class="ptag"><span class="pulse"></span>Don\'t miss this</div>' +
    "<h2>" + esc(s.a) + "</h2>" +
    '<div class="pwhen">' + dayName + " " + esc(s.t) + " <span>&middot; " + esc(s.s) + "</span></div>" +
    '<div class="pcd' + (cd.live ? " live" : "") + '">' + esc(cd.t) + "</div>" +
    '<div class="pnote">' + PIN.why + "</div>" +
  "</div>";
}

/* The three to build the day around — taken straight off the consolidated score
   rather than hand-picked, so this can never drift out of step with the
   hour-by-hour verdicts below it. Sunday's hero is King Kong Company instead. */
function top3(day) {
  var seen = {}, list = [];
  D.forEach(function (s) {
    if (s.d !== day || !s.tr || !s.cs || seen[s.a]) return;
    seen[s.a] = 1;
    list.push(s);
  });
  list.sort(function (a, b) { return b.cs - a.cs; });
  return list.slice(0, 3);
}

function heroBlock(day) {
  if (day === "sun") return pinCard();
  var picks = top3(day);
  if (!picks.length) return "";

  var rows = "";
  picks.forEach(function (s, i) {
    rows += '<div class="t3row">' +
      '<div class="t3n">' + (i + 1) + "</div>" +
      '<div class="t3b">' +
        "<b>" + esc(s.a) + '</b><span class="t3sc">' + s.cs.toFixed(2) + "</span>" +
        '<span class="t3w">' + esc(s.t) + " &middot; " + esc(s.s) + "</span>" +
        (s.lv ? '<span class="t3r">' + esc(s.lv) + "</span>" : "") +
        (s.lu ? '<a class="t3l" href="' + s.lu + '" target="_blank" rel="noopener">' +
                esc(s.ls || "Read the review") + " &nearr;</a>" : "") +
        listenRow(s) +
      "</div>" +
    "</div>";
  });
  if (!rows) return "";

  return '<div class="t3"><div class="ptag"><span class="pulse"></span>Top 3 today</div>' +
         rows + "</div>";
}

/* ---------------- the site ----------------
   Zones are taken from ATN's own description of the site. Walk times are ESTIMATES
   built from that layout — nobody publishes surveyed stage-to-stage distances — so
   they're deliberately generous. Curraghmore is an estate of natural amphitheatres,
   gentle hills and woods: nothing here is flat, and everything is slower at night. */
var ZONES = [
  { k: "arena", n: "The Main Arena",
    t: "The natural amphitheatre — the big bowl. Five stages, so you can spend a whole evening here without walking anywhere. Mostly open grass on a slope.",
    s: ["ATN Main Stage", "Something Kind of Wonderful", "Road To Nowhere",
        "Flourish with District Music", "IMMERSE: AVA x Smirnoff"] },
  { k: "well", n: "The Well Field",
    t: "Dead centre of the site, and the main food area. Handy as a regroup point because almost everything is within about 5–8 minutes of it.",
    s: ["The Temporary Bandstand", "The Well"] },
  { k: "view", n: "The View",
    t: "The wooded path linking the Lawns to the Main Arena. You'll pass through it constantly. Uphill heading back towards the arena.",
    s: ["Hidden Sounds"] },
  { k: "woods", n: "The Woods",
    t: "Intimate stages hidden in the trees. Furthest cluster from the arena, uneven underfoot, and properly dark at night — bring a torch or use your phone.",
    s: ["Global Roots: Main Stage", "Global Roots: Cambium",
        "The Circle by Jameson Music", "The Last City"] },
  { k: "lawns", n: "The Lawns",
    t: "Front lawns of Curraghmore House, looking over the lake to the west. The calm end of the site — food talks, wellness, and the best place to sit down.",
    s: ["Theatre of Food"] },
  { k: "fire", n: "Fire & Disco",
    t: "The late-night corner, out past the arena towards the campsite. It's the longest walk on site and it's the one you'll be doing at 3am.",
    s: ["Arcadia 'Afterburner'", "Ping Pong Disco"] },
  { k: "other", n: "Elsewhere on site",
    t: "These two aren't listed in ATN's published zone breakdown — check the official map or the app when you arrive.",
    s: ["Born Social by Schweppes", "Big Romance Dome x Altos"] }
];

var STAGE_ZONE = {};
ZONES.forEach(function (z) { z.s.forEach(function (st) { STAGE_ZONE[st] = z.k; }); });

/* Estimated walking minutes between zones. Same zone = short hop. */
var WALK = {
  "arena|arena": 4,  "well|well": 2,   "woods|woods": 4,  "fire|fire": 3,
  "arena|well": 5,   "arena|view": 5,  "arena|woods": 10, "arena|lawns": 12,
  "arena|fire": 12,  "well|view": 5,   "well|woods": 8,   "well|lawns": 10,
  "well|fire": 10,   "view|woods": 8,  "view|lawns": 5,   "view|fire": 15,
  "woods|lawns": 12, "woods|fire": 13, "lawns|fire": 18
};

function walkMins(a, b) {
  var za = STAGE_ZONE[a], zb = STAGE_ZONE[b];
  /* "other" = stage ATN doesn't place in its published zone breakdown. Better to
     say we don't know than to invent a number someone plans around. */
  if (!za || !zb || za === "other" || zb === "other") return null;
  if (za === zb) return WALK[za + "|" + za] || 4;
  return WALK[za + "|" + zb] || WALK[zb + "|" + za] || 10;
}

function zoneOf(stage) {
  var k = STAGE_ZONE[stage];
  for (var i = 0; i < ZONES.length; i++) if (ZONES[i].k === k) return ZONES[i];
  return null;
}

/* ---------------- links & essentials ---------------- */
var LINKS = [
  { i: "📷", t: "Instagram — @alltogethernow.ie", s: "Fastest source for changes on the day", u: "https://www.instagram.com/alltogethernow.ie/" },
  { i: "📘", t: "Facebook — ATNFestival", s: "Traffic, weather and gate updates get posted here first", u: "https://www.facebook.com/ATNFestival/" },
  { i: "🌐", t: "Official site", s: "alltogethernow.ie", u: "https://www.alltogethernow.ie/" },
  { i: "ℹ️", t: "Official info & FAQs", s: "Bag policy, accessibility, box office", u: "https://www.alltogethernow.ie/information" },
  { i: "🚗", t: "Travel & directions", s: "Official routes — use these, not sat-nav", u: "https://www.alltogethernow.ie/travel" },
  { i: "🕒", t: "Clashfinder (live times)", s: "Cross-check stage times — updated if sets move", u: "https://clashfinder.com/m/atn2026/" },
  { i: "🌦️", t: "Met Éireann — Waterford", s: "Check every morning. Dress accordingly.", u: "https://www.met.ie/forecasts/waterford" },
  { i: "📻", t: "WLR FM", s: "Local Waterford radio — best for road and traffic news", u: "https://wlrfm.com/" },
  { i: "🎵", t: "Nialler9", s: "Irish music site with the best ATN coverage", u: "https://nialler9.com/" },
  { i: "🗺️", t: "Curraghmore Estate on Maps", s: "Portlaw, Co. Waterford", u: "https://maps.apple.com/?q=Curraghmore%20Estate%20Portlaw%20Waterford" }
];

var ESSENTIALS = [
  { h: "⏰ Times & gates", d: [
    ["Campsites & car parks", "Open 12:30pm, Thursday 30 July"],
    ["Arena gates", "6pm Thursday"],
    ["Last entry", "10pm each night"],
    ["No re-entry", "Between campsite and car park after 2am"],
    ["Quietest arrival", "9am–1pm. After that you'll queue."]
  ]},
  { h: "🍺 What you can bring", d: [
    ["Alcohol (first entry only)", "24 cans OR 1 litre of spirits OR 1.5 litres of wine, per person"],
    ["No glass", "None, anywhere. Decant into reusable plastic before you travel."],
    ["Food", "Pre-packaged or pre-cooked only. No BBQs, no gas cookers."],
    ["Water", "Free refill stations on site — bring a bottle."],
    ["Banned", "Fireworks, candles, drones, umbrellas, gazebos, disposable vapes, pro cameras with detachable lenses, animals (guide dogs excepted)."]
  ]},
  { h: "💳 Money & phones", d: [
    ["Completely cashless", "Every bar, food stall and trader is card or contactless only. Cash is useless on site."],
    ["Signal is poor", "Download your tickets before you travel. This guide works offline once loaded."],
    ["Battery", "Bring a power bank. Two if you're filming anything."]
  ]},
  { h: "🚗 Getting there", d: [
    ["Where", "Curraghmore Estate, Portlaw, Co. Waterford"],
    ["Sat-nav", "Don't. Follow the festival's own road signage instead."],
    ["Avoid", "Do not route through Carrick-on-Suir."],
    ["Parking", "No roadside parking — cars get towed. No sleeping in vehicles without a campervan ticket."]
  ]},
  { h: "🎫 Box office", d: [
    ["Thursday", "4pm – 9pm"],
    ["Friday", "9am – 9pm"],
    ["Saturday", "9am – 8pm"],
    ["Sunday", "10am – 4pm"]
  ]}
];

/* ---------------- state ---------------- */
var S = {
  day: pickDay(),
  view: "picks",
  genre: "all",
  q: "",
  mapStage: "",
  mapZone: "",
  stars: load("atn_stars", {}),
  notes: load("atn_notes", "")
};

/* Pre-star the pinned set once, so it's in My Plan from the very first open. */
(function seedStars() {
  try {
    if (localStorage.getItem("atn_seeded")) return;
    for (var i = 0; i < D.length; i++) {
      if (D[i].a === "King Kong Company") {
        S.stars[D[i].a + "|" + D[i].st] = true;
        save("atn_stars", S.stars);
        break;
      }
    }
    localStorage.setItem("atn_seeded", "1");
  } catch (e) {}
})();

function load(k, dflt) {
  try { var v = localStorage.getItem(k); return v === null ? dflt : JSON.parse(v); }
  catch (e) { return dflt; }
}
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

function pickDay() {
  var now = Date.now(), keys = DAYS.map(function (d) { return d.k; });
  for (var i = 0; i < D.length; i++) {
    if (D[i].en > now && keys.indexOf(D[i].d) >= 0) return D[i].d;
  }
  return "fri";
}
function idOf(s) { return s.a + "|" + s.st; }
function esc(t) {
  return String(t).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

/* ---------------- render ---------------- */
var main = document.getElementById("main");

var CONF = ["reputation only", "audience / aggregate reports", "cited written review"];

function scoreRow(s) {
  if (!s.cs) return "";
  var bar = function (lab, v) {
    return '<div class="sb"><span class="sbl">' + lab + "</span>" +
      '<span class="sbt"><i style="width:' + (v * 10) + '%"></i></span>' +
      '<span class="sbv">' + v.toFixed(1) + "</span></div>";
  };
  return '<div class="score"><div class="shead">' +
    '<span class="slab">Committee score</span>' +
    '<span class="snum">' + s.cs.toFixed(2) + "</span></div>" +
    bar("Fresh", s.cx) + bar("Live now", s.cr) + bar("Best album", s.cp) + bar("Bench", s.cd) +
    '<div class="smath">' + s.cb.toFixed(2) + " base" +
      (s.cn ? ' <span class="bonus">+' + s.cn.toFixed(1) + " legend</span>" : "") +
    "</div>" +
    (s.lw ? '<div class="legend"><span class="llab">Legendary gig</span>' +
            esc(s.lw) + ' <b>' + esc(s.ln) + "</b></div>" : "") +
    '<div class="sconf">Live-form evidence: ' + CONF[s.cf || 0] + "</div></div>";
}

function renderHours() {
  var H = (window.ATN_HOURS || {})[S.day] || [];
  if (!H.length) return "";
  /* Collapse runs of consecutive hours won by the same act into one row. */
  var rows = [];
  H.forEach(function (r) {
    var prev = rows[rows.length - 1];
    if (prev && prev.w === r.w) { prev.last = r.h; return; }
    rows.push({ h: r.h, last: "", w: r.w, s: r.s, t: r.t, sc: r.sc, n: r.n, r: r.r });
  });
  rows.forEach(function (r) {
    if (r.last) {
      var endHr = (parseInt(r.last, 10) + 1) % 24;
      r.h = r.h + "–" + (endHr < 10 ? "0" : "") + endHr + ":00";
    }
  });

  var h = "";
  rows.forEach(function (r) {
    h += '<div class="hr"><div class="hrt">' + esc(r.h) + "</div>" +
      '<div class="hrb"><b>' + esc(r.w) + '</b> <span class="hrs">' +
      esc(r.sc.toFixed(2)) + "</span>" +
      '<span class="hrw">' + esc(r.t) + " &middot; " + esc(r.s) + "</span>" +
      (r.n ? '<span class="hrn">' + esc(r.n) + "</span>" : "") +
      (r.r && r.r.length
        ? '<span class="hru">then ' + r.r.map(function (u) {
            return esc(u.a) + " (" + u.sc.toFixed(2) + ")";
          }).join(", ") + "</span>"
        : "") +
      "</div></div>";
  });

  return '<div class="plan"><div class="tag">Hour by hour</div>' +
    "<h2>The committee's call, every hour</h2>" +
    "<p>The best gig on site in each hour of the day, on the consolidated score. " +
    "Where two are within 0.3 of each other it's treated as a coin flip and goes " +
    "to the Irish act.</p>" + h + "</div>";
}

function listenRow(s) {
  if (!s.yt) return "";
  return '<div class="listen">' +
    '<a class="yt" href="' + s.yt + '" target="_blank" rel="noopener"><span class="pd"></span>YouTube</a>' +
    '<a class="sp" href="' + s.sp + '" target="_blank" rel="noopener"><span class="pd"></span>Spotify</a>' +
    '<a class="am" href="' + s.am + '" target="_blank" rel="noopener"><span class="pd"></span>Apple</a>' +
    (s.sg ? '<span class="sng">' + esc(s.sg) + "</span>" : "") +
  "</div>";
}

function setCard(s, showNote) {
  var id = idOf(s), on = !!S.stars[id];
  var badge = s.tr === 1 ? '<span class="badge b1">Must see</span>'
            : s.tr === 2 ? '<span class="badge b2">Big call</span>'
            : s.tr === 3 ? '<span class="badge b3">Worth a punt</span>' : "";
  return '<div class="set ' + (s.tr === 1 ? "t1" : "") + '" data-g="' + (s.g || "") + '">' +
    '<div class="body">' +
      '<div class="top"><span class="time">' + esc(s.t) + "</span>" + badge + "</div>" +
      "<h3>" + esc(s.a) + "</h3>" +
      '<div class="stage"><a class="stagelink" href="#" data-stage="' + esc(s.s) + '">' +
        esc(s.s) + " &#9906;</a></div>" +
      (showNote && s.n ? '<div class="note">' + esc(s.n) + "</div>" : "") +
      (showNote && s.lv
        ? '<div class="live"><span class="llab">Live, last year</span>' + esc(s.lv) +
          (s.lu ? ' <a href="' + s.lu + '" target="_blank" rel="noopener">' +
                  esc(s.ls || "review") + " &nearr;</a>" : "") + "</div>"
        : "") +
      (showNote ? scoreRow(s) : "") +
      (showNote ? listenRow(s) : "") +
    "</div>" +
    '<button class="star ' + (on ? "on" : "") + '" data-id="' + esc(id) + '">' +
      (on ? "★" : "☆") + "</button>" +
  "</div>";
}

function bucket(s) {
  var h = new Date(s.st).getHours();
  if (h >= 11 && h < 17) return 0;
  if (h >= 17 && h < 21) return 1;
  if (h >= 21 || h < 1) return 2;
  return 3;
}
var BUCKETS = ["Daytime", "Early evening", "Night", "Late / after midnight"];

function renderPicks() {
  var p = PLANS[S.day];
  var h = heroBlock(S.day) + renderHours();

  if (p) {
    h += '<div class="plan"><div class="tag">The Game Plan</div><h2>' + esc(p.title) + "</h2><p>" +
         esc(p.intro) + "</p>" +
         (p.walk ? '<div class="walknote">&#128094; ' + p.walk + "</div>" : "");
    for (var i = 0; i < p.legs.length; i++) {
      var l = p.legs[i];
      h += '<div class="leg ' + (l.clash ? "clash" : "") + '"><div class="lt">' + esc(l.t) +
           '</div><div class="lb">' + l.b + "</div></div>";
    }
    h += "</div>";
  }

  var list = D.filter(function (s) {
    return s.d === S.day && s.tr > 0 && (S.genre === "all" || s.g === S.genre);
  });

  if (!list.length) {
    h += '<div class="empty"><div class="big">🔍</div><p>No picks in that category on this day.<br>Try another filter, or check the full schedule.</p></div>';
    main.innerHTML = h;
    return;
  }

  var seen = -1;
  list.forEach(function (s) {
    var b = bucket(s);
    if (b !== seen) {
      seen = b;
      h += '<div class="sechead"><h2>' + BUCKETS[b] + '</h2><div class="ln"></div></div>';
    }
    h += setCard(s, true);
  });

  h += '<div class="warn">Times sourced from the published lineup and Clashfinder. Stage times move &mdash; always sanity-check against the official ATN app or the stage boards on the day.</div>';
  main.innerHTML = h;
}

function renderSched() {
  var q = S.q.toLowerCase().trim();
  var list = D.filter(function (s) {
    if (s.d !== S.day) return false;
    if (S.genre !== "all" && s.g !== S.genre) return false;
    if (q && (s.a + " " + s.s).toLowerCase().indexOf(q) < 0) return false;
    return true;
  });

  var h = '<input class="search" id="q" placeholder="Search artist or stage…" value="' + esc(S.q) + '">';

  if (!list.length) {
    h += '<div class="empty"><div class="big">🔍</div><p>Nothing matches.</p></div>';
    main.innerHTML = h;
    wireSearch();
    return;
  }

  var byStage = {};
  list.forEach(function (s) { (byStage[s.s] = byStage[s.s] || []).push(s); });
  Object.keys(byStage).sort().forEach(function (st) {
    h += '<div class="sechead"><h2>' + esc(st) + '</h2><div class="ln"></div></div>';
    byStage[st].forEach(function (s) { h += setCard(s, false); });
  });

  main.innerHTML = h;
  wireSearch();
}

function wireSearch() {
  var el = document.getElementById("q");
  if (!el) return;
  el.addEventListener("input", function () {
    S.q = el.value;
    var pos = el.selectionStart;
    renderSched();
    var n = document.getElementById("q");
    if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) {} }
  });
}

function renderPlan() {
  var mine = D.filter(function (s) { return S.stars[idOf(s)]; });

  var h = "";
  if (!mine.length) {
    h += '<div class="empty"><div class="big">☆</div><p>Tap the star on any set to build your own plan.<br><br>' +
         'Clashes get flagged automatically.</p></div>';
  } else {
    DAYS.forEach(function (d) {
      var day = mine.filter(function (s) { return s.d === d.k; });
      if (!day.length) return;
      h += '<div class="sechead"><h2>' + d.n + " " + d.d + '</h2><div class="ln"></div></div>';
      day.forEach(function (s, i) {
        var clashes = day.filter(function (o, j) {
          return j !== i && o.st < s.en && o.en > s.st;
        });
        h += setCard(s, false);
        if (clashes.length) {
          h += '<div style="margin:-4px 0 10px 12px;font-size:12px;color:#ffb02e">' +
               '<span class="clashtag">Clash</span>' +
               esc(clashes.map(function (c) { return c.a; }).join(", ")) + "</div>";
        }
      });
    });
  }

  h += '<div class="sechead"><h2>Notes</h2><div class="ln"></div></div>' +
       '<textarea class="notes" id="nt" placeholder="Meeting points, who has the tent key, where you parked…">' +
       esc(S.notes) + "</textarea>";

  main.innerHTML = h;
  var nt = document.getElementById("nt");
  nt.addEventListener("input", function () { S.notes = nt.value; save("atn_notes", S.notes); });
}

function mapDiagram() {
  var box = function (x, y, w, h, k, label, sub) {
    var hit = S.mapZone === k;
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="9" fill="' + (hit ? "#ff2f74" : "#1f1e26") + '" stroke="' +
      (hit ? "#ff2f74" : "#2b2a34") + '" stroke-width="1.5"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - 2) + '" fill="' +
      (hit ? "#fff" : "#f4f3f7") + '" font-size="11" font-weight="700" text-anchor="middle">' +
      label + "</text>" +
      (sub ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 12) +
        '" fill="' + (hit ? "#ffd9e6" : "#9d9aab") + '" font-size="8.5" text-anchor="middle">' +
        sub + "</text>" : "");
  };
  var labels = [];
  var line = function (x1, y1, x2, y2, lbl, lx, ly) {
    labels.push('<text x="' + (lx !== undefined ? lx : (x1 + x2) / 2) +
      '" y="' + (ly !== undefined ? ly : (y1 + y2) / 2 - 4) +
      '" fill="#9d9aab" font-size="8.5" font-weight="600" text-anchor="middle">' + lbl + "</text>");
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
      '" stroke="#3a3944" stroke-width="1.5" stroke-dasharray="3 3"/>';
  };

  var svg = '<svg class="mapdiag" viewBox="0 0 340 250" xmlns="http://www.w3.org/2000/svg">' +
    line(52, 60, 52, 92, "5m") +
    line(104, 118, 148, 118, "5m") +
    line(104, 40, 190, 40, "12m") +
    line(244, 126, 262, 108, "8m", 253, 122) +
    line(196, 152, 196, 182, "10m", 210, 170) +
    box(10, 20, 84, 40, "lawns", "The Lawns", "food talks, lake") +
    box(10, 92, 84, 52, "view", "The View", "Hidden Sounds") +
    box(110, 20, 130, 78, "arena", "MAIN ARENA", "5 stages · the bowl") +
    box(148, 108, 96, 44, "well", "Well Field", "Bandstand, The Well") +
    box(258, 60, 74, 66, "woods", "The Woods", "4 stages") +
    box(148, 182, 96, 48, "fire", "Fire &amp; Disco", "Arcadia, Ping Pong") +
    labels.join("") +
    '<text x="170" y="246" fill="#6f6c7e" font-size="8" text-anchor="middle">' +
    "Schematic, not to scale &mdash; walk times are estimates</text>" +
  "</svg>";
  return svg;
}

function renderMap() {
  var h = '<div class="zonecard">' +
    "<h3>&#9906; The site at a glance</h3>" +
    mapDiagram() +
    '<div class="zt" style="margin-top:8px">Curraghmore is an estate of natural amphitheatres, ' +
    'gentle hills and woods &mdash; there is no flat route across it. Everything below is an ' +
    'estimate built from ATN&rsquo;s own zone layout, generous on purpose. Add five minutes ' +
    'after dark, and more when the arena empties between headline sets.</div></div>';

  /* If arrived by tapping a stage, lead with routes from that stage. */
  if (S.mapStage) {
    var from = S.mapStage, z = zoneOf(from);
    var targets = Object.keys(STAGE_ZONE).filter(function (s) { return s !== from; });
    targets.sort(function (a, b) { return (walkMins(from, a) || 99) - (walkMins(from, b) || 99); });

    h += '<div class="zonecard hit"><h3>Walking from ' + esc(from) + "</h3>" +
         '<div class="zt">' + (z ? esc(z.n) + ". " + esc(z.t) : "Zone not published — check the official map.") +
         "</div>";
    var known = 0;
    targets.forEach(function (t) {
      var m = walkMins(from, t);
      if (m === null) return;
      known++;
      h += '<div class="walk"><div class="wm">' + m + " min</div>" +
           '<div class="wl"><b>' + esc(t) + "</b></div></div>";
    });
    if (!known) {
      h += '<div class="zt">ATN doesn\'t place this stage in its published zone ' +
           'breakdown, so there\'s no honest estimate to give. Check the official ' +
           'map or the app when you arrive.</div>';
    }
    h += "</div>";
  }

  ZONES.forEach(function (z) {
    h += '<div class="zonecard' + (S.mapZone === z.k ? " hit" : "") + '">' +
         "<h3>" + esc(z.n) + "</h3>" +
         '<div class="zt">' + esc(z.t) + "</div><div class=\"zs\">" +
         z.s.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") +
         "</div></div>";
  });

  h += '<div class="zonecard"><h3>&#128094; Walking less</h3>' +
    '<div class="zt">The single biggest saving is picking one zone per stretch of the ' +
    'evening and staying in it. The Main Arena has five stages in one bowl, so an arena ' +
    'evening costs you almost no walking at all. The expensive moves are Lawns&nbsp;&harr;&nbsp;Fire ' +
    '&amp; Disco (about 18 minutes, and uphill on the way back) and anything that crosses the ' +
    'site twice in one night.</div>' +
    '<div class="walk"><div class="wm">Cheap</div><div class="wl">Anything inside the Main Arena, or Arena &harr; Well Field</div></div>' +
    '<div class="walk"><div class="wm">Fine</div><div class="wl">Well Field &harr; Woods, or Arena &harr; The View</div></div>' +
    '<div class="walk"><div class="wm">Costly</div><div class="wl">Arena &harr; Woods, or Arena &harr; Fire &amp; Disco &mdash; budget a full 10&ndash;12 min each way</div></div>' +
    '<div class="walk"><div class="wm">Avoid</div><div class="wl">Lawns &harr; Fire &amp; Disco, and any plan that has you crossing the whole site more than twice a day</div></div>' +
    "</div>";

  h += '<div class="warn">Zones are from ATN&rsquo;s published site description. Walk times are ' +
       'estimates, not measured distances &mdash; check the official map or app on arrival.</div>';

  main.innerHTML = h;
}

function renderInfo() {
  var h = "";
  ESSENTIALS.forEach(function (b) {
    h += '<div class="info"><h3>' + b.h + "</h3><dl>";
    b.d.forEach(function (r) { h += "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; });
    h += "</dl></div>";
  });

  h += '<div class="info"><h3>🔗 Live updates &amp; socials</h3>';
  LINKS.forEach(function (l) {
    h += '<a class="linkrow" href="' + l.u + '" target="_blank" rel="noopener">' +
         '<div class="ic">' + l.i + '</div><div class="lt2"><b>' + esc(l.t) + "</b><span>" +
         esc(l.s) + '</span></div><div class="ar">↗</div></a>';
  });
  h += "</div>";

  h += '<div class="info"><h3>⚙️ This guide</h3><dl>' +
       "<dt>Last updated</dt><dd>" + esc(window.ATN_BUILD || "—") + "</dd>" +
       "<dt>Offline</dt><dd>Works with no signal once you've opened it on wifi. Curraghmore has very little coverage.</dd>" +
       "<dt>Add to home screen</dt><dd>iPhone: Share → Add to Home Screen. Android: menu → Install app.</dd>" +
       "<dt>Updates</dt><dd>Tap the ↺ button top-right when you have signal to pull the latest version.</dd>" +
       "</dl></div>";

  main.innerHTML = h;
}

function renderNow() {
  var bar = document.getElementById("nowbar"), now = Date.now();
  var on = D.filter(function (s) { return s.st <= now && s.en > now && s.tr > 0; })
            .sort(function (a, b) { return a.tr - b.tr; }).slice(0, 3);
  var next = D.filter(function (s) { return s.st > now && s.tr === 1; })
              .sort(function (a, b) { return a.st - b.st; })[0];

  if (!on.length && !next) { bar.hidden = true; return; }

  var h = '<div class="lab"><span class="pulse"></span>' + (on.length ? "On now" : "Coming up") + "</div>";
  on.forEach(function (s) {
    h += '<div class="row"><b>' + esc(s.a) + "</b> <span>&middot; " + esc(s.s) +
         " &middot; till " + esc(s.t.split(" - ")[1]) + "</span></div>";
  });
  if (next && !on.length) {
    h += '<div class="row"><b>' + esc(next.a) + "</b> <span>&middot; " + esc(next.s) +
         " &middot; " + esc(next.t) + "</span></div>";
  }
  bar.innerHTML = h;
  bar.hidden = false;
}

function render() {
  document.querySelectorAll("#days .day").forEach(function (b) {
    b.classList.toggle("on", b.dataset.d === S.day);
  });
  document.querySelectorAll(".chip").forEach(function (c) {
    c.classList.toggle("on", c.dataset.g === S.genre);
  });
  document.querySelectorAll("nav button").forEach(function (b) {
    b.classList.toggle("on", b.dataset.v === S.view);
  });

  var showDayBits = S.view === "picks" || S.view === "sched";
  document.getElementById("days").style.display = showDayBits ? "" : "none";
  document.getElementById("filters").style.display = showDayBits ? "" : "none";

  var n = Object.keys(S.stars).filter(function (k) { return S.stars[k]; }).length;
  var cnt = document.getElementById("cnt");
  cnt.hidden = !n; cnt.textContent = n;

  if (S.view === "picks") renderPicks();
  else if (S.view === "sched") renderSched();
  else if (S.view === "map") renderMap();
  else if (S.view === "plan") renderPlan();
  else renderInfo();

  renderNow();
  window.scrollTo(0, 0);
}

/* ---------------- wiring ---------------- */
document.getElementById("days").innerHTML = DAYS.map(function (d) {
  return '<button class="day" data-d="' + d.k + '">' + d.n +
         '<span class="dnum">' + d.d + "</span></button>";
}).join("");

document.getElementById("filters").innerHTML = GENRES.map(function (g) {
  return '<button class="chip" data-g="' + g.k + '">' +
         (g.k === "all" ? "" : '<span class="dot"></span>') + g.n + "</button>";
}).join("");

document.addEventListener("click", function (e) {
  var sl = e.target.closest(".stagelink");
  if (sl) {
    e.preventDefault();
    S.mapStage = sl.dataset.stage;
    S.mapZone = STAGE_ZONE[S.mapStage] || "";
    S.view = "map";
    return render();
  }

  var d = e.target.closest("#days .day");
  if (d) { S.day = d.dataset.d; return render(); }

  var c = e.target.closest(".chip");
  if (c) { S.genre = c.dataset.g; return render(); }

  var n = e.target.closest("nav button");
  if (n) {
    if (n.dataset.v === "map") { S.mapStage = ""; S.mapZone = ""; }
    S.view = n.dataset.v;
    return render();
  }

  var st = e.target.closest(".star");
  if (st) {
    var id = st.dataset.id;
    S.stars[id] = !S.stars[id];
    if (!S.stars[id]) delete S.stars[id];
    save("atn_stars", S.stars);
    st.classList.toggle("on", !!S.stars[id]);
    st.textContent = S.stars[id] ? "★" : "☆";
    var cn = document.getElementById("cnt");
    var k = Object.keys(S.stars).length;
    cn.hidden = !k; cn.textContent = k;
    if (S.view === "plan") render();
    return;
  }
});

document.getElementById("refresh").addEventListener("click", function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (rs) {
      return Promise.all(rs.map(function (r) { return r.unregister(); }));
    }).then(function () {
      if (window.caches) return caches.keys().then(function (ks) {
        return Promise.all(ks.map(function (k) { return caches.delete(k); }));
      });
    }).then(function () { location.reload(true); });
  } else { location.reload(true); }
});

setInterval(renderNow, 60000);
render();

})();
