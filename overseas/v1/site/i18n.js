/* =================================================================
   i18n — runtime translation engine
   -----------------------------------------------------------------
   Source of truth: i18n/{lang}.json (flat-key dictionaries).
   Markup hooks:
     <tag data-i18n="key">…</tag>                    → textContent
     <tag data-i18n-html="key">…</tag>               → innerHTML (use sparingly; values are not sanitised)
     <tag data-i18n-attr="title:key,alt:other">      → element attributes
   API exposed on window.I18N:
     I18N.t(key)         synchronous lookup with zh-Hant fallback
     I18N.setLang(lang)  swap, persist, re-apply, dispatch 'langchange'
     I18N.getLang()      current locale
   The 'langchange' CustomEvent is dispatched on document after a swap;
   data-driven renderers (THREADS, schedule, FAQ) listen for it and
   re-render.

   This runtime is intentionally portable: the same flat-key JSON files
   feed react-i18next / next-intl unchanged when the site is rewritten
   on a React stack — see overseas/v1/aesthetic.md.
   ================================================================= */
(function () {
  const STORAGE_KEY = "ofy.lang";
  const DEFAULT_LANG = "zh-Hant";
  const SUPPORTED = ["zh-Hant", "en"];

  const catalogs = Object.create(null);   // lang -> dict
  let currentLang = DEFAULT_LANG;
  let ready = false;

  /* ---------- detection ---------- */
  function detectLang() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* localStorage blocked — fall through */ }
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("en")) return "en";
    return DEFAULT_LANG;
  }

  /* ---------- catalog loading ---------- */
  async function loadCatalog(lang) {
    if (catalogs[lang]) return catalogs[lang];
    const r = await fetch(`i18n/${lang}.json`);
    if (!r.ok) throw new Error(`i18n catalog ${lang}: ${r.status}`);
    catalogs[lang] = await r.json();
    return catalogs[lang];
  }

  /* ---------- lookup ---------- */
  function t(key) {
    const dict = catalogs[currentLang];
    if (dict && key in dict) return dict[key];
    const fallback = catalogs[DEFAULT_LANG];
    if (fallback && key in fallback) return fallback[key];
    return key;  // surface missing keys instead of silently emptying nodes
  }

  /* ---------- DOM application ---------- */
  function applyTranslations(root) {
    const scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach(el => {
      // value format: "attr1:key1,attr2:key2"
      el.dataset.i18nAttr.split(",").forEach(pair => {
        const [attr, key] = pair.split(":").map(s => s && s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    // <title> isn't reachable by querySelectorAll on data-i18n inside <head>
    // when annotated, but the loop above handles it once we put data-i18n on
    // the element. Just make sure <html lang> reflects current locale here.
    document.documentElement.lang = currentLang;
  }

  /* ---------- public setLang ---------- */
  async function setLang(lang, opts) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    await loadCatalog(lang);
    currentLang = lang;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations();
    updateToggleUI();
    if (!opts || !opts.silent) {
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
    }
  }

  /* ---------- toggle UI wiring ---------- */
  function updateToggleUI() {
    document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach(el => {
      el.classList.toggle("is-active", el.dataset.lang === currentLang);
    });
  }
  function wireToggle() {
    document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
      btn.addEventListener("click", e => {
        const target = e.target.closest("[data-lang]");
        const lang = target ? target.dataset.lang : null;
        if (lang) {
          setLang(lang);
        } else {
          // bare button click — flip to the other supported lang
          const next = currentLang === "en" ? "zh-Hant" : "en";
          setLang(next);
        }
      });
    });
  }

  /* ---------- boot ---------- */
  async function boot() {
    currentLang = detectLang();
    // Preload both catalogs so toggle is instant. The default lang gets
    // applied first (avoids a flash), the other is fetched in parallel.
    await loadCatalog(currentLang);
    applyTranslations();
    updateToggleUI();
    ready = true;
    // background-load the other locale
    const other = currentLang === "en" ? "zh-Hant" : "en";
    loadCatalog(other).catch(e => console.warn("i18n preload", other, e));
    wireToggle();
    // Tell renderers their initial locale (in case they booted before us
    // and skipped first-paint translation — script.js dispatches us).
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: currentLang, initial: true } }));
  }

  window.I18N = {
    t,
    setLang,
    getLang: () => currentLang,
    isReady: () => ready,
    applyTranslations,
  };

  // Boot once DOM is parsed. i18n.js is loaded with `defer`, so DOMContentLoaded
  // is the right trigger; if we're somehow past it already, run immediately.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
