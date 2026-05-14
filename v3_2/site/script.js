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

/* ---------- hero cursor-follow + parallax ---------- */
(function heroEffects() {
  const hero = document.getElementById("scene-00");
  const bg = hero.querySelector(".hero__bg");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    bg.style.setProperty("--mx", `${mx}%`);
    bg.style.setProperty("--my", `${my}%`);
  });
  const updateParallax = () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.3) {
      bg.style.setProperty("--parallax", `${y * 0.18}px`);
    }
  };
  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
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
      { type: "plain", lines: ["114學年度分科測驗入學新生", "預計於8/14後開放查詢"] },
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

/* ---------- schedule ---------- */
async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}

(async function buildSchedule() {
  let rows = [];
  try { rows = await loadJSON("data/schedule.json"); }
  catch (e) { console.warn("schedule fetch failed", e); }

  const enriched = rows.map(r => {
    const audiences = new Set();
    if (r.who) audiences.add(r.who);
    if (r.content && r.content.includes("一般新生/轉學生")) audiences.add("一般新生/轉學生");
    if (r.content && r.content.includes("碩/專/博班新生")) audiences.add("碩/專/博班新生");
    return { ...r, audiences: [...audiences] };
  });

  const body = document.getElementById("scheduleBody");
  const filterBtns = document.querySelectorAll("#scheduleFilter button");

  function stripWhoMentions(s) {
    return String(s)
      .replace(/[；;]\s*一般新生\/轉學生\s*$/g, "")
      .replace(/[；;]\s*碩\/專\/博班新生\s*$/g, "");
  }
  function fmtMulti(s) {
    return escapeHTML(s)
      .split(/；|;/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p}</p>`)
      .join("");
  }

  function render(filter) {
    body.innerHTML = "";
    const list = enriched.filter(r => !filter || r.audiences.includes(filter));
    list.forEach((r, idx) => {
      const row = document.createElement("article");
      row.className = "schedule__row reveal";
      row.dataset.stagger = String((idx % 6) + 1);
      const tags = r.audiences.map(a =>
        `<span class="schedule__tag">${escapeHTML(a)}</span>`
      ).join("");
      row.innerHTML = `
        <span class="schedule__dot"></span>
        <div class="schedule__main">
          <div class="schedule__time">${escapeHTML(r.time)}</div>
          <h4 class="schedule__title">
            <span>${escapeHTML(r.item)}</span>
            <span class="toggle">+</span>
          </h4>
          <div class="schedule__detail">${fmtMulti(stripWhoMentions(r.content))}</div>
        </div>
        <div class="schedule__dept">
          ${escapeHTML(r.dept)}
          <div class="schedule__tags">${tags}</div>
        </div>
      `;
      row.addEventListener("click", () => row.classList.toggle("is-open"));
      body.appendChild(row);
    });
    requestAnimationFrame(() => observeReveals(body.querySelectorAll(".reveal")));
  }

  let active = "一般新生/轉學生";
  filterBtns.forEach(b => {
    b.addEventListener("click", () => {
      filterBtns.forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      active = b.dataset.who;
      render(active);
    });
  });
  render(active);
})();

/* ---------- FAQ ---------- */
const HOT_KEYWORDS = ["宿舍", "選課", "交換生", "學號", "申請", "註冊"];

(async function buildFAQ() {
  let items = [];
  try { items = await loadJSON("data/faq.json"); }
  catch (e) { console.warn("faq fetch failed", e); }

  const list = document.getElementById("faqList");
  const search = document.getElementById("faqSearch");
  const select = document.getElementById("faqCategory");
  const hotEl = document.getElementById("faqHot");

  HOT_KEYWORDS.forEach(k => {
    const b = document.createElement("button");
    b.textContent = k;
    b.addEventListener("click", () => { search.value = k; render(); });
    hotEl.appendChild(b);
  });

  const cats = [...new Set(items.map(i => i.category).filter(Boolean))].sort();
  cats.forEach(c => {
    const o = document.createElement("option");
    o.value = c; o.textContent = c;
    select.appendChild(o);
  });

  function render() {
    const q = search.value.trim();
    const cat = select.value;
    list.innerHTML = "";
    const filtered = items.filter(it => {
      if (cat && it.category !== cat) return false;
      if (q && !(it.question.includes(q) || it.answer.includes(q) || it.category.includes(q))) return false;
      return true;
    });
    if (!filtered.length) {
      list.innerHTML = `<div class="faq__empty">無符合的問題</div>`;
      return;
    }
    filtered.forEach(it => {
      const el = document.createElement("article");
      el.className = "faq__item";
      el.innerHTML = `
        <div class="faq__bar">
          <span class="faq__id">${escapeHTML(it.id)}</span>
          <span class="faq__cat-tag">${escapeHTML(it.category)}</span>
          <span class="faq__q">${escapeHTML(it.question)}</span>
          <span class="faq__caret">▾</span>
        </div>
        <div class="faq__a">
          <div class="faq__a-inner">
            <div class="faq__a-text">${escapeHTML(it.answer).replace(/\n/g, "<br>")}</div>
            <div class="faq__a-meta">
              <span>單位：${escapeHTML(it.unit)}</span>
              <span>瀏覽次數：${it.views}</span>
            </div>
          </div>
        </div>
      `;
      el.querySelector(".faq__bar").addEventListener("click", () => el.classList.toggle("is-open"));
      list.appendChild(el);
    });
  }

  search.addEventListener("input", render);
  select.addEventListener("change", render);
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
})();

/* ---------- helpers ---------- */
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c])
  );
}
