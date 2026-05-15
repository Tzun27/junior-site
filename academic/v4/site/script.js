/* ============================================================
   新生支持辦公室 v4 — Stanford-banded layout
   Data lives in ../v0/site/data/{schedule,faq,faq_meta}.json.
   ============================================================ */

const DATA_BASE = "../../v0/site/data/";
const ASSET_BASE = "../../v0/site/assets/";

/* ---------------- placeholder links ----------------
   Several CTAs on the page are intentionally href="#" because no
   detail page exists yet (info-card "深入了解", "查看完整新生須知",
   "閱讀全文", "下載 PDF", "完整 FAQ 索引"). Browsers scroll to the
   top for href="#"; intercept and no-op so the user's scroll
   position is preserved instead. */
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href="#"]');
  if (a) e.preventDefault();
});

/* ---------------- nav ---------------- */
const NAV_ITEMS = [
  { label: "須知",    href: "#section-info" },
  { label: "校長的話", href: "#section-president" },
  { label: "日程",    href: "#section-schedule" },
  { label: "常見問題", href: "#section-faq" },
  { label: "聯絡",    href: "#footer" },
];

(function buildNav() {
  const nav = document.getElementById("mainNav");
  for (const it of NAV_ITEMS) {
    const a = document.createElement("a");
    a.href = it.href;
    a.textContent = it.label;
    a.dataset.target = it.href;
    nav.appendChild(a);
  }

  const toggle = document.getElementById("navToggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // close mobile nav after a link tap
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

/* ---------------- sticky-header shadow on scroll ---------------- */
(function navShadow() {
  const header = document.getElementById("primaryNav");
  let raf = null;
  function update() {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle("shadow", y > 4);
    raf = null;
  }
  window.addEventListener("scroll", () => {
    if (raf == null) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
})();

/* ---------------- scroll-spy nav ---------------- */
(function scrollSpy() {
  const anchors = NAV_ITEMS
    .map(it => it.href)
    .filter(h => h.startsWith("#"))
    .map(h => ({ id: h, el: document.querySelector(h) }))
    .filter(o => o.el);
  if (!anchors.length || !("IntersectionObserver" in window)) return;

  const linksByHref = new Map(
    Array.from(document.querySelectorAll("#mainNav a"))
      .map(a => [a.dataset.target, a])
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const id = "#" + en.target.id;
      linksByHref.forEach(a => a.classList.remove("is-current"));
      const a = linksByHref.get(id);
      if (a) a.classList.add("is-current");
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

  anchors.forEach(o => io.observe(o.el));
})();

/* ---------------- info cards ---------------- */
const INFO_CARDS = [
  {
    num: "01",
    glyph: "學",
    label: "學業 · Study",
    title: "把選課與註冊變成可以掌控的事",
    items: [
      "查詢學號與資料登錄",
      "註冊繳費與學雜費減免",
      "選課、學分抵免、英文免修",
      "學習資源與大學預修課程 AP",
    ],
    href: "#",
  },
  {
    num: "02",
    glyph: "活",
    label: "生活 · Life",
    title: "住下來、安頓好，再出發",
    items: [
      "新生活動與成長營",
      "獎助學金與助學貸款",
      "宿舍申請與機車證",
      "境外生 / Overseas Students",
    ],
    href: "#",
  },
  {
    num: "03",
    glyph: "力",
    label: "培力 · Empower",
    title: "把四年攤開，看清楚自己要去哪",
    items: [
      "職業興趣探索與職能診斷",
      "圖書館、計網中心、授權軟體",
      "性別平等、特教、原資中心",
      "學生會、社團、行事曆",
    ],
    href: "#",
  },
];

/* ---------------- info card detail (full v0 sub-sections) ----------------
   Each pillar card opens a 3-column detail panel below the card grid that
   surfaces every sub-section + every item from the original v0 sidebar.
   Clicking the active card again (or the panel's 收合 button) closes it. */
const INFO_DETAIL = {
  "01": {
    pillar: "學業",
    pillarEn: "Study",
    sets: [
      { head: "查詢學號及資料登錄", items: [
        { type: "plain", lines: ["學士班(含轉學生)", "新生入學須知"] },
        { type: "plain", lines: ["學號查詢"] },
        { type: "plain", lines: ["114 學年度分科測驗入學新生", "預計於 8/14 後開放查詢"] },
        { type: "link",  lines: ["新生資料登錄"] },
      ]},
      { head: "註冊與選課", items: [
        { type: "plain", lines: ["學雜費收費標準"] },
        { type: "plain", lines: ["繳費流程及注意事項"] },
        { type: "link",  lines: ["學生繳費查詢"] },
        { type: "plain", lines: ["(僅能使用校內 IP 位址登入)"] },
        { type: "link",  lines: ["臺銀學雜費入口網"] },
        { type: "link",  lines: ["學士班新生選課說明"] },
        { type: "link",  lines: ["課程資訊及選課系統"] },
        { type: "link",  lines: ["學分抵免"] },
        { type: "link",  lines: ["英文免修"] },
        { type: "plain", lines: ["英語能力分級測驗", "及檢定成績上傳"] },
        { type: "link",  lines: ["英外語選課及加簽規定"] },
        { type: "link",  lines: ["踏溯台南"] },
      ]},
      { head: "學習資源", items: [
        { type: "link",  lines: ["大學預修課程 (AP)"] },
        { type: "plain", lines: ["雙語教學資源"] },
        { type: "plain", lines: ["免費課輔活動"] },
        { type: "link",  lines: ["教育學程"] },
        { type: "link",  lines: ["TREVI 揪課"] },
        { type: "link",  lines: ["轉系、輔系雙主修"] },
        { type: "link",  lines: ["跨領域學分學程"] },
        { type: "link",  lines: ["專長微學程"] },
      ]},
    ],
  },
  "02": {
    pillar: "生活",
    pillarEn: "Life",
    sets: [
      { head: "新生活動", items: [
        { type: "plain", lines: ["成功登大人", "(新鮮人成長營)"] },
        { type: "plain", lines: ["新生體檢"] },
        { type: "link",  lines: ["新生適應力檢測"] },
        { type: "plain", lines: ["UR 大學部研究", "Undergraduate Research"] },
        { type: "link",  lines: ["原住民族學生資源中心"] },
      ]},
      { head: "獎助學金", items: [
        { type: "plain", lines: ["獎學金申請"] },
        { type: "plain", lines: ["榕園圓夢助學網", "(就學貸款、學雜費減免、助學、急難救助)"] },
      ], sub: {
        head: "Overseas Students",
        items: [
          { type: "plain", lines: ["Overseas Students", "境外生"], accent: true },
        ],
      }},
      { head: "住宿及交通", items: [
        { type: "plain", lines: ["宿舍申請及介紹"] },
        { type: "plain", lines: ["機車停車證申請", "與自行車管理"] },
        { type: "link",  lines: ["交通資訊"] },
        { type: "link",  lines: ["護送天使"] },
      ]},
    ],
  },
  "03": {
    pillar: "培力",
    pillarEn: "Empower",
    sets: [
      { head: "幸福成大", items: [
        { type: "plain", lines: ["職業興趣探索與職能診斷"] },
        { type: "plain", lines: ["NCKU FUTURE SUCCESS+", "個人化學職涯規劃系統"] },
        { type: "link",  lines: ["性別平等"] },
        { type: "link",  lines: ["特教服務"] },
        { type: "link",  lines: ["社團 e 化系統"] },
      ]},
      { head: "資訊服務", items: [
        { type: "plain", lines: ["資訊與網路服務"] },
        { type: "plain", lines: ["授權軟體下載"] },
        { type: "link",  lines: ["圖書館"] },
        { type: "link",  lines: ["KUAP"] },
      ]},
      { head: "其他", items: [
        { type: "plain", lines: ["行事曆"] },
        { type: "plain", lines: ["學生會"] },
        { type: "link",  lines: ["學生兵役"] },
        { type: "link",  lines: ["成大校刊"] },
      ]},
    ],
  },
};

function renderDetailItem(it) {
  const cls = [
    "info-detail__item",
    it.type === "link" ? "is-link" : "is-plain",
    it.accent ? "is-accent" : "",
  ].filter(Boolean).join(" ");
  const body = it.lines.map(l => `<span>${escapeHTML(l)}</span>`).join("<br>");
  return `<li class="${cls}">${body}</li>`;
}

function renderDetailColumn(set) {
  const sub = set.sub ? `
    <div class="info-detail__sub">
      <h5 class="info-detail__sub-head">${escapeHTML(set.sub.head)}</h5>
      <ul class="info-detail__items info-detail__items--sub">
        ${set.sub.items.map(renderDetailItem).join("")}
      </ul>
    </div>
  ` : "";
  return `
    <div class="info-detail__col">
      <h4 class="info-detail__col-head">${escapeHTML(set.head)}</h4>
      <ul class="info-detail__items">
        ${set.items.map(renderDetailItem).join("")}
      </ul>
      ${sub}
    </div>
  `;
}

function openInfoDetail(num) {
  const data = INFO_DETAIL[num];
  if (!data) return;
  const panel = document.getElementById("infoDetail");

  panel.innerHTML = `
    <div class="info-detail__inner">
      <div class="info-detail__head">
        <div class="info-detail__eyebrow">
          <span class="info-detail__num">${num}</span>
          <span class="info-detail__pillar">${data.pillar} · ${data.pillarEn}</span>
        </div>
        <button type="button" class="info-detail__close" aria-label="收合詳細內容">收合 ×</button>
      </div>
      <div class="info-detail__cols">
        ${data.sets.map(renderDetailColumn).join("")}
      </div>
    </div>
  `;
  panel.hidden = false;
  panel.dataset.activeNum = num;

  document.querySelectorAll(".info-card").forEach(card => {
    card.classList.toggle("is-active", card.dataset.num === num);
  });

  panel.querySelector(".info-detail__close")
    .addEventListener("click", closeInfoDetail);

  // Smooth-scroll the active card's TOP into view, so the user can see
  // the card → panel relationship rather than landing inside the panel.
  const activeCard = document.querySelector(`.info-card[data-num="${num}"]`);
  if (activeCard) {
    const y = activeCard.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function closeInfoDetail() {
  const panel = document.getElementById("infoDetail");
  panel.hidden = true;
  panel.innerHTML = "";
  delete panel.dataset.activeNum;
  document.querySelectorAll(".info-card").forEach(c => c.classList.remove("is-active"));
}

(function buildInfoCards() {
  const grid = document.getElementById("infoGrid");
  for (const c of INFO_CARDS) {
    const card = document.createElement("article");
    card.className = "info-card";
    card.dataset.num = c.num;
    card.innerHTML = `
      <div class="info-card__glyph" aria-hidden="true">${c.glyph}</div>
      <div class="info-card__inner">
        <div class="info-card__num">${c.num}</div>
        <div class="info-card__label">${c.label}</div>
        <h3 class="info-card__title">${c.title}</h3>
        <ol class="info-card__list">
          ${c.items.map(t => `<li>${escapeHTML(t)}</li>`).join("")}
        </ol>
        <a class="info-card__link" href="${c.href}">
          <span class="label-open">深入了解</span>
          <span class="label-close">收合內容</span>
        </a>
      </div>
    `;
    grid.appendChild(card);

    const toggle = (e) => {
      e.preventDefault();
      const panel = document.getElementById("infoDetail");
      if (panel.dataset.activeNum === c.num) {
        closeInfoDetail();
      } else {
        openInfoDetail(c.num);
      }
    };
    // Whole card is clickable for convenience; the link gets its own handler
    // too so the keyboard activation on the link still works.
    card.addEventListener("click", toggle);
    card.querySelector(".info-card__link").addEventListener("click", (e) => {
      e.stopPropagation();   // prevent the card's own listener from double-firing
      toggle(e);
    });
  }
})();

/* ---------------- schedule ---------------- */
async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}

(async function buildSchedule() {
  let rows = [];
  try { rows = await loadJSON(DATA_BASE + "schedule.json"); }
  catch (e) { console.warn("schedule fallback", e); }

  const body = document.getElementById("scheduleBody");
  const statRows = document.getElementById("statRows");
  const tabs = document.querySelectorAll("#whoTabs .who-tab");

  // Enrich each row with its set of audiences (covers cases where
  // the JSON's `who` field omits an audience that's mentioned in the
  // content blob — see the `；一般新生/轉學生` suffixes in the source).
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

/* ---------------- FAQ ---------------- */
(async function buildFAQ() {
  let items = [];
  let meta = { hot: [], categories: [] };
  try {
    [items, meta] = await Promise.all([
      loadJSON(DATA_BASE + "faq.json"),
      loadJSON(DATA_BASE + "faq_meta.json").catch(() => ({ hot: [], categories: [] })),
    ]);
  } catch (e) { console.warn("faq fallback", e); }

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

    // Stanford-style: show all matching, no pagination, no flourish.
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

/* ---------------- helpers ---------------- */
function escapeHTML(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]));
}

function formatMulti(s) {
  return escapeHTML(s)
    .split(/；|;/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join("");
}

// Linkify URLs in answers and preserve newlines as <br>.
function formatAnswer(s) {
  const escaped = escapeHTML(s).replace(/\n/g, "<br>");
  return escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );
}
