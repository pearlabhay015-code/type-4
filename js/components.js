/**
 * CUSB WEBSITE - REUSABLE WEB COMPONENTS
 * Standard HTML5 custom elements utilizing Light DOM to inherit global stylesheets.
 */

window.cusbApiUrl = window.cusbApiUrl || ((path) => {
  const route = String(path).replace(/^\/+/, '');
  const configuredApiBase = '__CUSB_API_URL__'.trim().replace(/\/+$/, '');
  if (configuredApiBase && configuredApiBase !== '__CUSB_API_URL__') {
    return `${configuredApiBase}/${route}`;
  }
  const isPythonPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname) && window.location.port === '8000';
  if (isPythonPreview) return `http://localhost:8080/type4/api/${route}`;
  const base = new URL('.', document.baseURI);
  return new URL(`api/${route}`, base).toString();
});

const iconSvg = (name, label = '') => `
  <svg class="svg-icon svg-icon-${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <use href="#icon-${name}"></use>
  </svg>${label ? `<span>${label}</span>` : ''}
`;

const iconDefs = `
  <svg class="svg-sprite" aria-hidden="true" focusable="false">
    <symbol id="icon-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3V10.5Z"/></symbol>
    <symbol id="icon-search" viewBox="0 0 24 24"><path d="m21 20-5.2-5.2a7 7 0 1 0-1.1 1.1L20 21l1-1ZM5 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"/></symbol>
    <symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/></symbol>
    <symbol id="icon-close" viewBox="0 0 24 24"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z"/></symbol>
    <symbol id="icon-phone" viewBox="0 0 24 24"><path d="M6.6 10.8c1.5 3 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.7.6 4.1.6.7 0 1.3.6 1.3 1.3v3.7c0 .7-.6 1.3-1.3 1.3C10.3 21.8 2.2 13.7 2.2 3.3 2.2 2.6 2.8 2 3.5 2h3.7c.7 0 1.3.6 1.3 1.3 0 1.4.2 2.8.6 4.1.1.4 0 .8-.3 1.2l-2.2 2.2Z"/></symbol>
    <symbol id="icon-mail" viewBox="0 0 24 24"><path d="M3 5h18v14H3V5Zm2 3.3V17h14V8.3l-7 5-7-5Zm.8-1.3 6.2 4.4L18.2 7H5.8Z"/></symbol>
    <symbol id="icon-map-pin" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></symbol>
    <symbol id="icon-file" viewBox="0 0 24 24"><path d="M6 2h8l4 4v16H6V2Zm7 1.8V7h3.2L13 3.8ZM8 10h8v2H8v-2Zm0 4h8v2H8v-2Z"/></symbol>
    <symbol id="icon-calendar" viewBox="0 0 24 24"><path d="M7 2h2v3h6V2h2v3h3v17H4V5h3V2Zm11 8H6v10h12V10Z"/></symbol>
    <symbol id="icon-shield" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.2 6 2.2V11c0 4-2.4 7.6-6 8.8C8.4 18.6 6 15 6 11V6.4l6-2.2Z"/></symbol>
    <symbol id="icon-book" viewBox="0 0 24 24"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H7a2 2 0 0 0 0 4h13v-2H7a.5.5 0 0 1 0-1h13V2H6.5A4.5 4.5 0 0 0 2 6.5V20a3 3 0 0 0 3 3h1V7a2.5 2.5 0 0 1-2-2.5Z"/></symbol>
    <symbol id="icon-graduation" viewBox="0 0 24 24"><path d="m12 3 10 5-10 5L2 8l10-5Zm-6 8.4 2 1v4.1c1 .9 2.4 1.5 4 1.5s3-.6 4-1.5v-4.1l2-1V18c-1.5 1.3-3.6 2-6 2s-4.5-.7-6-2v-6.6Z"/></symbol>
    <symbol id="icon-building" viewBox="0 0 24 24"><path d="M4 21V3h10v4h6v14H4Zm2-2h2v-3h2v3h2V5H6v14Zm8 0h4V9h-4v10ZM8 7h2v2H8V7Zm0 4h2v2H8v-2Z"/></symbol>
    <symbol id="icon-chart" viewBox="0 0 24 24"><path d="M4 19h16v2H2V3h2v16Zm3-2V9h3v8H7Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z"/></symbol>
    <symbol id="icon-laptop" viewBox="0 0 24 24"><path d="M4 5h16v11H4V5Zm2 2v7h12V7H6ZM2 18h20v2H2v-2Z"/></symbol>
    <symbol id="icon-globe" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3.1a15 15 0 0 0-1.2-5 8 8 0 0 1 4.3 5ZM12 4.1c.8 1.1 1.4 2.8 1.7 4.9h-3.4c.3-2.1.9-3.8 1.7-4.9ZM4.3 13h3.9c.1 1.8.5 3.5 1.2 5a8 8 0 0 1-5.1-5Zm3.9-2H4.3a8 8 0 0 1 5.1-5 15 15 0 0 0-1.2 5Zm3.8 8.9c-.8-1.1-1.4-2.8-1.7-4.9h3.4c-.3 2.1-.9 3.8-1.7 4.9ZM14 13h-4v-2h4v2Zm.6 5a15 15 0 0 0 1.2-5h3.1a8 8 0 0 1-4.3 5Z"/></symbol>
    <symbol id="icon-briefcase" viewBox="0 0 24 24"><path d="M9 4h6v3h5v13H4V7h5V4Zm2 3h2V6h-2v1Zm-5 5v6h12v-6H6Zm0-2h12V9H6v1Z"/></symbol>
    <symbol id="icon-users" viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0 2c-3.3 0-6 1.7-6 3.8V20h12v-2.2C15 15.7 12.3 14 9 14Zm8-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-.8 0-1.5.1-2.2.4 1.4.9 2.2 2.1 2.2 3.4V20h5v-2.1c0-2.1-2.2-3.9-5-3.9Z"/></symbol>
    <symbol id="icon-lock" viewBox="0 0 24 24"><path d="M6 10V8a6 6 0 1 1 12 0v2h2v12H4V10h2Zm2 0h8V8a4 4 0 0 0-8 0v2Zm-2 2v8h12v-8H6Z"/></symbol>
    <symbol id="icon-medical" viewBox="0 0 24 24"><path d="M10 3h4v6h6v4h-6v6h-4v-6H4V9h6V3Z"/></symbol>
    <symbol id="icon-send" viewBox="0 0 24 24"><path d="M3 20 21 12 3 4v6l11 2-11 2v6Z"/></symbol>
    <symbol id="icon-arrow-up" viewBox="0 0 24 24"><path d="M11 20V7.8l-5.6 5.6L4 12 12 4l8 8-1.4 1.4L13 7.8V20h-2Z"/></symbol>
    <symbol id="icon-robot-chat" viewBox="0 0 24 24"><path d="M11 2h2v3h3.5A3.5 3.5 0 0 1 20 8.5V15a3.5 3.5 0 0 1-3.5 3.5h-1.7L12 22l-2.8-3.5H7.5A3.5 3.5 0 0 1 4 15V8.5A3.5 3.5 0 0 1 7.5 5H11V2Zm-3.5 5A1.5 1.5 0 0 0 6 8.5V15a1.5 1.5 0 0 0 1.5 1.5h2.7l1.8 2.2 1.8-2.2h2.7A1.5 1.5 0 0 0 18 15V8.5A1.5 1.5 0 0 0 16.5 7h-9ZM8 11a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm-3.5 3H15v2H9.5v-2Z"/></symbol>
    <symbol id="icon-moon" viewBox="0 0 24 24"><path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 9.5 9.5 0 1 0 21 14.5Z"/></symbol>
    <symbol id="icon-sun" viewBox="0 0 24 24"><path d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0-4h2v3h-2V1Zm0 19h2v3h-2v-3ZM1 11h3v2H1v-2Zm19 0h3v2h-3v-2ZM4.2 2.8l2.1 2.1-1.4 1.4-2.1-2.1 1.4-1.4Zm14.9 14.9 2.1 2.1-1.4 1.4-2.1-2.1 1.4-1.4Zm0-12.8 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4ZM4.9 17.7l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1Z"/></symbol>
    <symbol id="icon-chat" viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4V4Zm2 2v9.2L7.2 14H18V6H6Z"/></symbol>
    <symbol id="icon-facebook" viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z"/></symbol>
    <symbol id="icon-x" viewBox="0 0 24 24"><path d="M4 3h5.1l3.7 5.2L17.3 3H21l-6.3 7.2L22 21h-5.1l-4.2-6-5.2 6H3.8l7-8.1L4 3Zm3.1 2 10.8 14h1L8.1 5h-1Z"/></symbol>
    <symbol id="icon-instagram" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.2-3.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/></symbol>
    <symbol id="icon-linkedin" viewBox="0 0 24 24"><path d="M4 4.5A2.5 2.5 0 1 1 9 4.5a2.5 2.5 0 0 1-5 0ZM4.5 9h4v12h-4V9Zm6 0h3.8v1.7c.7-1.1 1.9-2 3.8-2 3.3 0 4.4 2.2 4.4 5.2V21h-4v-6.4c0-1.5-.3-2.6-1.8-2.6s-2.2 1.1-2.2 2.7V21h-4V9Z"/></symbol>
    <symbol id="icon-youtube" viewBox="0 0 24 24"><path d="M21.5 7.2c-.2-1-1-1.7-2-1.9C17.8 5 12 5 12 5s-5.8 0-7.5.3c-1 .2-1.8.9-2 1.9C2.2 9 2.2 12 2.2 12s0 3 .3 4.8c.2 1 1 1.7 2 1.9 1.7.3 7.5.3 7.5.3s5.8 0 7.5-.3c1-.2 1.8-.9 2-1.9.3-1.8.3-4.8.3-4.8s0-3-.3-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z"/></symbol>
    <symbol id="icon-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></symbol>
    <symbol id="icon-brain" viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4c0 .6.1 1.1.4 1.6A4 4 0 0 0 6 11c0 .7.2 1.4.5 2A4 4 0 0 0 5 16a4 4 0 0 0 3.5 4H11V6a2 2 0 0 1 2 0v14h2.5A4 4 0 0 0 19 16a4 4 0 0 0-1.5-3c.3-.6.5-1.3.5-2a4 4 0 0 0-2.4-3.4c.3-.5.4-1 .4-1.6a4 4 0 0 0-4-4Z"/></symbol>
    <symbol id="icon-flag" viewBox="0 0 24 24"><path d="M4 2v20M4 4h12l-3 4 3 4H4"/></symbol>
    <symbol id="icon-chevron-left" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></symbol>
    <symbol id="icon-chevron-right" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></symbol>
    <symbol id="icon-eye" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="icon-download" viewBox="0 0 24 24"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></symbol>
    <symbol id="icon-admin-key" viewBox="0 0 24 24"><path d="M12 2C9.2 2 7 4.2 7 7c0 1.9 1 3.5 2.5 4.3V22h5V11.3C16 10.5 17 8.9 17 7c0-2.8-2.2-5-5-5Zm0 2a3 3 0 0 1 0 6 3 3 0 0 1 0-6Z"/><path d="M10 15h4M10 18h4"/></symbol>
    <symbol id="icon-check" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol>
    <symbol id="icon-plus" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></symbol>
  </svg>
`;

function ensureIconSprite() {
  if (!document.getElementById('cusbIconSprite')) {
    const spriteWrap = document.createElement('div');
    spriteWrap.id = 'cusbIconSprite';
    spriteWrap.innerHTML = iconDefs;
    document.body.prepend(spriteWrap);
  }
}

const emojiIconMap = {
  '📢': 'file', '📞': 'phone', '✉': 'mail', '🔍': 'search', '☰': 'menu',
  '✕': 'close', '🌙': 'moon', '☀️': 'sun', '🏠': 'home', '🏛️': 'building',
  '👁️': 'eye', '📜': 'file', '📊': 'chart', '📂': 'file', '🛡️': 'shield',
  '♿': 'users', '👤': 'users', '🎓': 'graduation', '👔': 'briefcase',
  '📋': 'file', '💼': 'briefcase', '💻': 'laptop', '🌿': 'book',
  '⚖️': 'shield', '🔬': 'search', '🧬': 'medical', '📚': 'book',
  '📁': 'file', '🏢': 'building', '💡': 'file', '🤝': 'users',
  '🌐': 'globe', '🧑‍🎓': 'graduation', '🏆': 'graduation', '🔒': 'lock',
  '💰': 'briefcase', '⚽': 'users', '🌱': 'book', '👨‍🏫': 'users',
  '💳': 'briefcase', '📖': 'book', '🍳': 'briefcase', '🏫': 'building',
  '🏥': 'medical', '📸': 'file', '📄': 'download', '📅': 'calendar',
  '📝': 'file', '🔔': 'file', '📥': 'file', '📍': 'map-pin',
  '💬': 'chat', '➔': 'send', '▲': 'send', '⚡': 'file',
  '🎯': 'target', '🧠': 'brain', '🇮🇳': 'flag',
  '◀': 'chevron-left', '▶': 'chevron-right',
  '📧': 'mail', '👩': 'users', '👨': 'users', '🆔': 'file'
};

function iconNameFromText(text) {
  return Object.keys(emojiIconMap).find(key => text.includes(key));
}

function stripIconText(text) {
  return Object.keys(emojiIconMap).reduce((clean, key) => clean.replaceAll(key, ''), text).trim();
}

function replaceEmojiIcons(root = document) {
  ensureIconSprite();
  root.querySelectorAll('.megamenu-icon, .qa-ico, .quicklink-btn-icon, .facility-icon-wrap').forEach(el => {
    const key = iconNameFromText(el.textContent || '');
    if (key) el.innerHTML = iconSvg(emojiIconMap[key]);
  });

  root.querySelectorAll('.search-btn, .mobile-nav-toggle, .btn-theme, .chatbot-close, .chatbot-send-btn, .chatbot-toggle, #scroll-btn').forEach(el => {
    const key = iconNameFromText(el.textContent || '');
    if (key) el.innerHTML = iconSvg(emojiIconMap[key]);
  });

  root.querySelectorAll('.ticker-title, .qa-label, .search-modal-title, .chatbot-header span, .floating-message-bubble').forEach(el => {
    const text = el.textContent || '';
    const key = iconNameFromText(text);
    if (key) el.innerHTML = iconSvg(emojiIconMap[key], stripIconText(text));
  });

  root.querySelectorAll('.footer-contact-item > span:first-child').forEach(el => {
    const key = iconNameFromText(el.textContent || '');
    if (key) el.innerHTML = iconSvg(emojiIconMap[key]);
  });
}

window.cusbReplaceEmojiIcons = replaceEmojiIcons;
window.cusbIconSvg = iconSvg;

// 1. Ticker Component
class CusbTicker extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ticker-wrap" role="region" aria-label="Latest Announcements">
        <div class="ticker-title" data-en="📢 Updates" data-hi="📢 अपडेट">📢 Updates</div>
        <div class="ticker-marquee">
          <div class="ticker-track" id="tickerTrack">
            <!-- Dynamic announcements will populate here -->
            <span style="padding:0 20px; color:var(--tx-muted);" data-en="Loading updates..." data-hi="अपडेट लोड हो रहे हैं...">Loading updates...</span>
          </div>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
    const title = this.querySelector('.ticker-title');
    if (title) {
      title.innerHTML = `${iconSvg('file')}<span>Updates</span>`;
      title.setAttribute('data-en', 'Updates');
      title.setAttribute('data-hi', 'Updates');
    }
    this.loadAnnouncements();
  }

  async loadAnnouncements() {
    const track = this.querySelector('#tickerTrack');
    if (!track) return;

    const fallbackItems = [
      { title_en: 'Admissions Open 2026-27', title_hi: 'Admissions Open 2026-27' },
      { title_en: 'CUSB Admission Bulletin 2026 released', title_hi: 'CUSB Admission Bulletin 2026 released' },
      { title_en: 'Visit Latest News for notices and events', title_hi: 'Visit Latest News for notices and events' }
    ];

    const escapeHTML = value => String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);

    const renderTickerItems = items => {
      const visibleItems = (items && items.length ? items : fallbackItems).slice(0, 8);
      track.innerHTML = '';

      [...visibleItems, ...visibleItems].forEach((item, index) => {
        const a = document.createElement('a');
        a.href = 'index.html#notices';
        a.className = 'ticker-item';
        if (index >= visibleItems.length) a.setAttribute('aria-hidden', 'true');

        const isNew = index < 2;
        a.innerHTML = `
          <span data-en="${escapeHTML(item.title_en)}" data-hi="${escapeHTML(item.title_hi || item.title_en)}">${escapeHTML(item.title_en)}</span>
          ${isNew ? '<span class="ticker-badge" data-en="NEW" data-hi="NEW">NEW</span>' : ''}
        `;
        track.appendChild(a);
      });

      const currentLang = localStorage.getItem('cusb-lang') || 'en';
      track.querySelectorAll('[data-en], [data-hi]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) el.textContent = text;
      });
    };

    try {
      const res = await fetch(window.cusbApiUrl('announcements'));
      if (!res.ok) throw new Error(`Announcements API returned ${res.status}`);
      const data = await res.json();
      renderTickerItems(data);
    } catch (err) {
      console.error("Failed to load announcements:", err);
      renderTickerItems(fallbackItems);
    }
  }
}
customElements.define('cusb-ticker', CusbTicker);

// 2. Topbar Component
class CusbTopbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container topbar-wrap">
        <div class="topbar-contact">
          <span class="topbar-icon-text">${iconSvg('phone')}<span>0631-2229 530</span></span>
          <span class="topbar-divider">|</span>
          <a href="mailto:admission@cusb.ac.in" class="topbar-icon-text">${iconSvg('mail')}<span>admission@cusb.ac.in</span></a>
        </div>
        <div class="topbar-actions">
          <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" data-en="RTI" data-hi="सूचना का अधिकार (RTI)">RTI</a>
          <span class="topbar-divider">|</span>
          <a href="#" data-en="Disclosure" data-hi="प्रकटीकरण">Disclosure</a>
          <span class="topbar-divider">|</span>
          <a href="#" data-en="Feedback" data-hi="प्रतिक्रिया">Feedback</a>
          <span class="topbar-divider">|</span>
          <a href="admin.html" data-en="Admin Login" data-hi="एडमिन लॉगिन" class="topbar-icon-text">${iconSvg('admin-key')}<span data-en="Admin Login" data-hi="एडमिन लॉगिन">Admin Login</span></a>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-topbar', CusbTopbar);

// 2b. Accessibility Bar Component
class CusbAccessibilityBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container accessibility-bar-wrap">
        <div class="accessibility-left">
          <div class="accessibility-controls" role="group" aria-label="Accessibility Font Controls">
            <span class="size-label" data-en="Text Size:" data-hi="पाठ का आकार:">Text Size:</span>
            <button class="btn-size" id="btnDecSize" title="Decrease Text Size" aria-label="Decrease Font Size">−</button>
            <button class="btn-size" id="btnResetSize" title="Reset Text Size" aria-label="Reset Font Size"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"></path><path d="M20.49 9A9 9 0 0 0 5.64 5.64M3.51 15A9 9 0 0 0 18.36 18.36"></path></svg></button>
            <button class="btn-size" id="btnIncSize" title="Increase Text Size" aria-label="Increase Font Size">+</button>
            <span class="size-indicator" id="sizeIndicator">16px</span>
          </div>
        </div>
        <div class="accessibility-right">
          <!-- Language Converter (Dropdown protected with notranslate / translate="no") -->
          <div class="language-controls notranslate" translate="no" aria-label="Language Converter">
            <span class="lang-label" data-en="Language:" data-hi="भाषा:">Language:</span>
            <select class="language-select notranslate" translate="no" id="languageSelect" aria-label="Choose language">
              <option value="en" class="notranslate" translate="no">English</option>
              <optgroup label="Indian Languages" class="notranslate" translate="no">
                <option value="hi" class="notranslate" translate="no">हिन्दी (Hindi)</option>
                <option value="bn" class="notranslate" translate="no">বাংলা (Bengali)</option>
                <option value="ta" class="notranslate" translate="no">தமிழ் (Tamil)</option>
                <option value="te" class="notranslate" translate="no">తెలుగు (Telugu)</option>
                <option value="mr" class="notranslate" translate="no">मराठी (Marathi)</option>
                <option value="gu" class="notranslate" translate="no">ગુજરાતી (Gujarati)</option>
                <option value="pa" class="notranslate" translate="no">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="ur" class="notranslate" translate="no">اردو (Urdu)</option>
                <option value="kn" class="notranslate" translate="no">ಕನ್ನಡ (Kannada)</option>
                <option value="ml" class="notranslate" translate="no">മലയാളം (Malayalam)</option>
                <option value="or" class="notranslate" translate="no">ଓଡ଼ିଆ (Odia)</option>
                <option value="as" class="notranslate" translate="no">অসমীয়া (Assamese)</option>
                <option value="ne" class="notranslate" translate="no">नेपाली (Nepali)</option>
                <option value="sa" class="notranslate" translate="no">संस्कृतम् (Sanskrit)</option>
              </optgroup>
              <optgroup label="Foreign Languages" class="notranslate" translate="no">
                <option value="ar" class="notranslate" translate="no">العربية (Arabic)</option>
                <option value="zh-CN" class="notranslate" translate="no">中文 (Chinese)</option>
                <option value="fr" class="notranslate" translate="no">Français (French)</option>
                <option value="de" class="notranslate" translate="no">Deutsch (German)</option>
                <option value="it" class="notranslate" translate="no">Italiano (Italian)</option>
                <option value="ja" class="notranslate" translate="no">日本語 (Japanese)</option>
                <option value="ko" class="notranslate" translate="no">한국어 (Korean)</option>
                <option value="pt" class="notranslate" translate="no">Português (Portuguese)</option>
                <option value="ru" class="notranslate" translate="no">Русский (Russian)</option>
                <option value="es" class="notranslate" translate="no">Español (Spanish)</option>
              </optgroup>
            </select>
          </div>
          <span class="accessibility-divider">|</span>
          <!-- Theme Switcher -->
          <div class="theme-toggle-container">
            <span class="theme-label" data-en="Theme:" data-hi="थीम:">Theme:</span>
            <button class="btn-theme" id="themeToggleBtn" aria-label="Toggle Light/Dark Theme">${iconSvg('moon')}</button>
          </div>
          <span class="accessibility-divider">|</span>
          <!-- Search Bar Area -->
          <div class="accessibility-search-container" role="search">
            <div class="search-container" style="width: 260px;">
              <input type="search" class="search-input" id="headerSearchInput" placeholder="Search courses, syllabs..." aria-label="Search courses, syllabs...">
              <button type="button" class="search-btn" id="headerSearchTriggerBtn" aria-label="Open Search Modal" title="Search CUSB Website (Ctrl+K)">
                ${iconSvg('search')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-accessibility-bar', CusbAccessibilityBar);

// 3. Header Component
class CusbHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container header-wrap" role="banner">
        <a href="index.html" class="header-brand" aria-label="CUSB Homepage">
          <img src="assets/culog.png" class="header-logo" alt="CUSB Emblem" loading="lazy">
          <div class="header-titles">
            <span class="header-title-main" data-en="CENTRAL UNIVERSITY OF SOUTH BIHAR" data-hi="दक्षिण बिहार केन्द्रीय विश्वविद्यालय">CENTRAL UNIVERSITY OF SOUTH BIHAR</span>
            <span class="header-title-sub" data-en="Established by the Central Universities Act, 2009" data-hi="केन्द्रीय विश्वविद्यालय अधिनियम, 2009 द्वारा स्थापित">Established by the Central Universities Act, 2009</span>
          </div>
        </a>
        
        <div class="header-controls">
          <!-- NAAC and Viksit Bharat Badges -->
          <div class="header-badges">
            <img src="assets/NAAC.png" alt="NAAC A++ Badge" class="header-badge-img" loading="lazy">
            <img src="assets/viksit.png" alt="Viksit Bharat Banner" class="header-badge-img" loading="lazy">
          </div>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-header', CusbHeader);

// 4. Navbar & Megamenu Component
class CusbNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container" style="display:flex; justify-content:space-between; align-items:center; position:relative;">
        <button class="mobile-quicklinks-toggle" id="mobileQuickLinksToggleBtn" aria-label="Open Quick Links" aria-expanded="false">
          ${iconSvg('target')}
          <span data-en="Quick Links" data-hi="Quick Links">Quick Links</span>
        </button>
        <button class="mobile-nav-toggle" id="mobileNavToggleBtn" aria-label="Open Navigation Menu" aria-expanded="false">${iconSvg('menu')}</button>
        
        <nav class="navbar-nav" aria-label="Main Navigation">
          <ul class="navbar-menu" id="navbarMenu">
            <!-- 1. HOME -->
            <li class="navbar-item" data-menu="home">
              <a href="index.html" class="navbar-link"><span class="megamenu-icon">🏠</span><span data-en="Home" data-hi="होम">Home</span></a>
              <div class="megamenu" id="referenceAboutMegamenu" role="region" aria-label="About Menu Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="About University" data-hi="About University">About University</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="about-resources.html#the-university"><span class="megamenu-icon">ðŸ›ï¸</span><span data-en="The University" data-hi="The University">The University</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#act"><span class="megamenu-icon">ðŸ“œ</span><span data-en="Central Universities Act, 2009" data-hi="Central Universities Act, 2009">Central Universities Act, 2009</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#history"><span class="megamenu-icon">ðŸ“š</span><span data-en="History and Development" data-hi="History and Development">History and Development</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#statutes"><span class="megamenu-icon">ðŸ“‹</span><span data-en="Statutes & Ordinances" data-hi="Statutes & Ordinances">Statutes & Ordinances</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#vision"><span class="megamenu-icon">ðŸ‘ï¸</span><span data-en="Vision & Mission" data-hi="Vision & Mission">Vision & Mission</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#policy-documents"><span class="megamenu-icon">ðŸ›¡ï¸</span><span data-en="Regulation and Policy Documents" data-hi="Regulation and Policy Documents">Regulation and Policy Documents</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#best-practices"><span class="megamenu-icon">ðŸŽ¯</span><span data-en="Salient Features and Best Practices" data-hi="Salient Features and Best Practices">Salient Features and Best Practices</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#annual-reports"><span class="megamenu-icon">ðŸ“Š</span><span data-en="Annual Reports and Annual Accounts" data-hi="Annual Reports and Annual Accounts">Annual Reports and Annual Accounts</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#kulgeet"><span class="megamenu-icon">ðŸ“–</span><span data-en="University Kulgeet" data-hi="University Kulgeet">University Kulgeet</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#logo"><span class="megamenu-icon">ðŸ‡®ðŸ‡³</span><span data-en="CUSB Logo" data-hi="CUSB Logo">CUSB Logo</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#reach"><span class="megamenu-icon">ðŸ“</span><span data-en="How to Reach CUSB" data-hi="How to Reach CUSB">How to Reach CUSB</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Statutory Bodies" data-hi="Statutory Bodies">Statutory Bodies</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="about-resources.html#court"><span class="megamenu-icon">ðŸ›ï¸</span><span data-en="The Court" data-hi="The Court">The Court</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#executive-council"><span class="megamenu-icon">ðŸ‘¤</span><span data-en="Executive Council" data-hi="Executive Council">Executive Council</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#academic-council"><span class="megamenu-icon">ðŸ“‹</span><span data-en="Academic Council" data-hi="Academic Council">Academic Council</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#finance-committee"><span class="megamenu-icon">ðŸ’¼</span><span data-en="Finance Committee" data-hi="Finance Committee">Finance Committee</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Others" data-hi="Others">Others</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="tenders.html"><span class="megamenu-icon">ðŸ“‹</span><span data-en="Tenders" data-hi="Tenders">Tenders</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html?type=notice"><span class="megamenu-icon">ðŸ””</span><span data-en="Notices" data-hi="Notices">Notices</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html?type=event"><span class="megamenu-icon">ðŸ“…</span><span data-en="Upcoming Events" data-hi="Upcoming Events">Upcoming Events</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#archived"><span class="megamenu-icon">ðŸ“‚</span><span data-en="Archived Events" data-hi="Archived Events">Archived Events</span></a></li>
                    <li class="megamenu-item"><a href="index.html#gallery"><span class="megamenu-icon">ðŸ“¸</span><span data-en="Photo Gallery" data-hi="Photo Gallery">Photo Gallery</span></a></li>
                    <li class="megamenu-item"><a href="careers.html"><span class="megamenu-icon">ðŸ’¼</span><span data-en="Recruitment" data-hi="Recruitment">Recruitment</span></a></li>
                    <li class="megamenu-item"><a href="downloads.html"><span class="megamenu-icon">ðŸ“„</span><span data-en="Download" data-hi="Download">Download</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#recent"><span class="megamenu-icon">ðŸ“¥</span><span data-en="Recent Event" data-hi="Recent Event">Recent Event</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#academic-highlights"><span class="megamenu-icon">ðŸŽ“</span><span data-en="Academic Highlights" data-hi="Academic Highlights">Academic Highlights</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html?type=circular"><span class="megamenu-icon">ðŸ“œ</span><span data-en="Circular / Notification / Office Order" data-hi="Circular / Notification / Office Order">Circular / Notification / Office Order</span></a></li>
                    <li class="megamenu-item"><a href="about-resources.html#foundation-day"><span class="megamenu-icon">ðŸ‡®ðŸ‡³</span><span data-en="Foundation Day" data-hi="Foundation Day">Foundation Day</span></a></li>
                  </ul>
                </div>
              </div>
            </li>

            <!-- 2. ABOUT -->
            <li class="navbar-item" data-menu="about">
              <a href="about-resources.html" class="navbar-link"><span data-en="About" data-hi="परिचय">About</span></a>
              <div class="megamenu" id="aboutMegamenu" role="region" aria-label="About Menu Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Overview" data-hi="अवलोकन">Overview</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="about.html"><span class="megamenu-icon">🏛️</span><span data-en="Overview & History" data-hi="अवलोकन एवं इतिहास">Overview & History</span></a></li>
                    <li class="megamenu-item"><a href="about.html#vision"><span class="megamenu-icon">👁️</span><span data-en="Vision & Mission" data-hi="दृष्टिकोण और लक्ष्य">Vision & Mission</span></a></li>
                    <li class="megamenu-item"><a href="about.html#accreditation"><span class="megamenu-icon">📜</span><span data-en="Accreditations & NAAC" data-hi="मान्यता और नैक">Accreditations & NAAC</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Reports & Statutory" data-hi="रिपोर्ट और वैधानिक">Reports & Statutory</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="policies.html#reports"><span class="megamenu-icon">📊</span><span data-en="Annual Reports" data-hi="वार्षिक प्रतिवेदन">Annual Reports</span></a></li>
                    <li class="megamenu-item"><a href="https://rtionline.gov.in/" target="_blank"><span class="megamenu-icon">📂</span><span data-en="RTI Cell" data-hi="आरटीआई सेल">RTI Cell</span></a></li>
                    <li class="megamenu-item"><a href="policies.html#policies"><span class="megamenu-icon">🛡️</span><span data-en="University Policies" data-hi="विश्वविद्यालय नीतियां">University Policies</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Information" data-hi="जानकारी">Information</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="policies.html#accessibility"><span class="megamenu-icon">♿</span><span data-en="Accessibility" data-hi="सुगम्यता वक्तव्य">Accessibility Statement</span></a></li>
                    <li class="megamenu-item"><a href="#footer"><span class="megamenu-icon">📞</span><span data-en="Contact CUSB" data-hi="संपर्क विवरण">Contact CUSB</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 3. ADMINISTRATION -->
            <li class="navbar-item" data-menu="admin">
              <a href="administration-resources.html" class="navbar-link"><span data-en="Administration" data-hi="प्रशासन">Administration</span></a>
              <div class="megamenu" id="adminMegamenu" role="region" aria-label="Administration Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Leadership" data-hi="नेतृत्व">Leadership</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="leaders.html#visitor"><span class="megamenu-icon">👤</span><span data-en="Hon'ble Visitor" data-hi="माननीय कुलाध्यक्ष">Hon'ble Visitor</span></a></li>
                    <li class="megamenu-item"><a href="leaders.html#chancellor"><span class="megamenu-icon">🎓</span><span data-en="Hon'ble Chancellor" data-hi="माननीय कुलाधिपति">Hon'ble Chancellor</span></a></li>
                    <li class="megamenu-item"><a href="leaders.html#vc"><span class="megamenu-icon">👔</span><span data-en="Vice Chancellor" data-hi="कुलपति">Vice Chancellor</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Governance" data-hi="शासन">Governance</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="leaders.html#executive"><span class="megamenu-icon">🏛️</span><span data-en="Executive Council" data-hi="कार्यकारिणी परिषद">Executive Council</span></a></li>
                    <li class="megamenu-item"><a href="leaders.html#academic"><span class="megamenu-icon">📋</span><span data-en="Academic Council" data-hi="अकादमिक परिषद">Academic Council</span></a></li>
                    <li class="megamenu-item"><a href="leaders.html#finance"><span class="megamenu-icon">💼</span><span data-en="Finance Committee" data-hi="वित्त समिति">Finance Committee</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Directory" data-hi="निर्देशिका">Directory</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="leaders.html#faculty"><span class="megamenu-icon">📋</span><span data-en="Faculty Directory" data-hi="संकाय निर्देशिका">Faculty Directory</span></a></li>
                    <li class="megamenu-item"><a href="careers.html"><span class="megamenu-icon">💼</span><span data-en="Recruitment / Careers" data-hi="भर्तियां / करियर">Recruitment / Careers</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 4. ACADEMICS -->
            <li class="navbar-item" data-menu="academics">
              <a href="courses.html" class="navbar-link"><span data-en="Academics" data-hi="अकादमिक">Academics</span></a>
              <div class="megamenu" id="academicsMegamenu" role="region" aria-label="Academics Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="EARTH, BIOLOGICAL AND ENVIRONMENTAL SCIENCES" data-hi="पृथ्वी, जैविक और पर्यावरण विज्ञान">EARTH, BIOLOGICAL AND ENVIRONMENTAL SCIENCES</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=bioinformatics"><span data-en="Dept. of Bioinformatics" data-hi="बायोइनफॉरमैटिक्स विभाग">Dept. of Bioinformatics</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=geology"><span data-en="Department of Geology" data-hi="भूविज्ञान विभाग">Department of Geology</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=geography"><span data-en="Department of Geography" data-hi="भूगोल विभाग">Department of Geography</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=life-science"><span data-en="Dept. of Life Science" data-hi="जीवन विज्ञान विभाग">Dept. of Life Science</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=biotechnology"><span data-en="Department of Biotechnology" data-hi="बायोटेक्नोलॉजी विभाग">Department of Biotechnology</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=environmental-sciences"><span data-en="Department of Environmental Sciences" data-hi="पर्यावरण विज्ञान विभाग">Department of Environmental Sciences</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="SOCIAL SCIENCES AND POLICIES" data-hi="सामाजिक विज्ञान और नीतियां">SOCIAL SCIENCES AND POLICIES</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=historical-studies-archaeology"><span data-en="Department of Historical Studies and Archaeology" data-hi="ऐतिहासिक अध्ययन एवं पुरातत्व विभाग">Department of Historical Studies and Archaeology</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=economic-studies-policy"><span data-en="Department of Economic Studies and Policy" data-hi="आर्थिक अध्ययन एवं नीति विभाग">Department of Economic Studies and Policy</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=development-studies"><span data-en="Development Studies" data-hi="विकास अध्ययन">Development Studies</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=political-studies"><span data-en="Dept. of Political Studies" data-hi="राजनीतिक अध्ययन विभाग">Dept. of Political Studies</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=sociological-studies"><span data-en="Department of Sociological Studies" data-hi="समाजशास्त्र अध्ययन विभाग">Department of Sociological Studies</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=library-information-science"><span data-en="Dept. of Library &amp; Information Science" data-hi="पुस्तकालय एवं सूचना विज्ञान विभाग">Dept. of Library &amp; Information Science</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="MATHEMATICS, STATISTICS AND COMPUTER SCIENCE" data-hi="गणित, सांख्यिकी एवं कंप्यूटर विज्ञान">MATHEMATICS, STATISTICS AND COMPUTER SCIENCE</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=mathematics"><span data-en="Dept. of Mathematics" data-hi="गणित विभाग">Dept. of Mathematics</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=statistics"><span data-en="Department of Statistics" data-hi="सांख्यिकी विभाग">Department of Statistics</span></a></li>
                    <li class="megamenu-item"><a href="cs.html"><span data-en="Department of Computer Science" data-hi="कंप्यूटर विज्ञान विभाग">Department of Computer Science</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="SCHOOL OF EDUCATION (TEACHER &amp; PHYSICAL)" data-hi="शिक्षा अध्ययन शाला (शिक्षक और शारीरिक)">SCHOOL OF EDUCATION (TEACHER &amp; PHYSICAL)</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=teacher-education"><span data-en="Department of Teacher Education" data-hi="शिक्षक शिक्षा विभाग">Department of Teacher Education</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=physical-education"><span data-en="Department of Physical Education" data-hi="शारीरिक शिक्षा विभाग">Department of Physical Education</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="PHYSICAL &amp; CHEMICAL" data-hi="भौतिक एवं रासायनिक विज्ञान">PHYSICAL &amp; CHEMICAL</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=chemistry"><span data-en="Department of Chemistry" data-hi="रसायन शास्त्र विभाग">Department of Chemistry</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=physics"><span data-en="Department of Physics" data-hi="भौतिक विज्ञान विभाग">Department of Physics</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="LANGUAGES &amp; LITERATURE" data-hi="भाषा एवं साहित्य">LANGUAGES &amp; LITERATURE</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=english"><span data-en="Department of English" data-hi="अंग्रेजी विभाग">Department of English</span></a></li>
                    <li class="megamenu-item"><a href="department.html?dept=indian-languages"><span data-en="Dept. of Indian Languages" data-hi="भारतीय भाषा विभाग">Dept. of Indian Languages</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="MEDIA, ARTS &amp; AESTHETICS" data-hi="मीडिया, कला और सौंदर्यशास्त्र">MEDIA, ARTS &amp; AESTHETICS</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=mass-communication-media"><span data-en="Mass Communication and Media" data-hi="जनसंचार एवं मीडिया">Mass Communication and Media</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="SCHOOL OF MANAGEMENT" data-hi="प्रबंधन अध्ययन शाला">SCHOOL OF MANAGEMENT</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=commerce-business-studies"><span data-en="Department of Commerce and Business Studies" data-hi="वाणिज्य एवं व्यवसाय अध्ययन विभाग">Department of Commerce and Business Studies</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="HUMAN SCIENCES" data-hi="मानव विज्ञान">HUMAN SCIENCES</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=psychological-sciences"><span data-en="Dept. of Psychological Sciences" data-hi="मनोवैज्ञानिक विज्ञान विभाग">Dept. of Psychological Sciences</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="LAW AND GOVERNANCE" data-hi="विधि एवं सुशासन">LAW AND GOVERNANCE</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=law-governance"><span data-en="Department of Law and Governance" data-hi="विधि एवं सुशासन विभाग">Department of Law and Governance</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="HEALTH SCIENCE" data-hi="स्वास्थ्य विज्ञान">HEALTH SCIENCE</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=pharmacy"><span data-en="Department of Pharmacy" data-hi="फार्मेसी विभाग">Department of Pharmacy</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="AGRICULTURE &amp; DEVELOPMENT" data-hi="कृषि एवं विकास">AGRICULTURE &amp; DEVELOPMENT</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="department.html?dept=agriculture"><span data-en="Department of Agriculture" data-hi="कृषि विभाग">Department of Agriculture</span></a></li>
                  </ul>
                </div>
              </div>
            </li>

            <!-- 5. ADMISSIONS -->
            <li class="navbar-item" data-menu="admissions">
              <a href="admissions.html" class="navbar-link"><span data-en="Admissions" data-hi="प्रवेश">Admissions</span></a>
              <div class="megamenu" id="admissionsMegamenu" role="region" aria-label="Admissions Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Admissions" data-hi="प्रवेश">Admissions</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="admissions.html#admission-2026-27"><span class="megamenu-icon">📝</span><span data-en="Admission 2026-27" data-hi="प्रवेश 2026-27">Admission 2026-27</span></a></li>
                    <li class="megamenu-item"><a href="admissions.html#international-students"><span class="megamenu-icon">🌐</span><span data-en="International Student" data-hi="अंतरराष्ट्रीय विद्यार्थी">International Student</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Resources" data-hi="संसाधन">Resources</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="courses.html"><span class="megamenu-icon">📚</span><span data-en="Programmes and Courses" data-hi="कार्यक्रम और पाठ्यक्रम">Programmes and Courses</span></a></li>
                    <li class="megamenu-item"><a href="admissions.html#help-desk"><span class="megamenu-icon">💬</span><span data-en="Help Desk" data-hi="सहायता डेस्क">Help Desk</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 6. RESEARCH -->
            <li class="navbar-item" data-menu="research">
              <a href="research.html" class="navbar-link"><span data-en="Research" data-hi="अनुसंधान">Research</span></a>
              <div class="megamenu" id="researchMegamenu" role="region" aria-label="Research Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Facility and Services" data-hi="सुविधाएं और सेवाएं">Facility and Services</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#central-instrumental-facility"><span class="megamenu-icon">🔬</span><span data-en="Central Instrumental Facility" data-hi="केंद्रीय उपकरण सुविधा">Central Instrumental Facility</span></a></li>
                    <li class="megamenu-item"><a href="research.html#university-computer-centre"><span class="megamenu-icon">💻</span><span data-en="University Computer Centre" data-hi="विश्वविद्यालय कंप्यूटर केंद्र">University Computer Centre</span></a></li>
                    <li class="megamenu-item"><a href="research.html#media-studio"><span class="megamenu-icon">🎥</span><span data-en="Media Studio" data-hi="मीडिया स्टूडियो">Media Studio</span></a></li>
                    <li class="megamenu-item"><a href="research.html#inca-congress"><span class="megamenu-icon">🌐</span><span data-en="45th INCA International Congress" data-hi="45वीं आईएनसीए अंतरराष्ट्रीय कांग्रेस">45th INCA International Congress</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Committee & Cell" data-hi="समिति और प्रकोष्ठ">Committee & Cell</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#iic"><span class="megamenu-icon">💡</span><span data-en="IIC-Innovation Council" data-hi="आईआईसी-नवाचार परिषद">IIC-Innovation Council</span></a></li>
                    <li class="megamenu-item"><a href="research.html#ipr"><span class="megamenu-icon">©</span><span data-en="IPR Cell" data-hi="आईपीआर प्रकोष्ठ">IPR Cell</span></a></li>
                    <li class="megamenu-item"><a href="research.html#rdc"><span class="megamenu-icon">🧪</span><span data-en="R&D Cell" data-hi="अनुसंधान एवं विकास प्रकोष्ठ">R&D Cell</span></a></li>
                    <li class="megamenu-item"><a href="research.html#fpac-iaec-rdc"><span class="megamenu-icon">⚖</span><span data-en="FPAC/IAEC/RDC Cell" data-hi="एफपीएसी/आईएईसी/आरडीसी प्रकोष्ठ">FPAC/IAEC/RDC Cell</span></a></li>
                    <li class="megamenu-item"><a href="research.html#legal-cell"><span class="megamenu-icon">⚖</span><span data-en="Legal Cell" data-hi="कानूनी प्रकोष्ठ">Legal Cell</span></a></li>
                    <li class="megamenu-item"><a href="research.html#iecbhr-ibsc"><span class="megamenu-icon">🛡</span><span data-en="IECBHR/IBSC Cell" data-hi="आईईसीबीएचआर/आईबीएससी प्रकोष्ठ">IECBHR/IBSC Cell</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="General" data-hi="सामान्य">General</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#highlights-publications"><span class="megamenu-icon">📚</span><span data-en="Highlights and Publications" data-hi="मुख्य उपलब्धियां और प्रकाशन">Highlights and Publications</span></a></li>
                    <li class="megamenu-item"><a href="research.html#partnership"><span class="megamenu-icon">🤝</span><span data-en="Partnership" data-hi="साझेदारी">Partnership</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Grants & Funding" data-hi="अनुदान और वित्त पोषण">Grants & Funding</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#scholarship-fellowship"><span class="megamenu-icon">🎓</span><span data-en="Scholarship and Fellowship" data-hi="छात्रवृत्ति और फेलोशिप">Scholarship and Fellowship</span></a></li>
                    <li class="megamenu-item"><a href="research.html#grants-faculties"><span class="megamenu-icon">💰</span><span data-en="Grants for Faculties" data-hi="संकाय के लिए अनुदान">Grants for Faculties</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 7. STUDENTS & CAMPUS -->
            <li class="navbar-item" data-menu="students">
              <a href="students.html" class="navbar-link"><span data-en="Student Corner" data-hi="छात्र कॉर्नर">Student Corner</span></a>
              <div class="megamenu" id="studentsMegamenu" role="region" aria-label="Student Links">
                <div class="megamenu-column">
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="courses.html"><span class="megamenu-icon">🏫</span><span data-en="Department & Programmes" data-hi="विभाग और कार्यक्रम">Department & Programmes</span></a></li>
                    <li class="megamenu-item"><a href="students.html#academic-examination-notices"><span class="megamenu-icon">🔔</span><span data-en="Academics/Examination Notices" data-hi="शैक्षणिक/परीक्षा सूचनाएं">Academics/Examination Notices</span></a></li>
                    <li class="megamenu-item"><a href="students.html#semester-exam-schedule"><span class="megamenu-icon">📅</span><span data-en="Semester Exam Schedule" data-hi="सेमेस्टर परीक्षा कार्यक्रम">Semester Exam Schedule</span></a></li>
                    <li class="megamenu-item"><a href="students.html#ordinance-manual-regulation"><span class="megamenu-icon">📖</span><span data-en="Ordinance/ Manual/ Regulation" data-hi="अध्यादेश/नियमावली/विनियम">Ordinance/ Manual/ Regulation</span></a></li>
                    <li class="megamenu-item"><a href="students.html#semester-results"><span class="megamenu-icon">📋</span><span data-en="Semester Result" data-hi="सेमेस्टर परिणाम">Semester Result</span></a></li>
                    <li class="megamenu-item"><a href="admissions.html#admission-2026-27"><span class="megamenu-icon">📝</span><span data-en="Prospectus" data-hi="विवरणिका">Prospectus</span></a></li>
                    <li class="megamenu-item"><a href="students.html#convocation"><span class="megamenu-icon">🎓</span><span data-en="Convocation" data-hi="दीक्षांत समारोह">Convocation</span></a></li>
                    <li class="megamenu-item"><a href="students.html#formats-performa"><span class="megamenu-icon">📄</span><span data-en="Download (Format/Performa)" data-hi="डाउनलोड (प्रारूप/प्रपत्र)">Download (Format/Performa)</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="courses.html"><span class="megamenu-icon">📚</span><span data-en="Course Structure and Syllabus" data-hi="पाठ्यक्रम संरचना और सिलेबस">Course Structure and Syllabus</span></a></li>
                    <li class="megamenu-item"><a href="students.html#scholarship-fellowship"><span class="megamenu-icon">💰</span><span data-en="Scholarship and Fellowship" data-hi="छात्रवृत्ति और फेलोशिप">Scholarship and Fellowship</span></a></li>
                    <li class="megamenu-item"><a href="hostel.html"><span class="megamenu-icon">🏠</span><span data-en="Hostel" data-hi="छात्रावास">Hostel</span></a></li>
                    <li class="megamenu-item"><a href="students.html#anti-ragging"><span class="megamenu-icon">🛡</span><span data-en="Anti-Ragging" data-hi="एंटी रैगिंग">Anti-Ragging</span></a></li>
                    <li class="megamenu-item"><a href="students.html#alumni"><span class="megamenu-icon">🤝</span><span data-en="Alumni" data-hi="पूर्व छात्र">Alumni</span></a></li>
                    <li class="megamenu-item"><a href="students.html#dace"><span class="megamenu-icon">🌱</span><span data-en="DACE" data-hi="डीएसीई">DACE</span></a></li>
                    <li class="megamenu-item"><a href="students.html#capacity-development"><span class="megamenu-icon">📈</span><span data-en="Capacity Development and Skill Enhancement Programme" data-hi="क्षमता विकास और कौशल संवर्धन कार्यक्रम">Capacity Development and Skill Enhancement Programme</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="students.html#placement-cell"><span class="megamenu-icon">💼</span><span data-en="Placement Cell" data-hi="प्लेसमेंट सेल">Placement Cell</span></a></li>
                    <li class="megamenu-item"><a href="students.html#counselling-wellbeing"><span class="megamenu-icon">💬</span><span data-en="Students Counselling and Well-being Centre" data-hi="छात्र परामर्श और कल्याण केंद्र">Students Counselling and Well-being Centre</span></a></li>
                    <li class="megamenu-item"><a href="students.html#nss"><span class="megamenu-icon">🤲</span><span data-en="NSS" data-hi="एनएसएस">NSS</span></a></li>
                    <li class="megamenu-item"><a href="students.html#ncc"><span class="megamenu-icon">🏅</span><span data-en="NCC" data-hi="एनसीसी">NCC</span></a></li>
                    <li class="megamenu-item"><a href="students.html#extracurricular-activities"><span class="megamenu-icon">🎭</span><span data-en="Extracurricular Activities" data-hi="पाठ्येतर गतिविधियां">Extracurricular Activities</span></a></li>
                    <li class="megamenu-item"><a href="students.html#code-of-ethics"><span class="megamenu-icon">⚖</span><span data-en="Code of Ethics" data-hi="आचार संहिता">Code of Ethics</span></a></li>
                    <li class="megamenu-item"><a href="students.html#grievance-redressal"><span class="megamenu-icon">✉</span><span data-en="Grievance Redressal Committee for Students" data-hi="छात्र शिकायत निवारण समिति">Grievance Redressal Committee for Students</span></a></li>
                  </ul>
                </div>
              </div>
            </li>

            <!-- 8. CAREERS & TENDERS -->
            <li class="navbar-item" data-menu="opportunities">
              <a href="careers.html" class="navbar-link"><span data-en="Careers & Tenders" data-hi="करियर और निविदाएं">Careers & Tenders</span></a>
              <div class="megamenu" id="opportunitiesMegamenu" role="region" aria-label="Opportunities Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Recruitment" data-hi="भर्तियां">Recruitment</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="careers.html"><span class="megamenu-icon">💼</span><span data-en="Faculty & Staff Openings" data-hi="शिक्षण एवं गैर-शिक्षण पद">Faculty & Staff Openings</span></a></li>
                    <li class="megamenu-item"><a href="careers.html#results"><span class="megamenu-icon">📜</span><span data-en="Recruitment Results" data-hi="भर्ती परिणाम">Recruitment Results</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Tenders" data-hi="निविदाएं">Procurement</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="tenders.html"><span class="megamenu-icon">📋</span><span data-en="Active Tenders" data-hi="सक्रिय निविदाएं">Active Tenders & EOI</span></a></li>
                    <li class="megamenu-item"><a href="tenders.html#archived"><span class="megamenu-icon">📂</span><span data-en="Archived Tenders" data-hi="पुराणी निविदाएं">Archived Tenders</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 9. DOWNLOADS & NOTICES -->
            <li class="navbar-item" data-menu="downloads">
              <a href="news-events.html" class="navbar-link"><span data-en="Notices & Media" data-hi="सूचनाएं एवं मीडिया">Notices & Media</span></a>
              <div class="megamenu" id="downloadsMegamenu" role="region" aria-label="Downloads Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Notices & Events" data-hi="सूचनाएं और कार्यक्रम">Notices & Events</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="news-events.html#notices"><span class="megamenu-icon">🔔</span><span data-en="Notices" data-hi="सूचनाएं">Notices</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#upcoming-events"><span class="megamenu-icon">📅</span><span data-en="Upcoming Events" data-hi="आगामी कार्यक्रम">Upcoming Events</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#archived-events"><span class="megamenu-icon">📁</span><span data-en="Archived Events" data-hi="संग्रहीत कार्यक्रम">Archived Events</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#recent-events"><span class="megamenu-icon">✨</span><span data-en="Recent Event" data-hi="हाल की गतिविधि">Recent Event</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#academic-highlights"><span class="megamenu-icon">🏆</span><span data-en="Academic Highlights" data-hi="शैक्षणिक मुख्य बातें">Academic Highlights</span></a></li>
                    <li class="megamenu-item"><a href="news-events.html#circulars"><span class="megamenu-icon">📜</span><span data-en="Circular / Notification / Office Order" data-hi="परिपत्र / अधिसूचना / कार्यालय आदेश">Circular / Notification / Office Order</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Media & Documents" data-hi="मीडिया और दस्तावेज">Media & Documents</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="news-events.html#photo-gallery"><span class="megamenu-icon">📸</span><span data-en="Photo Gallery" data-hi="फोटो गैलरी">Photo Gallery</span></a></li>
                    <li class="megamenu-item"><a href="downloads.html"><span class="megamenu-icon">📄</span><span data-en="Download" data-hi="डाउनलोड">Download</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    `;
    const homeItem = this.querySelector('[data-menu="home"]');
    const aboutItem = this.querySelector('[data-menu="about"]');
    const referenceAboutMenu = this.querySelector('#referenceAboutMegamenu');
    const existingAboutMenu = this.querySelector('#aboutMegamenu');
    if (homeItem && aboutItem && referenceAboutMenu) {
      referenceAboutMenu.id = 'aboutMegamenu';
      if (existingAboutMenu && existingAboutMenu !== referenceAboutMenu) existingAboutMenu.remove();
      aboutItem.appendChild(referenceAboutMenu);
    }
    const adminMenu = this.querySelector('#adminMegamenu');
    if (adminMenu) {
      adminMenu.innerHTML = `
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="Administration" data-hi="Administration">Administration</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="administration-resources.html#visitor"><span data-en="Visitor" data-hi="Visitor">Visitor</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#chancellor"><span data-en="Chancellor" data-hi="Chancellor">Chancellor</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#vice-chancellor"><span data-en="Vice-Chancellor" data-hi="Vice-Chancellor">Vice-Chancellor</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#pro-vice-chancellor"><span data-en="Pro-Vice Chancellor" data-hi="Pro-Vice Chancellor">Pro-Vice Chancellor</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#dean-student-welfare"><span data-en="Dean of Student welfare" data-hi="Dean of Student welfare">Dean of Student welfare</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#proctorial-board"><span data-en="Proctorial Board" data-hi="Proctorial Board">Proctorial Board</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#dean-head"><span data-en="Dean/Head" data-hi="Dean/Head">Dean/Head</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading admin-divider-heading" aria-hidden="true">----------------------------------------</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="administration-resources.html#registrar"><span data-en="Registrar" data-hi="Registrar">Registrar</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#finance-officer"><span data-en="Finance Officer" data-hi="Finance Officer">Finance Officer</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#controller-examination"><span data-en="Controller of Examination" data-hi="Controller of Examination">Controller of Examination</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#librarian"><span data-en="Librarian" data-hi="Librarian">Librarian</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#section-staff"><span data-en="Section & Staff" data-hi="Section & Staff">Section & Staff</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#committee-cell"><span data-en="Committee/Cell" data-hi="Committee/Cell">Committee/Cell</span></a></li>
            <li class="megamenu-item"><a href="administration-resources.html#organogram"><span data-en="Organogram" data-hi="Organogram">Organogram</span></a></li>
          </ul>
        </div>
      `;
    }
    const academicsMenu = this.querySelector('#academicsMegamenu');
    if (academicsMenu) {
      academicsMenu.innerHTML = `
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="EARTH, BIOLOGICAL AND ENVIRONMENTAL SCIENCES" data-hi="पृथ्वी, जैविक और पर्यावरण विज्ञान">EARTH, BIOLOGICAL AND ENVIRONMENTAL SCIENCES</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=bioinformatics"><span data-en="Dept. of Bioinformatics" data-hi="बायोइनफॉरमैटिक्स विभाग">Dept. of Bioinformatics</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=geology"><span data-en="Department of Geology" data-hi="भूविज्ञान विभाग">Department of Geology</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=geography"><span data-en="Department of Geography" data-hi="भूगोल विभाग">Department of Geography</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=life-science"><span data-en="Dept. of Life Science" data-hi="जीवन विज्ञान विभाग">Dept. of Life Science</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=biotechnology"><span data-en="Department of Biotechnology" data-hi="बायोटेक्नोलॉजी विभाग">Department of Biotechnology</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=environmental-sciences"><span data-en="Department of Environmental Sciences" data-hi="पर्यावरण विज्ञान विभाग">Department of Environmental Sciences</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="SOCIAL SCIENCES AND POLICIES" data-hi="सामाजिक विज्ञान और नीतियां">SOCIAL SCIENCES AND POLICIES</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=historical-studies-archaeology"><span data-en="Department of Historical Studies and Archaeology" data-hi="ऐतिहासिक अध्ययन एवं पुरातत्व विभाग">Department of Historical Studies and Archaeology</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=economic-studies-policy"><span data-en="Department of Economic Studies and Policy" data-hi="आर्थिक अध्ययन एवं नीति विभाग">Department of Economic Studies and Policy</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=development-studies"><span data-en="Development Studies" data-hi="विकास अध्ययन">Development Studies</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=political-studies"><span data-en="Dept. of Political Studies" data-hi="राजनीतिक अध्ययन विभाग">Dept. of Political Studies</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=sociological-studies"><span data-en="Department of Sociological Studies" data-hi="समाजशास्त्र अध्ययन विभाग">Department of Sociological Studies</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=library-information-science"><span data-en="Dept. of Library &amp; Information Science" data-hi="पुस्तकालय एवं सूचना विज्ञान विभाग">Dept. of Library &amp; Information Science</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="MATHEMATICS, STATISTICS AND COMPUTER SCIENCE" data-hi="गणित, सांख्यिकी एवं कंप्यूटर विज्ञान">MATHEMATICS, STATISTICS AND COMPUTER SCIENCE</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=mathematics"><span data-en="Dept. of Mathematics" data-hi="गणित विभाग">Dept. of Mathematics</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=statistics"><span data-en="Department of Statistics" data-hi="सांख्यिकी विभाग">Department of Statistics</span></a></li>
            <li class="megamenu-item"><a href="cs.html"><span data-en="Department of Computer Science" data-hi="कंप्यूटर विज्ञान विभाग">Department of Computer Science</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="SCHOOL OF EDUCATION (TEACHER &amp; PHYSICAL)" data-hi="शिक्षा अध्ययन शाला (शिक्षक और शारीरिक)">SCHOOL OF EDUCATION (TEACHER &amp; PHYSICAL)</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=teacher-education"><span data-en="Department of Teacher Education" data-hi="शिक्षक शिक्षा विभाग">Department of Teacher Education</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=physical-education"><span data-en="Department of Physical Education" data-hi="शारीरिक शिक्षा विभाग">Department of Physical Education</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="PHYSICAL &amp; CHEMICAL" data-hi="भौतिक एवं रासायनिक विज्ञान">PHYSICAL &amp; CHEMICAL</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=chemistry"><span data-en="Department of Chemistry" data-hi="रसायन शास्त्र विभाग">Department of Chemistry</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=physics"><span data-en="Department of Physics" data-hi="भौतिक विज्ञान विभाग">Department of Physics</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="LANGUAGES &amp; LITERATURE" data-hi="भाषा एवं साहित्य">LANGUAGES &amp; LITERATURE</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=english"><span data-en="Department of English" data-hi="अंग्रेजी विभाग">Department of English</span></a></li>
            <li class="megamenu-item"><a href="department.html?dept=indian-languages"><span data-en="Dept. of Indian Languages" data-hi="भारतीय भाषा विभाग">Dept. of Indian Languages</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="MEDIA, ARTS &amp; AESTHETICS" data-hi="मीडिया, कला और सौंदर्यशास्त्र">MEDIA, ARTS &amp; AESTHETICS</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=mass-communication-media"><span data-en="Mass Communication and Media" data-hi="जनसंचार एवं मीडिया">Mass Communication and Media</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="SCHOOL OF MANAGEMENT" data-hi="प्रबंधन अध्ययन शाला">SCHOOL OF MANAGEMENT</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=commerce-business-studies"><span data-en="Department of Commerce and Business Studies" data-hi="वाणिज्य एवं व्यवसाय अध्ययन विभाग">Department of Commerce and Business Studies</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="HUMAN SCIENCES" data-hi="मानव विज्ञान">HUMAN SCIENCES</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=psychological-sciences"><span data-en="Dept. of Psychological Sciences" data-hi="मनोवैज्ञानिक विज्ञान विभाग">Dept. of Psychological Sciences</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="LAW AND GOVERNANCE" data-hi="विधि एवं सुशासन">LAW AND GOVERNANCE</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=law-governance"><span data-en="Department of Law and Governance" data-hi="विधि एवं सुशासन विभाग">Department of Law and Governance</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="HEALTH SCIENCE" data-hi="स्वास्थ्य विज्ञान">HEALTH SCIENCE</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=pharmacy"><span data-en="Department of Pharmacy" data-hi="फार्मेसी विभाग">Department of Pharmacy</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="AGRICULTURE &amp; DEVELOPMENT" data-hi="कृषि एवं विकास">AGRICULTURE &amp; DEVELOPMENT</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="department.html?dept=agriculture"><span data-en="Department of Agriculture" data-hi="कृषि विभाग">Department of Agriculture</span></a></li>
          </ul>
        </div>
      `;
    }
    const researchMenu = this.querySelector('#researchMegamenu');
    if (researchMenu) {
      researchMenu.innerHTML = `
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="Facility and Services" data-hi="Facility and Services">Facility and Services</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="cif.html"><span data-en="Central Instrumental Facility" data-hi="Central Instrumental Facility">Central Instrumental Facility</span></a></li>
            <li class="megamenu-item"><a href="facilities.html#computer-centre"><span data-en="University Computer Centre" data-hi="University Computer Centre">University Computer Centre</span></a></li>
            <li class="megamenu-item"><a href="facilities.html#media-studio"><span data-en="Media Studio" data-hi="Media Studio">Media Studio</span></a></li>
            <li class="megamenu-item"><a href="research.html#inca-congress"><span data-en="45th INCA International Congress" data-hi="45th INCA International Congress">45th INCA International Congress</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="Committee & Cell" data-hi="Committee & Cell">Committee & Cell</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="research.html#iic"><span data-en="IIC-Innovation Council" data-hi="IIC-Innovation Council">IIC-Innovation Council</span></a></li>
            <li class="megamenu-item"><a href="research.html#ipr-cell"><span data-en="IPR Cell" data-hi="IPR Cell">IPR Cell</span></a></li>
            <li class="megamenu-item"><a href="research.html#rd-cell"><span data-en="R&D Cell" data-hi="R&D Cell">R&D Cell</span></a></li>
            <li class="megamenu-item"><a href="research.html#fpac-iaec-rdc"><span data-en="FPAC/IAEC/RDC Cell" data-hi="FPAC/IAEC/RDC Cell">FPAC/IAEC/RDC Cell</span></a></li>
            <li class="megamenu-item"><a href="research.html#legal-cell"><span data-en="Legal Cell" data-hi="Legal Cell">Legal Cell</span></a></li>
            <li class="megamenu-item"><a href="research.html#iecbhr-ibsc"><span data-en="IECBHR/IBSC Cell" data-hi="IECBHR/IBSC Cell">IECBHR/IBSC Cell</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="General" data-hi="General">General</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="research.html#publications"><span data-en="Highlights and Publications" data-hi="Highlights and Publications">Highlights and Publications</span></a></li>
            <li class="megamenu-item"><a href="research.html#partnership"><span data-en="Partnership" data-hi="Partnership">Partnership</span></a></li>
          </ul>
        </div>
        <div class="megamenu-column">
          <div class="megamenu-heading" data-en="Grants & Funding" data-hi="Grants & Funding">Grants & Funding</div>
          <ul class="megamenu-list">
            <li class="megamenu-item"><a href="research.html#scholarship-fellowship"><span data-en="Scholarship and Fellowship" data-hi="Scholarship and Fellowship">Scholarship and Fellowship</span></a></li>
            <li class="megamenu-item"><a href="research.html#grants"><span data-en="Grants for Faculties" data-hi="Grants for Faculties">Grants for Faculties</span></a></li>
          </ul>
        </div>
      `;
    }
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-navbar', CusbNavbar);

// 5. Quick Actions Component
class CusbQuickActions extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container qa-wrap">
        <div class="qa-label" data-en="⚡ Top Quick Actions" data-hi="⚡ त्वरित कार्रवाई">⚡ Top Quick Actions</div>
        <div class="qa-grid">
          <a href="https://cuet.samarth.ac.in/" target="_blank" class="qa-card">
            <span class="qa-ico">📝</span><span data-en="Apply Now" data-hi="अभी आवेदन करें">Apply Now</span>
          </a>
          <a href="#" class="qa-card">
            <span class="qa-ico">🏆</span><span data-en="Check Results" data-hi="परिणाम देखें">Check Results</span>
          </a>
          <a href="https://cusb.samarth.edu.in/index.php/site/login" target="_blank" class="qa-card">
            <span class="qa-ico">💳</span><span data-en="Pay Fees" data-hi="शुल्क भुगतान">Pay Fees</span>
          </a>
          <a href="https://cusb.samarth.edu.in/index.php/site/login" target="_blank" class="qa-card">
            <span class="qa-ico">🧑‍🎓</span><span data-en="Student Portal" data-hi="छात्र पोर्टल">Student Portal</span>
          </a>
          <a href="index.html#notices" class="qa-card">
            <span class="qa-ico">🔔</span><span data-en="Notices" data-hi="सूचनाएं">Notices</span>
          </a>
          <a href="courses.html" class="qa-card">
            <span class="qa-ico">📥</span><span data-en="Downloads" data-hi="डाउनलोड">Downloads</span>
          </a>
          <a href="#footer" class="qa-card">
            <span class="qa-ico">📞</span><span data-en="Contact Us" data-hi="संपर्क करें">Contact Us</span>
          </a>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-quick-actions', CusbQuickActions);

// 6. Footer Component
class CusbFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container" id="footer">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-logo-area">
              <img src="assets/culog.png" class="footer-logo" alt="CUSB Emblem" loading="lazy">
              <div class="footer-title">
                <span data-en="CENTRAL UNIVERSITY<br>OF SOUTH BIHAR" data-hi="दक्षिण बिहार केन्द्रीय<br>विश्वविद्यालय">CENTRAL UNIVERSITY<br>OF SOUTH BIHAR</span>
              </div>
            </div>
            <p class="footer-desc" data-en="Established by an Act of Parliament, the Central University of South Bihar aims to foster excellence in higher education and research for the socio-economic development of the region and the nation." data-hi="संसद के एक अधिनियम द्वारा स्थापित, दक्षिण बिहार केंद्रीय विश्वविद्यालय का उद्देश्य क्षेत्र और राष्ट्र के सामाजिक-आर्थिक विकास के लिए उच्च शिक्षा और अनुसंधान में उत्कृष्टता को बढ़ावा देना है।">
              Established by an Act of Parliament, the Central University of South Bihar aims to foster excellence in higher education and research for the socio-economic development of the region and the nation.
            </p>
          </div>
          
          <div class="footer-col">
            <div class="footer-heading" data-en="Contact Us" data-hi="संपर्क करें">Contact Us</div>
            <div class="footer-contact-item">
              <span>${iconSvg('map-pin')}</span>
              <span data-en="SH-7, Gaya-Panchanpur Road,<br>Village - Karhara, Post - Fatehpur,<br>Gaya - 824236, Bihar, India" data-hi="एसएच-7, गया-पंचानपुर रोड,<br>ग्राम - करहारा, पोस्ट - फतेहपुर,<br>गया - 824236, बिहार, भारत">
                SH-7, Gaya-Panchanpur Road,<br>Village - Karhara, Post - Fatehpur,<br>Gaya - 824236, Bihar, India
              </span>
            </div>
            <div class="footer-contact-item">
              <span>${iconSvg('mail')}</span>
              <a href="mailto:info@cusb.ac.in">info@cusb.ac.in</a>
            </div>
            <div class="footer-contact-item">
              <span>${iconSvg('phone')}</span>
              <a href="tel:+916312229530">+91 631 2229 530</a>
            </div>
          </div>
          
          <div class="footer-col">
            <div class="footer-heading" data-en="Quick Links" data-hi="त्वरित लिंक्स">Quick Links</div>
            <ul class="footer-links">
              <li><a href="about.html" data-en="About CUSB" data-hi="सीयूएसबी के बारे में">About CUSB</a></li>
              <li><a href="leaders.html" data-en="University Administration" data-hi="विश्वविद्यालय प्रशासन">University Administration</a></li>
              <li><a href="courses.html" data-en="Schools & Departments" data-hi="अध्ययन शालाएं एवं विभाग">Schools & Departments</a></li>
              <li><a href="admissions.html" data-en="Admissions 2026-27" data-hi="प्रवेश 2026-27">Admissions 2026-27</a></li>
              <li><a href="careers.html" data-en="Careers & Openings" data-hi="करियर और नौकरियां">Careers & Openings</a></li>
              <li><a href="tenders.html" data-en="Tenders & EOI" data-hi="निविदाएं">Tenders & EOI</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <div class="footer-heading" data-en="Resources" data-hi="संसाधन">Resources</div>
            <ul class="footer-links">
              <li><a href="https://cusb.samarth.edu.in/" target="_blank" data-en="Samarth Student Portal" data-hi="समर्थ छात्र पोर्टल">Samarth Student Portal</a></li>
              <li><a href="hostel.html" data-en="Campus Hostels" data-hi="परिसर छात्रावास">Campus Hostels</a></li>
              <li><a href="library.html" data-en="Central Library" data-hi="केंद्रीय पुस्तकालय">Central Library</a></li>
              <li><a href="pyq.html" data-en="Previous Papers (PYQ)" data-hi="पुराने प्रश्न पत्र">Previous Papers (PYQ)</a></li>
              <li><a href="policies.html" data-en="Policies & RTI" data-hi="नीतियां और आरटीआई">Policies & RTI</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; 2026 Central University of South Bihar. All Rights Reserved.
          </div>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-footer', CusbFooter);

// 7. Chatbot and Scroll Actions Component
class CusbChatbot extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="floating-message" id="chatbotGreeting" aria-hidden="true">
        <div class="floating-message-bubble" data-en="Need help? Ask CUSB Assistant" data-hi="सहायता चाहिए? CUSB सहायक से पूछें">Need help? Ask CUSB Assistant</div>
      </div>

      <div class="chatbot-container" aria-live="polite">
        <section class="chatbot-window" id="chatbotWindow" aria-label="CUSB Assistant" aria-hidden="true">
          <header class="chatbot-header">
            <span data-en="CUSB Assistant" data-hi="CUSB सहायक">CUSB Assistant</span>
            <button class="chatbot-close" id="chatbotCloseBtn" type="button" aria-label="Close chatbot">${iconSvg('close')}</button>
          </header>
          <div class="chatbot-messages" id="chatbotMessages">
            <div class="chatbot-message bot">
              <div class="chatbot-message-bubble">Hello! I can help you find admissions, courses, departments, facilities, notices, and contact details.</div>
            </div>
          </div>
          <form class="chatbot-input-group" id="chatbotForm">
            <input id="chatbotInput" type="text" autocomplete="off" placeholder="Ask about admissions, courses, hostel..." aria-label="Ask CUSB Assistant">
            <button class="chatbot-send-btn" type="submit" aria-label="Send message">${iconSvg('send')}</button>
          </form>
          <div class="chatbot-enquiry-bar">
            <button class="chatbot-enquiry-btn-inner" id="chatbotEnquiryBtnInner" type="button">
              ${iconSvg('file')}
              <span data-en="Submit Official Enquiry →" data-hi="आधिकारिक पूछताछ दर्ज करें →">Submit Official Enquiry →</span>
            </button>
          </div>
        </section>
        <button class="chatbot-toggle" id="chatbotToggleBtn" type="button" aria-label="Open chatbot" aria-expanded="false">
          ${iconSvg('robot-chat')}
        </button>
      </div>

      <button id="scroll-btn" type="button" aria-label="Scroll to top">${iconSvg('arrow-up')}</button>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-chatbot', CusbChatbot);

// 8. Fixed Quick Links Sidebar Component
class CusbSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="fixed-quicklinks-sidebar" role="navigation" aria-label="Quick Links Sidebar">
        <div class="sidebar-heading">
          ${iconSvg('target')}
          <span data-en="QUICK LINKS" data-hi="त्वरित लिंक्स">QUICK LINKS</span>
          <button class="sidebar-close" id="quickLinksCloseBtn" type="button" aria-label="Close Quick Links">${iconSvg('close')}</button>
        </div>
        <ul class="sidebar-menu-list">
          <li><a href="tenders.html" class="sidebar-link"><span class="sidebar-icon-box icon-emerald">${iconSvg('shield')}</span><span data-en="Active Tenders" data-hi="सक्रिय निविदाएं">Active Tenders</span></a></li>
          <li><a href="https://www.antiragging.in/" target="_blank" class="sidebar-link"><span class="sidebar-icon-box icon-rose">${iconSvg('lock')}</span><span data-en="Anti-Ragging Cell" data-hi="रैगिंग रोधी">Anti-Ragging Cell</span></a></li>
          <li><a href="news-events.html?type=events" class="sidebar-link"><span class="sidebar-icon-box icon-purple">${iconSvg('graduation')}</span><span data-en="Convocation" data-hi="दीक्षांत समारोह">Convocation</span></a></li>
          <li><a href="https://webmail.cusb.ac.in/" target="_blank" class="sidebar-link"><span class="sidebar-icon-box icon-blue">${iconSvg('globe')}</span><span data-en="CUSB Webmail" data-hi="वेबमेल">CUSB Webmail</span></a></li>
          <li><a href="downloads.html" class="sidebar-link"><span class="sidebar-icon-box icon-indigo">${iconSvg('download')}</span><span data-en="Download Center" data-hi="डाउनलोड केंद्र">Download Center</span></a></li>
          <li><a href="students.html#exams" class="sidebar-link"><span class="sidebar-icon-box icon-fuchsia">${iconSvg('graduation')}</span><span data-en="Exams & Grades" data-hi="परीक्षाएं">Exams & Grades</span></a></li>
          <li><a href="enquiry.html" class="sidebar-link"><span class="sidebar-icon-box icon-amber">${iconSvg('phone')}</span><span data-en="Help Desk & Enquiry" data-hi="सहायता डेस्क">Help Desk & Enquiry</span></a></li>
          <li><a href="hostel.html" class="sidebar-link"><span class="sidebar-icon-box icon-orange">${iconSvg('home')}</span><span data-en="Hostels & Housing" data-hi="छात्रावास">Hostels & Housing</span></a></li>
          <li><a href="about.html#iqac" class="sidebar-link"><span class="sidebar-icon-box icon-teal">${iconSvg('building')}</span><span data-en="IQAC Cell" data-hi="आईक्यूएसी सेल">IQAC Cell</span></a></li>
          <li><a href="careers.html" class="sidebar-link"><span class="sidebar-icon-box icon-green">${iconSvg('briefcase')}</span><span data-en="Job Openings" data-hi="भर्ती / नौकरियां">Job Openings</span></a></li>
          <li><a href="about.html#accreditation" class="sidebar-link"><span class="sidebar-icon-box icon-blue">${iconSvg('file')}</span><span data-en="NAAC Accreditation" data-hi="नेक मान्यता">NAAC Accreditation</span></a></li>
          <li><a href="about.html#nirf" class="sidebar-link"><span class="sidebar-icon-box icon-violet">${iconSvg('chart')}</span><span data-en="NIRF Cell" data-hi="एनआईआरएफ सेल">NIRF Cell</span></a></li>
          <li><a href="leaders.html" class="sidebar-link"><span class="sidebar-icon-box icon-amber">${iconSvg('briefcase')}</span><span data-en="Officers & Deans" data-hi="अधिकारी">Officers & Deans</span></a></li>
          <li><a href="about.html" class="sidebar-link"><span class="sidebar-icon-box icon-crimson">${iconSvg('file')}</span><span data-en="Prospectus 2026" data-hi="विवरणिका 2026">Prospectus 2026</span></a></li>
          <li><a href="pyq.html" class="sidebar-link"><span class="sidebar-icon-box icon-purple">${iconSvg('file')}</span><span data-en="PYQ Portal" data-hi="पुराने पेपर">PYQ Portal</span></a></li>
          <li><a href="https://rtionline.gov.in/" target="_blank" class="sidebar-link"><span class="sidebar-icon-box icon-cyan">${iconSvg('globe')}</span><span data-en="RTI Online Portal" data-hi="आरटीआई ऑनलाइन">RTI Online Portal</span></a></li>
          <li><a href="https://cusb.samarth.ac.in/" target="_blank" class="sidebar-link"><span class="sidebar-icon-box icon-sky">${iconSvg('users')}</span><span data-en="Samarth Employee Portal" data-hi="समर्थ कर्मचारी पोर्टल">Samarth Employee Portal</span></a></li>
          <li><a href="https://cusb.samarth.edu.in/" target="_blank" class="sidebar-link"><span class="sidebar-icon-box icon-indigo">${iconSvg('graduation')}</span><span data-en="Samarth Student Portal" data-hi="समर्थ छात्र पोर्टल">Samarth Student Portal</span></a></li>
          <li><a href="https://scholarships.gov.in/" target="_blank" class="sidebar-link"><span class="sidebar-icon-box icon-gold">${iconSvg('briefcase')}</span><span data-en="Scholarship Portal" data-hi="छात्रवृत्ति">Scholarship Portal</span></a></li>
          <li><a href="courses.html" class="sidebar-link"><span class="sidebar-icon-box icon-teal">${iconSvg('file')}</span><span data-en="Syllabus & Courses" data-hi="पाठ्यक्रम">Syllabus & Courses</span></a></li>
        </ul>
      </aside>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-sidebar', CusbSidebar);

// 9. Floating Enquiry Widget & Modal Component
class CusbEnquiryWidget extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="floating-enquiry-btn" id="floatingEnquiryBtn" type="button" aria-label="Open Admissions Enquiry Form" title="Admissions & General Enquiry 2026">

        <span data-en="Enquire Now" data-hi="पूछताछ करें">Enquire Now</span>
      </button>

      <div class="enquiry-modal-overlay" id="enquiryModalOverlay" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="enquiryModalTitle">
        <div class="enquiry-modal-card">
          <div class="enquiry-modal-header">
            <div class="enquiry-modal-title" id="enquiryModalTitle">
              ${iconSvg('file')}
              <span data-en="CUSB Admission & General Enquiry 2026" data-hi="सीयूएसबी प्रवेश एवं सामान्य पूछताछ 2026">CUSB Admission & General Enquiry 2026</span>
            </div>
            <button class="enquiry-modal-close" id="enquiryModalCloseBtn" type="button" aria-label="Close enquiry form">${iconSvg('close')}</button>
          </div>
          
          <div class="enquiry-modal-body">
            <div class="enquiry-progress-bar">
              <div class="enquiry-progress-fill" id="enquiryProgressFill"></div>
            </div>

            <div class="enquiry-category-chips" id="enquiryCategoryChips">
              <button type="button" class="enquiry-chip active" data-category="admissions">${iconSvg('graduation')} <span data-en="Admissions 2026" data-hi="प्रवेश 2026">Admissions 2026</span></button>
              <button type="button" class="enquiry-chip" data-category="courses">${iconSvg('building')} <span data-en="Courses & Eligibility" data-hi="पाठ्यक्रम और पात्रता">Courses & Eligibility</span></button>
              <button type="button" class="enquiry-chip" data-category="hostel">${iconSvg('home')} <span data-en="Hostel & Campus" data-hi="छात्रावास और परिसर">Hostel & Campus</span></button>
              <button type="button" class="enquiry-chip" data-category="scholarship">${iconSvg('briefcase')} <span data-en="Scholarships & Fees" data-hi="छात्रवृत्ति और शुल्क">Scholarships & Fees</span></button>
              <button type="button" class="enquiry-chip" data-category="general">${iconSvg('chat')} <span data-en="General Query" data-hi="सामान्य प्रश्न">General Query</span></button>
            </div>

            <form id="enquiryForm" class="enquiry-form-grid" novalidate>
              <input type="hidden" id="enquiryCategoryInput" name="category" value="admissions">

              <div class="enquiry-field-group">
                <label for="enquiryFullName" class="enquiry-field-label">
                  <span data-en="Full Name" data-hi="पूरा नाम">Full Name</span> <span class="req">*</span>
                </label>
                <input type="text" id="enquiryFullName" name="fullName" class="enquiry-input" placeholder="e.g. Rahul Kumar" required>
                <span class="enquiry-hint" data-en="Enter your official name" data-hi="अपना आधिकारिक नाम दर्ज करें">Enter your official name</span>
              </div>

              <div class="enquiry-field-group">
                <label for="enquiryEmail" class="enquiry-field-label">
                  <span data-en="Email Address" data-hi="ईमेल पता">Email Address</span> <span class="req">*</span>
                </label>
                <input type="email" id="enquiryEmail" name="email" class="enquiry-input" placeholder="name@example.com" required>
                <span class="enquiry-hint" data-en="We will send response to this email" data-hi="हम इस ईमेल पर उत्तर भेजेंगे">We will send response to this email</span>
              </div>

              <div class="enquiry-field-group">
                <label for="enquiryPhone" class="enquiry-field-label">
                  <span data-en="Mobile / WhatsApp No." data-hi="मोबाइल / व्हाट्सएप नंबर">Mobile / WhatsApp No.</span> <span class="req">*</span>
                </label>
                <input type="tel" id="enquiryPhone" name="phone" class="enquiry-input" placeholder="10-digit mobile number" pattern="[0-9]{10}" required>
              </div>

              <div class="enquiry-field-group">
                <label for="enquiryProgramLevel" class="enquiry-field-label">
                  <span data-en="Program Level" data-hi="कार्यक्रम स्तर">Program Level</span> <span class="req">*</span>
                </label>
                <select id="enquiryProgramLevel" name="programLevel" class="enquiry-select" required>
                  <option value="" data-en="-- Select Level --" data-hi="-- स्तर चुनें --">-- Select Level --</option>
                  <option value="ug" data-en="Undergraduate (UG)" data-hi="स्नातक (यूजी)">Undergraduate (UG)</option>
                  <option value="pg" data-en="Postgraduate (PG)" data-hi="स्नातकोत्तर (पीजी)">Postgraduate (PG)</option>
                  <option value="phd" data-en="Ph.D. / Research" data-hi="पीएचडी / अनुसंधान">Ph.D. / Research</option>
                  <option value="diploma" data-en="Diploma / Certificate" data-hi="डिप्लोमा / प्रमाणपत्र">Diploma / Certificate</option>
                </select>
              </div>

              <div class="enquiry-field-group enquiry-form-full" id="dynamicDepartmentGroup">
                <label for="enquiryDepartment" class="enquiry-field-label">
                  <span data-en="Preferred Department / Course" data-hi="पसंदीदा विभाग / पाठ्यक्रम">Preferred Department / Course</span>
                </label>
                <select id="enquiryDepartment" name="department" class="enquiry-select">
                  <option value="" data-en="-- Select Department / Course --" data-hi="-- विभाग / पाठ्यक्रम चुनें --">-- Select Department / Course --</option>
                  <option value="computer_science">Department of Computer Science</option>
                  <option value="mathematics">Department of Mathematics</option>
                  <option value="physics">Department of Physics</option>
                  <option value="chemistry">Department of Chemistry</option>
                  <option value="law">Department of Law & Governance</option>
                  <option value="biotechnology">Department of Biotechnology</option>
                  <option value="mass_comm">Department of Mass Communication</option>
                  <option value="education">Department of Teacher Education</option>
                  <option value="economics">Department of Economics</option>
                </select>
              </div>

              <div class="enquiry-field-group enquiry-form-full" id="dynamicCuetGroup">
                <label for="enquiryCuetNo" class="enquiry-field-label">
                  <span data-en="CUET Application No. (Optional)" data-hi="सीयूईटी आवेदन संख्या (वैकल्पिक)">CUET Application No. (Optional)</span>
                </label>
                <input type="text" id="enquiryCuetNo" name="cuetNo" class="enquiry-input" placeholder="e.g. 263510098765">
              </div>

              <div class="enquiry-field-group enquiry-form-full">
                <label for="enquiryMessage" class="enquiry-field-label">
                  <span data-en="Your Specific Enquiry / Question" data-hi="आपका विशिष्ट प्रश्न / पूछताछ">Your Specific Enquiry / Question</span> <span class="req">*</span>
                  <small id="charCounter" style="font-weight: 400; font-size: 0.78rem; color: var(--tx-muted);">0 / 500</small>
                </label>
                <textarea id="enquiryMessage" name="message" class="enquiry-textarea" rows="4" maxlength="500" placeholder="Type your inquiry details here... (e.g. admission eligibility, hostel allotment date, fee submission)" required></textarea>
              </div>

              <div class="enquiry-form-full" style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-top: 8px;">
                <a href="enquiry.html" class="btn btn-ghost-light" style="font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;">
                  ${iconSvg('file')}
                  <span data-en="Open Full Page" data-hi="पूरा पृष्ठ खोलें">Open Full Page</span>
                </a>
                <button type="submit" id="enquirySubmitBtn" class="btn btn-gold" style="padding: 12px 28px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                  <span data-en="Submit Enquiry →" data-hi="पूछताछ जमा करें →">Submit Enquiry →</span>
                </button>
              </div>
            </form>

            <div id="enquirySuccessContainer" style="display: none;">
              <div class="enquiry-success-card">
                <div class="enquiry-success-icon">${iconSvg('check')}</div>
                <h3 style="font-family: var(--ff-title); margin-bottom: 6px;" data-en="Enquiry Submitted Successfully!" data-hi="पूछताछ सफलतापूर्वक जमा की गई!">Enquiry Submitted Successfully!</h3>
                <p style="color: var(--tx-muted); font-size: 0.9rem;" data-en="Thank you for reaching out to CUSB. Your query reference number is:" data-hi="सीयूएसबी से संपर्क करने के लिए धन्यवाद। आपकी संदर्भ संख्या है:">Thank you for reaching out to CUSB. Your query reference number is:</p>
                
                <div class="enquiry-ticket-badge" id="enquiryTicketNumber">CUSB-ENQ-2026-9482</div>

                <p style="font-size: 0.85rem; color: var(--tx-primary); margin-top: 10px;" data-en="Our Admission Helpline officer will review your query and respond to your email/phone within 24–48 working hours." data-hi="हमारा प्रवेश हेल्पलाइन अधिकारी आपकी समीक्षा करेगा और 24-48 कार्य घंटों के भीतर उत्तर देगा।">Our Admission Helpline officer will review your query and respond to your email/phone within 24–48 working hours.</p>

                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                  <button type="button" id="copyTicketBtn" class="btn btn-navy" style="font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;">
                    ${iconSvg('file')}
                    <span data-en="Copy Ticket Reference" data-hi="संदर्भ संख्या कॉपी करें">Copy Ticket Reference</span>
                  </button>
                  <button type="button" id="resetEnquiryBtn" class="btn btn-ghost-light" style="font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;">
                    ${iconSvg('plus')}
                    <span data-en="Submit Another Enquiry" data-hi="नई पूछताछ दर्ज करें">Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-enquiry-widget', CusbEnquiryWidget);

// Auto-mount Sidebar & Enquiry Widget to DOM if not explicitly placed
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('cusb-sidebar')) {
    const navbar = document.querySelector('cusb-navbar');
    const sidebar = document.createElement('cusb-sidebar');
    if (navbar && navbar.parentNode) {
      navbar.parentNode.insertBefore(sidebar, navbar.nextSibling);
    } else {
      document.body.prepend(sidebar);
    }
  }

  if (!document.querySelector('cusb-enquiry-widget')) {
    const widget = document.createElement('cusb-enquiry-widget');
    document.body.appendChild(widget);
  }

  // Keep sidebar always below the navbar dynamically
  let isTicking = false;
  const updateSidebarPosition = () => {
    const navbar = document.querySelector('cusb-navbar');
    const sidebarElement = document.querySelector('.fixed-quicklinks-sidebar');
    if (navbar && sidebarElement) {
      if (window.innerWidth <= 991) {
        if (sidebarElement.style.top !== '') {
          sidebarElement.style.top = '';
          sidebarElement.style.height = '';
        }
        return;
      }

      const navRect = navbar.getBoundingClientRect();
      const bottom = Math.max(0, navRect.bottom);
      sidebarElement.style.top = bottom + 'px';
      sidebarElement.style.height = 'calc(100vh - ' + bottom + 'px)';
    }
  };

  const onScrollThrottled = () => {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(() => {
        updateSidebarPosition();
        isTicking = false;
      });
    }
  };
  
  window.addEventListener('scroll', onScrollThrottled, { passive: true });
  window.addEventListener('resize', onScrollThrottled, { passive: true });
  // Initial positioning
  setTimeout(updateSidebarPosition, 0);
});
