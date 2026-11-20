"use strict";
/* ================= helpers ================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pad = n => String(n).padStart(2, "0");
const today = () => { const d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
const dayDiff = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 864e5);
const norm = s => String(s).toLowerCase().replace(/[?!.,،؟:;"'…]/g, "").replace(/\s+/g, " ").trim();

const IC = {
  spk: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  prev: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
};

/* ================= state ================= */
const DEF = { xp: 0, streak: 0, best: 0, lastDay: null, daily: {}, goal: 30, units: {}, stories: {}, dialogues: {}, proverbs: {}, alpha: false, lessons: {}, sounds: {}, passages: {}, hideRoadmap: false, favs: {}, srs: {}, badges: {}, set: { arabic: true, latin: true, rate: 0.8, theme: "system" } };
let S;
try { S = Object.assign(JSON.parse(JSON.stringify(DEF)), JSON.parse(localStorage.getItem("dd") || "{}")); }
catch (e) { S = JSON.parse(JSON.stringify(DEF)); }
S.set = Object.assign({}, DEF.set, S.set);
const save = () => { try { localStorage.setItem("dd", JSON.stringify(S)); } catch (e) {} };

/* ================= content index ================= */
const mk = (r, src) => ({ l: r[0], a: r[1], e: r[2], src });
UNITS.forEach(u => u.list = u.items.map(r => mk(r, u.title)));
GRAMMAR.forEach(g => g.list = g.table.map(r => mk(r, g.title)));
function lessonItems(L) {
  const out = [];
  L.pages.forEach(p => {
    ["v", "x", "t"].forEach(k => (p[k] || []).forEach(r => out.push(mk(r, L.t))));
    (p.d || []).forEach(r => out.push(mk([r[1], r[2], r[3]], L.t)));
    (p.rw || []).forEach(r => out.push(mk([r[1], r[0], r[2]], L.t)));
  });
  return out.filter(it => it.l && it.a);
}
COURSE.concat(READ_COURSE).forEach(L => L.list = lessonItems(L));
VOCAB.forEach(c => c.list = c.w.map(r => mk(r, c.t)));
const findLesson = id => COURSE.find(L => L.id === id) || READ_COURSE.find(L => L.id === id);
const lessonDone = L => (S.lessons[L.id] || 0) >= 70;
const ALL = (() => { const seen = new Set(); return [].concat(...COURSE.map(l => l.list), ...VOCAB.map(c => c.list), ...UNITS.map(u => u.list), ...GRAMMAR.map(g => g.list)).filter(it => { if (seen.has(it.l)) return false; seen.add(it.l); return true; }); })();
const BY = {}; ALL.forEach(it => { if (!BY[it.l]) BY[it.l] = it; });

/* ================= speech ================= */
function speak(text, queue) {
  const t = String(text || "").replace(/\.\.\./g, " ");
  if (!t.trim()) return;
  if (window.AndroidTTS) { try { AndroidTTS.speak(t, S.set.rate, !!queue); return; } catch (e) {} }
  if ("speechSynthesis" in window) {
    if (!queue) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    const v = speechSynthesis.getVoices().find(v => /^ar/i.test(v.lang));
    u.lang = v ? v.lang : "ar-MA"; if (v) u.voice = v; u.rate = S.set.rate;
    speechSynthesis.speak(u);
  }
}
function stopSpeech() { if (window.AndroidTTS) { try { AndroidTTS.stop(); } catch (e) {} } else if ("speechSynthesis" in window) speechSynthesis.cancel(); }

/* ================= progress ================= */
function curStreak() { if (!S.lastDay) return 0; return dayDiff(S.lastDay, today()) <= 1 ? S.streak : 0; }
function addXP(n) {
  try { if (window.AndroidTTS && AndroidTTS.markStudied) AndroidTTS.markStudied(today()); } catch (e) {}
  const t = today();
  if (S.lastDay !== t) {
    S.streak = (S.lastDay && dayDiff(S.lastDay, t) === 1) ? S.streak + 1 : 1;
    S.lastDay = t;
  }
  S.best = Math.max(S.best || 0, S.streak);
  const before = S.daily[t] || 0;
  S.xp += n; S.daily[t] = before + n;
  save();
  if (before < S.goal && S.daily[t] >= S.goal) toast("🎯 Daily goal reached! Mzyan bzaf!");
  checkBadges();
}
function badgeValue(b) {
  switch (b.type) {
    case "streak": return Math.max(S.best || 0, curStreak());
    case "xp": return S.xp;
    case "units": return Object.values(S.units).filter(v => v >= 70).length;
    case "alpha": return S.alpha ? 1 : 0;
    case "stories": return Object.keys(S.stories).length;
    case "dialogues": return Object.keys(S.dialogues).length;
    case "proverbs": return Object.keys(S.proverbs).length;
    case "lessons": return COURSE.filter(lessonDone).length;
    case "vocab": return VOCAB.reduce((n, c) => n + c.list.filter(mastered).length, 0);
    case "reading": return READ_COURSE.filter(lessonDone).length;
    case "passages": return Object.keys(S.passages).length;
    case "grammar": return COURSE.filter(L => L.lvl === "G" && lessonDone(L)).length;
    case "practical": return COURSE.filter(L => L.lvl === "P" && lessonDone(L)).length;
  }
  return 0;
}
function checkBadges() {
  let got = [];
  BADGES.forEach(b => { if (!S.badges[b.id] && badgeValue(b) >= b.n) { S.badges[b.id] = today(); got.push(b); } });
  if (got.length) { save(); got.forEach(b => toast(b.icon + " Badge unlocked: " + b.name)); }
}
const SRS_DAYS = [0, 1, 2, 4, 8, 16, 32];
function srsMark(key, ok) {
  if (!BY[key]) return;
  const r = S.srs[key] || { b: 0, d: 0 };
  r.b = ok ? Math.min(r.b + 1, SRS_DAYS.length - 1) : 0;
  r.d = Date.now() + SRS_DAYS[r.b] * 864e5 - 36e5;
  S.srs[key] = r;
}
const mastered = it => (S.srs[it.l] || {}).b >= 3;
function dueItems() { const now = Date.now(); return Object.keys(S.srs).filter(k => BY[k] && S.srs[k].d <= now).map(k => BY[k]); }

const toastQ = []; let toastBusy = false;
function toast(msg) { toastQ.push(msg); if (!toastBusy) nextToast(); }
function nextToast() {
  const msg = toastQ.shift(); if (!msg) { toastBusy = false; return; }
  toastBusy = true; const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  setTimeout(() => { t.classList.remove("show"); setTimeout(nextToast, 350); }, 2400);
}

/* ================= router & actions ================= */
let ACT = {}, actN = 0;
const on = fn => { const id = "a" + (actN++); ACT[id] = fn; return `data-a="${id}"`; };
document.addEventListener("click", e => {
  const el = e.target.closest("[data-a]");
  if (el && ACT[el.dataset.a]) { e.preventDefault(); ACT[el.dataset.a](el, e); }
});
const TABS = ["home", "learn", "read", "talk", "me"];
let stack = [{ name: "home", p: {} }];
function go(name, p = {}) { stack.push({ name, p }); render(); }
function back() { if (stack.length > 1) { stack.pop(); render(); return true; } if (stack[0].name !== "home") { tab("home"); return true; } return false; }
window.appBack = () => back();
function tab(name) { stack = [{ name, p: {} }]; render(); }
document.querySelectorAll("#nav button").forEach(b => b.addEventListener("click", () => tab(b.dataset.tab)));
$("#backBtn").addEventListener("click", () => back());

function header(title, right = "") {
  $("#title").textContent = title;
  $("#backBtn").hidden = stack.length <= 1;
  $("#hright").innerHTML = right;
}
function render(keepScroll) {
  stopSpeech();
  ACT = {}; actN = 0;
  $(".fb") && $(".fb").remove();
  $(".wsheet") && $(".wsheet").remove();
  const top = stack[stack.length - 1];
  V[top.name](top.p);
  const root = stack[0].name;
  document.querySelectorAll("#nav button").forEach(b => b.classList.toggle("on", b.dataset.tab === root));
  if (!keepScroll) window.scrollTo(0, 0);
}
const view = html => { $("#view").innerHTML = html; };

/* ================= shared UI ================= */
function phrase(it, cls = "") {
  const showL = S.set.latin || !S.set.arabic, showA = S.set.arabic;
  return (showL ? `<div class="ph-l ${cls}">${esc(it.l)}</div>` : "") +
    (showA ? `<div class="ph-a ${cls}">${esc(it.a)}</div>` : "") +
    `<div class="ph-e ${cls}">${esc(it.e)}</div>`;
}
const spkBtn = text => `<button class="icon" aria-label="Listen" ${on(() => speak(text))}>${IC.spk}</button>`;
function favBtn(it) {
  return `<button class="icon fav ${S.favs[it.l] ? "on" : ""}" aria-label="Favourite" ${on(el => {
    if (S.favs[it.l]) delete S.favs[it.l]; else S.favs[it.l] = 1;
    save(); el.classList.toggle("on", !!S.favs[it.l]);
  })}>${IC.heart}</button>`;
}
const itemRow = it => `<div class="row"><div class="t" ${on(() => go("word", { it }))}>${phrase(it)}${mastered(it) ? `<div class="mtag">✓ mastered</div>` : ""}</div>${spkBtn(it.a)}${favBtn(it)}</div>`;
const searchBox = (ph, id) => `<div class="search">${IC.search}<input id="${id}" type="search" placeholder="${esc(ph)}" autocomplete="off"></div>`;
const xpPill = () => `<span class="pill">🔥 ${curStreak()}</span>`;

/* ================= speaking practice ================= */
const arNorm = s => String(s || "").replace(/[\u064B-\u0652\u0670\u0640]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
  .replace(/[ڭقگ]/g, "ك").replace(/ث/g, "ت").replace(/ذ/g, "د").replace(/ظ/g, "ض").replace(/[^\u0621-\u064A\s]/g, " ").replace(/\s+/g, " ").trim();
function lev(a, b) {
  const m = a.length, n = b.length; let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
function similarity(said, target) {
  const a = arNorm(said), b = arNorm(target);
  if (!a || !b) return 0;
  return 1 - lev(a, b) / Math.max(a.length, b.length);
}
function canListen() {
  if (window.AndroidTTS && AndroidTTS.canListen) { try { return AndroidTTS.canListen(); } catch (e) { return false; } }
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
function listen(prompt, cb) {
  stopSpeech();
  if (window.AndroidTTS && AndroidTTS.listen) { window.onSpeech = r => { window.onSpeech = null; cb(r || []); }; AndroidTTS.listen(prompt); return; }
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new R(); rec.lang = "ar-MA"; rec.maxAlternatives = 5;
  rec.onresult = e => cb([...e.results[0]].map(x => x.transcript)); rec.onerror = () => cb([]); rec.start();
}
// Listen to the learner saying `it` and write the verdict into element `box`.
function speakCheck(it, box) {
  if (!canListen()) { box.innerHTML = `<div class="sres bad">🎤 Speech recognition isn't available on this phone. Install or update the <b>Google</b> app, then try again. Meanwhile: listen, repeat out loud, and compare.</div>`; return; }
  box.innerHTML = `<div class="sres">🎙️ Listening… say: <b>${esc(it.l)}</b></div>`;
  listen(it.e, res => {
    if (!res.length) { box.innerHTML = `<div class="sres bad">I didn't catch anything. Tap 🎤 and try again.</div>`; return; }
    let best = res[0], sc = 0;
    res.forEach(r => { const v = similarity(r, it.a); if (v > sc) { sc = v; best = r; } });
    const pct = Math.round(sc * 100);
    const [cls, msg] = pct >= 80 ? ["ok", "Mezyan bzaf! 🎉 Very good"] : pct >= 55 ? ["mid", "Close! Try once more 💪"] : ["bad", "Not quite — listen and try again"];
    if (pct >= 80) addXPQuiet(3);
    box.innerHTML = `<div class="sres ${cls}"><b>${msg}</b><div class="prog" style="margin:8px 0"><i style="width:${pct}%"></i></div><div class="small">Match ${pct}% · I heard: <span style="font-family:var(--ar);font-size:18px">${esc(best)}</span></div></div>`;
  });
}

/* ================= reading helpers ================= */
const arKey = w => String(w || "").replace(/[\u064B-\u0652\u0670\u0640]/g, "").replace(/[^\u0621-\u064A\u06A0-\u06AF]/g, "");
const READ_WORDS = (() => {
  const out = [], seen = new Set(), add = it => { const k = arKey(it.a); if (it.a && !/\s/.test(it.a.trim()) && k.length >= 2 && !seen.has(k)) { seen.add(k); out.push(it); } };
  READ_COURSE.forEach(L => L.pages.forEach(pg => (pg.rw || []).forEach(r => add(mk([r[1], r[0], r[2]], "Reading")))));
  READING_DRILLS.forEach(d => d.words.forEach(w => add(mk([w[1], w[0], w[2]], "Reading"))));
  ALPHABET.forEach(L => add(mk([L[5], L[4], L[6]], "Alphabet")));
  VOCAB.forEach(c => c.list.forEach(add));
  return out;
})();
const GLOSS = {};
(() => {
  const add = (k, v) => { if (k && !GLOSS[k]) GLOSS[k] = v; };
  const toksL = l => String(l).replace(/[?!.,:;"“”]/g, " ").split(/\s+/).filter(Boolean);
  VOCAB.flatMap(c => c.list).concat(ALL).forEach(it => {
    const at = it.a.split(/\s+/).map(arKey).filter(Boolean), lt = toksL(it.l);
    if (at.length === 1) add(at[0], { l: it.l, e: it.e }); else if (at.length === lt.length) at.forEach((w, i) => add(w, { l: lt[i] }));
  });
  VERBS.forEach(v => { const T = conjugate(v); Object.values(T).flat().forEach(r => { const k = arKey(r[2]); if (!/\s/.test(r[2].replace(/^(ما|غادي) /, "").trim())) add(k, { l: r[1].replace(/!$/, ""), e: r[3] }); }); });
  STORIES.concat(PASSAGES).forEach(st => st.lines.forEach(L => { const at = L[0].split(/\s+/).map(arKey).filter(Boolean), lt = toksL(L[1]); if (at.length === lt.length) at.forEach((w, i) => add(w, { l: lt[i] })); }));
})();
function gloss(w) {
  const k = arKey(w); if (!k) return null;
  const base = [k, k.replace(/^لل/, "ال"), k.replace(/^و?(ف|ب|ل)ال/, "ال"), k.replace(/^و/, ""), k.replace(/^(ف|ب|ل|و)/, ""), k.replace(/ش$/, "")];
  const tries = [];
  base.forEach(x => { tries.push(x, x.replace(/^ال/, ""), "ال" + x, x.replace(/ة$/, ""), x.replace(/(ين|ات)$/, ""), x.replace(/^ال/, "").replace(/ة$/, "")); });
  base.forEach(x => tries.push(x.replace(/(ها|هم|كم|ني|ه|ك)$/, ""), x.replace(/(ها|هم|كم|ني|ه|ك)$/, "") + "و"));
  const withE = tries.find(t => t && GLOSS[t] && GLOSS[t].e);
  if (withE && !(GLOSS[k] && GLOSS[k].e)) { const g = Object.assign({}, GLOSS[withE]); if (GLOSS[k]) g.l = GLOSS[k].l; return g; }
  for (const t of tries) if (t && GLOSS[t]) { const g = Object.assign({}, GLOSS[t]); if (!g.e) { const b = VOCAB.flatMap(c => c.list).find(x => x.l === g.l) || (BY[g.l] && !/\s/.test(BY[g.l].l) ? BY[g.l] : null); if (b) g.e = b.e; } return g; }
  return null;
}
function showWord(w) {
  $(".wsheet") && $(".wsheet").remove();
  const g = gloss(w), clean = w.replace(/[،؟!.,:«»"]/g, "");
  const el = document.createElement("div");
  el.className = "wsheet";
  el.innerHTML = `<div class="wcardin"><div class="bigar" style="font-size:44px">${esc(clean)}</div>
    ${g ? `<div class="ph-l" style="font-size:20px">${esc(g.l)}</div><div class="ph-e">${g.e ? esc(g.e) : "Meaning: see the line's translation"}</div>` : `<div class="ph-e">Not in the dictionary yet — reveal the line's translation.</div>`}
    <div class="btns" style="margin-top:12px"><button class="btn sec" ${on(() => speak(clean))}>${IC.spk} Listen</button><button class="btn" ${on(() => el.remove())}>Close</button></div></div>`;
  el.addEventListener("click", e => { if (e.target === el) el.remove(); });
  document.body.appendChild(el);
  speak(clean);
}
const tapAr = text => String(text).split(/(\s+)/).map(t => /^\s*$/.test(t) ? t : `<span class="w" ${on(() => showWord(t))}>${esc(t)}</span>`).join("");

/* ================= views ================= */
const V = {};

V.home = () => {
  header("Darija Daba", `<button class="hbtn" aria-label="Theme" ${on(cycleTheme)}>${IC.moon}</button>` + xpPill());
  const t = today(), dx = S.daily[t] || 0, pct = Math.min(1, dx / S.goal);
  const C = 2 * Math.PI * 26;
  const next = COURSE.find(L => !lessonDone(L)) || COURSE[COURSE.length - 1];
  const doneN = COURSE.filter(lessonDone).length;
  const due = dueItems().length;
  const words = VOCAB.flatMap(c => c.list);
  const wod = words[t.split("-").join("") % words.length];
  const hr = new Date().getHours();
  const greet = hr < 12 ? ["sba7 lkhir", "صباح الخير"] : hr < 18 ? ["salam", "سلام"] : ["msa lkhir", "مسا الخير"];
  view(`
  <div class="hero">
    <div class="ar">${greet[1]}</div>
    <h3>${greet[0][0].toUpperCase() + greet[0].slice(1)}! Ready for some Darija?</h3>
    <div class="stats">
      <div class="stat"><b>🔥 ${curStreak()}</b><span>day streak</span></div>
      <div class="stat"><b>⭐ ${S.xp}</b><span>total XP</span></div>
      <div class="stat"><b>🏅 ${Object.keys(S.badges).length}</b><span>badges</span></div>
    </div>
  </div>
  <div class="card goal">
    <svg class="ring" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" stroke="var(--line)"/>
      <circle cx="32" cy="32" r="26" stroke="var(--saffron)" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}" transform="rotate(-90 32 32)"/>
      <text x="32" y="37" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor" stroke="none">${Math.round(pct * 100)}%</text></svg>
    <div style="flex:1"><b>Daily goal</b><div class="muted small">${dx} / ${S.goal} XP today${pct >= 1 ? " — done! 🎉" : ""}</div></div>
  </div>
  ${window.AndroidTTS ? "" : `<a class="unit getapp" href="https://github.com/windeckersoftware/windeckersoftware.github.io/releases/download/darija-1.7.0/DarijaDaba-1.7.0.apk"><div class="ic">📱</div><div class="tx"><small>Free · offline · Android 8+</small><b>Get the Android app</b><small>Speaking practice, daily reminders and a better Arabic voice</small></div>${IC.next}</a>`}
  ${planCard()}
  <div class="card"><b>Fundamentals</b>
    <div class="fund">
      <button class="btn" ${on(() => go("sounds"))}>🗣️ Sounds</button>
      <button class="btn sec" ${on(() => tab("read"))}>✍️ Alphabet</button>
      <button class="btn sec" ${on(() => go("vocab"))}>📚 Vocabulary</button>
      <button class="btn sec" ${on(() => go("verbs"))}>🧩 Verbs</button>
    </div></div>
  ${Object.keys(S.srs).length ? `<button class="unit" ${on(() => go("review"))}><div class="ic">🔁</div><div class="tx"><small>Daily review</small><b>${due ? due + " to review today" : "All caught up ✓"}</b><small>Words you got wrong come back until you know them.</small></div>${IC.next}</button>`
    : `<div class="unit lockcard"><div class="ic">🔒</div><div class="tx"><small>Daily review</small><b>Locked</b><small>Do a quiz in any lesson or vocabulary set to unlock your review deck.</small></div></div>`}
  <button class="unit" ${on(() => go("lesson", { id: next.id }))}>
    <div class="ic">${next.em}</div><div class="tx"><small>Continue the course · ${next.lvl} · ${doneN}/${COURSE.length} done</small><b>${esc(next.t)}</b><small>${esc(next.goal)}</small></div>${IC.next}
  </button>
  <div class="grid2">
    <button class="tile" ${on(() => go("review"))}><span class="em">🔁</span><b>Review${due ? `<span class="badge-n">${due}</span>` : ""}</b><small>Spaced repetition</small></button>
    <button class="tile" ${on(() => tab("read"))}><span class="em">✍️</span><b>Read Arabic</b><small>${READ_COURSE.filter(lessonDone).length}/${READ_COURSE.length} reading lessons</small></button>
    <button class="tile" ${on(() => go("stories"))}><span class="em">📖</span><b>Stories</b><small>${STORIES.length} graded stories</small></button>
    <button class="tile" ${on(() => tab("talk"))}><span class="em">💬</span><b>Conversations</b><small>Choose your reply</small></button>
    <button class="tile" ${on(() => go("proverbs"))}><span class="em">🦉</span><b>Proverbs</b><small>${PROVERBS.length} sayings explained</small></button>
    <button class="tile" ${on(() => go("dict"))}><span class="em">🔎</span><b>Dictionary</b><small>${ALL.length} words & phrases</small></button>
    <button class="tile" ${on(() => go("level", { id: "P" }))}><span class="em">🧳</span><b>Real-Life Morocco</b><small>${COURSE.filter(L => L.lvl === "P" && lessonDone(L)).length}/${COURSE.filter(L => L.lvl === "P").length} situations</small></button>
    <button class="tile" ${on(() => tab("me"))}><span class="em">🏅</span><b>Badges</b><small>${Object.keys(S.badges).length}/${BADGES.length} unlocked</small></button>
  </div>
  <h2>Word of the day</h2>
  <div class="card"><div class="row" style="border:0;padding:0"><div class="t">${phrase(wod)}<div class="muted small" style="margin-top:4px">${esc(wod.src)}</div></div>${spkBtn(wod.a)}${favBtn(wod)}</div>
    <div class="btns" style="margin-top:10px"><button class="btn sec sm" ${on(() => go("word", { it: wod }))}>💬 Use in a sentence</button><button class="btn sec sm" ${on(() => go("vocab"))}>📚 Browse words</button></div></div>
  `);
};

V.learn = () => {
  header("Learn", xpPill());
  const vm = VOCAB.reduce((n, c) => n + c.list.filter(mastered).length, 0), vt = VOCAB.reduce((n, c) => n + c.list.length, 0);
  view(`<h2>Toolbox</h2>
    <button class="unit" ${on(() => go("roadmap"))}><div class="ic">🗺️</div><div class="tx"><b>Roadmap</b><small>Where to start and what comes next</small></div>${IC.next}</button>
    <button class="unit" ${on(() => go("sounds"))}><div class="ic">🗣️</div><div class="tx"><b>Pronunciation guide</b><small>${Object.keys(S.sounds).length}/${SOUNDS.length} sounds learned</small></div>${IC.next}</button>
    <button class="unit" ${on(() => go("vocab"))}><div class="ic">📚</div><div class="tx"><b>Vocabulary</b><small>${vm} mastered · ${vt - vm} remaining in ${VOCAB.length} categories</small></div>${IC.next}</button>
    <button class="unit" ${on(() => go("verbs"))}><div class="ic">🧩</div><div class="tx"><b>Verb conjugation</b><small>${VERBS.length} verbs in every tense</small></div>${IC.next}</button>` + LEVELS.map(lv => {
    const ls = COURSE.filter(L => L.lvl === lv.id), d = ls.filter(lessonDone).length;
    return `<h2>${esc(lv.title)} <span class="muted small">${d}/${ls.length}</span></h2><p class="muted small" style="margin:-4px 2px 10px">${esc(lv.desc)}</p>` + ls.map((L, i) => lessonBtn(L, i + 1)).join("");
  }).join("") + `<h2>Phrasebook</h2><p class="muted small" style="margin:-4px 2px 10px">Topic-based phrase lists with flashcards and quizzes.</p>` + UNITS.map((u, i) => {
    const sc = S.units[u.id];
    return `<button class="unit ${sc >= 70 ? "done" : ""}" ${on(() => go("unit", { id: u.id }))}>
      <div class="ic">${u.emoji}</div><div class="tx"><b>${i + 1}. ${esc(u.title)}</b><small>${esc(u.desc)}</small></div>
      ${sc != null ? `<span class="sc">${sc}%</span>` : `<span class="muted small">${u.items.length}</span>`}</button>`;
  }).join("") + `<h2>Grammar reference</h2>` + GRAMMAR.map(g => `<button class="unit" ${on(() => go("grammar", { id: g.id }))}>
      <div class="ic">${g.emoji}</div><div class="tx"><b>${esc(g.title)}</b><small>${esc(g.text)}</small></div>${IC.next}</button>`).join(""));
};

V.unit = p => {
  const u = UNITS.find(x => x.id === p.id);
  header(u.title);
  const canBuild = u.list.filter(it => it.l.split(" ").length >= 2).length >= 3;
  view(`
    <div class="tip">💡 ${esc(u.tip)}</div>
    <div class="grid2" style="margin-bottom:10px">
      <button class="btn" ${on(() => go("cards", { title: u.title, items: u.list }))}>🃏 Flashcards</button>
      <button class="btn" ${on(() => startQuiz({ title: u.title + " quiz", pool: u.list, n: 10, done: pct => { S.units[u.id] = Math.max(S.units[u.id] || 0, pct); save(); checkBadges(); } }))}>✅ Quiz</button>
      <button class="btn sec" ${on(() => startQuiz({ title: "Listen", pool: u.list, n: 8, types: ["listen"] }))}>🎧 Listen & match</button>
      <button class="btn sec" ${canBuild ? "" : "disabled"} ${on(() => canBuild && startQuiz({ title: "Build phrases", pool: u.list.filter(it => it.l.split(" ").length >= 2), n: 6, types: ["build"] }))}>🧩 Build phrases</button>
    </div>
    <button class="btn sec" style="margin-bottom:12px" ${on(() => go("speak", { title: u.title, items: u.list }))}>🎤 Speaking practice</button>
    ${searchBox("Search in " + u.title, "q")}
    <div class="card" id="list" style="padding:4px 14px"></div>`);
  const draw = q => { q = norm(q); $("#list").innerHTML = u.list.filter(it => !q || norm(it.l + " " + it.e + " " + it.a).includes(q)).map(itemRow).join("") || `<div class="empty">No match</div>`; };
  draw("");
  $("#q").addEventListener("input", e => draw(e.target.value));
};

V.grammar = p => {
  const g = GRAMMAR.find(x => x.id === p.id);
  header(g.title);
  view(`<div class="tip">${esc(g.text)}</div>
    <div class="card gtable" style="padding:4px 14px">${g.list.map(it => `<div class="row"><div class="t"><div><div class="ph-l">${esc(it.l)}</div><div class="ph-e">${esc(it.e)}</div></div><div class="ph-a">${esc(it.a)}</div></div>${spkBtn(it.a)}</div>`).join("")}</div>
    <div class="btns"><button class="btn sec" ${on(() => go("cards", { title: g.title, items: g.list }))}>🃏 Flashcards</button>
    <button class="btn" ${on(() => startQuiz({ title: g.title, pool: g.list, n: 8, types: ["mc_en", "mc_dar", "read"], distract: g.list }))}>✅ Quiz</button></div>`);
};

V.cards = p => {
  header(p.title);
  p.i = p.i || 0;
  const it = p.items[p.i], n = p.items.length;
  view(`
    <div class="prog"><i style="width:${(p.i + 1) / n * 100}%"></i></div>
    <div class="counter">${p.i + 1} / ${n}</div>
    <div class="flash">${phrase(it)}
      <button class="bigspk" aria-label="Listen" ${on(() => speak(it.a))}>${IC.spk}</button>
      <div style="display:flex;gap:6px">${favBtn(it)}<button class="icon" aria-label="Say it" ${on(() => speakCheck(it, $("#sbox")))}>${IC.mic}</button></div>
      <div id="sbox" style="width:100%"></div>
    </div>
    <div class="btns">
      <button class="btn sec" ${p.i === 0 ? "disabled" : ""} ${on(() => { if (p.i > 0) { p.i--; render(true); } })}>${IC.prev} Previous</button>
      ${p.i < n - 1
      ? `<button class="btn" ${on(() => { p.i++; addXPQuiet(1); render(true); })}>Next ${IC.next}</button>`
      : `<button class="btn" ${on(() => { addXP(5); stack.pop(); startQuiz({ title: p.title + " quiz", pool: p.items, n: Math.min(10, Math.max(5, n)) }); })}>Quiz me ✅</button>`}
    </div>`);
  setTimeout(() => speak(it.a), 250);
};
V.speak = p => {
  header("🎤 " + p.title);
  if (!p.ready) { p.items = p.items.filter(it => /[\u0621-\u064A]/.test(it.a) && !/^[\d٠-٩ ]+$/.test(it.l)); p.ready = true; }
  p.i = p.i || 0;
  const it = p.items[p.i], n = p.items.length;
  view(`<div class="prog"><i style="width:${(p.i + 1) / n * 100}%"></i></div><div class="counter">${p.i + 1} / ${n}</div>
    <div class="flash" style="min-height:260px">
      <div class="muted small" style="font-weight:700">Say this in Darija:</div>
      <div class="ph-e" style="font-size:20px;color:var(--ink);font-weight:700">${esc(it.e)}</div>
      ${S.set.arabic ? `<div class="ph-a">${esc(it.a)}</div>` : ""}${S.set.latin || !S.set.arabic ? `<div class="ph-l" style="font-size:20px">${esc(it.l)}</div>` : ""}
      <div style="display:flex;gap:14px;margin-top:8px">
        <button class="bigspk sec2" aria-label="Listen" ${on(() => speak(it.a))}>${IC.spk}</button>
        <button class="bigspk mic" aria-label="Say it" ${on(() => speakCheck(it, $("#sbox")))}>${IC.mic}</button>
      </div>
      <div class="muted small">Listen first, then tap the red mic and speak</div>
      <div id="sbox" style="width:100%"></div>
    </div>
    <div class="btns">
      <button class="btn sec" ${p.i === 0 ? "disabled" : ""} ${on(() => { if (p.i > 0) { p.i--; render(true); } })}>${IC.prev} Previous</button>
      ${p.i < n - 1 ? `<button class="btn" ${on(() => { p.i++; render(true); })}>Next ${IC.next}</button>` : `<button class="btn" ${on(() => back())}>Done ✓</button>`}
    </div>`);
};
function addXPQuiet(n) { const t = today(); if (S.lastDay !== t) addXP(n); else { S.xp += n; S.daily[t] = (S.daily[t] || 0) + n; save(); } }

/* ================= quiz engine ================= */
// types: mc_en (darija → english), mc_dar (english → darija), read (arabic script → latin), listen (audio → english), build (arrange words)
function startQuiz(o) { go("quiz", Object.assign({ n: 10, types: ["mc_en", "mc_dar", "read", "listen", "build"] }, o)); }

function makeQuestions(p) {
  const pool = shuffle(p.pool);
  const qs = [];
  const dpool = (p.distract || p.pool).concat(p.distract ? [] : ALL);
  for (let k = 0; k < p.n; k++) {
    const it = pool[k % pool.length];
    const aw = arKey(it.a), single = !/\s/.test(it.a.trim()) && aw.length >= 2 && aw.length <= 7;
    let types = p.types.filter(t => {
      if (t === "build") return it.l.split(" ").length >= 2 && it.l.split(" ").length <= 8 && !/[\/+—]|\.\.\./.test(it.l);
      if (t === "spell" || t === "join") return single;
      if (t === "find") return single;
      return true;
    });
    if (!types.length) types = ["mc_en"];
    const type = types[Math.floor(Math.random() * types.length)];
    const q = { it, type };
    if (type === "spell") {
      const letters = [...arKey(it.a)];
      const extra = shuffle(ALPHABET.map(L => L[0]).filter(c => !letters.includes(c))).slice(0, 2);
      q.tiles = shuffle(letters.concat(extra)).map((w, i) => ({ w, i }));
      q.picked = [];
      qs.push(q); continue;
    }
    if (type === "find") {
      const cands = shuffle([...new Set(arKey(it.a))]);
      const words = shuffle(dpool.concat(READ_WORDS)).filter(x => x !== it && !/\s/.test(x.a.trim()) && arKey(x.a).length >= 2);
      let found = null;
      for (const ch of cands) { const d = []; const seenA = new Set([arKey(it.a)]); for (const x of words) { const k = arKey(x.a); if (!k.includes(ch) && !seenA.has(k)) { seenA.add(k); d.push(x); if (d.length === 3) break; } } if (d.length === 3) { found = [ch, d]; break; } }
      if (found) { q.letter = found[0]; q.field = "a"; q.opts = shuffle([it].concat(found[1])); qs.push(q); continue; }
      q.type = "read";
    }
    if (type === "build") {
      const words = it.l.split(" ");
      const extra = shuffle(dpool.filter(x => x.l !== it.l).map(x => x.l.split(" ")).flat().filter(w => !words.includes(w))).slice(0, Math.min(3, Math.max(1, 6 - words.length)));
      q.tiles = shuffle(words.concat(extra)).map((w, i) => ({ w, i }));
      q.picked = [];
    } else {
      const field = (q.type === "mc_en" || q.type === "listen") ? "e" : (q.type === "join" || q.type === "mc_ar") ? "a" : "l";
      q.field = field;
      const seen = new Set([norm(it[field])]);
      const opts = [it];
      const ok1 = x => q.type !== "join" || (!/\s/.test(x.a.trim()) && arKey(x.a).length >= 2);
      const near = shuffle(p.pool.filter(x => x !== it && ok1(x))), far = shuffle(dpool.concat(q.type === "join" ? READ_WORDS : []).filter(ok1));
      for (const x of near.concat(far)) {
        if (opts.length >= 4) break;
        const v = norm(x[field]); if (!seen.has(v)) { seen.add(v); opts.push(x); }
      }
      q.opts = shuffle(opts);
    }
    qs.push(q);
  }
  return qs;
}

V.quiz = p => {
  if (!p.qs) { p.qs = makeQuestions(p); p.i = 0; p.score = 0; p.wrong = []; }
  if (p.i >= p.qs.length) return quizResult(p);
  header(p.title);
  const q = p.qs[p.i], it = q.it;
  let prompt = "";
  if (q.type === "mc_en") prompt = `<div class="lab">What does this mean?</div>${S.set.latin || !S.set.arabic ? `<div class="big">${esc(it.l)}</div>` : ""}${S.set.arabic ? `<div class="bigar">${esc(it.a)}</div>` : ""}<div>${spkBtn(it.a).replace('class="icon"', 'class="icon" style="margin:6px auto 0"')}</div>`;
  if (q.type === "mc_dar") prompt = `<div class="lab">How do you say…</div><div class="big">${esc(it.e)}</div>`;
  if (q.type === "read") prompt = `<div class="lab">📖 Read the Arabic script</div><div class="bigar">${esc(it.a)}</div>`;
  if (q.type === "listen") prompt = `<div class="lab">🎧 Listen and choose the meaning</div><button class="bigspk" style="margin:6px auto" ${on(() => speak(it.a))}>${IC.spk}</button>`;
  if (q.type === "build") prompt = `<div class="lab">🧩 Arrange the words to say:</div><div class="big" style="font-size:21px">${esc(it.e)}</div>`;
  if (q.type === "spell") prompt = `<div class="lab">✍️ Spell it in Arabic script</div><div class="big">${esc(it.l)}</div><div class="muted">${esc(it.e)}</div><div>${spkBtn(it.a).replace('class="icon"', 'class="icon" style="margin:6px auto 0"')}</div>`;
  if (q.type === "join") prompt = `<div class="lab">🔗 Join these letters — which word do they make?</div><div class="bigar" style="letter-spacing:.35em">${[...arKey(it.a)].join(" ")}</div>`;
  if (q.type === "find") prompt = `<div class="lab">🔍 Which word contains this letter?</div><div class="bigar" style="font-size:64px">${q.letter}</div>`;
  if (q.type === "mc_ar") prompt = `<div class="lab">🔤 Which is the Arabic spelling?</div><div class="big">${esc(it.l)}</div><div class="muted">${esc(it.e)}</div>`;

  let body = "";
  if (q.type === "build") {
    body = `<div class="tiles answer" id="ans"></div><div class="tiles" id="bank"></div>
      <button class="btn" id="check" style="margin-top:14px" ${on(() => checkBuild(p))}>Check</button>`;
  } else if (q.type === "spell") {
    body = `<div class="spellbox"><div class="spellans" id="sans"></div><button class="icon" aria-label="Delete" ${on(() => { q.picked.pop(); drawSpell(p); })}>⌫</button></div>
      <div class="tiles" id="sbank"></div>
      <button class="btn" style="margin-top:14px" ${on(() => { if (q.done || !q.picked.length) return; q.done = true; feedback(p, q.picked.map(t => t.w).join("") === arKey(it.a)); })}>Check</button>`;
  } else {
    body = q.opts.map((o, k) => {
      if (q.field === "a") return `<button class="opt optar" data-k="${k}" ${on(el => answer(p, k, el))}>${esc(o.a)}</button>`;
      const showAr = q.field === "l" && S.set.arabic && q.type !== "read";
      return `<button class="opt" data-k="${k}" ${on(el => answer(p, k, el))}>${esc(o[q.field])}${showAr ? `<span class="oa">${esc(o.a)}</span>` : ""}</button>`;
    }).join("");
  }
  view(`<div class="prog"><i style="width:${p.i / p.qs.length * 100}%"></i></div>
    <div class="qprompt">${prompt}</div>${body}<div style="height:160px"></div>`);
  if (q.type === "build") drawTiles(p);
  if (q.type === "spell") drawSpell(p);
  if (q.type === "listen" || q.type === "mc_en" || q.type === "spell") setTimeout(() => speak(it.a), 300);
};

function drawTiles(p) {
  const q = p.qs[p.i];
  $("#ans").innerHTML = q.picked.map((t, k) => `<button class="wt" ${on(() => { q.picked.splice(k, 1); drawTiles(p); })}>${esc(t.w)}</button>`).join("");
  $("#bank").innerHTML = q.tiles.map(t => `<button class="wt ${q.picked.includes(t) ? "used" : ""}" ${on(() => { if (!q.picked.includes(t)) { q.picked.push(t); drawTiles(p); } })}>${esc(t.w)}</button>`).join("");
}
function drawSpell(p) {
  const q = p.qs[p.i];
  $("#sans").innerHTML = q.picked.length ? esc(q.picked.map(t => t.w).join("")) : `<span class="muted small" style="font-family:inherit">tap the letters in order →</span>`;
  $("#sbank").innerHTML = q.tiles.map(t => `<button class="wt lt-tile ${q.picked.includes(t) ? "used" : ""}" ${on(() => { if (!q.picked.includes(t)) { q.picked.push(t); drawSpell(p); } })}>${esc(t.w)}</button>`).join("");
}
function checkBuild(p) {
  const q = p.qs[p.i];
  if (q.done) return;
  if (!q.picked.length) return;
  q.done = true;
  const ok = norm(q.picked.map(t => t.w).join(" ")) === norm(q.it.l);
  feedback(p, ok);
}
function answer(p, k, el) {
  const q = p.qs[p.i];
  if (q.done) return;
  q.done = true;
  const ok = q.opts[k] === q.it;
  document.querySelectorAll(".opt").forEach(b => {
    const o = q.opts[+b.dataset.k];
    if (o === q.it) b.classList.add("ok"); else if (b === el) b.classList.add("bad"); else b.classList.add("dim");
  });
  feedback(p, ok);
}
function feedback(p, ok) {
  const q = p.qs[p.i], it = q.it;
  if (ok) p.score++; else p.wrong.push(it);
  srsMark(it.l, ok);
  save();
  const praise = ["Mezyan!", "Tbarkllah!", "Wa3er!", "Hayel!", "Bravo!"];
  const fb = document.createElement("div");
  fb.className = "fb " + (ok ? "ok" : "bad");
  fb.innerHTML = `<h4>${ok ? "✓ " + praise[Math.floor(Math.random() * praise.length)] : "✗ Not quite"}</h4>
    <div class="ans" style="display:flex;align-items:center;gap:8px"><div style="flex:1"><b>${esc(it.l)}</b> · <span style="font-family:var(--ar);font-size:19px">${esc(it.a)}</span><div class="small">${esc(it.e)}</div></div>${spkBtn(it.a)}</div>
    <button class="btn" ${on(() => { p.i++; render(); })}>Continue</button>`;
  document.body.appendChild(fb);
  if (!ok || q.type === "build") speak(it.a);
}
function quizResult(p) {
  header(p.title);
  const pct = Math.round(p.score / p.qs.length * 100);
  const xp = p.score * 10 + (pct >= 70 ? 20 : 0);
  if (!p.awarded) { p.awarded = true; addXP(xp); if (p.done) p.done(pct); }
  const em = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "💪" : "🌱";
  view(`<div class="result"><div class="em">${em}</div><div class="pct">${pct}%</div>
    <p><b>${p.score} / ${p.qs.length}</b> correct · <b>+${xp} XP</b></p>
    <p class="muted">${pct >= 70 ? "Tbarkllah 3lik! Great work." : "Keep going — mistakes go into your Review deck."}</p></div>
    ${p.wrong.length ? `<h2>To review</h2><div class="card" style="padding:4px 14px">${p.wrong.filter((x, i, a) => a.indexOf(x) === i).map(itemRow).join("")}</div>` : ""}
    <div class="btns"><button class="btn sec" ${on(() => { p.qs = null; p.awarded = false; render(); })}>↻ Try again</button>
    <button class="btn" ${on(() => back())}>Done</button></div>`);
}

/* ================= course lessons ================= */
const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
function lessonBtn(L, n) {
  const sc = S.lessons[L.id];
  return `<button class="unit ${lessonDone(L) ? "done" : ""}" ${on(() => go("lesson", { id: L.id }))}>
    <div class="ic">${L.em}</div><div class="tx"><small>Lesson ${n} · ${L.pages.length} pages</small><b>${esc(L.t)}</b><small>${esc(L.goal)}</small></div>
    ${sc != null ? `<span class="sc">${sc}%</span>` : IC.next}</button>`;
}
function startLessonPractice(L) {
  const reading = L.lvl === "R";
  const pool = L.list;
  startQuiz({ title: L.t, pool, n: Math.min(15, Math.max(8, Math.round(pool.length / 2))),
    types: reading ? ["read", "mc_en", "spell", "join", "find", "mc_ar"] : ["mc_en", "mc_dar", "read", "listen", "build"],
    done: pct => { S.lessons[L.id] = Math.max(S.lessons[L.id] || 0, pct); save(); checkBadges(); } });
}
V.lesson = p => {
  const L = findLesson(p.id);
  header(L.t);
  p.pg = p.pg || 0; p.shown = p.shown || {};
  const n = L.pages.length, pg = L.pages[p.pg];
  let h = `<div class="prog"><i style="width:${(p.pg + 1) / (n + 1) * 100}%"></i></div><div class="counter">Page ${p.pg + 1} of ${n}, then practice</div>`;
  if (p.pg === 0) h += `<div class="goalbox"><b>🎯 Goal</b><br>${esc(L.goal)}</div>`;
  h += `<h2 class="lh">${esc(pg.h)}</h2>`;
  (pg.p || []).forEach(t => h += `<p class="lp">${md(t)}</p>`);
  if (pg.lt) h += `<div class="letters" style="grid-template-columns:repeat(${Math.min(5, pg.lt.length)},1fr);margin-bottom:14px">${[...pg.lt].map(ch => { const i = ALPHABET.findIndex(A => A[0] === ch); return i < 0 ? "" : `<button class="lt" ${on(() => go("letter", { i }))}><b>${ch}</b><small>${esc(ALPHABET[i][1])} · ${esc(ALPHABET[i][2])}</small></button>`; }).join("")}</div>`;
  if (pg.t) h += `<div class="card gtable" style="padding:4px 14px">${pg.t.map(r => `<div class="row"><div class="t"><div><div class="ph-l">${esc(r[0])}</div><div class="ph-e">${esc(r[2])}</div></div><div class="ph-a">${esc(r[1])}</div></div>${spkBtn(r[1])}</div>`).join("")}</div>`;
  if (pg.v) h += `<h3 class="sub">Vocabulary</h3><div class="card" style="padding:4px 14px">${pg.v.map(r => itemRow(mk(r, L.t))).join("")}</div>`;
  if (pg.x) h += `<h3 class="sub">Examples</h3><div class="card" style="padding:4px 14px">${pg.x.map(r => itemRow(mk(r, L.t))).join("")}</div>`;
  if (pg.rw) h += `<h3 class="sub">Read — tap to check</h3>` + pg.rw.map((w, k) => { const key = p.pg + "-" + k; return `<button class="wcard" style="width:100%" ${on(() => { p.shown[key] = 1; speak(w[0]); render(true); })}>
      <div class="rev">${p.shown[key] ? `<div class="ph-l">${esc(w[1])}</div><div class="ph-e">${esc(w[2])}</div>` : `<span class="muted small">tap to reveal</span>`}</div><div class="ar">${esc(w[0])}</div></button>`; }).join("");
  if (pg.d) {
    const first = pg.d[0][0];
    h += `<div class="toggles" style="margin-top:6px"><button class="chip" ${on(() => { stopSpeech(); pg.d.forEach((r, k) => speak(r[2], k > 0)); })}>▶ Play dialogue</button></div>` +
      pg.d.map(r => `<div class="msg ${r[0] === first ? "them" : "you"}"><div class="who">${esc(r[0])}</div><div class="ml">${esc(r[1])}</div>${S.set.arabic ? `<div class="ma">${esc(r[2])}</div>` : ""}<div class="me">${esc(r[3])}</div><button ${on(() => speak(r[2]))}>${IC.spk.replace("<svg", '<svg style="width:18px;height:18px"')}</button></div>`).join("");
  }
  if (pg.c) h += `<div class="tip" style="margin-top:12px">🇲🇦 <b>Culture & tips</b><br>${md(pg.c)}</div>`;
  h += `<div class="btns" style="margin-top:16px"><button class="btn sec" ${p.pg === 0 ? "disabled" : ""} ${on(() => { if (p.pg > 0) { p.pg--; render(); } })}>${IC.prev} Back</button>` +
    (p.pg < n - 1 ? `<button class="btn" ${on(() => { p.pg++; addXPQuiet(2); render(); })}>Next ${IC.next}</button>`
      : `<button class="btn" ${on(() => { addXPQuiet(5); startLessonPractice(L); })}>✅ Practice</button>`) + `</div>` +
    (p.pg === n - 1 ? `<button class="btn sec" style="margin-top:10px" ${on(() => go("speak", { title: L.t, items: L.list.filter(it => !/[\/+]|\.\.\./.test(it.l)) }))}>🎤 Speaking practice</button>` : "");
  view(h);
};

V.level = p => {
  const lv = LEVELS.find(l => l.id === p.id);
  header(lv.title.replace(/^\S+\s/, ""));
  const ls = COURSE.filter(L => L.lvl === lv.id);
  view(`<div class="tip">${esc(lv.desc)}</div>` + ls.map((L, i) => lessonBtn(L, i + 1)).join(""));
};
/* ================= vocabulary ================= */
V.vocab = () => {
  header("Vocabulary");
  const all = VOCAB.reduce((n, c) => n + c.list.length, 0), m = VOCAB.reduce((n, c) => n + c.list.filter(mastered).length, 0);
  const catsDone = VOCAB.filter(c => c.list.every(mastered)).length;
  view(`<div class="card"><b>${m} words mastered</b> · <span class="muted">${all - m} remaining in ${VOCAB.length} categories</span>
      <div class="prog" style="margin:10px 0 6px"><i style="width:${m / all * 100}%"></i></div>
      <div class="muted small">A word counts as mastered after you answer it correctly 3 times in quizzes. ${catsDone}/${VOCAB.length} categories complete.</div></div>` +
    VOCAB.map(c => { const k = c.list.filter(mastered).length; return `<button class="vcat" ${on(() => go("vcat", { id: c.id }))}>
      <div class="ic">${c.em}</div><div class="tx"><b>${esc(c.t)}</b><small>${esc(c.d)}</small>
      <div class="vprog"><div class="prog"><i style="width:${k / c.list.length * 100}%"></i></div><span>${k}/${c.list.length}</span></div></div></button>`; }).join(""));
};
V.vcat = p => {
  const c = VOCAB.find(x => x.id === p.id);
  header(c.t);
  const k = c.list.filter(mastered).length;
  view(`<div class="tip">${esc(c.d)} <b>${k}/${c.list.length} mastered.</b></div>
    <div class="grid2" style="margin-bottom:10px">
      <button class="btn" ${on(() => go("cards", { title: c.t, items: c.list }))}>🃏 Flashcards</button>
      <button class="btn" ${on(() => startQuiz({ title: c.t, pool: c.list, n: 12, types: ["mc_en", "mc_dar", "read", "listen"] }))}>✅ Quiz</button>
      <button class="btn sec" ${on(() => startQuiz({ title: "Hear & match", pool: c.list, n: 10, types: ["listen"] }))}>🎧 Hear & match</button>
      <button class="btn sec" ${on(() => go("speak", { title: c.t, items: c.list }))}>🎤 Speak</button>
    </div>
    ${c.list.some(it => !mastered(it)) ? `<button class="btn sec" style="margin-bottom:12px" ${on(() => { const left = c.list.filter(it => !mastered(it)); startQuiz({ title: "Not yet mastered", pool: left, n: Math.min(12, Math.max(6, left.length)), types: ["mc_en", "mc_dar", "read", "listen"] }); })}>🎯 Practise words not yet mastered</button>` : ""}
    ${searchBox("Search in " + c.t, "q")}<div class="card" id="list" style="padding:4px 14px"></div>`);
  const draw = q => { q = norm(q); $("#list").innerHTML = c.list.filter(it => !q || norm(it.l + " " + it.e + " " + it.a).includes(q)).map(itemRow).join("") || `<div class="empty">No match</div>`; };
  draw(""); $("#q").addEventListener("input", e => draw(e.target.value));
};
// Find real sentences from the course that use a word
function examplesFor(it) {
  const toks = norm(it.l).split(" ").filter(w => w.length > 1);
  if (!toks.length) return [];
  const forms = new Set(); toks.forEach(w => { forms.add(w); forms.add("l" + w); forms.add(w.replace(/^l/, "")); if (/^(.)\1/.test(w)) forms.add(w.slice(1)); });
  const pool = ALL.concat(STORIES.flatMap(st => st.lines.map(L => mk([L[1], L[0], L[2]], st.en))));
  const seen = new Set();
  return pool.filter(x => {
    if (x.l === it.l || seen.has(x.l)) return false;
    const xt = norm(x.l).split(" "); if (xt.length < 3) return false;
    const ok = toks.length === 1 ? xt.some(w => forms.has(w)) : norm(x.l).includes(norm(it.l));
    if (ok) seen.add(x.l); return ok;
  }).slice(0, 8);
}
V.word = p => {
  const it = p.it;
  header("Word");
  const ex = examplesFor(it), r = S.srs[it.l];
  view(`<div class="flash" style="min-height:220px">${phrase(it)}
      <div style="display:flex;gap:14px;margin-top:6px">
        <button class="bigspk" aria-label="Listen" ${on(() => speak(it.a))}>${IC.spk}</button>
        <button class="bigspk mic" aria-label="Say it" ${on(() => speakCheck(it, $("#sbox")))}>${IC.mic}</button></div>
      <div style="display:flex;gap:6px;align-items:center">${favBtn(it)}<span class="muted small">${mastered(it) ? "✓ Mastered" : r ? "Learning · level " + r.b + "/3" : "New word"}</span></div>
      <div id="sbox" style="width:100%"></div></div>
    <h2>💬 Used in sentences</h2>
    ${ex.length ? `<div class="card" style="padding:4px 14px">${ex.map(x => `<div class="row"><div class="t">${phrase(x)}<div class="muted small">${esc(x.src)}</div></div>${spkBtn(x.a)}</div>`).join("")}</div>`
      : `<div class="empty">No example sentences in the course yet for this word.</div>`}`);
};

/* ================= verb conjugation ================= */
V.verbs = () => {
  header("Verb conjugation");
  view(`<div class="tip">Pick a verb to see it in every tense. Present = <b>ka-</b> + verb, future = <b>ghadi</b> + verb, negative = <b>ma … ch</b>.</div>
    ${searchBox("Search verbs (English or Darija)…", "q")}<div class="card" id="list" style="padding:4px 14px"></div>`);
  const draw = q => { q = norm(q); $("#list").innerHTML = VERBS.map((v, i) => [v, i]).filter(([v]) => !q || norm(v.l + " " + v.e).includes(q)).map(([v, i]) => `<button class="row vrow" ${on(() => go("verb", { i }))}><div class="t"><div class="ph-l">${esc(v.l)}</div><div class="ph-e">to ${esc(v.e)}</div></div><div class="ph-a">${esc(conjugate(v).past[3][2])}</div>${IC.next}</button>`).join("") || `<div class="empty">No match</div>`; };
  draw(""); $("#q").addEventListener("input", e => draw(e.target.value));
};
const TENSES = [["present", "Present"], ["past", "Past"], ["future", "Future"], ["negPresent", "Don't"], ["negPast", "Didn't"], ["imperative", "Commands"]];
V.verb = p => {
  const v = VERBS[p.i], T = conjugate(v);
  p.t = p.t || "present";
  header(v.l + " · to " + v.e);
  const rows = T[p.t];
  view(`<div class="toggles">${TENSES.filter(([k]) => T[k].length).map(([k, n]) => `<button class="chip ${p.t === k ? "on" : ""}" ${on(() => { p.t = k; render(true); })}>${n}</button>`).join("")}</div>
    <div class="card gtable" style="padding:4px 14px">${rows.map(r => `<div class="row"><div class="t"><div><div class="muted small">${esc(r[0][0])}${r[0][1] ? " · " + esc(r[0][1]) : ""} · ${esc(r[0][2])}</div><div class="ph-l">${esc(r[1])}</div></div><div class="ph-a">${esc(r[2])}</div></div>${spkBtn(r[2])}</div>`).join("")}</div>
    <div class="btns"><button class="btn sec" ${on(() => { stopSpeech(); rows.forEach((r, k) => speak(r[2], k > 0)); })}>▶ Hear all</button>
    <button class="btn" ${on(() => { const pool = TENSES.flatMap(([k]) => T[k]).map(r => mk([r[1], r[2], r[3]], v.l)); startQuiz({ title: v.l + " quiz", pool, n: 10, types: ["mc_dar", "read"], distract: pool }); })}>✅ Quiz this verb</button></div>
    <div class="btns" style="margin-top:10px"><button class="btn sec" ${p.i === 0 ? "disabled" : ""} ${on(() => { if (p.i > 0) { p.i--; render(); } })}>${IC.prev} Prev verb</button>
    <button class="btn sec" ${p.i >= VERBS.length - 1 ? "disabled" : ""} ${on(() => { if (p.i < VERBS.length - 1) { p.i++; render(); } })}>Next verb ${IC.next}</button></div>`);
};

/* ================= pronunciation guide ================= */
V.sounds = () => {
  header("Pronunciation guide");
  const n = Object.keys(S.sounds).length;
  view(`<div class="muted small" style="display:flex;justify-content:space-between;margin-bottom:6px"><span>${n} sounds learned · ${SOUNDS.length - n} remaining</span><span>${n}/${SOUNDS.length}</span></div>
    <div class="prog" style="margin-bottom:14px"><i style="width:${n / SOUNDS.length * 100}%"></i></div>` +
    SOUNDS.map((x, i) => `<details class="acc snd" ${i === 0 ? "open" : ""}><summary><span class="sbig">${esc(x.s)}</span> <span class="sar">${esc(x.a)}</span> ${S.sounds[i] ? "<span class='learned'>✓</span>" : ""}<br><small class="muted">${esc(x.n)}</small></summary>
      <p>${esc(x.how)}</p>
      <div class="card gtable" style="padding:4px 12px;box-shadow:none;background:var(--card2)">${x.ex.map(r => `<div class="row"><div class="t"><div><div class="ph-l">${esc(r[0])}</div><div class="ph-e">${esc(r[2])}</div></div><div class="ph-a">${esc(r[1])}</div></div>${spkBtn(r[1])}</div>`).join("")}</div>
      <div style="text-align:center;margin:10px 0 14px"><button class="chip ${S.sounds[i] ? "on" : ""}" ${on(el => { if (S.sounds[i]) delete S.sounds[i]; else { S.sounds[i] = 1; addXPQuiet(2); } save(); render(true); })}>${S.sounds[i] ? "✓ Learned" : "Mark as learned"}</button></div></details>`).join(""));
};

/* ================= roadmap ================= */
const byLvl = (lv, a, b) => COURSE.filter(L => L.lvl === lv).slice(a, b);
const rdg = (a, b) => READ_COURSE.slice(a, b);
const vocabMastered = () => VOCAB.reduce((n, c) => n + c.list.filter(mastered).length, 0);
const catMastered = id => { const c = VOCAB.find(x => x.id === id); return c ? c.list.filter(mastered).length : 0; };
const storiesDone = lvl => STORIES.filter(st => (!lvl || st.level === lvl) && S.stories[st.id]).length;
const passDone = maxLvl => PASSAGES.filter(ps => ps.lvl <= maxLvl && S.passages[ps.id] != null).length;
const RT = (icon, label, cur, max, goFn, next) => ({ icon, label, cur, max, go: goFn, next });
const lessonTask = (icon, label, list) => RT(icon, label, () => list.filter(lessonDone).length, list.length,
  () => { const nx = list.find(L => !lessonDone(L)) || list[0]; go("lesson", { id: nx.id }); },
  () => { const nx = list.find(L => !lessonDone(L)); return nx ? "Lesson: " + nx.t : null; });
function STAGES() {
  return [
    { id: "s1", em: "🌱", t: "First Steps", time: "Week 1 · about 15 min a day", why: "Tune your ear and eyes: the sounds of Darija, your first Arabic letters, greetings and introductions.",
      tasks: [RT("🗣️", "Learn 10 sounds in the pronunciation guide", () => Object.keys(S.sounds).length, 10, () => go("sounds")),
        lessonTask("✍️", "Reading lessons 1–3: your first letters", rdg(0, 3)),
        lessonTask("👋", "A1 lessons 1–4: sounds, greetings, introductions, politeness", byLvl("A1", 0, 4)),
        RT("📚", "Master 15 words in Everyday Words 1", () => catMastered("v-core1"), 15, () => go("vcat", { id: "v-core1" }))] },
    { id: "s2", em: "🧭", t: "Survival Darija", time: "Weeks 2–3 · about 20 min a day", why: "Numbers, money, food and family — enough to shop, eat out and chat politely. Finish the whole alphabet.",
      tasks: [lessonTask("🔢", "A1 lessons 5–12: numbers, money, family, food, time", byLvl("A1", 4, 12)),
        lessonTask("🔤", "Reading lessons 4–8: the whole alphabet", rdg(3, 8)),
        lessonTask("🛍️", "Real-life: clothes, money, exchange, petit taxi", byLvl("P", 0, 4)),
        RT("📰", "Read 2 level-1 passages", () => passDone(1), 2, () => go("passages")),
        RT("📚", "Master 100 words", vocabMastered, 100, () => go("vocab"))] },
    { id: "s3", em: "🚆", t: "Getting Around", time: "Weeks 4–6 · about 20 min a day", why: "Travel and services, the first grammar foundations, and reading real signs, menus and prices.",
      tasks: [lessonTask("🧳", "Real-life lessons 5–13: buses, trains, SIM, hammam, police…", byLvl("P", 4, 13)),
        lessonTask("📖", "Reading lessons 9–15: vowels, long words, signs, fluency", rdg(8, 15)),
        lessonTask("📐", "Grammar: gender, plurals, the / a / some", byLvl("G", 0, 3)),
        RT("🗣️", "All sounds in the pronunciation guide", () => Object.keys(S.sounds).length, SOUNDS.length, () => go("sounds")),
        RT("📗", "Finish 3 beginner stories", () => storiesDone("Beginner"), 3, () => go("stories"))] },
    { id: "s4", em: "🏠", t: "Daily Life", time: "Weeks 7–10 · about 25 min a day", why: "Verbs in every tense, routines, home and health — and your first real back-and-forth conversations.",
      tasks: [lessonTask("⏩", "A2 lessons 1–10: present, past, future, daily life", byLvl("A2", 0, 10)),
        lessonTask("📐", "Grammar: was, used to, comparing, lli, if", byLvl("G", 3, 8)),
        RT("💬", "Complete 4 chat conversations", () => Object.keys(S.dialogues).length, 4, () => tab("talk")),
        RT("📰", "Read 8 reading passages", () => passDone(9), 8, () => go("passages")),
        RT("📚", "Master 250 words", vocabMastered, 250, () => go("vocab"))] },
    { id: "s5", em: "🗣️", t: "Real Conversations", time: "Weeks 11–16 · about 25 min a day", why: "Opinions, plans, work, hospitality and slang — plus longer stories and Moroccan wisdom.",
      tasks: [lessonTask("💭", "B1 lessons 1–8", byLvl("B1", 0, 8)),
        lessonTask("📐", "Grammar: time words, myself, passive, started / still", byLvl("G", 8, 12)),
        RT("💬", "All chat conversations", () => Object.keys(S.dialogues).length, DIALOGUES.length, () => tab("talk")),
        RT("📖", "Finish 10 stories", () => storiesDone(), 10, () => go("stories")),
        RT("🦉", "Learn 15 proverbs", () => Object.keys(S.proverbs).length, 15, () => go("proverbs"))] },
    { id: "s6", em: "🏆", t: "Mastery", time: "Ongoing", why: "Polish everything and make Darija a habit: every passage, every story, 500 words and a 30-day streak.",
      tasks: [RT("📰", "All reading passages", () => passDone(9), PASSAGES.length, () => go("passages")),
        RT("📖", "All stories", () => storiesDone(), STORIES.length, () => go("stories")),
        RT("📚", "Master 500 words", vocabMastered, 500, () => go("vocab")),
        RT("🔥", "Reach a 30-day streak", () => Math.max(S.best || 0, curStreak()), 30, () => go("review"))] },
  ];
}
const taskDone = t => t.cur() >= t.max;
const currentStage = st => st.find(x => !x.tasks.every(taskDone)) || st[st.length - 1];
function todaysPlan() {
  const st = STAGES(), cur = currentStage(st), plan = [];
  const due = dueItems().length;
  if (due) plan.push({ icon: "🔁", label: `Review ${due} word${due > 1 ? "s" : ""} due today`, sub: "Spaced repetition keeps words in memory", go: () => go("review") });
  cur.tasks.filter(t => !taskDone(t)).forEach(t => { if (plan.length < 3) plan.push({ icon: t.icon, label: (t.next && t.next()) || t.label, sub: `${t.label} · ${Math.min(t.cur(), t.max)}/${t.max}`, go: t.go }); });
  if (plan.length < 3) plan.push({ icon: "📰", label: "Read a passage", sub: "Keep your reading sharp", go: () => go("passages") });
  return { st, cur, plan };
}
function planCard() {
  const tp = todaysPlan(), idx = tp.st.indexOf(tp.cur) + 1;
  return `<div class="card plan"><div class="planhead"><b>📅 Today's plan</b><button class="chip" ${on(() => go("roadmap"))}>Roadmap →</button></div>
    <div class="muted small" style="margin:2px 0 8px">Stage ${idx} of ${tp.st.length}: ${tp.cur.em} ${esc(tp.cur.t)}</div>
    ${tp.plan.map((x, i) => `<button class="prow" ${on(x.go)}><span class="pnum">${i + 1}</span><span class="pt"><b>${x.icon} ${esc(x.label)}</b>${x.sub ? `<small>${esc(x.sub)}</small>` : ""}</span>${IC.next}</button>`).join("")}</div>`;
}
V.roadmap = p => {
  header("Your roadmap");
  const st = STAGES(), cur = currentStage(st);
  const all = st.flatMap(x => x.tasks), dn = all.filter(taskDone).length;
  if (!p.open) p.open = cur.id;
  view(`<div class="card"><b>Stage ${st.indexOf(cur) + 1} of ${st.length} · ${esc(cur.t)}</b>
      <div class="prog" style="margin:10px 0 6px"><i style="width:${dn / all.length * 100}%"></i></div>
      <div class="muted small">${dn} of ${all.length} milestones done. Each stage builds on the one before — but you can open any stage and jump in.</div></div>
    ${planCard()}
    <div class="road">` + st.map((x, i) => {
      const td = x.tasks.filter(taskDone).length, complete = td === x.tasks.length, here = x === cur, open = p.open === x.id;
      return `<div class="rstep ${complete ? "done" : ""}"><div class="rdot">${complete ? "✓" : x.em}</div><div class="card rcard ${here ? "here" : ""}">
        <button class="rhead" ${on(() => { p.open = open ? "-" : x.id; render(true); })}>
          <div class="muted small">Stage ${i + 1} · ${esc(x.time)} ${here ? `<span class="herebadge">You are here</span>` : ""}</div>
          <b>${esc(x.t)}</b><div class="prog" style="margin:8px 0 4px"><i style="width:${td / x.tasks.length * 100}%"></i></div>
          <div class="muted small">${td}/${x.tasks.length} milestones ${open ? "▴" : "▾"}</div></button>
        ${open ? `<p class="small" style="margin:10px 0;line-height:1.5">${esc(x.why)}</p>` + x.tasks.map(t => { const c = Math.min(t.cur(), t.max), ok = c >= t.max;
          return `<button class="rtask ${ok ? "ok" : ""}" ${on(t.go)}><span class="ri2">${ok ? "✅" : t.icon}</span><span class="pt"><b>${esc(t.label)}</b>
            <span class="tprog"><span class="prog"><i style="width:${c / t.max * 100}%"></i></span><small>${c}/${t.max}</small></span></span>${IC.next}</button>`; }).join("") : ""}
      </div></div>`; }).join("") + `</div>
    <div class="tip">🔁 Every stage: do your daily review, and keep the reminder on in Settings. Ten minutes every day beats an hour once a week.</div>`);
};

/* ================= reading passages ================= */
V.passages = () => {
  header("Reading passages");
  view(`<div class="tip">📰 Short texts written in Arabic script, from easy (level 1) to harder (level 4). Read first, tap words you don't know, then answer the questions.</div>` +
    PASSAGES.map(ps => `<button class="unit ${S.passages[ps.id] >= 67 ? "done" : ""}" ${on(() => go("passage", { id: ps.id }))}><div class="ic" style="font-family:var(--ar);font-size:15px">${"★".repeat(ps.lvl)}</div>
      <div class="tx"><b><span style="font-family:var(--ar);font-size:19px">${esc(ps.t)}</span> · ${esc(ps.en)}</b><small>Level ${ps.lvl} · ${ps.lines.length} sentences · ${ps.qs.length} questions</small></div>
      ${S.passages[ps.id] != null ? `<span class="sc">${S.passages[ps.id]}%</span>` : IC.next}</button>`).join(""));
};
V.passage = p => {
  const ps = PASSAGES.find(x => x.id === p.id);
  header(ps.en);
  if (!p.t) p.t = { lat: false, en: false };
  if (!p.opts) p.opts = ps.qs.map(q => shuffle(q[1].map((o, i) => [o, i === 0])));
  p.ans = p.ans || {};
  const chip = (k, label) => `<button class="chip ${p.t[k] ? "on" : ""}" ${on(() => { p.t[k] = !p.t[k]; render(true); })}>${label}</button>`;
  const answered = Object.keys(p.ans).length, correct = Object.values(p.ans).filter(Boolean).length;
  view(`<div class="toggles">${chip("lat", "Show Latin")}${chip("en", "Show English")}<button class="chip" ${on(() => { stopSpeech(); ps.lines.forEach((L, k) => speak(L[0], k > 0)); })}>▶ Read aloud</button></div>
    <div class="card passage"><div class="ptitle">${esc(ps.t)}</div>${ps.lines.map(L => `<div class="pline"><div class="la">${tapAr(L[0])}</div>${p.t.lat ? `<div class="ll">${esc(L[1])}</div>` : ""}${p.t.en ? `<div class="le">${esc(L[2])}</div>` : ""}</div>`).join("")}</div>
    <p class="muted small" style="text-align:center">Tap any word to see its meaning and hear it.</p>
    <h2>Check your understanding</h2>
    ${ps.qs.map((q, qi) => `<div class="card"><b>${qi + 1}. ${esc(q[0])}</b><div style="margin-top:10px">${p.opts[qi].map(([o, ok], oi) => {
      const a = p.ans[qi]; const cls = a === undefined ? "" : ok ? "ok" : (p.pick && p.pick[qi] === oi ? "bad" : "dim");
      return `<button class="opt ${cls}" ${on(() => { if (p.ans[qi] !== undefined) return; p.ans[qi] = ok; (p.pick = p.pick || {})[qi] = oi; if (Object.keys(p.ans).length === ps.qs.length) finishPassage(p, ps); render(true); })}>${esc(o)}</button>`; }).join("")}</div></div>`).join("")}
    ${answered === ps.qs.length ? `<div class="card" style="text-align:center"><div style="font-size:40px">${correct === ps.qs.length ? "🏆" : "📖"}</div><b>${correct}/${ps.qs.length} correct</b>
      <div class="btns" style="margin-top:12px"><button class="btn sec" ${on(() => { p.ans = {}; p.pick = {}; p.opts = null; p.done = false; render(); })}>↻ Again</button><button class="btn" ${on(() => back())}>Done</button></div></div>` : ""}`);
};
function finishPassage(p, ps) {
  if (p.done) return; p.done = true;
  const correct = Object.values(p.ans).filter(Boolean).length, pct = Math.round(correct / ps.qs.length * 100);
  const first = S.passages[ps.id] == null;
  S.passages[ps.id] = Math.max(S.passages[ps.id] || 0, pct); save();
  addXP(correct * 10 + (first ? 10 : 0));
}

/* ================= reading gym ================= */
V.rgym = () => {
  header("Reading gym");
  const modes = [
    ["spell", "✍️", "Spell it", "Hear a word and build it from Arabic letter tiles — watch the letters join as you go."],
    ["join", "🔗", "Join the letters", "See separate letters and pick the word they make when joined."],
    ["find", "🔍", "Find the letter", "Spot which word contains a given letter, in any of its shapes."],
    ["mc_ar", "🔤", "Arabic spelling", "See a word in Latin letters and choose its Arabic spelling."],
    ["read", "📖", "Speed reading", "Read a word in Arabic script and choose how it's pronounced."],
  ];
  view(`<div class="tip">🏋️ Short workouts to make reading the script automatic. ${READ_WORDS.length} words in the practice pool.</div>
    <button class="btn" style="margin-bottom:12px" ${on(() => startQuiz({ title: "Mixed workout", pool: READ_WORDS, n: 15, types: modes.map(m => m[0]) }))}>⚡ Mixed workout (15)</button>` +
    modes.map(([k, em, n, d]) => `<button class="unit" ${on(() => startQuiz({ title: n, pool: READ_WORDS, n: 10, types: [k] }))}><div class="ic">${em}</div><div class="tx"><b>${n}</b><small>${d}</small></div>${IC.next}</button>`).join(""));
};

/* ================= review & dictionary & favourites ================= */
V.review = () => {
  header("Review");
  const due = dueItems();
  const seen = Object.keys(S.srs).length;
  view(`<div class="card" style="text-align:center"><div style="font-size:44px">🔁</div>
    <h3 style="margin:6px 0">${due.length ? due.length + " phrases to review" : "All caught up!"}</h3>
    <p class="muted small">Phrases you get wrong come back soon. Phrases you know come back after 1, 2, 4, 8, 16… days.</p>
    ${due.length ? `<button class="btn" ${on(() => startQuiz({ title: "Review", pool: due, n: Math.min(15, Math.max(due.length, 5)), types: ["mc_en", "mc_dar", "read", "listen"] }))}>Start review</button>` : ""}
  </div>
  <button class="btn sec" style="margin-bottom:10px" ${on(() => startQuiz({ title: "Mixed practice", pool: seen >= 8 ? Object.keys(S.srs).map(k => BY[k]).filter(Boolean) : ALL, n: 15 }))}>🎲 Mixed practice (15 questions)</button>
  <button class="btn sec" ${on(() => go("favs"))}>❤️ My favourites (${Object.keys(S.favs).length})</button>
  <p class="muted small" style="text-align:center;margin-top:14px">${seen} phrases in your memory deck</p>`);
};

V.favs = () => {
  header("Favourites");
  const items = Object.keys(S.favs).map(k => BY[k]).filter(Boolean);
  view(items.length ? `<div class="btns" style="margin-bottom:12px"><button class="btn sec" ${on(() => go("cards", { title: "Favourites", items }))}>🃏 Flashcards</button>
    <button class="btn" ${items.length < 2 ? "disabled" : ""} ${on(() => items.length >= 2 && startQuiz({ title: "Favourites quiz", pool: items, n: Math.min(12, items.length * 2) }))}>✅ Quiz</button></div>
    <div class="card" style="padding:4px 14px">${items.map(itemRow).join("")}</div>`
    : `<div class="empty">Tap the ♡ on any phrase to save it here.</div>`);
};

V.dict = () => {
  header("Dictionary");
  view(searchBox("Search English, Darija or Arabic…", "q") + `<div class="card" id="list" style="padding:4px 14px"></div>`);
  const draw = q => {
    q = norm(q);
    const res = q ? ALL.filter(it => norm(it.l + " " + it.e + " " + it.a).includes(q)) : ALL;
    $("#list").innerHTML = res.slice(0, 80).map(it => `<div class="row"><div class="t">${phrase(it)}<div class="muted small">${esc(it.src)}</div></div>${spkBtn(it.a)}${favBtn(it)}</div>`).join("")
      + (res.length > 80 ? `<div class="empty">${res.length - 80} more — type to narrow down</div>` : "") || `<div class="empty">No match</div>`;
  };
  draw("");
  $("#q").addEventListener("input", e => draw(e.target.value));
};

/* ================= reading ================= */
const ZWJ = "‍";
function forms(L) {
  const join = L[7];
  return [["Alone", L[0]], ["Start", join ? L[0] + ZWJ : L[0]], ["Middle", ZWJ + L[0] + (join ? ZWJ : "")], ["End", ZWJ + L[0]]];
}
V.read = () => {
  header("Read", xpPill());
  view(`
    <div class="tip">✍️ <b>Learn to read Darija in Arabic script.</b> Start with the letters, read the tips, then practise with graded drills and stories.</div>
    <h2>Reading course <span class="muted small">${READ_COURSE.filter(lessonDone).length}/${READ_COURSE.length}</span></h2>
    ${READ_COURSE.map((L, i) => lessonBtn(L, i + 1)).join("")}
    <h2>Reading passages <span class="muted small">${Object.keys(S.passages).length}/${PASSAGES.length}</span></h2>
    <button class="unit" ${on(() => go("passages"))}><div class="ic">📰</div><div class="tx"><b>Graded texts with questions</b><small>Read full texts in Arabic script · tap any word for its meaning</small></div>${IC.next}</button>
    <h2>Reading gym</h2>
    <button class="unit" ${on(() => go("rgym"))}><div class="ic">🏋️</div><div class="tx"><b>Script workouts</b><small>Spell words, join letters, find letters, match spellings</small></div>${IC.next}</button>
    <h2>Stories</h2>
    <button class="unit" ${on(() => go("stories"))}><div class="ic">📖</div><div class="tx"><b>Read graded stories</b><small>${Object.keys(S.stories).length} / ${STORIES.length} finished</small></div>${IC.next}</button>
    <h2>Alphabet reference</h2>
    <div class="letters">${ALPHABET.map((L, i) => `<button class="lt ${i >= 28 ? "x" : ""}" ${on(() => go("letter", { i }))}><b>${L[0]}</b><small>${esc(L[1])}</small></button>`).join("")}</div>
    <p class="muted small">Highlighted letters (ڭ ڤ) are used in Darija but not in standard Arabic.</p>
    <button class="btn" ${on(() => alphaQuiz())}>✅ Alphabet quiz ${S.alpha ? "· passed ✓" : ""}</button>
    <h2>How Arabic writing works</h2>
    ${ALPHA_EXTRA.map(x => `<details class="acc"><summary>${esc(x.title)}</summary><p>${esc(x.body)}</p></details>`).join("")}
    <h2>Extra reading drills</h2>
    ${READING_DRILLS.map((d, i) => `<button class="unit" ${on(() => go("drill", { i }))}><div class="ic">${["🔤", "🗣️", "🏷️", "⚡", "📜"][i]}</div><div class="tx"><b>${esc(d.title)}</b><small>${d.words.length} items · tap to reveal</small></div>${IC.next}</button>`).join("")}
  `);
};

V.letter = p => {
  const L = ALPHABET[p.i];
  header("Letter " + L[1]);
  view(`<div class="card" style="text-align:center">
      <div class="biglet">${L[0]}</div>
      <div class="ph-l">${esc(L[1])} · <span style="color:var(--teal2)">${esc(L[2])}</span></div>
      <p class="muted">${esc(L[3])}</p>
      <button class="bigspk" style="margin:0 auto" ${on(() => speak(L[4]))}>${IC.spk}</button>
    </div>
    <h2>Shapes in a word ${L[7] ? "" : "<span class='muted small'>(doesn't join to the left)</span>"}</h2>
    <div class="forms">${forms(L).map(f => `<div><b>${f[1]}</b><small>${f[0]}</small></div>`).join("")}</div>
    <h2>Write it ✍️</h2>
    <div class="toggles">${forms(L).map((f, k) => `<button class="chip ${(p.f || 0) === k ? "on" : ""}" ${on(() => { p.f = k; render(true); })}>${f[0]}</button>`).join("")}</div>
    <div class="trace"><canvas id="cv"></canvas></div>
    <div id="tres" class="muted small" style="text-align:center;margin:8px 0">Trace the grey letter with your finger.</div>
    <div class="btns" style="margin-bottom:6px"><button class="btn sec" id="tclear">↺ Clear</button><button class="btn" id="tdone">✓ Check</button></div>
    <h2>Example</h2>
    <div class="card"><div class="row" style="border:0;padding:0"><div class="t"><div class="ph-a" style="font-size:34px">${esc(L[4])}</div><div class="ph-l">${esc(L[5])}</div><div class="ph-e">${esc(L[6])}</div></div>${spkBtn(L[4])}</div></div>
    <div class="btns"><button class="btn sec" ${p.i === 0 ? "disabled" : ""} ${on(() => { if (p.i > 0) { p.i--; render(); } })}>${IC.prev} Prev</button>
    <button class="btn" ${p.i >= ALPHABET.length - 1 ? "disabled" : ""} ${on(() => { if (p.i < ALPHABET.length - 1) { p.i++; p.f = 0; addXPQuiet(1); render(); } })}>Next ${IC.next}</button></div>`);
  setupTrace(forms(L)[p.f || 0][1]);
};
function setupTrace(glyph) {
  const cv = $("#cv"); if (!cv) return;
  const dpr = window.devicePixelRatio || 1, W = cv.clientWidth, H = 260;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px";
  const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
  const css = getComputedStyle(document.documentElement);
  const teal = css.getPropertyValue("--teal2").trim() || "#16777E";
  const font = `200px "Noto Naskh Arabic","Noto Sans Arabic",serif`;
  // offscreen layers for scoring (1x scale)
  const mk2 = () => { const c = document.createElement("canvas"); c.width = W; c.height = H; return c; };
  const guide = mk2(), ink = mk2(), g = guide.getContext("2d"), k = ink.getContext("2d");
  const drawGlyph = (c, style, extra) => { c.font = font; c.textAlign = "center"; c.textBaseline = "middle"; c.direction = "rtl"; c.fillStyle = style; c.fillText(glyph, W / 2, H / 2); if (extra) { c.lineWidth = extra; c.strokeStyle = style; c.strokeText(glyph, W / 2, H / 2); } };
  drawGlyph(g, "#000", 18);
  const reset = () => { ctx.clearRect(0, 0, W, H); ctx.globalAlpha = 0.2; drawGlyph(ctx, teal); ctx.globalAlpha = 1; k.clearRect(0, 0, W, H); $("#tres").textContent = "Trace the grey letter with your finger."; };
  reset();
  let last = null;
  const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const line = (c, a, b, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = "round"; c.lineJoin = "round"; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); };
  cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); last = pos(e); line(ctx, last, last, 12, teal); line(k, last, last, 20, "#000"); };
  cv.onpointermove = e => { if (!last) return; const p2 = pos(e); line(ctx, last, p2, 12, teal); line(k, last, p2, 20, "#000"); last = p2; };
  cv.onpointerup = cv.onpointercancel = () => { last = null; };
  $("#tclear").onclick = reset;
  $("#tdone").onclick = () => {
    const G = g.getImageData(0, 0, W, H).data, I = k.getImageData(0, 0, W, H).data;
    let gN = 0, iN = 0, both = 0;
    for (let i = 3; i < G.length; i += 12) { const a = G[i] > 40, b = I[i] > 40; if (a) gN++; if (b) iN++; if (a && b) both++; }
    if (!iN) { $("#tres").textContent = "Draw over the grey letter first ✍️"; return; }
    const cover = both / gN, prec = both / iN, sc = Math.round(100 * 2 * cover * prec / (cover + prec || 1));
    const msg = sc >= 55 ? "🎉 Excellent writing! " : sc >= 35 ? "👍 Good — follow the shape a bit more closely. " : "Try to stay on the grey shape. ";
    if (sc >= 55) addXPQuiet(2);
    $("#tres").textContent = msg + "Score " + sc + "%";
  };
}

function alphaQuiz() {
  const letters = ALPHABET.map(L => ({ l: L[2], a: L[0], e: "letter " + L[1], src: "Alphabet" }));
  const words = ALPHABET.map(L => ({ l: L[5], a: L[4], e: L[6], src: "Alphabet" }));
  const pool = shuffle(letters).slice(0, 8).concat(shuffle(words).slice(0, 7));
  startQuiz({ title: "Alphabet quiz", pool, n: 15, types: ["read", "read", "find", "join"], distract: letters.concat(words), done: pct => { if (pct >= 80) { S.alpha = true; save(); checkBadges(); } } });
}

V.drill = p => {
  const d = READING_DRILLS[p.i];
  header(d.title.split("·")[0].trim());
  p.shown = p.shown || {};
  view(`<div class="tip">Try to read each word out loud <b>before</b> tapping it. Tap to check yourself and hear it.</div>
    ${d.words.map((w, k) => `<button class="wcard" style="width:100%" ${on(() => { p.shown[k] = 1; speak(w[0]); render(true); })}>
      <div class="rev">${p.shown[k] ? `<div class="ph-l">${esc(w[1])}</div><div class="ph-e">${esc(w[2])}</div>` : `<span class="muted small">tap to reveal</span>`}</div>
      <div class="ar">${esc(w[0])}</div></button>`).join("")}
    <div class="btns"><button class="btn sec" ${on(() => { p.shown = {}; render(); })}>Hide all</button>
    <button class="btn" ${on(() => startQuiz({ title: d.title.split("·")[1].trim() + " quiz", pool: d.words.map(w => ({ l: w[1], a: w[0], e: w[2], src: "Reading" })), n: d.words.length, types: ["read", "read", "mc_en"], distract: READING_DRILLS.flatMap(x => x.words).map(w => ({ l: w[1], a: w[0], e: w[2] })) }))}>✅ Quiz me</button></div>`);
};

V.stories = () => {
  header("Stories");
  view(`<div class="tip">📖 Every story is written fully in Darija. Turn off <b>Latin</b> to practise reading the Arabic script, and tap any line to hear it.</div>` +
    STORIES.map(s => `<button class="unit ${S.stories[s.id] ? "done" : ""}" ${on(() => go("story", { id: s.id }))}>
      <div class="ic" style="background:${s.color}22">${s.emoji}</div><div class="tx"><b>${esc(s.title)}</b><small>${esc(s.en)} · ${s.level} · ${s.lines.length} lines</small></div>${IC.next}</button>`).join(""));
};

V.story = p => {
  const s = STORIES.find(x => x.id === p.id);
  header(s.en);
  if (!p.t) p.t = { ar: true, lat: true, en: false };
  p.rev = p.rev || {};
  const chip = (k, label) => `<button class="chip ${p.t[k] ? "on" : ""}" ${on(() => { p.t[k] = !p.t[k]; if (!p.t.ar && !p.t.lat) p.t.ar = true; render(true); })}>${label}</button>`;
  view(`<div class="story-hero" style="background:linear-gradient(135deg,${s.color},${s.color}cc)"><div class="em">${s.emoji}</div><h3>${esc(s.title)}</h3><div>${esc(s.en)} · ${s.level}</div></div>
    <div class="toggles">${chip("ar", "العربية Arabic")}${chip("lat", "Latin")}${chip("en", "English")}
      <button class="chip" ${on(() => playAll(s))}>▶ Read aloud</button></div>
    ${s.lines.map((L, k) => `<button class="line" id="ln${k}" ${on(() => { p.rev[k] = !p.rev[k]; speak(L[0]); const e = $("#ln" + k + " .le"); if (e) e.hidden = !(p.t.en || p.rev[k]); })}>
      ${p.t.ar ? `<div class="la">${tapAr(L[0])}</div>` : ""}${p.t.lat ? `<div class="ll">${esc(L[1])}</div>` : ""}
      <div class="le" ${p.t.en || p.rev[k] ? "" : "hidden"}>${esc(L[2])}</div></button>`).join("")}
    <p class="muted small" style="text-align:center">Tap a line to hear it and see the translation.</p>
    <button class="btn" ${on(() => {
      const first = !S.stories[s.id]; S.stories[s.id] = 1; save(); if (first) addXP(30); else checkBadges();
      startQuiz({ title: s.en + " quiz", pool: s.lines.map(L => ({ l: L[1], a: L[0], e: L[2], src: s.en })), n: 6, types: ["mc_en", "read"] });
    })}>✓ Finish & take the quiz</button>`);
};
function playAll(s) {
  stopSpeech();
  s.lines.forEach((L, k) => speak(L[0], k > 0));
}

/* ================= talk ================= */
V.talk = () => {
  header("Talk", xpPill());
  view(`<div class="tip">💬 Practise the conversations you'll really have. Pick the right reply to keep the chat going.</div>
    <h2>Conversations</h2>` +
    DIALOGUES.map(d => `<button class="unit ${S.dialogues[d.id] ? "done" : ""}" ${on(() => go("dialogue", { id: d.id }))}><div class="ic">${d.emoji}</div><div class="tx"><b>${esc(d.title)}</b><small>${esc(d.scene)}</small></div>${IC.next}</button>`).join("") +
    `<h2>Moroccan wisdom</h2>
    <button class="unit" ${on(() => go("proverbs"))}><div class="ic">🦉</div><div class="tx"><b>Proverbs</b><small>${Object.keys(S.proverbs).length} / ${PROVERBS.length} learned</small></div>${IC.next}</button>
    <h2>Grammar for speaking</h2>
    <button class="unit" ${on(() => tab("learn"))}><div class="ic">🧱</div><div class="tx"><b>Pronouns, verbs, negation…</b><small>In the Learn tab</small></div>${IC.next}</button>`);
};

V.dialogue = p => {
  const d = DIALOGUES.find(x => x.id === p.id);
  header(d.title, `<button class="chip ${p.hints ? "on" : ""}" style="font-size:12px" ${on(() => { p.hints = !p.hints; render(true); })}>Hints</button>`);
  if (p.k == null) { p.k = 0; p.log = []; advance(p, d, true); }
  const bubble = m => `<div class="msg ${m.who}"><div class="ml">${esc(m.l)}</div>${S.set.arabic ? `<div class="ma">${esc(m.a)}</div>` : ""}<div class="me">${esc(m.e)}</div><button ${on(() => speak(m.a))}>${IC.spk.replace('<svg', '<svg style="width:18px;height:18px"')}</button></div>`;
  const step = d.steps[p.k];
  let panel = "";
  if (step && step.who === "you") {
    if (!step._sh) step._sh = shuffle(step.options);
    panel = `<div class="choices"><div class="muted small" style="margin-bottom:8px;font-weight:700">💬 Choose your reply</div>${step._sh.map((o, k) => `<button class="opt" ${on(el => pick(p, d, o, el))}>${esc(o[0])}${S.set.arabic ? `<span class="oa">${esc(o[1])}</span>` : ""}${p.hints ? `<span class="small muted">${esc(o[2])}</span>` : ""}</button>`).join("")}<div id="hint" class="small" style="color:var(--red);font-weight:600"></div></div>`;
  } else if (!step) {
    panel = `<div class="card" style="text-align:center"><div style="font-size:40px">🎉</div><b>Conversation complete!</b><p class="muted small">${p.mistakes ? p.mistakes + " wrong tries" : "Perfect — no mistakes!"}</p>
      <div class="btns"><button class="btn sec" ${on(() => { p.k = null; p.mistakes = 0; d.steps.forEach(s => delete s._sh); render(); })}>↻ Again</button><button class="btn" ${on(() => back())}>Done</button></div></div>`;
    if (!p.awarded) { p.awarded = true; const first = !S.dialogues[d.id]; S.dialogues[d.id] = 1; save(); addXP(first ? 40 : 15); }
  }
  view(`<div class="scene">🎬 ${esc(d.scene)}</div>${p.log.map(bubble).join("")}${panel}<div style="height:20px"></div>`);
  window.scrollTo(0, document.body.scrollHeight);
};
function advance(p, d, silent) {
  while (d.steps[p.k] && d.steps[p.k].who === "them") {
    const s = d.steps[p.k]; p.log.push({ who: "them", l: s.l, a: s.a, e: s.e });
    if (!silent || p.k === 0) setTimeout(() => speak(s.a), 300);
    p.k++;
  }
}
function pick(p, d, o, el) {
  if (o[3]) {
    p.log.push({ who: "you", l: o[0], a: o[1], e: o[2] });
    p.k++; advance(p, d); render(true);
  } else {
    p.mistakes = (p.mistakes || 0) + 1;
    el.classList.add("bad", "shake");
    $("#hint").textContent = "✗ " + (o[4] || "Try another reply.");
  }
}

V.proverbs = () => {
  header("Proverbs");
  const n = Object.keys(S.proverbs).length;
  view(`${searchBox("Search proverbs…", "q")}
    <div class="muted small" style="display:flex;justify-content:space-between;margin-bottom:6px"><span>${n} learned · ${PROVERBS.length - n} remaining</span><span>${n}/${PROVERBS.length}</span></div>
    <div class="prog" style="margin-bottom:14px"><i style="width:${n / PROVERBS.length * 100}%"></i></div><div id="list"></div>`);
  const draw = q => {
    q = norm(q);
    $("#list").innerHTML = PROVERBS.map((pv, i) => [pv, i]).filter(([pv]) => !q || norm(pv.join(" ")).includes(q)).map(([pv, i]) => `
      <div class="card prov"><div class="acts">${spkBtn(pv[1])}<button class="chip ${S.proverbs[i] ? "on" : ""}" ${on(el => {
        if (S.proverbs[i]) delete S.proverbs[i]; else { S.proverbs[i] = 1; addXPQuiet(3); checkBadges(); }
        save(); el.classList.toggle("on", !!S.proverbs[i]); el.textContent = S.proverbs[i] ? "✓ Learned" : "Mark learned";
      })}>${S.proverbs[i] ? "✓ Learned" : "Mark learned"}</button></div>
        ${S.set.latin || !S.set.arabic ? `<div class="pl">${esc(pv[0])}</div>` : ""}${S.set.arabic ? `<div class="pa">${esc(pv[1])}</div>` : ""}
        <div class="pe">“${esc(pv[2])}”</div>
        <div class="pm"><small>Meaning</small>${esc(pv[3])}</div></div>`).join("") || `<div class="empty">No match</div>`;
  };
  draw("");
  $("#q").addEventListener("input", e => draw(e.target.value));
};

/* ================= me ================= */
V.me = () => {
  header("Me", `<button class="hbtn" aria-label="Settings" ${on(() => go("settings"))}>${IC.gear}</button>`);
  const nextB = BADGES.find(b => !S.badges[b.id]);
  const unlocked = Object.keys(S.badges).length;
  view(`<div class="hero"><h3>Your progress</h3><div class="stats">
      <div class="stat"><b>🔥 ${curStreak()}</b><span>streak (best ${S.best || 0})</span></div>
      <div class="stat"><b>⭐ ${S.xp}</b><span>XP</span></div>
      <div class="stat"><b>🎓 ${COURSE.filter(lessonDone).length}/${COURSE.length}</b><span>lessons</span></div></div></div>
    ${nextB ? `<div class="card"><div style="display:flex;gap:14px;align-items:center"><div class="bdg" style="box-shadow:none;padding:0"><div class="bi">${nextB.icon}</div></div>
      <div style="flex:1"><div class="muted small">Next badge</div><b>${esc(nextB.name)}</b><div class="small" style="color:var(--clay)">${esc(nextB.desc)}</div></div></div>
      <div class="prog" style="margin-top:12px"><i style="width:${Math.min(100, badgeValue(nextB) / nextB.n * 100)}%"></i></div>
      <div class="muted small" style="text-align:center;margin-top:6px">${Math.min(badgeValue(nextB), nextB.n)} / ${nextB.n}</div></div>` : ""}
    <h2>Badges · ${unlocked}/${BADGES.length}</h2>
    <div class="grid3">${BADGES.map(b => `<div class="bdg ${S.badges[b.id] ? "got" : "lock"}"><div class="bi">${b.icon}</div><b>${esc(b.name)}</b><small>${S.badges[b.id] ? esc(S.badges[b.id]) : esc(b.desc)}</small></div>`).join("")}</div>
    <h2>More</h2>
    <button class="unit" ${on(() => go("favs"))}><div class="ic">❤️</div><div class="tx"><b>Favourites</b><small>${Object.keys(S.favs).length} saved</small></div>${IC.next}</button>
    <button class="unit" ${on(() => go("review"))}><div class="ic">🔁</div><div class="tx"><b>Review</b><small>${dueItems().length} due</small></div>${IC.next}</button>
    <button class="unit" ${on(() => go("settings"))}><div class="ic">⚙️</div><div class="tx"><b>Settings</b><small>Script, voice, daily goal</small></div>${IC.next}</button>
    ${weekChart()}`);
};
function weekChart() {
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const k = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); days.push([k, S.daily[k] || 0, "SMTWTFS"[d.getDay()]]); }
  const max = Math.max(S.goal, ...days.map(d => d[1]));
  return `<h2>Last 7 days</h2><div class="card"><div style="display:flex;align-items:flex-end;gap:8px;height:110px">${days.map(d => `<div style="flex:1;text-align:center"><div style="height:${Math.max(3, d[1] / max * 86)}px;border-radius:6px;background:${d[1] >= S.goal ? "var(--saffron)" : "var(--teal2)"};opacity:${d[1] ? 1 : .25}"></div><div class="small muted" style="margin-top:4px">${d[2]}</div></div>`).join("")}</div>
    <div class="muted small" style="margin-top:6px">XP per day · gold = goal reached</div></div>`;
}

V.settings = () => {
  header("Settings");
  const sw = (k, label, sub) => `<div class="setrow"><div><b>${label}</b><div class="muted small">${sub}</div></div><button class="sw ${S.set[k] ? "on" : ""}" ${on(el => {
    S.set[k] = !S.set[k]; if (!S.set.arabic && !S.set.latin) S.set.latin = true; save(); render(true);
  })}></button></div>`;
  let tts = "browser";
  if (window.AndroidTTS) { try { tts = AndroidTTS.status(); } catch (e) {} }
  view(`<h2 style="margin-top:4px">Appearance</h2>
    <div class="toggles">${THEMES.map(([k, n]) => `<button class="chip ${(S.set.theme || "system") === k ? "on" : ""}" ${on(() => { setTheme(k); render(true); })}>${n}</button>`).join("")}</div>
    <div class="card" style="padding:4px 16px">
      ${sw("arabic", "Show Arabic script", "العربية — for reading practice")}
      ${sw("latin", "Show transliteration", "Latin letters (Arabizi)")}
      <div class="setrow"><div><b>Speech speed</b><div class="muted small" id="rv">${S.set.rate.toFixed(2)}×</div></div><input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="${S.set.rate}"></div>
      <div class="setrow"><div><b>Daily goal</b><div class="muted small">XP per day</div></div><select id="goal">${[10, 20, 30, 50, 80].map(g => `<option ${g === S.goal ? "selected" : ""}>${g}</option>`).join("")}</select></div>
    </div>
    ${window.AndroidTTS && AndroidTTS.getReminder ? (() => { let r = { on: false, h: 19, m: 0 }; try { r = JSON.parse(AndroidTTS.getReminder()); } catch (e) {}
      return `<h2>Daily reminder</h2><div class="card" style="padding:4px 16px">
      <div class="setrow"><div><b>Remind me every day</b><div class="muted small">Skipped on days you've already studied</div></div><button class="sw ${r.on ? "on" : ""}" id="remsw"></button></div>
      <div class="setrow"><div><b>Time</b></div><input type="time" id="remtime" value="${pad(r.h)}:${pad(r.m)}" style="background:var(--card);border:1.5px solid var(--line);border-radius:10px;padding:6px 8px"></div>
      <div class="setrow"><div class="muted small">Check how it looks</div><button class="btn sec sm" ${on(() => { try { AndroidTTS.testReminder(); toast("Test notification sent"); } catch (e) {} })}>🔔 Test</button></div></div>`; })() : ""}
    <h2>Voice</h2>
    <div class="card"><p class="small" style="margin-top:0">Audio uses your phone's Arabic text-to-speech voice. It reads the Arabic spelling, so it sounds close to Darija but not exactly like a Moroccan speaker.</p>
      <p class="small">Status: <b>${tts === "ok" ? "✓ Arabic voice ready" : tts === "missing" ? "⚠ No Arabic voice installed" : tts === "init" ? "Starting…" : tts === "browser" ? "Browser voice" : esc(tts)}</b></p>
      <div class="btns"><button class="btn sec" ${on(() => speak("السلام عليكم، لاباس عليك؟"))}>🔊 Test</button>
      ${window.AndroidTTS ? `<button class="btn sec" ${on(() => { try { AndroidTTS.openSettings(); } catch (e) {} })}>Install voice</button>` : ""}</div>
      ${tts === "missing" ? `<p class="small muted">Tap “Install voice”, choose Speech Services by Google → Install voice data → Arabic.</p>` : ""}
    </div>
    <h2>Data</h2>
    <button class="btn sec" style="border-color:var(--red);color:var(--red)" ${on(() => { if (confirm("Reset all progress, XP, streak and badges?")) { S = JSON.parse(JSON.stringify(DEF)); save(); tab("home"); } })}>Reset progress</button>
    <p class="muted small" style="text-align:center;margin-top:20px">Darija Daba · v1.7 · works fully offline</p>`);
  $("#rate").addEventListener("input", e => { S.set.rate = +e.target.value; $("#rv").textContent = S.set.rate.toFixed(2) + "×"; save(); });
  $("#rate").addEventListener("change", () => speak("مرحبا"));
  $("#goal").addEventListener("change", e => { S.goal = +e.target.value; save(); });
  const remSave = () => { const [h, m] = ($("#remtime").value || "19:00").split(":").map(Number); AndroidTTS.setReminder($("#remsw").classList.contains("on"), h, m); };
  if ($("#remsw")) {
    $("#remsw").onclick = () => { $("#remsw").classList.toggle("on"); remSave(); toast($("#remsw").classList.contains("on") ? "🔔 Daily reminder on" : "Reminder off"); };
    $("#remtime").onchange = remSave;
  }
};
window.onNotifDenied = () => toast("Notifications are blocked — allow them in Android settings → Apps → Darija Daba");

/* ================= theme ================= */
const THEMES = [["system", "📱 System"], ["light", "☀️ Light"], ["dark", "🌙 Dark"], ["black", "⚫ Black"]];
function applyTheme() {
  let t = S.set.theme || "system";
  if (t === "system") {
    let night = false;
    try { night = window.AndroidTTS && AndroidTTS.isNight ? AndroidTTS.isNight() : matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) {}
    t = night ? "dark" : "light";
  }
  document.documentElement.dataset.theme = t;
  const css = getComputedStyle(document.documentElement), v = k => css.getPropertyValue(k).trim();
  try { if (window.AndroidTTS && AndroidTTS.setBars) AndroidTTS.setBars(v("--teal"), v("--card"), v("--bg"), t === "light"); } catch (e) {}
}
window.applyTheme = applyTheme;
function setTheme(t) { S.set.theme = t; save(); applyTheme(); }
function cycleTheme() {
  const order = ["light", "dark", "black"], cur = document.documentElement.dataset.theme;
  const nx = order[(order.indexOf(cur) + 1) % order.length];
  setTheme(nx); toast(THEMES.find(x => x[0] === nx)[1] + " mode");
}
try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme); } catch (e) {}

/* ================= boot ================= */
applyTheme();
render();
if ("speechSynthesis" in window) speechSynthesis.getVoices();
