/* ============================================================
   v1 — 新生支持辦公室 · script
   ============================================================ */

// — Year ——————————————————————————————————————————
document.getElementById("year").textContent = new Date().getFullYear();

// — Header scroll state ————————————————————————————
const header = document.getElementById("siteHeader");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// — Mobile nav toggle ————————————————————————————
const nav = document.querySelector(".primary-nav");
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// — Hero slideshow ————————————————————————————————
(function hero() {
  const imgs = document.querySelectorAll(".hero-img");
  const dots = document.querySelectorAll(".hero-dot");
  if (!imgs.length) return;
  let i = 0, total = imgs.length;
  const go = n => {
    i = (n + total) % total;
    imgs.forEach((el, idx) => el.classList.toggle("is-active", idx === i));
    dots.forEach((el, idx) => el.classList.toggle("is-active", idx === i));
  };
  dots.forEach((d, idx) => d.addEventListener("click", () => go(idx)));
  let timer = setInterval(() => go(i + 1), 7500);
  // Pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    clearInterval(timer);
    if (!document.hidden) timer = setInterval(() => go(i + 1), 7500);
  });
})();

// — Pillars (Journey) ——————————————————————————————
const PILLARS = {
  learn: [
    {
      head: "查詢學號 · 資料登錄",
      num: "01",
      items: [
        { label: "學士班(含轉學生) — 新生入學須知", link: true },
        { label: "學號查詢", link: true },
        { label: "新生資料登錄", link: true, accent: true },
        { note: "114 學年度分科測驗入學新生 — 預計於 8 / 14 後開放查詢" },
      ],
    },
    {
      head: "註冊與選課",
      num: "02",
      items: [
        { label: "學雜費收費標準", link: true },
        { label: "繳費流程及注意事項", link: true },
        { label: "學生繳費查詢", link: true },
        { label: "臺銀學雜費入口網", link: true },
        { label: "學士班新生選課說明", link: true },
        { label: "課程資訊及選課系統", link: true },
        { label: "學分抵免 / 英文免修", link: true },
        { note: "校內 IP 位址登入限定 · 校外請使用 VPN" },
        { label: "英外語選課及加簽規定", link: true },
        { label: "踏溯台南", link: true },
      ],
    },
    {
      head: "學習資源",
      num: "03",
      items: [
        { label: "大學預修課程 (AP)", link: true, accent: true },
        { label: "雙語教學資源", link: true },
        { label: "免費課輔活動", link: true },
        { label: "教育學程", link: true },
        { label: "TREVI 揪課", link: true },
        { label: "轉系、輔系、雙主修", link: true },
        { label: "跨領域學分學程", link: true },
        { label: "專長微學程", link: true },
      ],
    },
  ],
  life: [
    {
      head: "新生活動",
      num: "01",
      items: [
        { label: "成功登大人 — 新鮮人成長營", link: true, accent: true },
        { label: "新生體檢", link: true },
        { label: "新生適應力檢測", link: true },
        { label: "UR 大學部研究 (Undergraduate Research)", link: true },
        { label: "原住民族學生資源中心", link: true },
      ],
    },
    {
      head: "獎助學金",
      num: "02",
      items: [
        { label: "獎學金申請", link: true },
        { label: "榕園圓夢助學網", link: true },
        { note: "就學貸款 · 學雜費減免 · 助學 · 急難救助" },
        { label: "Overseas Students 境外生", link: true, accent: true },
      ],
    },
    {
      head: "住宿與交通",
      num: "03",
      items: [
        { label: "宿舍申請及介紹", link: true },
        { label: "機車停車證申請與自行車管理", link: true },
        { label: "交通資訊", link: true },
        { label: "護送天使", link: true },
      ],
    },
  ],
  grow: [
    {
      head: "幸福成大",
      num: "01",
      items: [
        { label: "職業興趣探索與職能診斷", link: true },
        { label: "NCKU FUTURE SUCCESS+ 個人化學職涯規劃系統", link: true, accent: true },
        { label: "性別平等", link: true },
        { label: "特教服務", link: true },
        { label: "社團 e 化系統", link: true },
      ],
    },
    {
      head: "資訊服務",
      num: "02",
      items: [
        { label: "資訊與網路服務", link: true },
        { label: "授權軟體下載", link: true },
        { label: "圖書館", link: true },
        { label: "KUAP 學習歷程", link: true },
      ],
    },
    {
      head: "其他資源",
      num: "03",
      items: [
        { label: "行事曆", link: true },
        { label: "學生會", link: true },
        { label: "學生兵役", link: true },
        { label: "成大校刊", link: true },
      ],
    },
  ],
};

(function pillars() {
  const tabs = document.querySelectorAll(".pillar-tab");
  const panels = document.querySelectorAll(".pillar-panel");

  panels.forEach(panel => {
    const key = panel.dataset.pillar;
    panel.innerHTML = PILLARS[key].map(card => `
      <article class="pillar-card">
        <div class="pillar-card-head">
          <h3>${card.head}</h3>
          <span class="pillar-card-num">${card.num}</span>
        </div>
        <ul class="pillar-card-list">
          ${card.items.map(it => {
            if (it.note) return `<li class="note"><span>${escapeHTML(it.note)}</span></li>`;
            const cls = it.accent ? " accent" : "";
            return `<li class="${cls.trim()}"><a href="#">${escapeHTML(it.label)}</a></li>`;
          }).join("")}
        </ul>
      </article>
    `).join("");
  });

  function activate(key) {
    tabs.forEach(t => {
      const on = t.dataset.pillar === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    panels.forEach(p => p.classList.toggle("is-active", p.dataset.pillar === key));
  }
  tabs.forEach(t => t.addEventListener("click", () => activate(t.dataset.pillar)));
})();

// — Calendar (timeline) ——————————————————————————————
loadJSON("data/schedule.json")
  .then(rows => buildTimeline(rows))
  .catch(err => {
    console.warn("schedule load failed:", err);
    document.getElementById("timelineList").innerHTML =
      `<li class="faq-empty">無法載入入學日程資料。請於有 HTTP 伺服器的環境瀏覽。</li>`;
  });

function buildTimeline(rows) {
  const list = document.getElementById("timelineList");
  const filterPills = document.querySelectorAll(".calendar-toolbar .filter-pill");

  const enriched = rows.map(r => {
    const audiences = new Set();
    if (r.who) audiences.add(r.who);
    if (r.content && r.content.includes("一般新生/轉學生")) audiences.add("一般新生/轉學生");
    if (r.content && r.content.includes("碩/專/博班新生")) audiences.add("碩/專/博班新生");
    return { ...r, audiences: [...audiences] };
  });

  function render(filter) {
    list.innerHTML = "";
    const filtered = enriched.filter(r => !filter || r.audiences.includes(filter));
    filtered.forEach((r, idx) => {
      const li = document.createElement("li");
      li.className = "timeline-item";
      const tags = r.audiences.map(a => `<span class="tag-chip">${escapeHTML(a)}</span>`).join("");
      li.innerHTML = `
        <div class="timeline-time">
          <span class="timeline-time-step">Step ${String(idx + 1).padStart(2, "0")}</span>
          <span class="timeline-time-date">${escapeHTML(r.time)}</span>
        </div>
        <div class="timeline-main">
          <h4>
            <span>${escapeHTML(r.item)}</span>
            <span class="timeline-toggle" aria-hidden="true">+</span>
          </h4>
          <div class="timeline-tags">${tags}</div>
          <div class="timeline-detail">${formatMulti(stripWho(r.content))}</div>
        </div>
        <div class="timeline-dept">
          <span class="timeline-dept-label">承辦單位</span>
          ${escapeHTML(r.dept)}
        </div>
      `;
      li.addEventListener("click", e => {
        if (e.target.closest("a")) return;
        li.classList.toggle("is-open");
      });
      list.appendChild(li);
    });
    if (!filtered.length) {
      list.innerHTML = `<li class="faq-empty">目前篩選條件下沒有事項。</li>`;
    }
  }

  let active = "一般新生/轉學生";
  filterPills.forEach(p => {
    p.addEventListener("click", () => {
      filterPills.forEach(x => x.classList.remove("is-active"));
      p.classList.add("is-active");
      active = p.dataset.who;
      render(active);
    });
  });
  render(active);
}

// — FAQ ——————————————————————————————————————————
const HOT_KEYWORDS = ["宿舍", "選課", "交換生", "學號", "申請", "註冊"];

loadJSON("data/faq.json")
  .then(items => buildFAQ(items))
  .catch(err => {
    console.warn("faq load failed:", err);
    document.getElementById("faqList").innerHTML =
      `<div class="faq-empty">無法載入常見問題資料。請於有 HTTP 伺服器的環境瀏覽。</div>`;
  });

function buildFAQ(items) {
  const list = document.getElementById("faqList");
  const search = document.getElementById("faqSearch");
  const select = document.getElementById("faqCategory");
  const hot = document.getElementById("hotKeys");

  HOT_KEYWORDS.forEach(k => {
    const b = document.createElement("button");
    b.textContent = k;
    b.addEventListener("click", () => { search.value = k; render(); search.focus(); });
    hot.appendChild(b);
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
      if (q && !((it.question || "").includes(q) || (it.answer || "").includes(q) || (it.category || "").includes(q))) return false;
      return true;
    });
    if (!filtered.length) {
      list.innerHTML = `<div class="faq-empty">沒有符合「<em>${escapeHTML(q || cat)}</em>」的問題。</div>`;
      return;
    }
    filtered.forEach(it => {
      const el = document.createElement("div");
      el.className = "faq-item";
      el.innerHTML = `
        <button class="faq-bar" type="button" aria-expanded="false">
          <span class="faq-qid">${escapeHTML(String(it.id ?? "—").padStart(2, "0"))}</span>
          <span class="faq-cat">${escapeHTML(it.category || "—")}</span>
          <span class="faq-q">${escapeHTML(it.question)}</span>
          <span class="faq-toggle" aria-hidden="true">▾</span>
        </button>
        <div class="faq-detail">
          <div class="answer">${escapeHTML(it.answer || "").replace(/\n/g, "<br>")}</div>
          <div class="faq-meta">
            <span><b>單位</b> ${escapeHTML(it.unit || "—")}</span>
            <span><b>瀏覽次數</b> ${escapeHTML(String(it.views ?? "—"))}</span>
          </div>
        </div>
      `;
      const bar = el.querySelector(".faq-bar");
      bar.addEventListener("click", () => {
        const open = el.classList.toggle("is-open");
        bar.setAttribute("aria-expanded", String(open));
      });
      list.appendChild(el);
    });
  }
  search.addEventListener("input", render);
  select.addEventListener("change", render);
  render();
}

// — Reveal on scroll ————————————————————————————————
(function reveal() {
  const targets = document.querySelectorAll(
    ".section-head, .pillar-card, .timeline-item, .letter-body, .letter-portrait, .faq-toolbar, .hero-content, .hero-meta, .footer-grid > *"
  );
  targets.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  targets.forEach(el => io.observe(el));
})();

// — Helpers —————————————————————————————————————————
async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}
function escapeHTML(s) {
  return String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
function formatMulti(s) {
  return escapeHTML(s)
    .split(/[；;]/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join("");
}
function stripWho(s) {
  return String(s)
    .replace(/[；;]\s*一般新生\/轉學生\s*$/g, "")
    .replace(/[；;]\s*碩\/專\/博班新生\s*$/g, "");
}
