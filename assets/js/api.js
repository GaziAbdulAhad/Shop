/* ═══════════════════════════════════════════════════════════
   MEHER — Live Backend API (Google Apps Script → Google Sheets)
   Reuses the SAME backend as the original site: products are read
   live from the Products sheet; orders/reviews/subscriptions are
   written there. Read this file before changing endpoints.

   ⚠️ Never POST order/review/subscribe payloads as "tests" —
   they write to the shop's real Google Sheet.
   ═══════════════════════════════════════════════════════════ */
'use strict';

window.MEHER_API_URL = 'https://script.google.com/macros/s/AKfycbxes2VIt7mG_dIT2BMDbxZL1mJd1_pqu3qDCsXIV9S5Bpf89wulIYIrdV0nxKFNUDif/exec';

window.MEHER_API = (() => {
  let memCache = null;

  /* ── image host helpers (Google Drive → thumbnail CDN) ── */
  function ytId(url) {
    const m = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return m ? m[1] : null;
  }
  function imgURL(u, w) {
    const m = String(u || '').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=|thumbnail\?(?:.*&)?id=)([\w-]+)/);
    return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w${w || 1000}` : u;
  }
  function imgFail(el) {
    const stage = el.dataset.f || '0';
    if (stage === '0') {
      el.dataset.f = '1';
      const m = el.src.match(/[?&]id=([\w-]+)/);
      el.src = m ? 'https://lh3.googleusercontent.com/d/' + m[1] + '=w1600' : 'assets/img/placeholder.svg';
      return;
    }
    if (stage === '1') { el.dataset.f = '2'; el.src = 'assets/img/placeholder.svg'; }
  }
  function imgList(p) {
    return String(p.image || '').split(/[\s,|]+/).filter(Boolean);
  }
  function cover(p, w) {
    const first = imgList(p)[0];
    if (first) return imgURL(first, w || 800);
    const v = ytId(p.video);
    return v ? `https://img.youtube.com/vi/${v}/hqdefault.jpg` : '';
  }

  /* ── product helpers ── */
  const num = n => Number(n) || 0;
  function discountPct(p) {
    const o = num(p.oldprice), n = num(p.price);
    return o > n ? Math.round((o - n) / o * 100) : 0;
  }
  function isSoldOut(p) {
    const t = String(p.stock == null ? '' : p.stock).trim().toLowerCase();
    return t === '0' || t === 'out' || t === 'শেষ';
  }
  function hasTag(p, ...ts) {
    const a = String(p.tags || '').toLowerCase().split(/[,\s|]+/).filter(Boolean);
    return ts.some(t => a.includes(t));
  }
  const inNewRow      = p => hasTag(p, 'new', 'নতুন');
  const inTrendingRow = p => hasTag(p, 'trending', 'trend', 'ট্রেন্ডিং');
  const inOfferRow    = p => hasTag(p, 'offer', 'sale', 'অফার') || discountPct(p) > 0;
  /* subcategory derivation (real sheet has no structured subcats) */
  function subOf(p) {
    const c = String(p.category || '').toLowerCase();
    if (c === 'komorerbicha' || /komor|waist/i.test(p.name || '')) return 'waist-chain';
    if (/necklace|bridal|kundan|সেট/i.test(p.name || '') || !c) return 'bridal-set';
    return 'other';
  }

  /* ── live fetch (cached) ── */
  const SNAPSHOT = [
    { id: 1790826942485, name: 'White stone Komorer Bicha For woman', price: 399, oldprice: 599, desc: 'New Design White Stone Komorer Bicha — waist chain for women. Lightweight, trendy & comfortable. Perfect for weddings & gifting.', video: 'https://www.youtube.com/shorts/8hW3ah7kigs', image: 'https://drive.google.com/file/d/1VqAMU8zYuLJ1Y0cWJIpI1iDprcyBzVTC/view?usp=sharing https://drive.google.com/file/d/1Q62IRKc1kdheawz7yiIj30vk_DBK08PU/view?usp=drive_link https://drive.google.com/file/d/1kKpO2tKBbH2BxJI2OcD31JgG3d-0gNFc/view?usp=drive_link', category: 'komorerbicha', stock: '', tags: '', rating: 5, rcount: 1 },
    { id: 1790753445734, name: 'Premium Pearl & Kundan Gold Plated Bridal Necklace Set for Women', price: 750, oldprice: '', desc: 'Premium gold-plated finish. Elegant pearl & kundan stone design. Lightweight and comfortable to wear. Perfect for weddings, receptions & festive occasions.', video: 'https://www.youtube.com/shorts/WyxLVcuZTCU', image: 'https://drive.google.com/file/d/1_zN4YdMwqhfJiXlVti88cAAZcjnbybA6/view?usp=sharing', category: '', stock: '', tags: '', rating: 3, rcount: 1 },
    { id: 1790752143109, name: 'Premium Pearl & Kundan Gold Plated Bridal Necklace Set for Women', price: 750, oldprice: '', desc: 'Premium gold-plated finish. Elegant pearl & kundan stone design. Lightweight and comfortable to wear. Perfect for weddings, receptions & festive occasions.', video: 'https://www.youtube.com/shorts/WyxLVcuZTCU', image: 'https://drive.google.com/file/d/1_zN4YdMwqhfJiXlVti88cAAZcjnbybA6/view?usp=sharing', category: '', stock: '', tags: '', rating: 0, rcount: 0 }
  ];

  async function getProducts(force) {
    if (memCache && !force) return memCache;
    try {
      const cached = sessionStorage.getItem('meher-products');
      if (cached) { memCache = JSON.parse(cached); return memCache; }
    } catch { /* sessionStorage may be blocked */ }
    try {
      const r = await fetch(window.MEHER_API_URL, { method: 'GET' });
      const d = await r.json();
      if (Array.isArray(d) && d.length) {
        memCache = d;
        try { sessionStorage.setItem('meher-products', JSON.stringify(d)); } catch { }
        return d;
      }
      throw new Error('empty catalog');
    } catch (e) {
      console.warn('Live catalog unavailable — using snapshot fallback:', e.message || e);
      return SNAPSHOT;
    }
  }

  async function api(body) {
    const r = await fetch(window.MEHER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });
    return r.json();
  }
  async function getReviews(id) {
    const r = await fetch(window.MEHER_API_URL + '?what=reviews&id=' + encodeURIComponent(id));
    const d = await r.json();
    return Array.isArray(d) ? d : [];
  }

  return { imgURL, imgFail, imgList, cover, ytId, discountPct, isSoldOut, hasTag, inNewRow, inTrendingRow, inOfferRow, subOf, getProducts, api, getReviews };
})();
