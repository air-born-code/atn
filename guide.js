/* ATN 2026 — The Guide */
(function () {
"use strict";

var D = window.ATN_DATA || [];
var DAYS = [
  { k: "thu", n: "Thu", d: "30 Jul" },
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
thu: {
  title: "Thursday — Arrival Night",
  intro: "Campsites open 12:30, arena gates 6pm. Nothing on Thursday is worth wrecking yourself for, but there is one genuinely great set. Get the tent up, get fed, get a lay of the land.",
  legs: [
    { t: "12:30", b: "<b>Get in early.</b><em>Quietest arrival window is 9am–1pm. Follow the festival's own road signage, not sat-nav, and don't route through Carrick-on-Suir.</em>" },
    { t: "18:00", b: "<b>Arena gates open.</b> Walk the whole site once now while it's empty — you'll save yourself an hour of confusion every day after.<em>17 stages. The far corners (Arcadia, The Last City) are further than you think.</em>" },
    { t: "19:30", b: "<b>Zaska</b> — Temporary Bandstand<em>Neo-soul and funk guitar. Gentle landing.</em>" },
    { t: "21:15", b: "<b>David Keenan</b> — Arcadia<em>Wild, poetic Dundalk performer. He also plays Saturday if this clashes with putting the tent up.</em>" },
    { t: "22:30", b: "<b>Annie Mac</b> — Temporary Bandstand<em>The one unmissable Thursday set. Arena's barely open and she's already the biggest party on site.</em>" },
    { t: "23:45", b: "<b>Ailbhe Reddy</b> — Hidden Sounds, or <b>Lúnasa</b> — The Circle<em>Sharp Dublin indie, or world-class trad. Either is a good way to stop.</em>" },
    { t: "Note", b: "<b>Pace yourself.</b><em>Friday is the biggest single night of the weekend. Do not turn Thursday into a write-off.</em>" }
  ]
},
fri: {
  title: "Friday — Guitars, then Jarvis, then house until dawn",
  intro: "The strongest day for you top to bottom: a proper run of guitar bands in the afternoon, the weekend's biggest headline set at 22:45, and then a genuinely elite late-night electronic bill. One real clash to manage at 20:30.",
  legs: [
    { t: "14:00", b: "<b>Ease in.</b> Coffee, site recon, The Last City has trad and daftness running from 11am.<em>Citizen Ceili at 14:00 if you want something ridiculous to start on.</em>" },
    { t: "15:45", b: "<b>PVA</b> — Road To Nowhere<em>First real hit of the day. Post-punk welded to hard electronics — heavy in a live room.</em>" },
    { t: "17:00", b: "<b>Trinity Orchestra</b> — Main Stage<em>Orchestra playing a full pop/dance album live. Big, daft, and the best way to open the main stage.</em>" },
    { t: "18:45", b: "<b>Cardinals</b> — Road To Nowhere<em>Cork guitar band with widescreen tunes, rising fast. Stay on this stage.</em>" },
    { t: "19:45", b: "<b>Dry Cleaning</b> — Something Kind of Wonderful<em>Deadpan spoken vocals over brilliantly angular guitars. Squarely your thing.</em>" },
    { clash: 1, t: "20:30", b: "<span class='clashtag'>Clash</span><b>Friendly Fires (20:30, Road To Nowhere) vs Gurriers (20:45, Main Stage)</b><em>The call: catch Friendly Fires 20:30–21:10 for 'Paris' and 'Blue Cassette', then walk to the Main Stage for the back half of Gurriers. That leaves you standing at the main stage with a good spot, which is exactly where you want to be next.</em>" },
    { t: "21:30", b: "<b>Hold the main stage.</b> If you'd rather not wait, <b>Floorplan</b> starts 21:30 at IMMERSE — Robert Hood's gospel-house project, genuinely joyous — and you can peel off at 22:35.<em>Don't cut it fine. Pulp will pull the biggest crowd of the weekend.</em>" },
    { t: "22:45", b: "<b>PULP</b> — Main Stage<em>First festival headline in 15 years. Jarvis, the hits, a field full of people losing it. Non-negotiable. This is the set of the weekend.</em>" },
    { t: "00:15", b: "<b>Floating Points (Live)</b> — Something Kind of Wonderful<em>Live, not a DJ set. Builds from ambient into full euphoria. The single best thing to do straight after Pulp.</em>" },
    { t: "00:15", b: "<b>Alternates:</b> <b>Job Jobse</b> (Arcadia, 00:00) for long-form euphoria, <b>O'Flynn</b> (Road To Nowhere, 00:15) for percussive house, <b>New Jackson</b> (Big Romance Dome, 00:15) for hypnotic Irish house." },
    { t: "01:30", b: "<b>Kerri Chandler</b> — Temporary Bandstand, till 03:30<em>Deep house godfather. If you do one late set on Friday, make it this.</em>" },
    { t: "02:00", b: "<b>If you want it harder:</b> <b>Sunil Sharpe</b> (IMMERSE, 01:00) for unrelenting Irish techno, or <b>Surusinghe</b> (Arcadia, 02:00) for fast and bass-heavy.<em>Trad Folkin' Raves runs at The Last City until 4am if you want chaos instead.</em>" }
  ]
},
sat: {
  title: "Saturday — The heavy day",
  intro: "Saturday is where the loud stuff lives. Zamrock, New Orleans brass, noise-rock and the two heaviest sets of the weekend all land between 5pm and midnight, then a world-class late-night bill. It's also the most clash-dense day on the bill — three of them matter.",
  legs: [
    { t: "12:00", b: "<b>Colleen Cosmo Murphy</b> — Big Romance Dome, till 15:00<em>Three hours of proper disco. Comfortably the best thing on site before mid-afternoon.</em>" },
    { t: "13:30", b: "<b>Muireann Bradley</b> — Something Kind of Wonderful<em>Teenage Donegal fingerpicker playing 1920s country blues. Jaw-dropping, and over before you know it.</em>" },
    { t: "15:00", b: "<b>Sing Along Social</b> — Main Stage, or <b>David Kitt</b> (Road To Nowhere, 14:00)<em>Mass karaoke with no talent required, or Irish indie-electronic done properly. Both good hangover territory.</em>" },
    { t: "15:30", b: "<b>KhakiKid</b> — Road To Nowhere<em>Dublin hip hop with a genuinely funny streak.</em>" },
    { clash: 1, t: "17:00", b: "<span class='clashtag'>Clash</span><b>W.I.T.C.H. (17:00, Road To Nowhere) vs Hot 8 Brass Band (17:30, Main Stage)</b><em>Both are brilliant and both are short. The call: W.I.T.C.H. 17:00–17:35 for the Zambian psych-rock fuzz, then over to the Main Stage for the bulk of Hot 8. New Orleans brass with a sub-bass tuba — impossible to stand still to.</em>" },
    { clash: 1, t: "18:30", b: "<span class='clashtag'>Split up</span><b>Greentea Peng (18:30, Road To Nowhere) vs Sprints (18:45, Something Kind of Wonderful)</b><em>Cleanest place to split the group. Greentea Peng is psychedelic neo-soul with heavy dub and reggae bones; Sprints is relentless Dublin punk. Regroup at 20:00.</em>" },
    { clash: 1, t: "19:45", b: "<span class='clashtag'>Big clash</span><b>Maruja (19:45, The Circle) vs Ezra Collective (19:15, Main Stage)</b><em>Maruja is the heaviest thing on the entire bill — sax-driven noise-rock that collapses into full doom. Ezra Collective is Mercury-winning London jazz that plays like a carnival, and one of the best live bands on earth. If you want heavy, Maruja, no hesitation. If you want the crowd moment, Ezra. Both are correct answers.</em>" },
    { t: "20:30", b: "<b>Bicurious</b> — The Last City<em>Irish math-rock duo. Absurdly heavy for two people. Good bridge into the night.</em>" },
    { clash: 1, t: "22:00", b: "<span class='clashtag'>Best hour of the weekend</span><b>Gilla Band (22:00, Road To Nowhere) vs THUMPER (22:00, The Last City) vs Maribou State Live (22:15, Something Kind of Wonderful)</b><em>The call: <b>Gilla Band</b>. Ireland's greatest noise band, physically overwhelming, a wall of broken electronics and screaming — and they play rarely. THUMPER (two drummers, huge noise-pop hooks) will take the roof off The Last City. Maribou State's full live band is the gorgeous option if you want something more expansive.</em>" },
    { t: "23:30", b: "<b>Cromby</b> (The Circle) or <b>Moving Still</b> (Big Romance Dome, 22:00)<em>Belfast house, or Irish-Saudi DJ mixing SWANA sounds into house. Good places to be while the main stage does its thing.</em>" },
    { t: "00:00", b: "<b>Say She She</b> — Road To Nowhere<em>NYC disco-soul trio, live band, huge harmonies. Underrated midnight slot.</em>" },
    { clash: 1, t: "01:00", b: "<span class='clashtag'>Pick one</span><b>The Avalanches (Something Kind of Wonderful) vs Joy Orbison (Arcadia) vs Mall Grab (Bandstand, 01:30)</b><em>Avalanches for pure fun and two hours of sample-collage records. Joy Orbison for the club heads — UK bass and house royalty. Mall Grab for raw, rowdy lo-fi rave. Also live: DJ Nobu (IMMERSE) for deep, dark techno and Jyoty (Road To Nowhere) for everything from garage to bashment.</em>" },
    { t: "02:30", b: "<b>Call Super</b> — Arcadia, till 04:00<em>Left-field, textured and beautiful. The classiest way to close Saturday.</em>" }
  ]
},
sun: {
  title: "Sunday — Reggae in the sun, rave at the end",
  intro: "The most complete day: a genuine reggae legend in the afternoon, the punk poet, then a closing run of Underworld, Mogwai and Disclosure. The 22:00–01:30 stretch needs planning — get it right and it's the best three hours of the weekend.",
  legs: [
    { t: "12:00", b: "<b>Organ Freeman</b> (Big Romance Dome) live jazz, or <b>Shrem's Madonnathon</b> from 13:00<em>Two hours of Madonna. No notes.</em>" },
    { t: "14:00", b: "<b>John Cooper Clarke</b> — Something Kind of Wonderful<em>The punk poet. Ferociously funny and still razor sharp. Best non-music thing on the whole bill — start here.</em>" },
    { t: "15:30", b: "<b>Alabaster DePlume</b> — Flourish<em>Spoken word and saxophone. Odd, gentle, hypnotic. Stay where you are, Barrington Levy is next door.</em>" },
    { clash: 1, t: "16:00", b: "<span class='clashtag'>Easy call</span><b>Barrington Levy</b> — Something Kind of Wonderful<em>Genuine reggae and dancehall royalty. 'Here I Come' in the afternoon sun is the reggae highlight of the weekend, no contest. Soda Blonde on the Main Stage at the same time is good, but this isn't close.</em>" },
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
  var dayName = { thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" }[s.d];
  return '<div class="pin">' +
    '<div class="ptag"><span class="pulse"></span>Don\'t miss this</div>' +
    "<h2>" + esc(s.a) + "</h2>" +
    '<div class="pwhen">' + dayName + " " + esc(s.t) + " <span>&middot; " + esc(s.s) + "</span></div>" +
    '<div class="pcd' + (cd.live ? " live" : "") + '">' + esc(cd.t) + "</div>" +
    '<div class="pnote">' + PIN.why + "</div>" +
  "</div>";
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
  var now = Date.now();
  for (var i = 0; i < D.length; i++) if (D[i].en > now) return D[i].d;
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

function setCard(s, showNote) {
  var id = idOf(s), on = !!S.stars[id];
  var badge = s.tr === 1 ? '<span class="badge b1">Must see</span>'
            : s.tr === 2 ? '<span class="badge b2">Big call</span>'
            : s.tr === 3 ? '<span class="badge b3">Worth a punt</span>' : "";
  return '<div class="set ' + (s.tr === 1 ? "t1" : "") + '" data-g="' + (s.g || "") + '">' +
    '<div class="body">' +
      '<div class="top"><span class="time">' + esc(s.t) + "</span>" + badge + "</div>" +
      "<h3>" + esc(s.a) + "</h3>" +
      '<div class="stage">' + esc(s.s) + "</div>" +
      (showNote && s.n ? '<div class="note">' + esc(s.n) + "</div>" : "") +
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
  var h = pinCard();

  if (p) {
    h += '<div class="plan"><div class="tag">The Game Plan</div><h2>' + esc(p.title) + "</h2><p>" +
         esc(p.intro) + "</p>";
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
  var d = e.target.closest("#days .day");
  if (d) { S.day = d.dataset.d; return render(); }

  var c = e.target.closest(".chip");
  if (c) { S.genre = c.dataset.g; return render(); }

  var n = e.target.closest("nav button");
  if (n) { S.view = n.dataset.v; return render(); }

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
