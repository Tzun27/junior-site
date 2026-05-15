/* =============================================================
   新生支持辦公室 — Dashboard v2
   ============================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------- Utilities ----------
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
}
function linkify(s) {
  return s.replace(/(https?:\/\/[^\s<>"]+)/g, m => `<a href="${m}" target="_blank" rel="noopener">${m}</a>`);
}
async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`fetch ${path}: ${r.status}`);
  return r.json();
}

// =============================================================
// Sidebar — collapse + scroll-spy
// =============================================================
(function sidebar() {
  const aside = $("#sidebar");
  const toggle = $("#sidebarToggle");
  const STORE = "v2.sidebar.collapsed";

  if (localStorage.getItem(STORE) === "1") aside.classList.add("collapsed");
  toggle.addEventListener("click", () => {
    aside.classList.toggle("collapsed");
    localStorage.setItem(STORE, aside.classList.contains("collapsed") ? "1" : "0");
  });

  // Smooth scroll, scroll-spy + crumb update
  const items = $$('.nav-item[data-section]');
  const crumb = $("#crumbCurrent");
  const sections = items.map(i => $(`#${i.dataset.section}`)).filter(Boolean);

  function setActive(id) {
    items.forEach(i => i.classList.toggle("active", i.dataset.section === id));
    const sec = $(`#${id}`);
    if (sec) crumb.textContent = sec.dataset.sectionName || crumb.textContent;
  }

  const obs = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
  sections.forEach(s => obs.observe(s));

  items.forEach(i => i.addEventListener("click", e => {
    const id = i.dataset.section;
    const target = $(`#${id}`);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      history.replaceState(null, "", `#${id}`);
    }
  }));
})();

// =============================================================
// Topbar — search routes to FAQ + "/" focus shortcut
// =============================================================
(function topbar() {
  const input = $("#globalSearch");
  const faqInput = $("#faqSearch");

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "SELECT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      input.focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (q && faqInput) {
        faqInput.value = q;
        faqInput.dispatchEvent(new Event("input"));
        $("#faq").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
})();

// =============================================================
// Dashboard — countdown + counts + upcoming
// =============================================================
function diffDays(target) {
  const ms = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

(async function dashboard() {
  const now = new Date();
  // Target 9/8 of the current academic year. If we're past 9/8, target next year's.
  let year = now.getFullYear();
  let target = new Date(year, 8, 8); // month is 0-indexed
  if (target.getTime() < now.getTime()) target = new Date(year + 1, 8, 8);
  const days = diffDays(target);
  const daysEl = $("#daysToSchool");
  if (daysEl) {
    daysEl.textContent = days === 0 ? "TODAY" : String(days);
  }

  let schedule = [];
  let faq = [];
  try { schedule = await loadJSON("data/schedule.json"); } catch (e) { console.warn("schedule load", e); }
  try { faq = await loadJSON("data/faq.json"); } catch (e) { console.warn("faq load", e); }

  const upcomingEl = $("#upcomingList");
  const top5 = schedule.slice(0, 5);
  upcomingEl.innerHTML = top5.map((r, i) => `
    <li class="upcoming-row">
      <span class="upcoming-idx">${String(i + 1).padStart(2, "0")}</span>
      <span class="upcoming-time">${escapeHTML(r.time || "—")}</span>
      <span class="upcoming-item">${escapeHTML(r.item || "")}</span>
      <span class="upcoming-tag">${r.who && r.who.includes("碩") ? "GRAD" : "UNDERGRAD"}</span>
    </li>
  `).join("");

  $("#upcomingCount").textContent = String(schedule.length);
  $("#faqCount").textContent = String(faq.length);
  $("#faqTotal").textContent = String(faq.length);
  $("#resourceCount").textContent = String(countResourceItems());
})();

// =============================================================
// Cluster data — reorganized from v0 sidebar content
// =============================================================
const CLUSTER_DATA = {
  study: [
    {
      num: "01",
      title: "選課與課程資訊",
      items: [
        { type: "link",  text: "課程資訊及選課系統" },
        { type: "link",  text: "學士班新生選課說明" },
        { type: "link",  text: "學分抵免" },
        { type: "link",  text: "英文免修" },
        { type: "plain", text: "英語能力分級測驗及檢定成績上傳" },
        { type: "link",  text: "英外語選課及加簽規定" },
        { type: "link",  text: "踏溯台南" },
      ],
    },
    {
      num: "02",
      title: "學習資源",
      items: [
        { type: "link",  text: "大學預修課程 (AP)" },
        { type: "plain", text: "雙語教學資源" },
        { type: "plain", text: "免費課輔活動" },
        { type: "link",  text: "教育學程" },
        { type: "link",  text: "TREVI 揪課" },
        { type: "link",  text: "轉系、輔系、雙主修" },
        { type: "link",  text: "跨領域學分學程" },
        { type: "link",  text: "專長微學程" },
      ],
    },
    {
      num: "03",
      title: "資訊服務",
      items: [
        { type: "plain", text: "資訊與網路服務" },
        { type: "plain", text: "授權軟體下載" },
        { type: "link",  text: "圖書館" },
        { type: "link",  text: "KUAP" },
      ],
    },
  ],
  admin: [
    {
      num: "01",
      title: "查詢學號與資料登錄",
      items: [
        { type: "plain", text: "學士班 (含轉學生) 新生入學須知" },
        { type: "plain", text: "學號查詢", sub: "114 學年度分科測驗入學新生 預計 8/14 後開放" },
        { type: "link",  text: "新生資料登錄" },
      ],
    },
    {
      num: "02",
      title: "學雜費與繳費",
      items: [
        { type: "plain", text: "學雜費收費標準" },
        { type: "plain", text: "繳費流程及注意事項" },
        { type: "link",  text: "學生繳費查詢", sub: "僅能使用校內 IP 位址登入" },
        { type: "link",  text: "臺銀學雜費入口網" },
      ],
    },
    {
      num: "03",
      title: "獎助學金",
      items: [
        { type: "plain", text: "獎學金申請" },
        { type: "plain", text: "榕園圓夢助學網", sub: "就學貸款、學雜費減免、助學、急難救助" },
        { type: "link",  text: "Overseas Students 境外生", accent: true },
      ],
    },
  ],
  life: [
    {
      num: "01",
      title: "新生活動",
      items: [
        { type: "plain", text: "成功登大人 (新鮮人成長營)" },
        { type: "plain", text: "新生體檢" },
        { type: "link",  text: "新生適應力檢測" },
        { type: "plain", text: "UR 大學部研究 Undergraduate Research" },
        { type: "link",  text: "原住民族學生資源中心" },
      ],
    },
    {
      num: "02",
      title: "住宿及交通",
      items: [
        { type: "plain", text: "宿舍申請及介紹" },
        { type: "plain", text: "機車停車證申請與自行車管理" },
        { type: "link",  text: "交通資訊" },
        { type: "link",  text: "護送天使" },
      ],
    },
    {
      num: "03",
      title: "幸福成大",
      items: [
        { type: "plain", text: "職業興趣探索與職能診斷" },
        { type: "plain", text: "NCKU FUTURE SUCCESS+ 個人化學職涯規劃系統" },
        { type: "link",  text: "性別平等" },
        { type: "link",  text: "特教服務" },
        { type: "link",  text: "社團 e 化系統" },
      ],
    },
    {
      num: "04",
      title: "校園日常",
      items: [
        { type: "plain", text: "行事曆" },
        { type: "plain", text: "學生會" },
        { type: "link",  text: "學生兵役" },
        { type: "link",  text: "成大校刊" },
      ],
    },
  ],
};

function countResourceItems() {
  let n = 0;
  for (const k of Object.keys(CLUSTER_DATA)) {
    for (const set of CLUSTER_DATA[k]) n += set.items.length;
  }
  return n;
}

(function buildClusters() {
  for (const key of Object.keys(CLUSTER_DATA)) {
    const root = $(`#${key}Grid`);
    if (!root) continue;
    for (const set of CLUSTER_DATA[key]) {
      const card = document.createElement("article");
      card.className = "card cluster-card";
      const head = document.createElement("div");
      head.className = "cluster-head";
      head.innerHTML = `<span class="cluster-num">${escapeHTML(set.num)}</span><span class="cluster-title">${escapeHTML(set.title)}</span>`;
      card.appendChild(head);
      const body = document.createElement("div");
      body.className = "cluster-body";
      for (const it of set.items) {
        const el = document.createElement(it.type === "link" ? "a" : "div");
        el.className = `cluster-item is-${it.type}${it.accent ? " is-accent" : ""}`;
        if (it.type === "link") el.href = "#";
        const text = document.createElement("span");
        text.className = "ci-text";
        text.innerHTML = `<span>${escapeHTML(it.text)}</span>${it.sub ? `<span class="ci-secondary">${escapeHTML(it.sub)}</span>` : ""}`;
        el.appendChild(text);
        body.appendChild(el);
      }
      card.appendChild(body);
      root.appendChild(card);
    }
  }
})();

// =============================================================
// Schedule
// =============================================================
(async function schedule() {
  let rows = [];
  try { rows = await loadJSON("data/schedule.json"); } catch (e) { console.warn("schedule fallback", e); }

  const enriched = rows.map(r => {
    const audiences = new Set();
    if (r.who) audiences.add(r.who);
    if (r.content && r.content.includes("一般新生/轉學生")) audiences.add("一般新生/轉學生");
    if (r.content && r.content.includes("碩/專/博班新生")) audiences.add("碩/專/博班新生");
    return { ...r, audiences: [...audiences] };
  });

  function stripWho(s) {
    return String(s)
      .replace(/[；;]\s*一般新生\/轉學生\s*$/g, "")
      .replace(/[；;]\s*碩\/專\/博班新生\s*$/g, "");
  }
  function formatMulti(s) {
    return escapeHTML(s).split(/；|;/).map(p => p.trim()).filter(Boolean).map(p => `<p>${p}</p>`).join("");
  }
  function whoTag(a) {
    const cls = a.includes("碩") ? "is-grad" : "is-undergrad";
    return `<span class="who-tag ${cls}">${escapeHTML(a)}</span>`;
  }

  const body = $("#scheduleBody");
  const pills = $$("#filterPills .pill");

  function render(filter) {
    body.innerHTML = "";
    enriched
      .filter(r => !filter || r.audiences.includes(filter))
      .forEach(r => {
        const row = document.createElement("div");
        row.className = "schedule-row";
        row.setAttribute("role", "row");
        const tags = r.audiences.map(whoTag).join(" ");
        row.innerHTML = `
          <div class="cell cell-1" data-label="事項">${escapeHTML(r.item)}</div>
          <div class="cell cell-2" data-label="辦理時間">${escapeHTML(r.time)}</div>
          <div class="cell cell-3" data-label="內容">${formatMulti(stripWho(r.content))}</div>
          <div class="cell cell-4" data-label="身份">${tags}</div>
          <div class="cell cell-5" data-label="單位與分機">${escapeHTML(r.dept)}</div>
        `;
        body.appendChild(row);
      });
  }

  // Counts on pills
  $$("#filterPills .pill-count").forEach(el => {
    const which = el.dataset.count;
    const n = which ? enriched.filter(r => r.audiences.includes(which)).length : enriched.length;
    el.textContent = String(n).padStart(2, "0");
  });

  let active = "一般新生/轉學生";
  pills.forEach(p => {
    p.addEventListener("click", () => {
      pills.forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      active = p.dataset.who || "";
      render(active);
    });
  });
  render(active);
})();

// =============================================================
// FAQ
// =============================================================
(async function faq() {
  let items = [];
  let meta = { hot: [], categories: [] };
  try { items = await loadJSON("data/faq.json"); } catch (e) { console.warn("faq", e); }
  try { meta = await loadJSON("data/faq_meta.json"); } catch (e) { console.warn("faq meta", e); }

  const list = $("#faqList");
  const search = $("#faqSearch");
  const select = $("#faqCategory");
  const hotEl = $("#hotKeywords");
  const countBadge = $("#faqCountBadge");

  // Hot keywords (from meta or fallback)
  const hot = (meta.hot && meta.hot.length) ? meta.hot : ["宿舍", "選課", "交換生", "學號", "申請", "註冊"];
  hot.forEach(k => {
    const b = document.createElement("button");
    b.textContent = k;
    b.addEventListener("click", () => { search.value = k; render(); search.focus(); });
    hotEl.appendChild(b);
  });

  // Categories: prefer meta, fallback to derived
  const cats = (meta.categories && meta.categories.length)
    ? meta.categories
    : [...new Set(items.map(i => i.category).filter(Boolean))].sort();
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
      if (q && !(it.question.includes(q) || it.answer.includes(q) || (it.category || "").includes(q))) return false;
      return true;
    });

    countBadge.textContent = `${String(filtered.length).padStart(3, "0")} / ${String(items.length).padStart(3, "0")}`;

    if (!filtered.length) {
      list.innerHTML = `<div class="faq-empty">沒有符合條件的問題。試試別的關鍵字？</div>`;
      return;
    }

    const frag = document.createDocumentFragment();
    filtered.slice(0, 80).forEach(it => {
      const el = document.createElement("div");
      el.className = "faq-item";
      el.innerHTML = `
        <div class="faq-bar">
          <span class="qid mono">${escapeHTML(it.id)}</span>
          <span class="qcat">${escapeHTML(it.category)}</span>
          <span class="qtext">${escapeHTML(it.question)}</span>
          <span class="faq-toggle" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="faq-content">
          <div>
            <div class="faq-inner">
              <div class="answer">${linkify(escapeHTML(it.answer)).replace(/\n/g, "<br>")}</div>
              <div class="meta">
                <span>單位 ${escapeHTML(it.unit || "—")}</span>
                <span>瀏覽次數 ${escapeHTML(String(it.views ?? 0))}</span>
              </div>
            </div>
          </div>
        </div>`;
      el.querySelector(".faq-bar").addEventListener("click", () => el.classList.toggle("open"));
      frag.appendChild(el);
    });
    list.appendChild(frag);

    if (filtered.length > 80) {
      const more = document.createElement("div");
      more.className = "faq-empty";
      more.textContent = `顯示前 80 則，共 ${filtered.length} 則符合。請輸入更精確的關鍵字。`;
      list.appendChild(more);
    }
  }

  search.addEventListener("input", render);
  select.addEventListener("change", render);
  render();
})();

// =============================================================
// President letter
// =============================================================
(function president() {
  const card = $(".president-card");
  const body = $("#letterBody");
  const toggle = $("#letterToggle");
  if (!body || !toggle) return;

  body.innerHTML = `
    <p>歡迎加入成功大學！</p>
    <p>首先，我要代表學校全體教職員生歡迎你成為成功大學大家庭的一員！也為你的認真努力和選擇喝采，恭喜你！</p>
    <p>進入大學是一個全新的起點，成大是一個可以讓你不斷學習、成長及探索的地方。面對即將展開的大學生活，除了大一新鮮人的期待之外，你也許也感到些許忐忑不安：修課、社團、住宿、交友，心情、未來……。「新生支持辦公室」無論是在專業學習上遇到的問題，或是生活上需要的幫助，你都可以透過這個平台獲得即時線上支援。在 9 月開學之前，你還可以利用我們提供的各項學習資訊，包括：先修課程 AP、圖書館及計網中心等線上資源，協助你順利適應新的學習環境。</p>
    <p>我們正處於一場關鍵性的科技革新浪潮中，如何善用人工智慧（AI）與各項新工具來支援你的大學生活與學習，並進一步豐富學習體驗、探索它所帶來的無限可能，使你成為具備批判性思維與創新能力的參與者，以迎接未來的挑戰，將是我們共同努力的目標。更重要的是：當你積極探索這些新技術的同時，我也希望你能學會對生命的尊重、對人的關懷和對美感的覺察與體現！</p>
    <p>來到成大你將會發現我們的校園擁有府城新舊融合的氣質：紅磚瓦簷的建築、綠意盎然的榕園、滌故更新的未來館、匠心再造的博物館、跨域創新的旺宏館，智慧友善與多元共融的東寧宿舍，以及在樹影搖曳、花香常漫的工學大道兩旁比鄰而立的新舊系館，還有隨四季變化、色彩繽紛的各式花草植栽……都將寫入你精彩可期的大學生活點滴。但校長也想叮嚀：南臺灣陽光燦爛的午後，偶有突如其來的驟雨，也許會把忘了帶傘的你淋得狼狽不堪、措手不及！親愛的孩子，請記住：最好的你，不是因為完美，而是因為你的堅持和勇氣，以良善真誠溫暖這個世界。所以，當你遇到挫折、感到沮喪、疑惑徬徨的時候，請記得會有我們陪你一起面對挑戰，找尋那道只在滂沱大雨後才會出現的虹霓！</p>
    <p>期待你在這裡為自己創造一段充實難忘的美好回憶，為人生留下精彩的軌跡！加油！</p>
  `;

  toggle.addEventListener("click", () => {
    const expanded = card.classList.toggle("expanded");
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    toggle.querySelector(".letter-toggle-text").textContent = expanded ? "收合" : "展開全文";
  });
})();
