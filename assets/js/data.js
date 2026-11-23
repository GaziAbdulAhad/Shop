/* ═══════════════════════════════════════════════════════════
   MEHER (মেহের) — Site Configuration & Shared Data
   ───────────────────────────────────────────────────────────
   Real business data, migrated from the original site
   (gaziabdulahad.github.io/Shop). Products come LIVE from the
   Google Sheets backend — see assets/js/api.js. Do not paste
   fictional products here; the sheet is the catalog.
   ═══════════════════════════════════════════════════════════ */
'use strict';

window.MEHER_CONFIG = {
  brand: 'ARIFAH',
  brandBn: 'আরিফাহ',
  taglineEn: 'The Art of Feminine Elegance',
  taglineBn: 'নারীত্বের এক সূক্ষ্ম শিল্প',
  /* real shop channels (from the original site) */
  hotline: '01755855600',
  hotlineHref: 'tel:01755855600',
  whatsapp: '01755855600',
  messenger: 'https://m.me/61583242650306',
  facebook: '',          // no public Facebook page link was set in the old site
  email: '',             // no public email — WhatsApp/Messenger are the real channels
  addressEn: 'Online store — Bangladesh (nationwide delivery)',
  addressBn: 'অনলাইন স্টোর — বাংলাদেশ (সারাদেশে ডেলিভারি)',
  site: 'gaziabdulahad.github.io/Shop',
  currency: '৳',
  /* real delivery fees (match the original Code.gs / cart pages) */
  shipping: { insideDhaka: 60, outsideDhaka: 120, labelInsideEn: 'Inside Dhaka', labelInsideBn: 'ঢাকার ভেতরে', labelOutsideEn: 'Outside Dhaka', labelOutsideBn: 'ঢাকার বাইরে' },
  returnDays: 7,
  socials: { instagram: '', facebook: '' },
  /* Meta Pixel ID — replace with your actual Pixel ID when available */
  metaPixelId: ''
};

/* WhatsApp deep link with an optional pre-filled message */
window.MEHER_WA = function waHref(msg) {
  const n = String(window.MEHER_CONFIG.whatsapp).replace(/\D/g, '').replace(/^0/, '880');
  return 'https://wa.me/' + n + (msg ? '?text=' + encodeURIComponent(msg) : '');
};

/* Sub-categories (the live sheet has no structured subcategory,
   these are derived in assets/js/api.js → subOf()) */
window.MEHER_SUBCATS = {
  'bridal-set': { en: 'Bridal Necklace Sets', bn: 'নেকলেস সেট' },
  'waist-chain': { en: 'Waist Chains · Komorer Bicha', bn: 'কোমরের ভিতর' },
  'other': { en: 'Other', bn: 'অন্যান্য' }
};

/* Bangladesh districts — original Bengali list from the old site */
window.MEHER_DISTRICTS = 'ঢাকা,গাজীপুর,নারায়ণগঞ্জ,নরসিংদী,মানিকগঞ্জ,মুন্সীগঞ্জ,কিশোরগঞ্জ,টাঙ্গাইল,ফরিদপুর,গোপালগঞ্জ,মাদারীপুর,রাজবাড়ী,শরীয়তপুর,চট্টগ্রাম,কক্সবাজার,কুমিল্লা,ব্রাহ্মণবাড়িয়া,চাঁদপুর,ফেনী,নোয়াখালী,লক্ষ্মীপুর,খাগড়াছড়ি,রাঙ্গামাটি,বান্দরবান,সিলেট,হবিগঞ্জ,মৌলভীবাজার,সুনামগঞ্জ,রাজশাহী,নাটোর,নওগাঁ,চাঁপাইনবাবগঞ্জ,পাবনা,সিরাজগঞ্জ,বগুড়া,জয়পুরহাট,খুলনা,বাগেরহাট,সাতক্ষীরা,যশোর,ঝিনাইদহ,মাগুরা,নড়াইল,কুষ্টিয়া,চুয়াডাঙ্গা,মেহেরপুর,বরিশাল,ভোলা,পটুয়াখালী,পিরোজপুর,ঝালকাঠি,বরগুনা,রংপুর,দিনাজপুর,গাইবান্ধা,কুড়িগ্রাম,লালমনিরহাট,নীলফামারী,পঞ্চগড়,ঠাকুরগাঁও,ময়মনসিংহ,জামালপুর,নেত্রকোণা,শেরপুর'.split(',');

window.MEHER_UTIL = {
  money(n) { return '৳' + Number(n || 0).toLocaleString('en-IN'); },
  findProduct(id) { return (window.MEHER_PRODUCTS || []).find(p => String(p.id) === String(id)) || null; },
  discountPct(p) {
    const o = Number(p.oldprice), n = Number(p.price);
    return o > n ? Math.round((o - n) / o * 100) : 0;
  },
  ratingOf(p) { const r = Number(p.rcount); return r > 0 ? { rating: Number(p.rating) || 0, count: r } : null; }
};
