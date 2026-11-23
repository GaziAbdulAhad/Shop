/* ═══════════════════════════════════════════════════════════
   MEHER — Policy renderer
   Renders the shop's REAL policy text (assets/js/policies.js,
   carried over from the original site) into policy pages.
   Bilingual: [bn] / [en] sections, toggled via MEHER language.
   ═══════════════════════════════════════════════════════════ */
'use strict';

window.MEHER_POLICY = (() => {
  const CFG = window.MEHER_CONFIG;
  const MEHER_REF = () => window.MEHER || (typeof MEHER !== 'undefined' ? MEHER : null);
  const lang = () => { const m = MEHER_REF(); return m && m.getLang && m.getLang() === 'en' ? 1 : 0; };
  const t = (key, vars) => { const m = MEHER_REF(); return m && m.t ? m.t(key, vars) : key; };

  function T(s) {
    const map = { shop: CFG.brand, wa: CFG.whatsapp, phone: CFG.hotline, site: CFG.site };
    return String(s).replace(/\{(\w+)\}/g, (m, k) => (k in map ? map[k] : m));
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  function blk(lines) {
    let html = '', ul = '';
    const flush = () => { if (ul) { html += `<ul>${ul}</ul>`; ul = ''; } };
    lines.forEach(x => {
      x = T(x);
      if (x.startsWith('• ')) ul += `<li>${esc(x.slice(2))}</li>`;
      else { flush(); html += `<p>${esc(x)}</p>`; }
    });
    flush();
    return html;
  }

  function parsePolicies(txt) {
    const out = [];
    let P = null, S = null, li = null;
    txt.split('\n').forEach(raw => {
      const l = raw.trim(); if (!l) return;
      if (l.startsWith('=== ')) {
        const a = l.slice(4).split('|').map(x => x.trim());
        P = { id: a[0], icon: a[1], t: [a[2], a[3]], s: [] };
        out.push(P); S = { h: ['', ''], b: [[], []] }; P.s.push(S); li = null; return;
      }
      if (l.startsWith('--- ')) {
        const a = l.slice(4).split('|').map(x => x.trim());
        S = { h: [a[0], a[1] || a[0]], b: [[], []] }; P.s.push(S); li = null; return;
      }
      if (l === '[bn]') { li = 0; return; }
      if (l === '[en]') { li = 1; return; }
      if (P && li !== null) S.b[li].push(l);
    });
    out.forEach(p => { p.s = p.s.filter(s => s.b[0].length || s.b[1].length); });
    return out;
  }

  const POLICIES = typeof POLICY_TEXT !== 'undefined' ? parsePolicies(POLICY_TEXT) : [];
  const loadError = () => t('load_error') && (MEHER_REF() && MEHER_REF().getLang && MEHER_REF().getLang() === 'en' ? 'Could not load the policy.' : 'পলিসি লোড করা যায়নি।');

  function sectionHTML(s, i) {
    return `<section class="ps" style="margin-bottom:1.25rem">${s.h[i] ? `<h2 style="font-family:var(--font-display);color:var(--purple);font-size:var(--fs-lg);margin-bottom:.4rem">${esc(T(s.h[i]))}</h2>` : ''}${blk(s.b[i])}</section>`;
  }
  function policyHTML(p) {
    const i = lang();
    return `<h1 class="h-display" style="color:var(--purple);font-size:var(--fs-2xl);margin-bottom:.75rem">${p.icon} ${esc(T(p.t[i]))}</h1>` + p.s.map(s => sectionHTML(s, i)).join('');
  }
  function find(id) { return POLICIES.find(p => p.id === id); }

  /* render one specific policy into a container; `pick` optionally filters sections by heading prefix */
  function renderPolicy(container, id, pick) {
    const p = find(id);
    if (!p) { container.innerHTML = `<p class="text-muted">${loadError()}</p>`; return; }
    let sections = p.s;
    if (pick && pick.length) sections = p.s.filter(s => pick.some(prefix => String(s.h[0]).startsWith(prefix)));
    const i = lang();
    container.innerHTML =
      (pick ? `<h2 class="h-display" style="color:var(--purple);font-size:var(--fs-lg);margin-bottom:.5rem">${p.icon} ${esc(T(p.t[i]))}</h2>` : `<h1 class="h-display" style="color:var(--purple);font-size:var(--fs-2xl);margin-bottom:.75rem">${p.icon} ${esc(T(p.t[i]))}</h1>`) +
      sections.map(s => sectionHTML(s, i)).join('') +
      `<p class="hint" style="margin-top:1rem">${t('pr_more_q')} <a href="contact.html" style="color:var(--purple);font-weight:700">${t('f_contact')}</a> · <a href="policy.html" style="color:var(--purple);font-weight:700">${t('pr_all_link')}</a></p>`;
  }

  /* full tabbed viewer (policy.html) */
  function renderTabs(container, tabsEl, hash) {
    const render = () => {
      const id = (location.hash.slice(1) || hash || 'terms');
      const p = find(id) || POLICIES[0];
      if (!p) { container.innerHTML = `<p class="text-muted">${loadError()}</p>`; return; }
      tabsEl.innerHTML = POLICIES.map(x => `<button class="chip" data-id="${x.id}" aria-pressed="${x.id === p.id}" style="${x.id === p.id ? 'background:var(--purple);color:#fff;border-color:var(--purple)' : ''}">${x.icon} ${esc(T(x.t[lang()]))}</button>`).join('');
      container.innerHTML = policyHTML(p);
      document.title = T(p.t[lang()]) + ' — MEHER';
    };
    tabsEl.addEventListener('click', e => {
      const b = e.target.closest('[data-id]'); if (!b) return;
      location.hash = b.dataset.id;
    });
    window.addEventListener('hashchange', render);
    window.addEventListener('meher:lang-changed', render);
    render();
  }

  return { POLICIES, renderPolicy, renderTabs };
})();
