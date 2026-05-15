/* =================================================================
   v3 — 新生支持辦公室 · script
   ================================================================= */

/* ---------- nav ---------- */
const NAV = [
  { num: "00", label: "序章", href: "#scene-00" },
  { num: "01", label: "學業", href: "#scene-01" },
  { num: "02", label: "生活", href: "#scene-02" },
  { num: "03", label: "培力", href: "#scene-03" },
  { num: "04", label: "校長的話", href: "#scene-04" },
  { num: "05", label: "重要日程", href: "#scene-05" },
  { num: "06", label: "常見問題", href: "#scene-06" },
];

(function buildTopnav() {
  const nav = document.getElementById("topnav");
  for (const it of NAV) {
    const a = document.createElement("a");
    a.href = it.href;
    a.textContent = it.label;
    nav.appendChild(a);
  }
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
  for (const it of NAV) {
    const b = document.createElement("button");
    b.dataset.target = it.href;
    b.innerHTML = `<span class="dash"></span><span>${it.num}</span><span class="label">${it.label}</span>`;
    b.addEventListener("click", () => {
      document.querySelector(it.href).scrollIntoView({ behavior: "smooth", block: "start" });
    });
    rail.appendChild(b);
  }
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
   getVisitorCount() resolves to a number, nothing else here changes.

   For now it's a localStorage-backed per-load counter: it increments once
   per page load and persists across visits on the same browser, so the
   figure feels real rather than hard-coded. */
(function visitorCount() {
  const SEED = 18430;            // baseline so a fresh browser isn't "1"
  const KEY = "vmay15.visits";

  function getVisitorCount() {
    // --- mock implementation — see SWAP POINT note above ---
    let n;
    try {
      n = parseInt(window.localStorage.getItem(KEY), 10);
      if (!Number.isFinite(n)) n = SEED;
      n += 1;
      window.localStorage.setItem(KEY, String(n));
    } catch (e) {
      // localStorage blocked (private mode etc.) — fall back to the seed
      n = SEED;
    }
    return n;
  }

  const el = document.getElementById("visitorCountNum");
  if (!el) return;
  const count = getVisitorCount();
  el.textContent = Number(count).toLocaleString("en-US");  // thousands separators
})();

/* ---------- president expand ---------- */
(function presidentExpand() {
  const btn = document.getElementById("presidentExpand");
  const full = document.getElementById("presidentFull");
  btn.addEventListener("click", () => {
    const open = full.classList.toggle("is-open");
    btn.classList.toggle("is-open", open);
    btn.querySelector(".label").textContent = open ? "收合全文" : "展開全文";
  });
})();

/* ---------- threads (學業 / 生活 / 培力) ---------- */
const THREADS = {
  "scene-01": [
    { ord: "i", head: "查詢學號及資料登錄", items: [
      { type: "plain", lines: ["學士班(含轉學生)", "新生入學須知"] },
      { type: "plain", lines: ["學號查詢"] },
      { type: "plain", lines: ["115學年度分科測驗入學新生", "預計於8/14後開放查詢"] },
      { type: "link",  lines: ["新生資料登錄"] },
    ] },
    { ord: "ii", head: "註冊與選課", items: [
      { type: "plain", lines: ["學雜費收費標準"] },
      { type: "plain", lines: ["繳費流程及注意事項"] },
      { type: "link",  lines: ["學生繳費查詢"] },
      { type: "plain", lines: ["(僅能使用校內IP位址登入)"] },
      { type: "link",  lines: ["臺銀學雜費入口網"] },
      { type: "link",  lines: ["學士班新生選課說明"] },
      { type: "link",  lines: ["課程資訊及選課系統"] },
      { type: "link",  lines: ["學分抵免"] },
      { type: "link",  lines: ["英文免修"] },
      { type: "plain", lines: ["英語能力分級測驗", "及檢定成績上傳"] },
      { type: "link",  lines: ["英外語選課及加簽規定"] },
      { type: "link",  lines: ["踏溯台南"] },
    ] },
    { ord: "iii", head: "學習資源", items: [
      { type: "link",  lines: ["大學預修課程(AP)"] },
      { type: "plain", lines: ["雙語教學資源"] },
      { type: "plain", lines: ["免費課輔活動"] },
      { type: "link",  lines: ["教育學程"] },
      { type: "link",  lines: ["TREVI揪課"] },
      { type: "link",  lines: ["轉系、輔系雙主修"] },
      { type: "link",  lines: ["跨領域學分學程"] },
      { type: "link",  lines: ["專長微學程"] },
    ] },
  ],
  "scene-02": [
    { ord: "i", head: "新生活動", items: [
      { type: "plain", lines: ["成功登大人", "(新鮮人成長營)"] },
      { type: "plain", lines: ["新生體檢"] },
      { type: "link",  lines: ["新生適應力檢測"] },
      { type: "plain", lines: ["UR大學部研究", "Undergraduate Research"] },
      { type: "link",  lines: ["原住民族學生資源中心"] },
    ] },
    { ord: "ii", head: "獎助學金", items: [
      { type: "plain", lines: ["獎學金申請"] },
      { type: "plain", lines: ["榕園圓夢助學網", "(就學貸款、學雜費減免、", "助學、急難救助)"] },
    ] },
    { ord: "iii", head: "Overseas Students", items: [
      { type: "accent", lines: ["Overseas Students", "境外生"] },
    ] },
    { ord: "iv", head: "住宿及交通", items: [
      { type: "plain", lines: ["宿舍申請及介紹"] },
      { type: "plain", lines: ["機車停車證申請", "與自行車管理"] },
      { type: "link",  lines: ["交通資訊"] },
      { type: "link",  lines: ["護送天使"] },
    ] },
  ],
  "scene-03": [
    { ord: "i", head: "幸福成大", items: [
      { type: "plain", lines: ["職業興趣探索與職能診斷"] },
      { type: "plain", lines: ["NCKU FUTURE SUCCESS+", "個人化學職涯規劃系統"] },
      { type: "link",  lines: ["性別平等"] },
      { type: "link",  lines: ["特教服務"] },
      { type: "link",  lines: ["社團e化系統"] },
    ] },
    { ord: "ii", head: "資訊服務", items: [
      { type: "plain", lines: ["資訊與網路服務"] },
      { type: "plain", lines: ["授權軟體下載"] },
      { type: "link",  lines: ["圖書館"] },
      { type: "link",  lines: ["KUAP"] },
    ] },
    { ord: "iii", head: "其他", items: [
      { type: "plain", lines: ["行事曆"] },
      { type: "plain", lines: ["學生會"] },
      { type: "link",  lines: ["學生兵役"] },
      { type: "link",  lines: ["成大校刊"] },
    ] },
  ],
};

(function buildThreads() {
  for (const [sceneId, sets] of Object.entries(THREADS)) {
    const root = document.querySelector(`#${sceneId} .threads`);
    if (!root) continue;
    sets.forEach((set, idx) => {
      const card = document.createElement("article");
      card.className = "thread reveal";
      card.dataset.stagger = String((idx % 6) + 1);
      const head = document.createElement("header");
      head.className = "thread__head";
      head.innerHTML = `<h3>${escapeHTML(set.head)}</h3><span class="ord">${set.ord}</span>`;
      card.appendChild(head);
      const ul = document.createElement("ul");
      ul.className = "thread__list";
      for (const it of set.items) {
        const li = document.createElement("li");
        const cls = it.type === "link" ? "is-link"
                  : it.type === "accent" ? "is-accent"
                  : "";
        if (cls) li.className = cls;
        li.innerHTML = it.lines
          .map((l, i) => i === 0 ? escapeHTML(l) : `<small>${escapeHTML(l)}</small>`)
          .join("");
        ul.appendChild(li);
      }
      card.appendChild(ul);
      root.appendChild(card);
    });
  }
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

  // Enrich each row with its set of audiences (covers cases where the
  // JSON's `who` field omits an audience mentioned in the content blob).
  const enriched = rows.map(r => {
    const audiences = new Set();
    if (r.who) audiences.add(r.who);
    const c = r.content || "";
    if (c.includes("一般新生/轉學生")) audiences.add("一般新生/轉學生");
    if (c.includes("碩/專/博班新生")) audiences.add("碩/專/博班新生");
    return { ...r, audiences: [...audiences] };
  });

  if (statRows) statRows.textContent = enriched.length;

  function stripWhoMentions(s) {
    return String(s)
      .replace(/[；;]\s*一般新生\/轉學生\s*$/g, "")
      .replace(/[；;]\s*碩\/專\/博班新生\s*$/g, "");
  }

  function render(filter) {
    body.innerHTML = "";
    let i = 0;
    enriched
      .filter(r => !filter || r.audiences.includes(filter))
      .forEach(r => {
        i += 1;
        const tr = document.createElement("tr");
        const audiencePills = r.audiences
          .map(a => `<span class="who-pill">${escapeHTML(a)}</span>`)
          .join("");
        tr.innerHTML = `
          <td class="cell-num" data-label="#">${String(i).padStart(2, "0")}</td>
          <td class="cell-item" data-label="事項"><a href="#">${escapeHTML(r.item)}</a></td>
          <td class="cell-time" data-label="辦理時間">${escapeHTML(r.time)}</td>
          <td class="cell-content" data-label="內容">${formatMulti(stripWhoMentions(r.content))}${audiencePills ? `<div class="who-pills">${audiencePills}</div>` : ""}</td>
          <td class="cell-dept" data-label="承辦單位">${escapeHTML(r.dept)}</td>
        `;
        body.appendChild(tr);
      });
    if (!body.children.length) {
      body.innerHTML = `<tr><td colspan="5" style="padding:36px;text-align:center;color:var(--ncku-grey-mid);">此身份目前沒有列出的事項。</td></tr>`;
    }
  }

  let active = "一般新生/轉學生";
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      active = t.dataset.who;
      render(active);
    });
  });
  render(active);
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

  // hot keywords (from meta, fallback to a sensible set)
  const HOT = (meta.hot && meta.hot.length) ? meta.hot
    : ["宿舍", "選課", "交換生", "學號", "申請", "註冊"];
  HOT.forEach(k => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = k;
    b.addEventListener("click", () => { search.value = k; render(); });
    hotEl.appendChild(b);
  });

  // category select — derive from items so it stays in sync
  const cats = [...new Set(items.map(i => i.category).filter(Boolean))].sort();
  cats.forEach(c => {
    const o = document.createElement("option");
    o.value = c; o.textContent = c;
    select.appendChild(o);
  });

  function render() {
    const q = search.value.trim();
    const cat = select.value;
    const filtered = items.filter(it => {
      if (cat && it.category !== cat) return false;
      if (q && !(it.question.includes(q) || it.answer.includes(q) || (it.category || "").includes(q))) return false;
      return true;
    });

    list.innerHTML = "";
    counter.textContent = filtered.length
      ? `${filtered.length} / ${items.length} 題`
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
          <span class="qcat">${escapeHTML(it.category || "")}</span>
          <span class="qtext">${escapeHTML(it.question)}</span>
          <span class="toggle" aria-hidden="true">+</span>
        </button>
        <div class="faq-content">
          <div class="answer">${formatAnswer(it.answer)}</div>
          <div class="meta">
            <span><b>承辦單位</b>${escapeHTML(it.unit || "—")}</span>
            <span><b>瀏覽次數</b>${Number(it.views || 0).toLocaleString()}</span>
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
  render();
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

/* ---------- active scene rail (intersection) ---------- */
(function activeScene() {
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
})();

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
