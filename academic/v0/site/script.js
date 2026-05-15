/* ============================================================
   新生支持辦公室 — local recreation script
   ============================================================ */

// ----------------- nav -----------------
const NAV_ITEMS = [
  { label: "成大人須知",       icon: "assets/img/point-CAtZOOIv.png",   href: "#divInfo" },
  { label: "校長的話",         icon: "assets/img/head-BXvZKdIz.svg",    href: "#divPresident" },
  { label: "成大人入學重要日程", icon: "assets/img/date-85ajvDpS.svg",    href: "#divSchedule" },
  { label: "Overseas Students",icon: "assets/img/point-CAtZOOIv.png",   href: "#divInfo" },
  { label: "常見問題",         icon: "assets/img/faq-Cro9mg27.svg",     href: "#divQA" },
  { label: "安心守護系統",     icon: "assets/img/care-BbqqMckz.svg",    href: "#" },
  { label: "聯絡我們",         icon: "assets/img/contact-BPwysSG0.svg", href: "#HookFooter" },
];

(function buildNav() {
  const nav = document.getElementById("mainNav");
  for (const it of NAV_ITEMS) {
    const a = document.createElement("a");
    a.href = it.href;
    a.className = "btn";
    a.innerHTML = `<img src="${it.icon}" alt=""><span>${it.label}</span>`;
    nav.appendChild(a);
  }
  document.getElementById("menuToggle").addEventListener("click", () => {
    nav.classList.toggle("open");
  });
})();

// ----------------- hero carousel -----------------
const BANNERS = [
  "assets/banner/b1.jpg",
  "assets/banner/b2.jpg",
  "assets/banner/b3.jpg",
  "assets/banner/b4.png",
  "assets/banner/b5.png",
  "assets/banner/b6.png",
];

(function buildHero() {
  const track = document.getElementById("heroTrack");
  const dots = document.getElementById("heroDots");
  BANNERS.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<img src="${src}" alt="" loading="${i === 0 ? "eager" : "lazy"}">`;
    track.appendChild(slide);
    const dot = document.createElement("button");
    dot.dataset.idx = i;
    if (i === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  let idx = 0;
  const total = BANNERS.length;
  function go(n) {
    idx = (n + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.querySelectorAll("button").forEach((d, i) =>
      d.classList.toggle("active", i === idx)
    );
  }
  document.querySelector(".hero-nav.prev").addEventListener("click", () => go(idx - 1));
  document.querySelector(".hero-nav.next").addEventListener("click", () => go(idx + 1));
  dots.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") go(+e.target.dataset.idx);
  });
  setInterval(() => go(idx + 1), 6000);
})();

// ----------------- sidebar 3-col (mirror of live DOM) -----------------
const SIDEBAR = [
  {
    cls: "col-1", label: "學習", decor: "assets/img/new_bg1_b-DzMtYoso.svg",
    sets: [
      { head: "查詢學號及資料登錄", items: [
        { type: "plain", lines: ["學士班(含轉學生)", "新生入學須知"] },
        { type: "plain", lines: ["學號查詢"] },
        { type: "plain", lines: ["114學年度分科測驗入學新生", "預計於8/14後開放查詢"] },
        { type: "link",  lines: ["新生資料登錄"] },
      ]},
      { head: "註冊與選課", items: [
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
      ]},
      { head: "學習資源", items: [
        { type: "link",  lines: ["大學預修課程(AP)"] },
        { type: "plain", lines: ["雙語教學資源"] },
        { type: "plain", lines: ["免費課輔活動"] },
        { type: "link",  lines: ["教育學程"] },
        { type: "link",  lines: ["TREVI揪課"] },
        { type: "link",  lines: ["轉系、輔系雙主修"] },
        { type: "link",  lines: ["跨領域學分學程"] },
        { type: "link",  lines: ["專長微學程"] },
      ]},
    ],
  },
  {
    cls: "col-2", label: "生活", decor: "assets/img/new_bg2_b-D2sACoV9.svg",
    sets: [
      { head: "新生活動", items: [
        { type: "plain", lines: ["成功登大人", "(新鮮人成長營)"] },
        { type: "plain", lines: ["新生體檢"] },
        { type: "link",  lines: ["新生適應力檢測"] },
        { type: "plain", lines: ["UR大學部研究", "Undergraduate Research"] },
        { type: "link",  lines: ["原住民族學生資源中心"] },
      ]},
      { head: "獎助學金", items: [
        { type: "plain", lines: ["獎學金申請"] },
        { type: "plain", lines: ["榕園圓夢助學網", "(就學貸款、學雜費減免、", "助學、急難救助)"] },
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
  {
    cls: "col-3", label: "培力", decor: "assets/img/new_bg3_b-BTVKCifu.svg",
    sets: [
      { head: "幸福成大", items: [
        { type: "plain", lines: ["職業興趣探索與職能診斷"] },
        { type: "plain", lines: ["NCKU FUTURE SUCCESS+", "個人化學職涯規劃系統"] },
        { type: "link",  lines: ["性別平等"] },
        { type: "link",  lines: ["特教服務"] },
        { type: "link",  lines: ["社團e化系統"] },
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
];

(function buildSidebar() {
  const root = document.getElementById("infoThreads");
  for (const col of SIDEBAR) {
    const block = document.createElement("div");
    block.className = `info-block ${col.cls}`;
    if (col.label) {
      const badge = document.createElement("div");
      badge.className = "block-label";
      badge.textContent = col.label;
      block.appendChild(badge);
    }
    if (col.decor) {
      const dec = document.createElement("img");
      dec.className = "block-decor";
      dec.src = col.decor;
      dec.alt = "";
      dec.setAttribute("aria-hidden", "true");
      block.appendChild(dec);
    }
    for (const set of col.sets) {
      block.appendChild(buildSet(set));
    }
    function buildSet(set) {
      const setEl = document.createElement("div");
      setEl.className = "info-set";
      const head = document.createElement("div");
      head.className = "info-head";
      head.textContent = set.head;
      setEl.appendChild(head);
      const body = document.createElement("div");
      body.className = "info-body";
      set.items.forEach((it, idx) => {
        if (idx > 0) {
          const sep = document.createElement("div");
          sep.className = "sep";
          body.appendChild(sep);
        }
        const item = document.createElement("div");
        item.className = `item ${it.type === "link" ? "link" : "plain"}${it.accent ? " accent" : ""}`;
        item.innerHTML = it.lines.map(l => `<p>${l}</p>`).join("");
        body.appendChild(item);
      });
      setEl.appendChild(body);
      if (set.sub) {
        const sub = buildSet(set.sub);
        sub.classList.add("info-sub");
        setEl.appendChild(sub);
      }
      return setEl;
    }
    root.appendChild(block);
  }
})();

// ----------------- schedule -----------------
async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}

(async function buildSchedule() {
  let rows;
  try { rows = await loadJSON("data/schedule.json"); }
  catch (e) { console.warn("schedule fallback", e); rows = []; }
  const body = document.getElementById("scheduleBody");
  const filterTags = document.querySelectorAll("#filterTags .tag");

  const enriched = rows.map(r => {
    const audiences = new Set();
    if (r.who) audiences.add(r.who);
    if (r.content && r.content.includes("一般新生/轉學生")) audiences.add("一般新生/轉學生");
    if (r.content && r.content.includes("碩/專/博班新生")) audiences.add("碩/專/博班新生");
    return { ...r, audiences: [...audiences] };
  });

  function render(filter) {
    body.innerHTML = "";
    enriched
      .filter(r => !filter || r.audiences.includes(filter))
      .forEach(r => {
        const row = document.createElement("div");
        row.className = "schedule-row";
        const tags = r.audiences.map(a =>
          `<span class="who-tag">${escapeHTML(a)}</span>`
        ).join(" ");
        row.innerHTML = `
          <div class="cell cell-1" data-label="事項">${escapeHTML(r.item)}</div>
          <div class="cell cell-2" data-label="辦理時間">${escapeHTML(r.time)}</div>
          <div class="cell cell-3" data-label="內容">${formatMulti(stripWhoMentions(r.content))}</div>
          <div class="cell cell-4" data-label="身份">${tags}</div>
          <div class="cell cell-5" data-label="單位與分機">${escapeHTML(r.dept)}</div>
        `;
        body.appendChild(row);
      });
  }

  function stripWhoMentions(s) {
    return String(s)
      .replace(/[；;]\s*一般新生\/轉學生\s*$/g, "")
      .replace(/[；;]\s*碩\/專\/博班新生\s*$/g, "");
  }

  let active = "一般新生/轉學生";
  filterTags.forEach(t => {
    t.addEventListener("click", () => {
      filterTags.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      active = t.dataset.who;
      render(active);
    });
  });
  render(active);
})();

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
}
function formatMulti(s) {
  return escapeHTML(s)
    .split(/；|;/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join("");
}

// ----------------- FAQ -----------------
const HOT_KEYWORDS = ["宿舍", "選課", "交換生", "學號", "申請", "註冊"];

(async function buildFAQ() {
  let items = [];
  try { items = await loadJSON("data/faq.json"); }
  catch (e) { console.warn("faq fallback", e); }

  const list = document.getElementById("faqList");
  const search = document.getElementById("faqSearch");
  const select = document.getElementById("faqCategory");
  const hotEl = document.getElementById("hotKeywords");

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
    filtered.forEach(it => {
      const el = document.createElement("div");
      el.className = "faq-item";
      el.innerHTML = `
        <div class="faq-bar">
          <div class="left">
            <span class="qid">${escapeHTML(it.id)}</span>
            <span class="qcat">${escapeHTML(it.category)}</span>
            <span class="qsep"></span>
            <span class="qtext">${escapeHTML(it.question)}</span>
          </div>
          <span class="toggle">▾</span>
        </div>
        <div class="faq-content">
          <div class="answer">${escapeHTML(it.answer).replace(/\n/g, "<br>")}</div>
          <div class="meta">
            <span>單位：${escapeHTML(it.unit)}</span>
            <span>瀏覽次數：${it.views}</span>
          </div>
        </div>
      `;
      el.querySelector(".faq-bar").addEventListener("click", () => el.classList.toggle("open"));
      list.appendChild(el);
    });
    if (!filtered.length) {
      list.innerHTML = `<div style="padding:24px;color:#888;">沒有符合條件的問題。</div>`;
    }
  }

  search.addEventListener("input", render);
  select.addEventListener("change", render);
  render();
})();
