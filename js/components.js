/**
 * CUSB WEBSITE - REUSABLE WEB COMPONENTS
 * Standard HTML5 custom elements utilizing Light DOM to inherit global stylesheets.
 */

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
    this.loadAnnouncements();
  }

  async loadAnnouncements() {
    const track = this.querySelector('#tickerTrack');
    if (!track) return;
    
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      
      if (!data || data.length === 0) {
        track.innerHTML = `<span style="padding:0 20px;" data-en="No recent updates." data-hi="कोई हालिया अपडेट नहीं।">No recent updates.</span>`;
        return;
      }
      
      track.innerHTML = '';
      data.forEach((item, index) => {
        const a = document.createElement('a');
        a.href = "index.html#notices";
        a.className = "ticker-item";
        
        const isNew = index < 2;
        a.innerHTML = `
          <span data-en="${item.title_en}" data-hi="${item.title_hi}">${item.title_en}</span>
          ${isNew ? '<span class="ticker-badge" data-en="NEW" data-hi="नया">NEW</span>' : ''}
        `;
        track.appendChild(a);
      });
      
      const currentLang = localStorage.getItem('cusb-lang') || 'en';
      const elements = track.querySelectorAll('[data-en], [data-hi]');
      elements.forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
          el.textContent = text;
        }
      });
      if (window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(track);
      
    } catch (err) {
      console.error("Failed to load announcements:", err);
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
    `
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
          <!-- Language Converter -->
          <div class="language-controls" aria-label="Language Converter">
            <span class="lang-label" data-en="Language:" data-hi="भाषा:">Language:</span>
            <select class="language-select" id="languageSelect" aria-label="Choose language">
              <option value="en">English</option>
              <optgroup label="Indian Languages">
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="mr">Marathi</option>
                <option value="gu">Gujarati</option>
                <option value="pa">Punjabi</option>
                <option value="ur">Urdu</option>
                <option value="kn">Kannada</option>
                <option value="ml">Malayalam</option>
                <option value="or">Odia</option>
                <option value="as">Assamese</option>
                <option value="ne">Nepali</option>
                <option value="sa">Sanskrit</option>
              </optgroup>
              <optgroup label="Foreign Languages">
                <option value="ar">Arabic</option>
                <option value="zh-CN">Chinese</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
              </optgroup>
            </select>
          </div>
          <span class="accessibility-divider">|</span>
          <!-- Theme Switcher -->
          <div class="theme-toggle-container">
            <span class="theme-label" data-en="Theme:" data-hi="थीम:">Theme:</span>
            <button class="btn-theme" id="themeToggleBtn" aria-label="Toggle Light/Dark Theme">${iconSvg('moon')}</button>
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
          
          <!-- Search Bar -->
          <div class="search-container" role="search">
            <input type="search" class="search-input" id="siteSearchInput" placeholder="Search courses, admissions, notices..." aria-label="Search CUSB website">
            <button class="search-btn" id="siteSearchBtn" aria-label="Submit search">${iconSvg('search')}</button>
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
        <button class="mobile-nav-toggle" id="mobileNavToggleBtn" aria-label="Open Navigation Menu" aria-expanded="false">${iconSvg('menu')}</button>
        
        <nav class="navbar-nav" aria-label="Main Navigation">
          <ul class="navbar-menu" id="navbarMenu">
            <!-- 1. HOME -->
            <li class="navbar-item" data-menu="home">
              <a href="index.html" class="navbar-link"><span class="megamenu-icon">🏠</span><span data-en="Home" data-hi="होम">Home</span></a>
            </li>
            
            <!-- 2. ABOUT -->
            <li class="navbar-item" data-menu="about">
              <a href="about.html" class="navbar-link"><span data-en="About" data-hi="परिचय">About</span></a>
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
              <a href="leaders.html" class="navbar-link"><span data-en="Administration" data-hi="प्रशासन">Administration</span></a>
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
                  <div class="megamenu-heading" data-en="Careers" data-hi="करियर">Careers</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="careers.html"><span class="megamenu-icon">💼</span><span data-en="Recruitments" data-hi="भर्तियां">Recruitments</span></a></li>
                    <li class="megamenu-item"><a href="leaders.html#faculty"><span class="megamenu-icon">📋</span><span data-en="Faculty Directory" data-hi="संकाय निर्देशिका">Faculty Directory</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 4. ACADEMICS -->
            <li class="navbar-item" data-menu="academics">
              <a href="courses.html" class="navbar-link"><span data-en="Academics" data-hi="अकादमिक">Academics</span></a>
              <div class="megamenu" id="academicsMegamenu" role="region" aria-label="Academics Links">
                <ul class="megamenu-list">
                  <li class="megamenu-item"><a href="courses.html?section=schools"><span class="megamenu-icon">🏫</span><span data-en="Schools" data-hi="अध्ययन शालाएं">Schools</span></a></li>
                  <li class="megamenu-item"><a href="courses.html?section=programmes"><span class="megamenu-icon">🎓</span><span data-en="Programmes" data-hi="कार्यक्रम">Programmes</span></a></li>
                  <li class="megamenu-item"><a href="courses.html?section=departments"><span class="megamenu-icon">🏛️</span><span data-en="Departments" data-hi="विभाग">Departments</span></a></li>
                </ul>
              </div>
            </li>
            
            <!-- 5. RESEARCH -->
            <li class="navbar-item" data-menu="research">
              <a href="research.html" class="navbar-link"><span data-en="Research" data-hi="अनुसंधान">Research</span></a>
              <div class="megamenu" id="researchMegamenu" role="region" aria-label="Research Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Activities" data-hi="गतिविधियाँ">Activities</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#areas"><span class="megamenu-icon">🔬</span><span data-en="Research Areas" data-hi="अनुसंधान क्षेत्र">Research Areas</span></a></li>
                    <li class="megamenu-item"><a href="research.html#publications"><span class="megamenu-icon">📚</span><span data-en="Publications" data-hi="प्रकाशन">Publications</span></a></li>
                    <li class="megamenu-item"><a href="research.html#projects"><span class="megamenu-icon">📁</span><span data-en="Sponsored Projects" data-hi="प्रायोजित परियोजनाएं">Sponsored Projects</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Centers" data-hi="केंद्र">Centers</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#instruments"><span class="megamenu-icon">🏢</span><span data-en="Central Instruments" data-hi="केंद्रीय उपकरण केंद्र">Central Instruments Facility</span></a></li>
                    <li class="megamenu-item"><a href="research.html#incubation"><span class="megamenu-icon">💡</span><span data-en="Incubation Centre" data-hi="इंक्यूबेशन सेंटर">Incubation Centre</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Collaborations" data-hi="सहयोग">Collaborations</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="research.html#mous"><span class="megamenu-icon">🤝</span><span data-en="MoUs & Partnerships" data-hi="समझौता ज्ञापन">MoUs & Partnerships</span></a></li>
                    <li class="megamenu-item"><a href="research.html#seminars"><span class="megamenu-icon">🌐</span><span data-en="Seminars" data-hi="संगोष्ठी">Seminars & Conferences</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 6. STUDENTS -->
            <li class="navbar-item" data-menu="students">
              <a href="students.html" class="navbar-link"><span data-en="Students" data-hi="छात्र">Students</span></a>
              <div class="megamenu" id="studentsMegamenu" role="region" aria-label="Students Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Services" data-hi="सेवाएं">Services</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="https://cusb.samarth.edu.in/index.php/site/login" target="_blank"><span class="megamenu-icon">🧑‍🎓</span><span data-en="Student Portal" data-hi="छात्र पोर्टल">Student Portal</span></a></li>
                    <li class="megamenu-item"><a href="students.html#results"><span class="megamenu-icon">🏆</span><span data-en="Results & Grades" data-hi="परीक्षा परिणाम">Results & Exams</span></a></li>
                    <li class="megamenu-item"><a href="hostel.html"><span class="megamenu-icon">🏠</span><span data-en="Hostel & Wardens" data-hi="छात्रावास और वार्डन">Hostel & Wardens</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Support" data-hi="सहायता">Support</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="https://www.antiragging.in/" target="_blank"><span class="megamenu-icon">🔒</span><span data-en="Anti-Ragging Cell" data-hi="एंटी-रैगिंग सेल">Anti-Ragging Cell</span></a></li>
                    <li class="megamenu-item"><a href="https://scholarships.gov.in/" target="_blank"><span class="megamenu-icon">💰</span><span data-en="National Scholarship" data-hi="राष्ट्रीय छात्रवृत्ति">National Scholarship</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Activities" data-hi="गतिविधियां">Activities</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="students.html#sports"><span class="megamenu-icon">⚽</span><span data-en="Sports & Culture" data-hi="खेल एवं संस्कृति">Sports & Culture</span></a></li>
                    <li class="megamenu-item"><a href="students.html#alumni"><span class="megamenu-icon">🌱</span><span data-en="Alumni Association" data-hi="पूर्व छात्र संगठन">Alumni Association</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 7. RESOURCES -->
            <li class="navbar-item" data-menu="resources">
              <a href="#" class="navbar-link"><span data-en="Resources" data-hi="संसाधन">Resources</span></a>
              <div class="megamenu" id="resourcesMegamenu" role="region" aria-label="Resources Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Portals" data-hi="पोर्टल">Portals</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="https://cusb.samarth.ac.in/index.php/site/login" target="_blank"><span class="megamenu-icon">👨‍🏫</span><span data-en="Faculty Login" data-hi="संकाय लॉगिन">Faculty Login</span></a></li>
                    <li class="megamenu-item"><a href="https://cusb.samarth.edu.in/index.php/site/login" target="_blank"><span class="megamenu-icon">💳</span><span data-en="Online Fee Payment" data-hi="ऑनलाइन शुल्क भुगतान">Online Fee Payment</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Resources" data-hi="संसाधन">Resources</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="pyq.html"><span class="megamenu-icon">📚</span><span data-en="PYQ Portal" data-hi="पुराने प्रश्न पत्र">PYQ Portal</span></a></li>
                    <li class="megamenu-item"><a href="students.html#lms"><span class="megamenu-icon">💻</span><span data-en="LMS Portal" data-hi="एलएमएस पोर्टल">LMS Portal</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Library" data-hi="पुस्तकालय">Library</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="facilities.html#digital-library"><span class="megamenu-icon">📖</span><span data-en="Digital Library" data-hi="डिजिटल लाइब्रेरी">Digital Library</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 8. CAMPUS -->
            <li class="navbar-item" data-menu="campus">
              <a href="facilities.html" class="navbar-link"><span data-en="Campus" data-hi="परिसर">Campus</span></a>
              <div class="megamenu" id="campusMegamenu" role="region" aria-label="Campus Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Facilities" data-hi="सुविधाएं">Facilities</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="hostel.html"><span class="megamenu-icon">🏢</span><span data-en="Campus Hostels" data-hi="परिसर छात्रावास">Campus Hostels</span></a></li>
                    <li class="megamenu-item"><a href="facilities.html#library"><span class="megamenu-icon">📚</span><span data-en="Central Library" data-hi="केंद्रीय पुस्तकालय">Central Library</span></a></li>
                    <li class="megamenu-item"><a href="facilities.html#cafeteria"><span class="megamenu-icon">🍳</span><span data-en="Cafeteria" data-hi="कैफेटेरिया">Cafeteria</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Infrastructure" data-hi="बुनियादी ढांचा">Infrastructure</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="facilities.html#smart-classrooms"><span class="megamenu-icon">🏫</span><span data-en="Smart Classrooms" data-hi="स्मार्ट कक्षाएं">Smart Classrooms</span></a></li>
                    <li class="megamenu-item"><a href="facilities.html#medical"><span class="megamenu-icon">🏥</span><span data-en="Medical Center" data-hi="चिकित्सा केंद्र">Medical Center</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Life at CUSB" data-hi="सीयूएसबी जीवन">Life at CUSB</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="index.html#gallery"><span class="megamenu-icon">📸</span><span data-en="Photo Gallery" data-hi="फोटो गैलरी">Photo Gallery</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
            
            <!-- 9. DOWNLOADS -->
            <li class="navbar-item" data-menu="downloads">
              <a href="downloads.html" class="navbar-link"><span data-en="Downloads" data-hi="डाउनलोड">Downloads</span></a>
              <div class="megamenu" id="downloadsMegamenu" role="region" aria-label="Downloads Links">
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Academics" data-hi="शैक्षणिक">Academics</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="downloads.html#prospectus"><span class="megamenu-icon">📄</span><span data-en="CUSB Prospectus" data-hi="सीयूएसबी विवरणिका">CUSB Prospectus</span></a></li>
                    <li class="megamenu-item"><a href="downloads.html#calendar"><span class="megamenu-icon">📅</span><span data-en="Academic Calendar" data-hi="शैक्षणिक कैलेंडर">Academic Calendar</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Forms & Notices" data-hi="प्रपत्र एवं सूचना">Forms & Notices</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="downloads.html#admission"><span class="megamenu-icon">📝</span><span data-en="Admission Forms" data-hi="प्रवेश प्रपत्र">Admission Forms</span></a></li>
                    <li class="megamenu-item"><a href="downloads.html#circulars"><span class="megamenu-icon">🔔</span><span data-en="General Notices" data-hi="सामान्य सूचनाएं">General Circulars</span></a></li>
                  </ul>
                </div>
                <div class="megamenu-column">
                  <div class="megamenu-heading" data-en="Exam Documents" data-hi="परीक्षा दस्तावेज">Exam Documents</div>
                  <ul class="megamenu-list">
                    <li class="megamenu-item"><a href="downloads.html#admit-cards"><span class="megamenu-icon">🆔</span><span data-en="Admit Cards" data-hi="प्रवेश पत्र">Admit Cards</span></a></li>
                    <li class="megamenu-item"><a href="downloads.html#fee-structure"><span class="megamenu-icon">💰</span><span data-en="Fee Structure" data-hi="शुल्क संरचना">Fee Structure</span></a></li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    `;
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
            <div class="footer-heading" data-en="Important Links" data-hi="महत्वपूर्ण लिंक">Important Links</div>
            <ul class="footer-links">
              <li><a href="http://www.ugc.ac.in/" target="_blank" rel="noopener noreferrer">UGC</a></li>
              <li><a href="http://naac.gov.in/" target="_blank" rel="noopener noreferrer">NAAC</a></li>
              <li><a href="https://www.nirfindia.org/" target="_blank" rel="noopener noreferrer">NIRF</a></li>
              <li><a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" data-en="RTI Act" data-hi="आरटीआई कानून">RTI Act</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <div class="footer-heading" data-en="Policies" data-hi="नीतियां">Policies</div>
            <ul class="footer-links">
              <li><a href="#" data-en="Privacy Policy" data-hi="गोपनीयता नीति">Privacy Policy</a></li>
              <li><a href="#" data-en="Terms & Conditions" data-hi="नियम व शर्तें">Terms & Conditions</a></li>
              <li><a href="#" data-en="Sitemap" data-hi="साइटमैप">Sitemap</a></li>
              <li><a href="#" data-en="Accessibility" data-hi="सुगम्यता वक्तव्य">Accessibility Statement</a></li>
            </ul>
            <div class="footer-socials">
              <a href="https://www.facebook.com/cusbofficial/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">${iconSvg('facebook')}</a>
              <a href="https://x.com/CUSBofficial" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter / X">${iconSvg('x')}</a>
              <a href="https://www.instagram.com/cusbofficialpage/?hl=en" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">${iconSvg('instagram')}</a>
              <a href="https://in.linkedin.com/school/cusbofficial/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">${iconSvg('linkedin')}</a>
              <a href="https://www.youtube.com/user/CUBofficialchannel" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">${iconSvg('youtube')}</a>
            </div>
          </div>
          





          <div class="footer-col footer-map-col">
            <div class="footer-heading" data-en="Campus Map" data-hi="परिसर मानचित्र">Campus Map</div>
            <iframe
              class="footer-map"
              title="Central University of South Bihar location map"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Central%20University%20of%20South%20Bihar%2C%20Gaya&output=embed">
            </iframe>
          </div>
        </div>
        
        <div class="footer-bottom">
          <span data-en="© 2026 Central University of South Bihar. All Rights Reserved." data-hi="© 2026 दक्षिण बिहार केन्द्रीय विश्वविद्यालय। सर्वाधिकार सुरक्षित।">© 2026 Central University of South Bihar. All Rights Reserved.</span>
          <span data-en="Designed for Web Accessibility standards" data-hi="वेब सुगम्यता मानकों के लिए डिज़ाइन किया गया">Designed for Web Accessibility standards</span>
        </div>
      </div>
    `;
    replaceEmojiIcons(this);
  }
}
customElements.define('cusb-footer', CusbFooter);

// 7. Chatbot Component
class CusbChatbot extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="chatbot-container" id="chatbotContainer">
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <span data-en="💬 CUSB Assistant" data-hi="💬 सीयूएसबी सहायक">💬 CUSB Assistant</span>
            <button class="chatbot-close" id="chatbotCloseBtn" aria-label="Close Chat Window">${iconSvg('close')}</button>
          </div>
          <div class="chatbot-messages" id="chatbotMessages">
            <div class="chatbot-message bot">
              <div class="chatbot-message-bubble" data-en="Hi! I'm the CUSB Assistant. Ask me about admissions, programs, campus, hostels, or general inquiries!" data-hi="नमस्ते! मैं सीयूएसबी सहायक हूँ। मुझसे प्रवेश, कार्यक्रमों, परिसर, छात्रावास या सामान्य पूछताछ के बारे में पूछें!">
                Hi! I'm the CUSB Assistant. Ask me about admissions, programs, campus, hostels, or general inquiries!
              </div>
            </div>
          </div>
          <div class="chatbot-input-group">
            <input type="text" id="chatbotInput" placeholder="Ask me anything..." aria-label="Chat input query">
            <button class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Send query">${iconSvg('send')}</button>
          </div>
        </div>
        <button class="chatbot-toggle" id="chatbotToggleBtn" aria-label="Open CUSB Assistant Window">
          <svg class="chatbot-toggle-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="chatbotShellGradient" x1="12" y1="8" x2="52" y2="58" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="var(--bg-primary)"/>
                <stop offset="0.55" stop-color="var(--bg-secondary)"/>
                <stop offset="1" stop-color="var(--acc-blue)"/>
              </linearGradient>
            </defs>
            <path class="chatbot-icon-shadow" d="M18 55c-3 0-5-2-5-5V28c0-9 8-17 19-17s19 8 19 17v22c0 3-2 5-5 5H18z"/>
            <path class="chatbot-icon-head" d="M16 53c-3 0-5-2-5-5V29c0-11 9-20 21-20s21 9 21 20v19c0 3-2 5-5 5H16z"/>
            <path class="chatbot-icon-face" d="M20 29c0-5 5-9 12-9s12 4 12 9v8c0 5-5 9-12 9s-12-4-12-9v-8z"/>
            <circle class="chatbot-icon-eye" cx="27" cy="33" r="2.6"/>
            <circle class="chatbot-icon-eye" cx="37" cy="33" r="2.6"/>
            <path class="chatbot-icon-smile" d="M27 39c2.8 2 7.2 2 10 0"/>
            <path class="chatbot-icon-antenna" d="M32 9V4"/>
            <circle class="chatbot-icon-dot" cx="32" cy="4" r="2.6"/>
            <path class="chatbot-icon-ear" d="M11 32H7v10h4M53 32h4v10h-4"/>
          </svg>
        </button>
      </div>
      
      <div class="floating-message" id="chatbotFloatingMsg">
        <div class="floating-message-bubble" data-en="Need Any Help?" data-hi="क्या आपको मदद चाहिए?">
          Need Any Help?
        </div>
      </div>

      <button id="scroll-btn" aria-label="Scroll to top" title="Scroll to top">${iconSvg('arrow-up')}</button>
    `;
    replaceEmojiIcons(this);

    this.initChatbotLogic();
  }

  initChatbotLogic() {
    const container = this.querySelector('#chatbotContainer');
    const toggleBtn = this.querySelector('#chatbotToggleBtn');
    const closeBtn = this.querySelector('#chatbotCloseBtn');
    const chatWindow = this.querySelector('#chatbotWindow');
    const floatMsg = this.querySelector('#chatbotFloatingMsg');
    const input = this.querySelector('#chatbotInput');
    const sendBtn = this.querySelector('#chatbotSendBtn');
    const messages = this.querySelector('#chatbotMessages');
    const scrollBtn = this.querySelector('#scroll-btn');

    // Toggle Chat window
    const toggleWindow = () => {
      chatWindow.classList.toggle('active');
      floatMsg.classList.add('hidden');
    };

    toggleBtn.addEventListener('click', toggleWindow);
    closeBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

    const handleSend = async () => {
      const userVal = input.value.trim();
      const query = userVal.toLowerCase();
      if (!query) return;

      // Add user message
      addMessage(userVal, true);
      input.value = '';

      // Determine response
      const currentLang = localStorage.getItem('cusb-lang') || 'en';
      
      try {
        const response = await fetch(`/api/chat?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        const reply = data[currentLang] || data['en'] || 'Sorry, I failed to process that request.';
        addMessage(reply, false);
      } catch (err) {
        console.error("Chatbot API failed:", err);
        const errReply = currentLang === 'hi' 
          ? 'माफ़ कीजिये, सर्वर से संपर्क करने में कोई समस्या हुई।' 
          : 'Sorry, there was a problem connecting to the chatbot server.';
        addMessage(errReply, false);
      }
    };

    const addMessage = (text, isUser) => {
      const msgRow = document.createElement('div');
      msgRow.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
      msgRow.innerHTML = `<div class="chatbot-message-bubble">${text}</div>`;
      messages.appendChild(msgRow);
      messages.scrollTop = messages.scrollHeight;
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Scroll to top control
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
customElements.define('cusb-chatbot', CusbChatbot);
