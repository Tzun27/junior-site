/* =================================================================
   v3 — 新生支持辦公室 · script
   -----------------------------------------------------------------
   i18n note: every renderer that emits user-facing text is idempotent
   and re-runs on the document 'langchange' event (dispatched by i18n.js
   on boot and on every locale toggle). For static HTML, i18n.js handles
   text via [data-i18n] attributes directly.
   ================================================================= */

const T = (k) => (window.I18N ? window.I18N.t(k) : k);
const LANG = () => (window.I18N ? window.I18N.getLang() : "zh-Hant");

// Pick a per-locale field. Accepts either a plain string (legacy) or
// an object { "zh-Hant": "...", "en": "..." } shape. Always falls back
// to zh-Hant when the requested locale is missing — important because
// most FAQ/schedule entries are still zh-only in the prototype.
function pickLocale(field) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[LANG()] ?? field["zh-Hant"] ?? "";
}

function onLangChange(fn) {
  document.addEventListener("langchange", fn);
}

/* ---------- nav ---------- */
const NAV = [
  { num: "00", labelKey: "nav.scene00", href: "#scene-00" },
  { num: "01", labelKey: "nav.scene01", href: "#scene-01" },
  { num: "02", labelKey: "nav.scene02", href: "#scene-02" },
  { num: "03", labelKey: "nav.scene03", href: "#scene-03" },
  { num: "04", labelKey: "nav.scene04", href: "#scene-04" },
  { num: "05", labelKey: "nav.scene05", href: "#scene-05" },
  { num: "06", labelKey: "nav.scene06", href: "#scene-06" },
];

(function buildTopnav() {
  const nav = document.getElementById("topnav");

  function render() {
    nav.innerHTML = "";
    for (const it of NAV) {
      const a = document.createElement("a");
      a.href = it.href;
      a.textContent = T(it.labelKey);
      nav.appendChild(a);
    }
  }
  // Defer initial render to first langchange (fired by i18n boot once the
  // catalog is loaded) — avoids a flash of "nav.scene00" key strings.
  if (window.I18N && window.I18N.isReady()) render();
  onLangChange(render);

  const toggle = document.getElementById("menuToggle");
  toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") nav.classList.remove("is-open");
  });

  const bar = document.getElementById("topbar");
  const updateBar = () => bar.classList.toggle("is-scrolled", window.scrollY > 32);
  updateBar();
  window.addEventListener("scroll", updateBar, { passive: true });
})();

/* ---------- right-edge scene rail ---------- */
(function buildRail() {
  const rail = document.getElementById("sceneRail");

  function render() {
    rail.innerHTML = "";
    for (const it of NAV) {
      const b = document.createElement("button");
      b.dataset.target = it.href;
      b.innerHTML = `<span class="dash"></span><span>${it.num}</span><span class="label">${escapeHTML(T(it.labelKey))}</span>`;
      b.addEventListener("click", () => {
        document.querySelector(it.href).scrollIntoView({ behavior: "smooth", block: "start" });
      });
      rail.appendChild(b);
    }
    // active-scene wiring re-binds since we rebuilt buttons
    rewireActiveRail();
  }
  if (window.I18N && window.I18N.isReady()) render();
  onLangChange(render);
})();

/* ---------- hero entrance — mask-then-zoom (feedback pt 2) ----------
   On load the hero shows the dark mask with the title large + lifted.
   After a short hold we add .is-settled: the mask fades out and the
   content zooms down to the bottom-left corner. Reduced-motion users
   skip straight to the settled state. */
(function heroIntro() {
  const hero = document.getElementById("scene-00");
  if (!hero) return;
  const content = hero.querySelector(".hero-content");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    hero.classList.add("is-settled");
    return;
  }
  // Pin the entrance copy to the exact centre of the hero. The CSS calc is
  // only a close approximation (so there's no pre-JS flash) — measure the
  // resting box here and correct the translate precisely.
  if (content) {
    content.style.transition = "none";
    content.style.transform = "none";                 // measure at rest
    const c = content.getBoundingClientRect();
    const h = hero.getBoundingClientRect();
    const dx = (h.left + h.width / 2) - (c.left + c.width / 2);
    const dy = (h.top + h.height / 2) - (c.top + c.height / 2);
    content.style.transform = `translate(${dx}px, ${dy}px) scale(1.3)`;
    requestAnimationFrame(() => { content.style.transition = ""; });
  }
  window.setTimeout(() => {
    hero.classList.add("is-settled");
    if (content) content.style.transform = "";        // hand back to CSS → none
  }, 2800);
})();

/* ---------- visitor count (feedback pt 6) ----------
   Shows a pageview count in the gold utility strip. The number source is
   isolated behind getVisitorCount() so a real backend can drop in later
   without touching the render code below.

   >>> SWAP POINT <<<
   Replace the body of getVisitorCount() with a real counter when one is
   available — e.g. `return fetch("/api/visits").then(r => r.json())` and
   make this IIFE await it, or inject a server-rendered value. As long as
   getVisitorCount() resolves to a number, nothing else here changes. */
(function visitorCount() {
  const SEED = 18430;
  const KEY = "vmay15.visits";

  function getVisitorCount() {
    let n;
    try {
      n = parseInt(window.localStorage.getItem(KEY), 10);
      if (!Number.isFinite(n)) n = SEED;
      n += 1;
      window.localStorage.setItem(KEY, String(n));
    } catch (e) {
      n = SEED;
    }
    return n;
  }

  const el = document.getElementById("visitorCountNum");
  if (!el) return;
  const count = getVisitorCount();
  const fmt = () => { el.textContent = Number(count).toLocaleString(LANG() === "en" ? "en-US" : "zh-Hant"); };
  // OK to render immediately — number formatting works without a catalog.
  fmt();
  onLangChange(fmt);
})();

/* ---------- president expand ---------- */
(function presidentExpand() {
  const btn = document.getElementById("presidentExpand");
  const full = document.getElementById("presidentFull");
  const label = btn.querySelector(".label");

  function syncLabel() {
    const open = full.classList.contains("is-open");
    label.textContent = T(open ? "scene04.collapse" : "scene04.expand");
  }
  if (window.I18N && window.I18N.isReady()) syncLabel();
  onLangChange(syncLabel);

  btn.addEventListener("click", () => {
    const open = full.classList.toggle("is-open");
    btn.classList.toggle("is-open", open);
    syncLabel();
  });
})();

/* ---------- threads (學業 / 生活 / 培力) ---------- */
const THREADS = {
  "scene-01": [
    { ord: "i", headKey: "threads.s1.head1", items: [
      { type: "plain", keys: ["threads.s1.h1.i1.l1", "threads.s1.h1.i1.l2"] },
      { type: "plain", keys: ["threads.s1.h1.i2.l1"] },
      { type: "plain", keys: ["threads.s1.h1.i3.l1", "threads.s1.h1.i3.l2"] },
      { type: "link",  keys: ["threads.s1.h1.i4.l1"] },
    ] },
    { ord: "ii", headKey: "threads.s1.head2", items: [
      { type: "plain", keys: ["threads.s1.h2.i1.l1"] },
      { type: "plain", keys: ["threads.s1.h2.i2.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i3.l1"] },
      { type: "plain", keys: ["threads.s1.h2.i4.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i5.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i6.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i7.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i8.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i9.l1"] },
      { type: "plain", keys: ["threads.s1.h2.i10.l1", "threads.s1.h2.i10.l2"] },
      { type: "link",  keys: ["threads.s1.h2.i11.l1"] },
      { type: "link",  keys: ["threads.s1.h2.i12.l1"] },
    ] },
    { ord: "iii", headKey: "threads.s1.head3", items: [
      { type: "link",  keys: ["threads.s1.h3.i1.l1"] },
      { type: "plain", keys: ["threads.s1.h3.i2.l1"] },
      { type: "plain", keys: ["threads.s1.h3.i3.l1"] },
      { type: "link",  keys: ["threads.s1.h3.i4.l1"] },
      { type: "link",  keys: ["threads.s1.h3.i5.l1"] },
      { type: "link",  keys: ["threads.s1.h3.i6.l1"] },
      { type: "link",  keys: ["threads.s1.h3.i7.l1"] },
      { type: "link",  keys: ["threads.s1.h3.i8.l1"] },
    ] },
  ],
  "scene-02": [
    { ord: "i", headKey: "threads.s2.head1", items: [
      { type: "plain", keys: ["threads.s2.h1.i1.l1", "threads.s2.h1.i1.l2"] },
      { type: "plain", keys: ["threads.s2.h1.i2.l1"] },
      { type: "link",  keys: ["threads.s2.h1.i3.l1"] },
      { type: "plain", keys: ["threads.s2.h1.i4.l1", "threads.s2.h1.i4.l2"] },
      { type: "link",  keys: ["threads.s2.h1.i5.l1"] },
    ] },
    { ord: "ii", headKey: "threads.s2.head2", items: [
      { type: "plain", keys: ["threads.s2.h2.i1.l1"] },
      { type: "plain", keys: ["threads.s2.h2.i2.l1", "threads.s2.h2.i2.l2", "threads.s2.h2.i2.l3"] },
    ] },
    { ord: "iii", headKey: "threads.s2.head3", items: [
      { type: "accent", keys: ["threads.s2.h3.i1.l1", "threads.s2.h3.i1.l2"] },
    ] },
    { ord: "iv", headKey: "threads.s2.head4", items: [
      { type: "plain", keys: ["threads.s2.h4.i1.l1"] },
      { type: "plain", keys: ["threads.s2.h4.i2.l1", "threads.s2.h4.i2.l2"] },
      { type: "link",  keys: ["threads.s2.h4.i3.l1"] },
      { type: "link",  keys: ["threads.s2.h4.i4.l1"] },
    ] },
  ],
  "scene-03": [
    { ord: "i", headKey: "threads.s3.head1", items: [
      { type: "plain", keys: ["threads.s3.h1.i1.l1"] },
      { type: "plain", keys: ["threads.s3.h1.i2.l1", "threads.s3.h1.i2.l2"] },
      { type: "link",  keys: ["threads.s3.h1.i3.l1"] },
      { type: "link",  keys: ["threads.s3.h1.i4.l1"] },
      { type: "link",  keys: ["threads.s3.h1.i5.l1"] },
    ] },
    { ord: "ii", headKey: "threads.s3.head2", items: [
      { type: "plain", keys: ["threads.s3.h2.i1.l1"] },
      { type: "plain", keys: ["threads.s3.h2.i2.l1"] },
      { type: "link",  keys: ["threads.s3.h2.i3.l1"] },
      { type: "link",  keys: ["threads.s3.h2.i4.l1"] },
    ] },
    { ord: "iii", headKey: "threads.s3.head3", items: [
      { type: "plain", keys: ["threads.s3.h3.i1.l1"] },
      { type: "plain", keys: ["threads.s3.h3.i2.l1"] },
      { type: "link",  keys: ["threads.s3.h3.i3.l1"] },
      { type: "link",  keys: ["threads.s3.h3.i4.l1"] },
    ] },
  ],
};

(function buildThreads() {
  function render() {
    for (const [sceneId, sets] of Object.entries(THREADS)) {
      const root = document.querySelector(`#${sceneId} .threads`);
      if (!root) continue;
      root.innerHTML = "";
      sets.forEach((set, idx) => {
        const card = document.createElement("article");
        card.className = "thread reveal is-in";  // skip the reveal anim on re-render
        card.dataset.stagger = String((idx % 6) + 1);
        const head = document.createElement("header");
        head.className = "thread__head";
        head.innerHTML = `<h3>${escapeHTML(T(set.headKey))}</h3><span class="ord">${set.ord}</span>`;
        card.appendChild(head);
        const ul = document.createElement("ul");
        ul.className = "thread__list";
        for (const it of set.items) {
          const li = document.createElement("li");
          const cls = it.type === "link" ? "is-link"
                    : it.type === "accent" ? "is-accent"
                    : "";
          if (cls) li.className = cls;
          li.innerHTML = it.keys
            .map((k, i) => i === 0 ? escapeHTML(T(k)) : `<small>${escapeHTML(T(k))}</small>`)
            .join("");
          ul.appendChild(li);
        }
        card.appendChild(ul);
        root.appendChild(card);
      });
    }
  }
  if (window.I18N && window.I18N.isReady()) render();
  onLangChange(render);
})();

/* ---------- schedule (grafted from v4 — editorial table) ---------- */
async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}

(async function buildSchedule() {
  let rows = [];
  try { rows = await loadJSON("data/schedule.json"); }
  catch (e) { console.warn("schedule fetch failed", e); }

  const body = document.getElementById("scheduleBody");
  const statRows = document.getElementById("statRows");
  const tabs = document.querySelectorAll("#whoTabs .who-tab");

  // Audience canonical codes — entries in schedule.json use these directly.
  // Tab buttons carry data-audience-code; the visible label is filled from
  // the catalog (see annotate index.html).
  const AUDIENCE_UNDERGRAD = "undergrad";
  const AUDIENCE_GRAD = "grad";

  // Enrich each row with its set of audiences. JSON entries carry `who` as
  // a code or array of codes; legacy strings get normalised.
  const enriched = rows.map(r => {
    const audiences = new Set();
    const w = r.who;
    if (Array.isArray(w)) w.forEach(a => audiences.add(a));
    else if (typeof w === "string") audiences.add(w);
    // Some legacy entries name a second audience inside the content body —
    // we previously detected this from the Chinese string; with structured
    // localised content we trust the `who` field.
    return { ...r, audiences: [...audiences] };
  });

  if (statRows) statRows.textContent = enriched.length;

  // Legacy data once encoded second-audience hints as trailing ；一般新生/轉學生
  // strings inside the Chinese content. We carry the audience codes structurally
  // now, so strip those markers (zh side only) before rendering.
  function stripWhoMentions(s) {
    return String(s || "")
      .replace(/[；;]\s*一般新生\/轉學生\s*$/g, "")
      .replace(/[；;]\s*碩\/專\/博班新生\s*$/g, "");
  }

  let active = AUDIENCE_UNDERGRAD;

  function render() {
    body.innerHTML = "";
    let i = 0;
    enriched
      .filter(r => !active || r.audiences.includes(active))
      .forEach(r => {
        i += 1;
        const audiencePills = r.audiences
          .map(a => `<span class="who-pill">${escapeHTML(T("scene05.audience." + a))}</span>`)
          .join("");
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="cell-num" data-label="#">${String(i).padStart(2, "0")}</td>
          <td class="cell-item" data-label="${escapeHTML(T("scene05.col.item"))}"><a href="#">${escapeHTML(pickLocale(r.item))}</a></td>
          <td class="cell-time" data-label="${escapeHTML(T("scene05.col.time"))}">${escapeHTML(pickLocale(r.time))}</td>
          <td class="cell-content" data-label="${escapeHTML(T("scene05.col.content"))}">${formatMulti(stripWhoMentions(pickLocale(r.content)))}${audiencePills ? `<div class="who-pills">${audiencePills}</div>` : ""}</td>
          <td class="cell-dept" data-label="${escapeHTML(T("scene05.col.dept"))}">${escapeHTML(pickLocale(r.dept))}</td>
        `;
        body.appendChild(tr);
      });
    if (!body.children.length) {
      body.innerHTML = `<tr><td colspan="5" style="padding:36px;text-align:center;color:var(--ncku-grey-mid);">${escapeHTML(T("scene05.empty"))}</td></tr>`;
    }
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      active = t.dataset.audienceCode || AUDIENCE_UNDERGRAD;
      render();
    });
  });
  if (window.I18N && window.I18N.isReady()) render();
  onLangChange(render);
})();

/* ---------- FAQ (grafted from v4 — underline search + accordion) ---------- */
(async function buildFAQ() {
  let items = [];
  let meta = { hot: [], categories: [] };
  try {
    [items, meta] = await Promise.all([
      loadJSON("data/faq.json"),
      loadJSON("data/faq_meta.json").catch(() => ({ hot: [], categories: [] })),
    ]);
  } catch (e) { console.warn("faq fetch failed", e); }

  const list = document.getElementById("faqList");
  const empty = document.getElementById("faqEmpty");
  const search = document.getElementById("faqSearch");
  const select = document.getElementById("faqCategory");
  const hotEl = document.getElementById("hotKeywords");
  const counter = document.getElementById("resultCount");
  const form = document.getElementById("faqForm");

  // hot keywords — from meta, fallback to a sensible set. These stay in zh
  // even in EN mode because they're shortcuts into Chinese FAQ content.
  const HOT = (meta.hot && meta.hot.length) ? meta.hot
    : ["宿舍", "選課", "交換生", "學號", "申請", "註冊"];
  HOT.forEach(k => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = k;
    b.addEventListener("click", () => { search.value = k; render(); });
    hotEl.appendChild(b);
  });

  // category select — derive from items; categories are per-locale objects.
  function rebuildCategorySelect() {
    const prevVal = select.value;
    // keep the "All" option (which is annotated with data-i18n)
    select.innerHTML = "";
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = T("scene06.category.all");
    select.appendChild(allOpt);
    const seen = new Set();
    items.forEach(it => {
      const code = it.categoryId || (typeof it.category === "string" ? it.category : pickLocale(it.category));
      if (!code || seen.has(code)) return;
      seen.add(code);
      const o = document.createElement("option");
      o.value = code;
      o.textContent = pickLocale(it.category) || code;
      select.appendChild(o);
    });
    // restore previous selection if still valid
    if (prevVal && [...select.options].some(o => o.value === prevVal)) {
      select.value = prevVal;
    }
  }
  rebuildCategorySelect();

  function itemMatches(it, q, cat) {
    if (cat) {
      const code = it.categoryId || (typeof it.category === "string" ? it.category : pickLocale(it.category));
      if (code !== cat) return false;
    }
    if (q) {
      // Search across both locales of question/answer so a zh-only entry is
      // still findable when the UI is in EN mode.
      const hay = [
        flatten(it.question), flatten(it.answer), flatten(it.category),
      ].join(" ");
      if (!hay.toLowerCase().includes(q.toLowerCase())) return false;
    }
    return true;
  }

  // collect all locale values of a possibly-localised field into one string
  function flatten(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return Object.values(field).join(" ");
  }

  function render() {
    const q = search.value.trim();
    const cat = select.value;
    const filtered = items.filter(it => itemMatches(it, q, cat));

    list.innerHTML = "";
    counter.textContent = filtered.length
      ? T("scene06.count").replace("{n}", filtered.length).replace("{total}", items.length)
      : "";

    if (!filtered.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    filtered.forEach(it => {
      const el = document.createElement("div");
      el.className = "faq-item";
      el.innerHTML = `
        <button class="faq-bar" aria-expanded="false">
          <span class="qid">${escapeHTML(it.id)}</span>
          <span class="qcat">${escapeHTML(pickLocale(it.category))}</span>
          <span class="qtext">${escapeHTML(pickLocale(it.question))}</span>
          <span class="toggle" aria-hidden="true">+</span>
        </button>
        <div class="faq-content">
          <div class="answer">${formatAnswer(pickLocale(it.answer))}</div>
          <div class="meta">
            <span><b>${escapeHTML(T("scene06.faq.unit"))}</b>${escapeHTML(pickLocale(it.unit) || "—")}</span>
            <span><b>${escapeHTML(T("scene06.faq.views"))}</b>${Number(it.views || 0).toLocaleString()}</span>
          </div>
        </div>
      `;
      const bar = el.querySelector(".faq-bar");
      bar.addEventListener("click", () => {
        const open = el.classList.toggle("open");
        bar.setAttribute("aria-expanded", open ? "true" : "false");
      });
      list.appendChild(el);
    });
  }

  search.addEventListener("input", render);
  select.addEventListener("change", render);
  if (form) form.addEventListener("submit", e => { e.preventDefault(); render(); });
  if (window.I18N && window.I18N.isReady()) render();
  onLangChange(() => { rebuildCategorySelect(); render(); });
})();

/* ---------- floating action button ---------- */
(function fab() {
  const fab = document.getElementById("fab");
  const toggle = fab.querySelector(".fab__toggle");
  toggle.addEventListener("click", e => {
    e.stopPropagation();
    fab.classList.toggle("is-open");
  });
  document.addEventListener("click", e => {
    if (!fab.contains(e.target)) fab.classList.remove("is-open");
  });
  fab.querySelectorAll(".fab__panel a").forEach(a => {
    a.addEventListener("click", () => fab.classList.remove("is-open"));
  });
})();

/* ---------- intersection observer reveal ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add("is-in");
      revealObserver.unobserve(en.target);
    }
  });
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

function observeReveals(nodes) {
  nodes.forEach(n => {
    if (!n.classList.contains("is-in")) revealObserver.observe(n);
  });
}
observeReveals(document.querySelectorAll(".reveal"));

/* ---------- active scene rail (intersection) ----------
   Re-binds whenever the rail is rebuilt (e.g. on language toggle) so the
   observer always points at the current buttons. */
let _railDisconnect = null;
function rewireActiveRail() {
  if (_railDisconnect) _railDisconnect();
  const rail = document.getElementById("sceneRail");
  const buttons = document.querySelectorAll("#sceneRail button");
  const map = new Map();
  buttons.forEach(b => map.set(b.dataset.target, b));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        buttons.forEach(b => b.classList.remove("is-active"));
        const b = map.get("#" + en.target.id);
        if (b) b.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  document.querySelectorAll(".scene, #scene-00").forEach(s => obs.observe(s));

  // The rail is fixed at the viewport's vertical centre. A zero-height band
  // at exactly 50% tells us when a dark (maroon) scene crosses that centre —
  // i.e. precisely when the rail sits over a dark surface — so we can flip
  // it to the light .rail--on-dark scheme without any white-on-white flicker
  // in the inter-scene gaps.
  const darkObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      rail.classList.toggle("rail--on-dark", en.isIntersecting);
    });
  }, { rootMargin: "-50% 0px -50% 0px" });
  document.querySelectorAll(".scene--maroon").forEach(s => darkObs.observe(s));

  _railDisconnect = () => { obs.disconnect(); darkObs.disconnect(); };
}
rewireActiveRail();

/* ---------- helpers ---------- */
function escapeHTML(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c])
  );
}

// split a ；/;-delimited blob into <p> lines (schedule content cells)
function formatMulti(s) {
  return escapeHTML(s)
    .split(/；|;/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join("");
}

// linkify URLs in FAQ answers and preserve newlines as <br>
function formatAnswer(s) {
  const escaped = escapeHTML(s).replace(/\n/g, "<br>");
  return escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );
}
