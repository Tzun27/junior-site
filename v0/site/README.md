# 新生支持辦公室 — 本機重製版

Local recreation of <https://sup.ncku.edu.tw/> for development /
educational use within NCKU.

## 檔案結構

```
site/
├── index.html         主頁
├── styles.css         樣式
├── script.js          首頁互動 (carousel / sidebar / FAQ / schedule)
├── data/
│   ├── faq.json       常見問題 (155 筆)
│   ├── faq_meta.json  熱門關鍵字 / 分類
│   ├── schedule.json  入學重要日程 (24 列)
│   └── sidebar.json   成大人須知三欄資料 (備份)
└── assets/
    ├── img/           UI icons + logos + 校長照片 + 背景 svg
    └── banner/        Hero 輪播圖 (b1.jpg ~ b6.png)
```

## 在本機開啟

JS 會用 `fetch()` 讀取 JSON, 因此直接 `file://` 開啟可能會被瀏覽器
擋住跨來源請求。請使用任一靜態 server:

```bash
# Python (3.x)
cd site
python3 -m http.server 8000

# Node
npx serve site

# 然後瀏覽 http://localhost:8000
```

## 來源資料

- 結構與內容: `../content_suppncku.md` (團隊自行備份)
- 圖檔: 直接由 sup.ncku.edu.tw 下載至 `assets/`

## 改造備忘

- `script.js` 內 `NAV_ITEMS`, `BANNERS`, `SIDEBAR` 與 hot-keyword
  陣列為硬編碼資料, 對應原網站的選單 / 輪播 / 三欄目錄.
- FAQ 與 schedule 來自 `data/*.json`, 由 `_ref/parse.py` 從備份 md
  自動產生.
- CSS 變數位於 `:root`, 想換主題色直接改即可.
