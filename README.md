# MEHER (মেহের) — Ladies Fashion & Jewelry E-commerce

Bangla–English ladies jewelry/fashion boutique, rebuilt from the original
[আমার দোকান](https://gaziabdulahad.github.io/Shop) codebase and migrated off its
placeholder data onto the **live Google Sheets backend** (Products, Orders,
Reviews, Subscribers — the same Apps Script Web App URL the original site uses).

The original project folder is untouched at `Documents/Shop-main/Shop-main` (backup).

---

## Quick Start

```bash
cd Ladies-Fashion-Store
node server.js 8080        # auto-increments if the port is busy
# → http://localhost:8080/
```

> Port 8080 is currently used by the older mustard-oil demo server, so on this
> machine the site is running at **http://localhost:8081/**.

No build step, no dependencies. Node ≥ 16 only for the optional static server;
opening `index.html` directly also works (Google Fonts + Drive images need internet).

---

## What This Site Is

- **Catalog:** LIVE from the Google Sheet (fetched on every page load, cached in
  `sessionStorage`). Add/remove/edit products in the sheet → site updates automatically.
- **Brand:** MEHER (মেহের) · tagline “The Art of Feminine Elegance”
- **Channels:** WhatsApp `01755855600` · Messenger `m.me/61583242650306` · phone `01755855600`
- **Commerce:** Cash on Delivery · Dhaka ৳60 / Outside Dhaka ৳120 · orders land in the real Orders sheet
- **Languages:** বাংলা (default) ⇄ English — toggle persists, never resets cart

## Architecture

```
index.html               Home (categories & grids built from LIVE catalog)
shop.html / jewelry.html Product listing + filters (subcategory, price, availability)
product.html             Product Details (?id=<sheet-id>) — gallery, video, reviews
search.html              Live search + suggestions + history
wishlist.html / cart.html
checkout.html            → POSTs order to live backend (action="order")
order-confirmation.html  Reads last order from localStorage
track.html               → POSTs track query to live backend (action="track")
review.html              → POSTs verified review (action="review")
policy.html              All policies, tabbed, bn/en — rendered from assets/js/policies.js
shipping-policy / return-policy / privacy-policy / terms.html   (same renderer)
faq.html / about.html / contact.html
assets/css/tokens.css    Design tokens (Ivory · Dusty Pink · Champagne Gold · Deep Purple)
assets/css/styles.css    Design system (buttons, product cards, header, footer, modals…)
assets/js/data.js        ⚙️ CONFIG: brand, delivery fees, districts, util (source of truth)
assets/js/api.js         ⚙️ LIVE backend client (fetch, Drive image URLs, product helpers)
assets/js/policies.js    REAL policy text from the original shop (unchanged, {shop} tokens)
assets/js/policy-render.js  Bilingual policy renderer (bn/en)
assets/js/app.js         Chrome injection · i18n · cart/wishlist (localStorage) · toast · search
server.js                Zero-dependency static server
```

## Backend Contract (from original site)

`GET  <API_URL>`                                  → JSON array of products
`GET  <API_URL>?what=reviews&id=<id>`              → JSON array of reviews
`POST <API_URL> {action:"order",    order:{items:[{productId,qty}], name, phone, district, address, delivery, marketing, website, src, vid}}` → `{ok, orderId, total}`
`POST <API_URL> {action:"track",    track:{orderId, phone}}`  → `{ok, status, time, product, total, district}`
`POST <API_URL> {action:"subscribe", sub:{phone, name?, src, vid?}}` → `{ok}`
`POST <API_URL> {action:"review",   review:{orderId, phone, rating, name, text, photo}}` → `{ok, photoFailed?}`

`delivery`: `in` = ঢাকার ভেতরে ৳60 · `out` = ঢাকার বাইরে ৳120. Phone `01XXXXXXXXX`.

> ⚠️ **Do not POST test orders/reviews/subscriptions** — they write to the shop's real sheet.

## What Was Migrated vs. Rebuilt

| From the old site (kept) | Rebuilt |
|---|---|
| Live backend API & order flow | Design system (Ivory/Purple/Gold, Playfair + Hind Siliguri) |
| Real products, images (Google Drive), prices | All pages, bilingual UI, cart/checkout UX, tracking timeline UI |
| Real policy text (bn/en, `policy.html`) | Product discovery filters, SEO meta, accessibility pass |
| WhatsApp/Messenger/COD model & trust patterns | Home page composition with real catalog |

## Honest Limitations / Notes

- **Duplicate live products:** the sheet contains the same bridal necklace set as ~4 rows
  (same name/price/image). The site displays what the sheet holds — to dedupe, delete the
  extra rows in the `Products` sheet (keep one).
- **Offline behavior:** if the API is unreachable, the site falls back to a 3-item embedded
  snapshot and shows a warning — orders/tracking still require the live backend.
- **Stock:** the sheet has only a sold-out flag (`0`/`out`/`শেষ`), no quantities — filters hide
  sold-out items by default; that's all the data allows.
- **Reviews:** shown only genuinely submitted/verified ones from the sheet; no fabricated social proof anywhere.
- **Ratings on cards** appear only when `rcount > 0` in the sheet (currently: 2 reviews total).
- **Server tracking (`views`)** from the original site was intentionally NOT ported — the new
  site keeps only essential client-side storage (cart, wishlist, search history). Add it back
  only with explicit consent UX.
- `sessionStorage` cache key `meher-products` — clear it (or use `MEHER.loadProducts(true)`) to force-refresh.

## QA Done

- All inline scripts pass syntax check; all local links/images resolve; every page serves HTTP 200
- Live catalog fetched successfully (5 sheet rows); every hotlinked asset verified
- Checkout/order payload matches the original working site's contract (items[]) — not fired live deliberately
- No orders/reviews/subscriptions were POSTed during development (they would pollute the real sheet)

---
*Built November 2026 · MEHER (মেহের) · BDT (৳) · Cash on Delivery*
