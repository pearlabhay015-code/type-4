/**
 * CUSB WEBSITE - MAIN INTERACTIVE LOGIC
 * Handles: Bilingual Translation, Site Search Engine, Font Scaling, Theme Switching, and Mobile Menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize custom components and attach event handlers
  initAccessibilityBarOffset();
  initTheme();
  initFontSize();
  initLanguage();
  initSearch();
  initMobileNav();
  initQuickLinksMenu();
  initChatbot();
  initScrollToTop();
  initTranslateOffsetWatcher();
  initDynamicContent();
  window.setInterval(initDynamicContent, 30000);
  initEnquiryModal();
  initGalleryTicker();
  initNewsTicker();
  if (window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(document);
});

/**
 * Dynamically measures the actual pixel height of <cusb-accessibility-bar>
 * and updates CSS variable --accessibility-h so <cusb-navbar> is ALWAYS
 * positioned cleanly below it without overlapping on any device or font size.
 */
function initAccessibilityBarOffset() {
  const updateOffset = () => {
    const accessBar = document.querySelector('cusb-accessibility-bar');
    if (accessBar) {
      const rect = accessBar.getBoundingClientRect();
      const h = Math.round(rect.height);
      if (h > 0) {
        document.documentElement.style.setProperty('--accessibility-h', `${h}px`);
      }
    }
  };

  updateOffset();
  window.addEventListener('resize', updateOffset);
  window.addEventListener('load', updateOffset);
  setTimeout(updateOffset, 150);
  setTimeout(updateOffset, 500);
}

/* ==========================================================================
   1. THEME SWITCHING (LIGHT / DARK)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('cusb-theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cusb-theme', theme);
    updateThemeIcon(toggleBtn, theme);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = window.cusbIconSvg ? window.cusbIconSvg(theme === 'dark' ? 'sun' : 'moon') : (theme === 'dark' ? 'Light' : 'Dark');
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme');
}

/* ==========================================================================
   2. ACCESSIBILITY FONT SIZE CONTROLS
   ========================================================================== */
function initFontSize() {
  const decBtn = document.getElementById('btnDecSize');
  const resetBtn = document.getElementById('btnResetSize');
  const incBtn = document.getElementById('btnIncSize');
  const sizeIndicator = document.getElementById('sizeIndicator');

  if (!decBtn || !resetBtn || !incBtn) return;

  let currentSize = parseInt(localStorage.getItem('cusb-font-size')) || 16;
  applyFontSize(currentSize);

  decBtn.addEventListener('click', () => {
    if (currentSize > 12) {
      currentSize -= 1;
      applyFontSize(currentSize);
    }
  });

  resetBtn.addEventListener('click', () => {
    currentSize = 16;
    applyFontSize(currentSize);
  });

  incBtn.addEventListener('click', () => {
    if (currentSize < 25) {
      currentSize += 1;
      applyFontSize(currentSize);
    }
  });
}

function applyFontSize(size) {
  const sizeIndicator = document.getElementById('sizeIndicator');
  document.documentElement.style.fontSize = `${size}px`;
  localStorage.setItem('cusb-font-size', size);
  if (sizeIndicator) {
    sizeIndicator.textContent = `${size}px`;
  }
}

/* ==========================================================================
   3. PERFECT PRISTINE LANGUAGE TRANSLATOR & CONVERTER ENGINE
   ========================================================================== */
const googleTranslateLanguages = [
  'en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'pa', 'ur', 'kn', 'ml', 'or', 'as',
  'ne', 'sa', 'ar', 'zh-CN', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru', 'es'
];

function initLanguage() {
  const languageSelect = document.getElementById('languageSelect');
  
  // Set default or stored language
  const storedLang = localStorage.getItem('cusb-lang') || 'en';
  const savedLang = googleTranslateLanguages.includes(storedLang) ? storedLang : 'en';
  
  if (languageSelect) languageSelect.value = savedLang;

  // Apply initial DOM language attributes without triggering page reloads
  setLanguage(savedLang, { isInitialLoad: true });

  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  loadGoogleTranslate();
}

/**
 * Robustly clears all Google Translate cookies across root and domain paths.
 */
function clearGoogleTranslateCookies() {
  const host = window.location.hostname;
  const path = window.location.pathname;
  const domains = [host, `.${host}`, ''];
  const paths = ['/', path, '/type%204'];

  domains.forEach(d => {
    paths.forEach(p => {
      let cookieStr = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}`;
      if (d) cookieStr += `; domain=${d}`;
      document.cookie = cookieStr;
    });
  });
}

/**
 * Sets Google Translate cookie directly for instant target language translation.
 */
function setGoogleTranslateCookie(lang) {
  clearGoogleTranslateCookies();
  const val = `/en/${lang}`;
  const host = window.location.hostname;
  document.cookie = `googtrans=${val}; path=/;`;
  if (host && host !== 'localhost' && host !== '127.0.0.1') {
    document.cookie = `googtrans=${val}; path=/; domain=.${host};`;
  }
}

/**
 * Primary Language Selector Handler
 * Switches English/Hindi instantly (0ms) and performs clean pristine re-translation
 * for foreign languages so mixed language text (e.g. French + Urdu + Punjabi) NEVER occurs.
 */
function setLanguage(lang, options = {}) {
  const currentStored = localStorage.getItem('cusb-lang') || 'en';
  const isInitial = options.isInitialLoad === true;

  localStorage.setItem('cusb-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  const isManual = (lang === 'en' || lang === 'hi');

  // Synchronize all dropdown elements on the page
  const languageSelects = document.querySelectorAll('#languageSelect, .language-select');
  languageSelects.forEach(select => {
    if (select.value !== lang) select.value = lang;
  });

  // Apply hand-authored English / Hindi text content immediately
  const elements = document.querySelectorAll('[data-en], [data-hi]');
  elements.forEach(el => {
    if (el.classList.contains('notranslate') || el.closest('#languageSelect') || el.closest('.language-controls')) return;
    const text = el.getAttribute(`data-${lang}`) || (isManual ? '' : el.getAttribute('data-en'));
    if (text) {
      if (text.includes('<') && text.includes('>')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  if (window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(document);

  // User-triggered language switch (not initial load)
  if (!isInitial && currentStored !== lang) {
    if (!isManual) {
      // Switching to a foreign language (e.g. French -> Urdu -> Punjabi)
      // Set target cookie and reload to translate 100% clean pristine HTML
      setGoogleTranslateCookie(lang);
      window.location.reload();
      return;
    } else {
      // Switching back to English or Hindi from a foreign language
      if (currentStored !== 'en' && currentStored !== 'hi') {
        clearGoogleTranslateCookies();
        window.location.reload();
        return;
      } else {
        // Switching between English and Hindi locally (0ms instant)
        clearGoogleTranslateCookies();
        resetGoogleTranslate(lang);
      }
    }
  }

  // Handle Google Translate widget initialization on first load if foreign language
  if (isInitial && !isManual) {
    setGoogleTranslateCookie(lang);
    applyGoogleTranslate(lang);
  }

  // Dispatch custom events for reactive components
  const eventDetail = { detail: { lang } };
  window.dispatchEvent(new CustomEvent('cusb-language-changed', eventDetail));
  document.dispatchEvent(new CustomEvent('cusb-language-changed', eventDetail));
}

function loadGoogleTranslate() {
  const storedLang = localStorage.getItem('cusb-lang') || 'en';
  if (storedLang === 'en' || storedLang === 'hi') {
    return;
  }

  if (!document.getElementById('google_translate_element')) {
    const widget = document.createElement('div');
    widget.id = 'google_translate_element';
    widget.setAttribute('aria-hidden', 'true');
    widget.style.display = 'none';
    document.body.appendChild(widget);
  }

  window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: googleTranslateLanguages.join(','),
      autoDisplay: false
    }, 'google_translate_element');

    const activeLang = localStorage.getItem('cusb-lang') || 'en';
    if (activeLang !== 'en' && activeLang !== 'hi') {
      applyGoogleTranslate(activeLang);
    }
  };

  if (!document.getElementById('googleTranslateScript')) {
    const script = document.createElement('script');
    script.id = 'googleTranslateScript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }
}

function applyGoogleTranslate(lang, attempt = 0) {
  const combo = document.querySelector('.goog-te-combo');
  if (!combo) {
    if (attempt < 30) {
      setTimeout(() => applyGoogleTranslate(lang, attempt + 1), 80);
    }
    return;
  }

  if (combo.value !== lang) {
    combo.value = lang;
    combo.dispatchEvent(new Event('change'));
  }
}

function resetGoogleTranslate(targetLang = 'en') {
  clearGoogleTranslateCookies();
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = '';
    combo.dispatchEvent(new Event('change'));
  }
}

/* ==========================================================================
   4. CLIENT-SIDE SEARCH ENGINE & OVERLAY MODAL
   ========================================================================== */
// Search Directory Index
const searchIndex = [
  { title: "Home Page", tags: "home main landing", desc: "CUSB Main Homepage, Announcements, Gallery", url: "index.html" },
  { title: "About CUSB", tags: "about university overview history statutes accreditation", desc: "Overview, history, vision, mission, and stats of CUSB", url: "about.html" },
  { title: "Vision & Mission", tags: "vision mission motto core values", desc: "Core values, mission statements, and motto of CUSB", url: "about.html#vision" },
  { title: "NAAC Accreditation", tags: "naac a++ nirf accreditation ugc recognition", desc: "Accreditation status, NIRF rankings, and UGC certifications", url: "about.html#accreditation" },
  { title: "University Leadership", tags: "administration leaders president chancellor vice chancellor vc registrar governance", desc: "University officers, Visitor, Chancellor, and Vice-Chancellor details", url: "leaders.html" },
  { title: "Vice-Chancellor's Desk", tags: "vc profile message administration", desc: "Profile and greeting from Vice-Chancellor Prof. K.N. Singh", url: "leaders.html#vc" },
  { title: "Courses & Programmes", tags: "courses programs academics degrees admission undergraduate postgraduate phd", desc: "List of schools, departments, and course curricula", url: "courses.html" },
  { title: "Computer Science Department", tags: "computer science cs academics programs bsc msc ai phd syllabus", desc: "Faculty members, labs, and programmes offered in Computer Science", url: "cs.html" },
  { title: "CS Faculty Members", tags: "cs faculty teachers staff professors", desc: "List of computer science professors, coordinators, and wardens", url: "cs.html#faculty-sec" },
  { title: "Hostel Facilities", tags: "hostel accommodation wardens rooms mess charges aryabhatta malviya", desc: "Hostel fees, guidelines, wardens, and registration details", url: "hostel.html" },
  { title: "Hostel Wardens", tags: "warden contact hostel rules admin", desc: "Meet the wardens of Aryabhatta, Gargi, and Maitreyi Hostels", url: "hostel.html#wardens-sec" },
  { title: "Previous Year Questions (PYQs)", tags: "pyq exam question papers previous semesters files", desc: "Download old semester exam question papers by department", url: "pyq.html" },
  { title: "Admissions Portal", tags: "apply cuet pg admission register samarth", desc: "Online applications and brochures for academic session 2026-27", url: "https://cuet.samarth.ac.in/" },
  { title: "Online Fee Payment", tags: "pay fees samarth online transaction account", desc: "Samarth online portal for student fee collection", url: "https://cusb.samarth.edu.in/" },
  { title: "RTI online cell", tags: "rti right to information query details disclosure", desc: "Submit inquiries under the RTI Act", url: "https://rtionline.gov.in/" }
];

function initSearch() {
  const triggerBtn = document.getElementById('headerSearchTriggerBtn') || document.getElementById('siteSearchBtn');
  
  // Create Search Modal Overlay Dynamically if it doesn't exist
  if (!document.getElementById('siteSearchOverlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'siteSearchOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search Website Results');
    
    const searchIconSvg = window.cusbIconSvg ? window.cusbIconSvg('search') : '🔍';
    const closeIconSvg = window.cusbIconSvg ? window.cusbIconSvg('close') : '✕';

    overlay.innerHTML = `
      <div class="search-modal">
        <div class="search-modal-header">
          <div class="search-modal-title">
            <span style="color:var(--acc-navy); display:inline-flex; align-items:center;">${searchIconSvg}</span>
            <span data-en="Search Portal" data-hi="खोज पोर्टल">Search Portal</span>
          </div>
          <div class="search-modal-close-row">
            <span class="search-esc-tag">ESC</span>
            <button class="search-modal-close" id="closeSearchModalBtn" aria-label="Close search overlay">${closeIconSvg}</button>
          </div>
        </div>
        <div class="search-modal-body">
          <div class="search-modal-input-wrap">
            <span class="search-modal-input-icon">${searchIconSvg}</span>
            <input type="search" class="search-modal-input" id="modalSearchInput" placeholder="Search courses, admissions, notices, tenders, hostels..." aria-label="Search keywords">
          </div>

          <div class="search-quick-chips">
            <span style="font-size:0.78rem; font-weight:700; color:var(--tx-muted); display:inline-flex; align-items:center; margin-right:4px;" data-en="Popular:" data-hi="लोकप्रिय:">Popular:</span>
            <button type="button" class="search-chip" data-query="Admissions 2026">Admissions 2026</button>
            <button type="button" class="search-chip" data-query="CUET Cutoff">CUET Cutoff</button>
            <button type="button" class="search-chip" data-query="Courses">Courses & Fees</button>
            <button type="button" class="search-chip" data-query="Hostel">Hostels</button>
            <button type="button" class="search-chip" data-query="Tenders">Tenders</button>
            <button type="button" class="search-chip" data-query="Library">Library</button>
            <button type="button" class="search-chip" data-query="PYQ">PYQ Papers</button>
          </div>

          <ul class="search-results-list" id="searchResultsList">
            <!-- Results appended here -->
          </ul>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    if (window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(overlay);
    
    // Attach modal close actions
    const closeBtn = document.getElementById('closeSearchModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });

    // Attach input search listener inside modal
    const modalInput = document.getElementById('modalSearchInput');
    if (modalInput) {
      modalInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
      });
    }

    // Attach quick query chips listener
    overlay.querySelectorAll('.search-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-query');
        if (modalInput && q) {
          modalInput.value = q;
          modalInput.focus();
          performSearch(q);
        }
      });
    });
  }

  // Open search modal function
  const headerSearchInput = document.getElementById('headerSearchInput');
  const openModal = (query = '') => {
    const overlay = document.getElementById('siteSearchOverlay');
    const modalInput = document.getElementById('modalSearchInput');
    if (overlay && modalInput) {
      overlay.classList.add('active');
      if (query) {
        modalInput.value = query;
      }
      setTimeout(() => modalInput.focus(), 100);
      performSearch(modalInput.value.trim() || '');
    }
  };

  // Trigger search modal on search bar click, container click, or input focus
  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(headerSearchInput?.value.trim() || '');
    });
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(headerSearchInput.value.trim() || '');
    });
    headerSearchInput.addEventListener('focus', (e) => {
      e.preventDefault();
      openModal(headerSearchInput.value.trim() || '');
    });
    headerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        openModal(headerSearchInput.value.trim() || '');
      }
    });
  }

  const searchWrap = document.querySelector('.search-container') || document.querySelector('.accessibility-search-container');
  if (searchWrap) {
    searchWrap.addEventListener('click', (e) => {
      if (e.target !== triggerBtn && e.target !== headerSearchInput) {
        openModal(headerSearchInput?.value.trim() || '');
      }
    });
  }

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K / ESC)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal();
    } else if (e.key === 'Escape') {
      const overlay = document.getElementById('siteSearchOverlay');
      if (overlay && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }
    }
  });
}

async function performSearch(query) {
  const resultsContainer = document.getElementById('searchResultsList');
  if (!resultsContainer) return;
  
  resultsContainer.innerHTML = '';
  const trimmed = query.trim().toLowerCase();
  
  if (!trimmed) {
    resultsContainer.innerHTML = `<li class="search-no-results" data-en="Type above to search files..." data-hi="खोजने के लिए ऊपर टाइप करें...">Type above to search files...</li>`;
    // Apply translation to static text inside search results
    const lang = localStorage.getItem('cusb-lang') || 'en';
    const noResEl = resultsContainer.querySelector('.search-no-results');
    if (noResEl) noResEl.textContent = noResEl.getAttribute(`data-${lang}`);
    return;
  }

  try {
    const response = await fetch(window.cusbApiUrl(`search?q=${encodeURIComponent(trimmed)}`));
    const matches = await response.json();

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<li class="search-no-results" data-en="No matching pages found." data-hi="कोई मेल खाते पृष्ठ नहीं मिले।">No matching pages found.</li>`;
      const lang = localStorage.getItem('cusb-lang') || 'en';
      const noResEl = resultsContainer.querySelector('.search-no-results');
      if (noResEl) noResEl.textContent = noResEl.getAttribute(`data-${lang}`);
      return;
    }

    matches.forEach(item => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.innerHTML = `
        <a href="${item.url}">
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-desc">${item.desc}</div>
        </a>
      `;
      resultsContainer.appendChild(li);
    });
  } catch (err) {
    console.error("Search API failed:", err);
    resultsContainer.innerHTML = `<li class="search-no-results">Failed to fetch search results from database.</li>`;
  }
}

/* ==========================================================================
   5. MOBILE RESPONSIVE DRAWER & DROPDOWN NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggleBtn');
  const navMenu = document.getElementById('navbarMenu');
  
  if (!toggleBtn || !navMenu) return;

  const resetDesktopDropdownPosition = (menu) => {
    menu.style.position = '';
    menu.style.top = '';
    menu.style.left = '';
    menu.style.right = '';
    menu.style.width = '';
    menu.style.maxWidth = '';
  };

  const keepDropdownInViewport = (menu) => {
    if (!menu || window.innerWidth <= 991) return;

    requestAnimationFrame(() => {
      const viewportPadding = 16;
      const navbar = document.querySelector('cusb-navbar');
      const navRect = navbar ? navbar.getBoundingClientRect() : { bottom: 0 };
      const itemRect = menu.parentElement.getBoundingClientRect();
      const desiredWidth = Math.min(menu.offsetWidth || 750, window.innerWidth - (viewportPadding * 2));
      const left = Math.min(
        Math.max(itemRect.left, viewportPadding),
        window.innerWidth - desiredWidth - viewportPadding
      );

      menu.style.position = 'fixed';
      menu.style.top = `${Math.max(0, navRect.bottom)}px`;
      menu.style.left = `${left}px`;
      menu.style.right = 'auto';
      menu.style.width = `${desiredWidth}px`;
      menu.style.maxWidth = `${window.innerWidth - (viewportPadding * 2)}px`;
    });
  };

  const closeAllDropdowns = () => {
    navMenu.querySelectorAll('.navbar-item.active').forEach(item => {
      const menu = item.querySelector('.megamenu');
      item.classList.remove('active');
      if (menu) resetDesktopDropdownPosition(menu);
    });
  };

  const updateActiveDropdowns = () => {
    if (window.innerWidth <= 991) return;
    navMenu.querySelectorAll('.navbar-item.active .megamenu').forEach(keepDropdownInViewport);
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('is-open');
    toggleBtn.innerHTML = window.cusbIconSvg ? window.cusbIconSvg('menu') : 'Menu';
    navMenu.classList.remove('active');
    closeAllDropdowns();
  };

  const openMenu = () => {
    const quickToggle = document.getElementById('mobileQuickLinksToggleBtn');
    const quickSidebar = document.querySelector('.fixed-quicklinks-sidebar');
    if (quickToggle && quickSidebar) {
      quickToggle.setAttribute('aria-expanded', 'false');
      quickToggle.classList.remove('is-open');
      quickSidebar.classList.remove('is-open');
    }

    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('is-open');
    toggleBtn.innerHTML = window.cusbIconSvg ? window.cusbIconSvg('close') : 'Close';
    navMenu.classList.add('active');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navMenu.addEventListener('click', (e) => e.stopPropagation());

  navMenu.querySelectorAll('.megamenu a').forEach(link => {
    link.addEventListener('click', () => {
      closeAllDropdowns();
      if (window.innerWidth <= 991) closeMenu();
    });
  });

  const navLinks = navMenu.querySelectorAll('.navbar-item > .navbar-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const item = link.parentElement;
      const megamenu = item.querySelector('.megamenu');
      if (!megamenu) {
        if (window.innerWidth <= 991) closeMenu();
        return;
      }

      e.preventDefault();
      const wasActive = item.classList.contains('active');
      closeAllDropdowns();
      if (!wasActive) {
        item.classList.add('active');
        keepDropdownInViewport(megamenu);
      }
    });

    link.parentElement.addEventListener('mouseenter', () => {
      const megamenu = link.parentElement.querySelector('.megamenu');
      if (window.innerWidth > 991 && megamenu) {
        closeAllDropdowns();
        link.parentElement.classList.add('active');
        keepDropdownInViewport(megamenu);
      }
    });
  });

  navMenu.addEventListener('mouseleave', () => {
    if (window.innerWidth > 991) closeAllDropdowns();
  });

  document.addEventListener('click', () => {
    if (window.innerWidth <= 991) {
      closeMenu();
    } else {
      closeAllDropdowns();
    }
  });

  window.addEventListener('resize', () => {
    navMenu.querySelectorAll('.megamenu').forEach(resetDesktopDropdownPosition);
    if (window.innerWidth > 991) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('is-open');
      toggleBtn.innerHTML = window.cusbIconSvg ? window.cusbIconSvg('menu') : 'Menu';
      navMenu.classList.remove('active');
      updateActiveDropdowns();
    }
  });

  window.addEventListener('scroll', updateActiveDropdowns, { passive: true });
}

function initQuickLinksMenu() {
  const toggleBtn = document.getElementById('mobileQuickLinksToggleBtn');
  const sidebar = document.querySelector('.fixed-quicklinks-sidebar');
  const closeBtn = document.getElementById('quickLinksCloseBtn');

  if (!toggleBtn || !sidebar) return;

  let sidebarTicking = false;
  const updateMobileSidebarTop = () => {
    if (window.innerWidth > 991 || !sidebar.classList.contains('is-open')) {
      return;
    }

    const navbar = document.querySelector('cusb-navbar');
    const bottom = navbar ? Math.max(0, navbar.getBoundingClientRect().bottom) : 0;
    document.documentElement.style.setProperty('--mobile-quicklinks-top', `${bottom}px`);
  };

  const onScrollSidebar = () => {
    if (!sidebarTicking && sidebar.classList.contains('is-open')) {
      sidebarTicking = true;
      requestAnimationFrame(() => {
        updateMobileSidebarTop();
        sidebarTicking = false;
      });
    }
  };

  const closeQuickLinks = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('is-open');
    sidebar.classList.remove('is-open');
  };

  const openQuickLinks = () => {
    const navToggle = document.getElementById('mobileNavToggleBtn');
    const navMenu = document.getElementById('navbarMenu');
    if (navToggle && navMenu) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('is-open');
      navToggle.innerHTML = window.cusbIconSvg ? window.cusbIconSvg('menu') : 'Menu';
      navMenu.classList.remove('active');
      navMenu.querySelectorAll('.navbar-item.active').forEach(item => item.classList.remove('active'));
    }

    updateMobileSidebarTop();
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('is-open');
    sidebar.classList.add('is-open');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (toggleBtn.getAttribute('aria-expanded') === 'true') closeQuickLinks();
    else openQuickLinks();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeQuickLinks();
    });
  }

  sidebar.addEventListener('click', (e) => e.stopPropagation());
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) closeQuickLinks();
    });
  });

  document.addEventListener('click', () => {
    if (window.innerWidth <= 991) closeQuickLinks();
  });

  window.addEventListener('resize', () => {
    if (sidebar.classList.contains('is-open')) updateMobileSidebarTop();
    if (window.innerWidth > 991) closeQuickLinks();
  }, { passive: true });
  window.addEventListener('scroll', onScrollSidebar, { passive: true });
}

/* ==========================================================================
   6. CHATBOT AND SCROLL-TO-TOP
   ========================================================================== */
function initChatbot() {
  const toggleBtn = document.getElementById('chatbotToggleBtn');
  const closeBtn = document.getElementById('chatbotCloseBtn');
  const windowEl = document.getElementById('chatbotWindow');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const messages = document.getElementById('chatbotMessages');
  const greeting = document.getElementById('chatbotGreeting');

  if (!toggleBtn || !closeBtn || !windowEl || !form || !input || !messages) return;

  const quickReplies = [
    {
      keys: ['admission', 'apply', 'cuet', 'entrance'],
      text: 'Admissions are handled through CUET/Samarth. Use the Apply Now button or visit the Admissions page for dates, eligibility, and notices.'
    },
    {
      keys: ['course', 'program', 'school', 'department', 'academics'],
      text: 'You can browse Schools & Departments on this homepage. Hover or tap a school card, then choose the department you want to explore.'
    },
    {
      keys: ['hostel', 'mess', 'accommodation'],
      text: 'Hostel details, wardens, facilities, and rules are available from the Hostels quick link.'
    },
    {
      keys: ['library', 'book', 'journal'],
      text: 'The Central Library page includes library facilities, resources, and student services.'
    },
    {
      keys: ['contact', 'phone', 'email', 'address'],
      text: 'You can find phone, email, and campus address details in the footer Contact Us section.'
    },
    {
      keys: ['notice', 'news', 'event', 'calendar'],
      text: 'Latest news and upcoming events are listed on the homepage, with more details on the News & Events page.'
    }
  ];

  const appendMessage = (text, type = 'bot') => {
    const message = document.createElement('div');
    const bubble = document.createElement('div');
    message.className = `chatbot-message ${type}`;
    bubble.className = 'chatbot-message-bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const getBotReply = (value) => {
    const query = value.toLowerCase();
    const match = quickReplies.find(reply => reply.keys.some(key => query.includes(key)));
    if (match) return match.text;
    return 'I can guide you to admissions, schools, departments, hostel, library, notices, events, and contact details. Try asking about one of these.';
  };

  const getDatabaseReply = async (value) => {
    try {
      const response = await fetch(window.cusbApiUrl(`chat?q=${encodeURIComponent(value)}`));
      if (!response.ok) throw new Error('Chat API unavailable');
      const reply = await response.json();
      const lang = localStorage.getItem('cusb-lang') || 'en';
      return reply[lang] || reply.en;
    } catch (error) {
      return getBotReply(value);
    }
  };

  const openChat = () => {
    windowEl.classList.add('active');
    windowEl.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 100);
  };

  const closeChat = () => {
    windowEl.classList.remove('active');
    windowEl.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    if (windowEl.classList.contains('active')) closeChat();
    else openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendMessage(value, 'user');
    input.value = '';
    appendMessage('Searching CUSB information…', 'bot');
    const pendingReply = messages.lastElementChild;
    const answer = await getDatabaseReply(value);
    if (pendingReply) pendingReply.remove();
    appendMessage(answer, 'bot');
  });
}

function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-btn');
  if (!scrollBtn) return;

  const updateVisibility = () => {
    scrollBtn.classList.toggle('show', window.scrollY > 420);
  };

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
}

/* ==========================================================================
   7. GOOGLE TRANSLATE BANNER SUPPRESSOR & OFFSET CLEANUP
   ========================================================================== */
function initTranslateOffsetWatcher() {
  const suppressTranslateBanner = () => {
    // Hide and disable any Google Translate banner frames, tooltips, or popups
    document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame, .VIpgJd-yDtfdf-l4e2f-Lg2fx, .skiptranslate').forEach(el => {
      if (el.tagName === 'IFRAME' || el.id === 'goog-gt-tt' || el.classList.contains('goog-te-banner-frame')) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.height = '0';
        el.style.width = '0';
        el.style.pointerEvents = 'none';
      }
    });

    // Reset body style & offset so page top never shifts down
    if (document.body.style.top !== '0px') document.body.style.top = '0px';
    if (document.documentElement.style.top !== '0px') document.documentElement.style.top = '0px';
    document.documentElement.style.setProperty('--translate-offset', '0px');
  };

  suppressTranslateBanner();
  setInterval(suppressTranslateBanner, 200);
}

/* ==========================================================================
   7. DYNAMIC SITE CONTENT LOADER (GALLERY, NEWS & EVENTS)
   ========================================================================== */
function renderGallery(galleryList) {
  const container = document.querySelector('.gallery-grid-pastel');
  if (!container || !galleryList || galleryList.length === 0) return;

  container.innerHTML = '';
  galleryList.forEach(item => {
    const block = document.createElement('div');
    block.className = 'gallery-block';
    block.innerHTML = `
      <img src="${item.image_url}" alt="${item.title_en}" loading="lazy" onerror="this.src='assets/images/blockB.jpg'">
      <div class="gallery-overlay" data-en="${item.title_en}" data-hi="${item.title_hi}">${item.title_en}</div>
    `;
    container.appendChild(block);
  });
}

function renderNewsCards(newsList) {
  const container = document.querySelector('.news-grid');
  if (!container || !newsList || newsList.length === 0) return;

  container.innerHTML = '';
  newsList.slice(0, 3).forEach(item => {
    const defaultImage = 'assets/images/blockB.jpg';
    const imgUrl = item.image_url || defaultImage;
    
    let dateObj = new Date(item.created_at);
    let day = dateObj.getDate();
    let month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    
    const displayTag = item.date_str || "News";
    
    const article = document.createElement('article');
    article.className = 'news-card';
    article.innerHTML = `
      <div class="news-card-media">
        <img src="${imgUrl}" alt="${item.title_en}" loading="lazy" onerror="this.src='assets/images/blockB.jpg'">
        <div class="news-card-date"><span>${day}</span>${month}</div>
      </div>
      <div class="news-card-details">
        <span class="news-card-meta" data-en="${displayTag}" data-hi="${displayTag}">${displayTag}</span>
        <h4 class="news-card-title">
          <a href="news-events.html?type=news" data-en="${item.title_en}" data-hi="${item.title_hi}">${item.title_en}</a>
        </h4>
      </div>
    `;
    container.appendChild(article);
  });
}

function renderEventCards(eventList) {
  const container = document.querySelector('.events-grid');
  if (!container || !eventList || eventList.length === 0) return;

  container.innerHTML = '';
  eventList.slice(0, 3).forEach(item => {
    const defaultImage = 'assets/images/audimg.jpg';
    const imgUrl = item.image_url || defaultImage;
    
    let dateObj = new Date(item.created_at);
    let day = dateObj.getDate();
    let month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    
    const displayTag = item.date_str || "Event";
    
    const article = document.createElement('article');
    article.className = 'event-card';
    article.innerHTML = `
      <div class="event-card-media">
        <img src="${imgUrl}" alt="${item.title_en}" loading="lazy" onerror="this.src='assets/images/audimg.jpg'">
        <div class="event-card-date"><span>${day}</span>${month}</div>
      </div>
      <div class="event-card-details">
        <span class="event-card-meta" data-en="${displayTag}" data-hi="${displayTag}">${displayTag}</span>
        <h4 class="event-card-title">
          <a href="news-events.html?type=event" data-en="${item.title_en}" data-hi="${item.title_hi}">${item.title_en}</a>
        </h4>
      </div>
    `;
    container.appendChild(article);
  });
}

async function initDynamicContent() {
  const currentLang = localStorage.getItem('cusb-lang') || 'en';
  const now = Date.now();
  
  // 1. Fetch & Render Gallery (API fallback to LocalStorage)
  const galleryContainer = document.querySelector('.gallery-grid-pastel');
  if (galleryContainer) {
    let galleryList = [];
    try {
      const response = await fetch(window.cusbApiUrl('gallery'));
      if (response.ok) {
        galleryList = await response.json();
      }
    } catch (err) {
      console.log("Backend offline, loading gallery from LocalStorage");
    }

    if (!galleryList || galleryList.length === 0) {
      const storedG = localStorage.getItem('cusb_gallery');
      if (storedG) {
        try { galleryList = JSON.parse(storedG); } catch(e) {}
      }
    }

    if (galleryList && galleryList.length > 0) {
      renderGallery(galleryList);
      galleryContainer.querySelectorAll('[data-en], [data-hi]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) el.textContent = text;
      });
    }
  }

  // 2. Fetch & Render News / Events with Expiry Duration Filtering
  const newsContainer = document.querySelector('.news-grid');
  const eventsContainer = document.querySelector('.events-grid');
  if (newsContainer || eventsContainer) {
    let announcements = [];
    try {
      const response = await fetch(window.cusbApiUrl('announcements'));
      if (response.ok) {
        announcements = await response.json();
      }
    } catch (err) {
      console.log("Backend offline, loading announcements from LocalStorage");
    }

    if (!announcements || announcements.length === 0) {
      const storedA = localStorage.getItem('cusb_announcements');
      if (storedA) {
        try { announcements = JSON.parse(storedA); } catch(e) {}
      }
    }

    if (announcements && announcements.length > 0) {
      // Filter out items whose set display duration / expiry timestamp has passed
      const activeAnnouncements = announcements.filter(item => {
        if (!item.expiry_timestamp || item.expiry_timestamp === 0) return true; // Permanent
        return item.expiry_timestamp > now; // Active within duration
      });

      // Render active news
      const newsList = activeAnnouncements.filter(item => item.type.toLowerCase() === 'news');
      if (newsList.length > 0 && newsContainer) {
        renderNewsCards(newsList);
        newsContainer.querySelectorAll('[data-en], [data-hi]').forEach(el => {
          const text = el.getAttribute(`data-${currentLang}`);
          if (text) {
            if (text.includes('<') && text.includes('>')) el.innerHTML = text;
            else el.textContent = text;
          }
        });
      }

      // Render active events
      const eventsList = activeAnnouncements.filter(item => item.type.toLowerCase() === 'event');
      if (eventsList.length > 0 && eventsContainer) {
        renderEventCards(eventsList);
        eventsContainer.querySelectorAll('[data-en], [data-hi]').forEach(el => {
          const text = el.getAttribute(`data-${currentLang}`);
          if (text) {
            if (text.includes('<') && text.includes('>')) el.innerHTML = text;
            else el.textContent = text;
          }
        });
      }
    }
  }
}

/* ==========================================================================
   10. INTERACTIVE FLOATING ENQUIRY FORM & MODAL LOGIC
   ========================================================================== */
function initEnquiryModal() {
  const floatBtn = document.getElementById('floatingEnquiryBtn');
  const modalOverlay = document.getElementById('enquiryModalOverlay');
  const closeBtn = document.getElementById('enquiryModalCloseBtn');
  const form = document.getElementById('enquiryForm');
  const categoryChips = document.querySelectorAll('#enquiryCategoryChips .enquiry-chip');
  const categoryInput = document.getElementById('enquiryCategoryInput');
  const programSelect = document.getElementById('enquiryProgramLevel');
  const departmentSelect = document.getElementById('enquiryDepartment');
  const messageArea = document.getElementById('enquiryMessage');
  const charCounter = document.getElementById('charCounter');
  const progressFill = document.getElementById('enquiryProgressFill');
  const successContainer = document.getElementById('enquirySuccessContainer');
  const ticketBadge = document.getElementById('enquiryTicketNumber');
  const copyBtn = document.getElementById('copyTicketBtn');
  const resetBtn = document.getElementById('resetEnquiryBtn');

  // Open Modal
  if (floatBtn && modalOverlay) {
    floatBtn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close Modal
  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Category Selector Chips
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-category');
      if (categoryInput) categoryInput.value = cat;

      // Customize placeholders based on category
      if (messageArea) {
        if (cat === 'admissions') {
          messageArea.placeholder = "Ask about admission dates, eligibility criteria, CUET cut-off, or application procedure...";
        } else if (cat === 'courses') {
          messageArea.placeholder = "Ask about specific course syllabus, faculty details, duration, or degree structure...";
        } else if (cat === 'hostel') {
          messageArea.placeholder = "Ask about hostel room allotment, fee structure, mess facilities, or rules...";
        } else if (cat === 'scholarship') {
          messageArea.placeholder = "Ask about NSP scholarships, fee waiver schemes, or merit-cum-means awards...";
        } else {
          messageArea.placeholder = "Type your query details here...";
        }
      }
    });
  });

  // Dynamic Course/Department updates based on Program Level selection
  const deptOptionsByLevel = {
    ug: [
      { val: "ba_llb", label: "B.A. LL.B. (Hons.) - 5 Year Integrated" },
      { val: "bsc_bed", label: "B.Sc. B.Ed. Integrated" },
      { val: "ba_bed", label: "B.A. B.Ed. Integrated" },
      { val: "btech_cs", label: "B.Tech in Computer Science" }
    ],
    pg: [
      { val: "msc_cs", label: "M.Sc. Computer Science" },
      { val: "msc_math", label: "M.Sc. Mathematics" },
      { val: "msc_phy", label: "M.Sc. Physics" },
      { val: "msc_chem", label: "M.Sc. Chemistry" },
      { val: "msc_biotech", label: "M.Sc. Biotechnology" },
      { val: "llm", label: "LL.M. (Master of Laws)" },
      { val: "ma_mc", label: "M.A. Journalism & Mass Communication" },
      { val: "med", label: "M.Ed. (Master of Education)" },
      { val: "ma_econ", label: "M.A. Economics" }
    ],
    phd: [
      { val: "phd_cs", label: "Ph.D. in Computer Science" },
      { val: "phd_phy", label: "Ph.D. in Physics" },
      { val: "phd_chem", label: "Ph.D. in Chemistry" },
      { val: "phd_law", label: "Ph.D. in Law" },
      { val: "phd_bio", label: "Ph.D. in Biotechnology" },
      { val: "phd_edu", label: "Ph.D. in Education" }
    ],
    diploma: [
      { val: "pgd_data", label: "PG Diploma in Data Science" },
      { val: "pgd_yoga", label: "PG Diploma in Yoga & Wellness" }
    ]
  };

  if (programSelect && departmentSelect) {
    programSelect.addEventListener('change', (e) => {
      const level = e.target.value;
      departmentSelect.innerHTML = '<option value="" data-en="-- Select Department / Course --" data-hi="-- विभाग / पाठ्यक्रम चुनें --">-- Select Department / Course --</option>';
      if (deptOptionsByLevel[level]) {
        deptOptionsByLevel[level].forEach(opt => {
          const el = document.createElement('option');
          el.value = opt.val;
          el.textContent = opt.label;
          departmentSelect.appendChild(el);
        });
      }
      updateFormProgress();
    });
  }

  // Live Character Counter
  if (messageArea && charCounter) {
    messageArea.addEventListener('input', () => {
      const len = messageArea.value.length;
      charCounter.textContent = `${len} / 500`;
      updateFormProgress();
    });
  }

  // Live Input Validation & Progress Bar
  const requiredInputs = form ? form.querySelectorAll('[required]') : [];
  
  function updateFormProgress() {
    if (!requiredInputs.length || !progressFill) return;
    let validCount = 0;

    requiredInputs.forEach(input => {
      if (input.type === 'email') {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        if (isValid) {
          input.classList.add('is-valid');
          input.classList.remove('is-invalid');
          validCount++;
        } else if (input.value.trim().length > 0) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
        } else {
          input.classList.remove('is-valid', 'is-invalid');
        }
      } else if (input.type === 'tel') {
        const isValid = /^[0-9]{10}$/.test(input.value.trim());
        if (isValid) {
          input.classList.add('is-valid');
          input.classList.remove('is-invalid');
          validCount++;
        } else if (input.value.trim().length > 0) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
        } else {
          input.classList.remove('is-valid', 'is-invalid');
        }
      } else {
        if (input.value.trim().length > 0) {
          input.classList.add('is-valid');
          input.classList.remove('is-invalid');
          validCount++;
        } else {
          input.classList.remove('is-valid', 'is-invalid');
        }
      }
    });

    const percent = Math.round((validCount / requiredInputs.length) * 100);
    progressFill.style.width = `${percent}%`;
  }

  if (requiredInputs.length) {
    requiredInputs.forEach(input => {
      input.addEventListener('input', updateFormProgress);
      input.addEventListener('change', updateFormProgress);
    });
  }

  // Form Submission Logic
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        }
      });

      if (!isValid) {
        alert("Please fill out all required fields correctly.");
        return;
      }

      const submitBtn = document.getElementById('enquirySubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span data-en="Submitting..." data-hi="जमा किया जा रहा है...">Submitting...</span>';
      }

      setTimeout(() => {
        const ticketNum = 'CUSB-ENQ-2026-' + Math.floor(1000 + Math.random() * 9000);
        if (ticketBadge) ticketBadge.textContent = ticketNum;

        form.style.display = 'none';
        if (successContainer) successContainer.style.display = 'block';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span data-en="Submit Enquiry →" data-hi="पूछताछ जमा करें →">Submit Enquiry →</span>';
        }
      }, 800);
    });
  }

  // Copy Ticket Reference
  if (copyBtn && ticketBadge) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(ticketBadge.textContent).then(() => {
        const origText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => copyBtn.textContent = origText, 2000);
      });
    });
  }

  // Reset Enquiry Form
  if (resetBtn && form && successContainer) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      requiredInputs.forEach(input => input.classList.remove('is-valid', 'is-invalid'));
      if (progressFill) progressFill.style.width = '0%';
      if (charCounter) charCounter.textContent = '0 / 500';
      successContainer.style.display = 'none';
      form.style.display = 'grid';
    });
  }
}

/* ==========================================================================
   16. DUAL-ROW AUTO-MOVING GALLERY SLIDER (ROW 1 L→R, ROW 2 R→L) & MODAL
   ========================================================================== */
function initGalleryTicker() {
  const row1Track = document.getElementById('galleryRow1Track');
  const row2Track = document.getElementById('galleryRow2Track');
  const wrapper = document.getElementById('galleryTickerWrapper');
  if (!row1Track || !row2Track || !wrapper) return;

  const row1Items = [
    {
      id: "entrance",
      title_en: "Main Entrance Gate",
      title_hi: "मुख्य प्रवेश द्वार",
      category_en: "Campus Landmark",
      category_hi: "परिसर लैंडमार्क",
      src: "assets/drone.png",
      location: "SH-7, Panchanpur Road Entrance",
      access: "24/7 Security Access",
      desc_en: "The grand entrance gate of Central University of South Bihar (CUSB), located on SH-7 at Panchanpur, Gaya. Features architectural archways, CCTV surveillance, multi-lane vehicular access, and tree-lined walkways welcoming visitors across 300 acres.",
      desc_hi: "दक्षिण बिहार केन्द्रीय विश्वविद्यालय (सीयूएसबी) का भव्य प्रवेश द्वार, पंचानपुर-गया मार्ग पर स्थित है।",
      link: "about.html"
    },
    {
      id: "academic-block",
      title_en: "Academic Block Complex",
      title_hi: "अकादमिक ब्लॉक परिसर",
      category_en: "Academic Infrastructure",
      category_hi: "शैक्षणिक अवसंरचना",
      src: "assets/images/blockB.jpg",
      location: "Central Academic Sector",
      access: "25 Academic Departments & Labs",
      desc_en: "State-of-the-art multi-storey academic blocks housing 25+ academic departments, smart multimedia lecture halls, advanced research laboratories, departmental reading halls, and faculty rooms connected via high-speed campus Wi-Fi.",
      desc_hi: "25 से अधिक शैक्षणिक विभागों, स्मार्ट व्याख्यान कक्षों और उन्नत प्रयोगशालाओं से सुसज्जित आधुनिक अकादमिक भवन।",
      link: "courses.html"
    },
    {
      id: "sports-ground",
      title_en: "Sports Complex & Athletics Ground",
      title_hi: "खेल परिसर और एथलेटिक्स मैदान",
      category_en: "Sports & Fitness",
      category_hi: "खेल और फिटनेस",
      src: "assets/images/spoim.jpg",
      location: "South Campus Athletics Zone",
      access: "Full-size pitch & outdoor courts",
      desc_en: "Comprehensive sports ground featuring a regulation football field, cricket oval, volleyball, basketball, and badminton courts, running tracks, and indoor sports equipment for student tournaments.",
      desc_hi: "फुटबॉल, क्रिकेट, वॉलीबॉल, बास्केटबॉल और दौड़ ट्रैक की सुविधा वाला विस्तृत खेल परिसर।",
      link: "sports.html"
    },
    {
      id: "aryabhatta",
      title_en: "Aryabhatta Boys Hostel",
      title_hi: "आर्यभट्ट छात्रावास",
      category_en: "Student Accommodation",
      category_hi: "छात्र आवास",
      src: "assets/aryabhatta.jpeg",
      location: "North Residential Sector",
      access: "300+ Student Rooms & Mess",
      desc_en: "Premier residential facility providing high-speed internet, solar water heaters, study lounges, 24/7 electricity backup, and a hygienic dining hall serving nutritious meals for postgraduate & PhD scholars.",
      desc_hi: "उच्च गति इंटरनेट, अध्ययन कक्ष और पौष्टिक भोजन कक्ष के साथ आधुनिक छात्र छात्रावास।",
      link: "hostel.html#aryabhatta"
    },
    {
      id: "malviya",
      title_en: "Malviya Boys Hostel",
      title_hi: "मालवीय छात्रावास",
      category_en: "Student Accommodation",
      category_hi: "छात्र आवास",
      src: "assets/malviya.jpeg",
      location: "North Residential Sector",
      access: "Undergraduate & Postgraduates",
      desc_en: "Spacious residential complex equipped with indoor games, TV lounges, reading rooms, laundry facilities, and 24-hour campus security for undergraduate students.",
      desc_hi: "इनडोर खेल, टीवी लाउंज और 24-घंटे सुरक्षा से सुसज्जित विशाल आवासीय परिसर।",
      link: "hostel.html#malviya"
    },
    {
      id: "panorama",
      title_en: "300-Acre Eco-Friendly Campus Panorama",
      title_hi: "300-एकड़ हरित परिसर विहंगम दृश्य",
      category_en: "Campus Environment",
      category_hi: "परिसर वातावरण",
      src: "assets/images/admin_good.jpeg",
      location: "CUSB Panchanpur, Gaya",
      access: "Zero-discharge Green Campus",
      desc_en: "Panoramic view of CUSB's award-winning green campus equipped with rooftop solar power plants, rainwater harvesting reservoirs, sewage treatment plants, and lush botanical gardens.",
      desc_hi: "सौर ऊर्जा, वर्षा जल संचयन और हरित उद्यानों से सुसज्जित सीयूएसबी का विहंगम हरित परिसर।",
      link: "about.html"
    },
    {
      id: "student-lounge",
      title_en: "Student Activity Center & Lounge",
      title_hi: "छात्र गतिविधि केंद्र और लाउंज",
      category_en: "Campus Life",
      category_hi: "परिसर जीवन",
      src: "assets/images/hostel-boys-common.jpg",
      location: "Student Activity Complex",
      access: "All Registered Students",
      desc_en: "Vibrant student lounge offering indoor recreation facilities, table tennis, chess tables, music practice zones, club meeting hubs, and collaborative study corners.",
      desc_hi: "इनडोर खेल, संगीत अभ्यास क्षेत्रों और समूह अध्ययन कोनों वाला जीवंत छात्र लाउंज।",
      link: "students.html"
    }
  ];

  const row2Items = [
    {
      id: "library",
      title_en: "Central Library & Digital Reading Hall",
      title_hi: "केंद्रीय पुस्तकालय और डिजिटल वाचन कक्ष",
      category_en: "Learning Resources",
      category_hi: "अध्ययन संसाधन",
      src: "assets/images/libimg.avif",
      location: "Central Library Building",
      access: "50,000+ Print & Electronic Titles",
      desc_en: "Fully automated library equipped with RFID self-issue counters, access to National Digital Library, e-ShodhSindhu e-journals, 200+ reading seats, and quiet research cubicles.",
      desc_hi: "50,000+ पुस्तकों, ई-संसाधनों और 200+ पठन सीटों वाला पूर्णतः स्वचालित केंद्रीय पुस्तकालय।",
      link: "library.html"
    },
    {
      id: "auditorium",
      title_en: "University Central Auditorium",
      title_hi: "विश्वविद्यालय केंद्रीय सभागार",
      category_en: "Cultural & Academic Events",
      category_hi: "सांस्कृतिक और अकादमिक कार्यक्रम",
      src: "assets/images/audimg.jpg",
      location: "Administrative & Cultural Block",
      access: "500+ Seating Capacity",
      desc_en: "Air-conditioned 500-seat acoustic auditorium hosting convocations, national academic symposia, cultural festivals, theatrical performances, and guest lectures.",
      desc_hi: "दीक्षांत समारोह, राष्ट्रीय सम्मेलनों और सांस्कृतिक उत्सवों के लिए 500-सीटों वाला केंद्रीय सभागार।",
      link: "facilities.html#auditorium"
    },
    {
      id: "cs-lab",
      title_en: "High-Performance Computer Science GPU Lab",
      title_hi: "उच्च-प्रदर्शन कंप्यूटर साइंस जीपीयू लैब",
      category_en: "Technology & Computing",
      category_hi: "प्रौद्योगिकी और कंप्यूटिंग",
      src: "assets/images/cs_lab.jpg",
      location: "Aryabhatta Academic Block B",
      access: "NVIDIA Workstations & AI Tech",
      desc_en: "Advanced computing center fitted with high-end NVIDIA GPU workstations, Linux server clusters, AI/Machine Learning development suites, and high-bandwidth fiber connections.",
      desc_hi: "एनवीडिया जीपीयू वर्कस्टेशन, एआई/मशीन लर्निंग डेवलपमेंट टूल और हाई-स्पीड नेटवर्क से सुसज्जित लैब।",
      link: "cs.html"
    },
    {
      id: "smart-classroom",
      title_en: "Interactive Smart Classroom",
      title_hi: "इंटरैक्टिव स्मार्ट क्लासरूम",
      category_en: "Academic Technology",
      category_hi: "अकादमिक तकनीक",
      src: "assets/images/2013.jpg",
      location: "All Departmental Lecture Halls",
      access: "Smartboards & Dual Projectors",
      desc_en: "Digitally enhanced classroom with interactive touch displays, wireless screen casting, ceiling-array microphones, and lecture recording systems for hybrid learning.",
      desc_hi: "स्मार्ट बोर्ड, वायरलेस स्क्रीन कास्टिंग और हाइब्रिड लर्निंग सुविधाओं वाले डिजिटल व्याख्यान कक्ष।",
      link: "courses.html"
    },
    {
      id: "gargi",
      title_en: "Gargi Sadan Girls Hostel",
      title_hi: "गार्गी सदन छात्रावास",
      category_en: "Female Student Accommodation",
      category_hi: "छात्रा आवास",
      src: "assets/images/gargi sadan.jpg",
      location: "South Residential Sector",
      access: "24/7 Security & Female Warden",
      desc_en: "Secure residential building for female undergraduate and postgraduate students, equipped with biometric security access, reading hall, courtyard garden, and mess.",
      desc_hi: "बायोमेट्रिक सुरक्षा, वाचन कक्ष और पौष्टिक मेस के साथ छात्राओं के लिए सुरक्षित आवासीय भवन।",
      link: "hostel.html#gargi"
    },
    {
      id: "open-gym",
      title_en: "Outdoor Open Gymnasium",
      title_hi: "ओपन जिम सुविधा",
      category_en: "Health & Physical Wellness",
      category_hi: "स्वास्थ्य और फिटनेस",
      src: "assets/images/opengym.jpeg",
      location: "Campus Garden & Park",
      access: "All Campus Residents",
      desc_en: "Weather-resistant outdoor exercise machines installed in landscaped gardens, offering students and staff calisthenics equipment for morning workouts.",
      desc_hi: "छात्रों और कर्मचारियों के लिए परिसर के उद्यानों में स्थापित ऑल-वेदर आउटडोर फिटनेस उपकरण।",
      link: "sports.html#gym"
    },
    {
      id: "admin-block",
      title_en: "Administrative Building & VC Secretariat",
      title_hi: "प्रशासनिक भवन और कुलपति सचिवालय",
      category_en: "University Governance",
      category_hi: "विश्वविद्यालय प्रशासन",
      src: "assets/images/admin.jpeg",
      location: "Main Campus Plaza",
      access: "Administrative Divisions",
      desc_en: "Nodal center for university governance containing the Vice-Chancellor's Secretariat, Office of the Registrar, Controller of Examinations, and Finance Office.",
      desc_hi: "कुलपति कार्यालय, कुलसचिव कार्यालय, परीक्षा नियंत्रक और वित्त विभाग का केंद्रीय प्रशासनिक भवन।",
      link: "leaders.html"
    }
  ];

  // Merge live custom gallery items added via Admin Panel
  const storedGallery = localStorage.getItem('cusb_gallery');
  if (storedGallery) {
    try {
      const customGallery = JSON.parse(storedGallery);
      if (customGallery && customGallery.length > 0) {
        customGallery.forEach((item, idx) => {
          const gObj = {
            id: 'cusb-custom-g-' + (item.id || idx),
            title_en: item.title_en || item.titleEn || "Campus View",
            title_hi: item.title_hi || item.titleHi || item.title_en || "परिसर दृश्य",
            category_en: item.category_en || 'Campus Landmark',
            category_hi: item.category_hi || 'परिसर लैंडमार्क',
            src: item.image_url || item.src || 'assets/images/blockB.jpg',
            location: 'CUSB Panchanpur Campus',
            access: 'Students & Visitors',
            desc_en: item.desc_en || item.title_en || "CUSB Campus Landmark",
            desc_hi: item.desc_hi || item.title_hi || item.title_en || "सीयूएसबी परिसर",
            link: 'facilities.html'
          };
          if (idx % 2 === 0) row1Items.unshift(gObj);
          else row2Items.unshift(gObj);
        });
      }
    } catch(e) {}
  }

  // Function to create a gallery card element
  const createCard = (item) => {
    const lang = localStorage.getItem('cusb-lang') || 'en';
    const card = document.createElement('div');
    card.className = 'gallery-ticker-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details about ${item.title_en}`);

    const isHi = lang === 'hi';
    const title = isHi ? item.title_hi : item.title_en;
    const category = isHi ? item.category_hi : item.category_en;

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title_en}" loading="lazy" onerror="this.src='assets/images/audimg.jpg'">
      <div class="gallery-ticker-overlay">
        <span class="gallery-card-category" data-en="${item.category_en}" data-hi="${item.category_hi}">${category}</span>
        <h3 class="gallery-card-title" data-en="${item.title_en}" data-hi="${item.title_hi}">${title}</h3>
        <span class="gallery-card-click-hint"><span>🔍</span> <span data-en="Click for details" data-hi="विवरण के लिए क्लिक करें">Click for details</span></span>
      </div>
    `;

    card.addEventListener('click', () => {
      if (hasGalleryDragged) {
        hasGalleryDragged = false;
        return;
      }
      openGalleryDetailModal(item);
    });
    return card;
  };

  // Render 2 duplicate sets into Row 1 and Row 2 for smooth infinite loop
  row1Track.innerHTML = '';
  row1Items.forEach(item => row1Track.appendChild(createCard(item)));
  row1Items.forEach(item => row1Track.appendChild(createCard(item)));

  row2Track.innerHTML = '';
  row2Items.forEach(item => row2Track.appendChild(createCard(item)));
  row2Items.forEach(item => row2Track.appendChild(createCard(item)));

  let isMoving = true;
  let isDragging = false;
  let hasGalleryDragged = false;
  let startX = 0;
  let startPos1 = 0;
  let startPos2 = 0;
  let animId = null;

  const getHalf1 = () => row1Track.scrollWidth / 2 || 1;
  const getHalf2 = () => row2Track.scrollWidth / 2 || 1;

  // Hardware accelerated motion coordinates
  let pos1 = -getHalf1();
  let speed1 = 0.85; // Row 1: Left to Right!

  let pos2 = 0;
  let speed2 = -0.85; // Row 2: Right to Left!

  const renderPositions = () => {
    const half1 = getHalf1();
    while (pos1 >= 0) pos1 -= half1;
    while (pos1 < -half1) pos1 += half1;
    row1Track.style.transform = `translate3d(${pos1}px, 0, 0)`;

    const half2 = getHalf2();
    while (pos2 <= -half2) pos2 += half2;
    while (pos2 > 0) pos2 -= half2;
    row2Track.style.transform = `translate3d(${pos2}px, 0, 0)`;
  };

  const animate = () => {
    if (isMoving && !isDragging) {
      pos1 += speed1;
      pos2 += speed2;
      renderPositions();
    }
    animId = requestAnimationFrame(animate);
  };

  animId = requestAnimationFrame(animate);

  // Pause movement on hover
  wrapper.addEventListener('mouseenter', () => { if (!isDragging) isMoving = false; });
  wrapper.addEventListener('mouseleave', () => { if (!isDragging) isMoving = true; });

  // Manual Drag (Touch & Mouse)
  const onDragStart = (clientX) => {
    isDragging = true;
    isMoving = false;
    startX = clientX;
    startPos1 = pos1;
    startPos2 = pos2;
    hasGalleryDragged = false;
    wrapper.style.cursor = 'grabbing';
  };

  const onDragMove = (clientX) => {
    if (!isDragging) return;
    const delta = clientX - startX;
    if (Math.abs(delta) > 5) {
      hasGalleryDragged = true;
    }
    pos1 = startPos1 + delta;
    pos2 = startPos2 - delta;
    renderPositions();
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = '';
    setTimeout(() => {
      isMoving = true;
    }, 100);
  };

  // Mouse drag events
  wrapper.addEventListener('mousedown', (e) => {
    onDragStart(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      onDragMove(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    onDragEnd();
  });

  // Touch drag events
  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      onDragStart(e.touches[0].clientX);
    }
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches[0]) {
      onDragMove(e.touches[0].clientX);
    }
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    onDragEnd();
  });

  // Mouse wheel horizontal scroll
  wrapper.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      isMoving = false;
      const delta = (e.deltaX || e.deltaY) * 0.8;
      pos1 -= delta;
      pos2 += delta;
      renderPositions();
      clearTimeout(wrapper._wheelTimer);
      wrapper._wheelTimer = setTimeout(() => { isMoving = true; }, 300);
    }
  }, { passive: false });

  // Manual Control Buttons
  const prevBtn = document.getElementById('prevGalleryBtn');
  const pauseBtn = document.getElementById('pauseGalleryBtn');
  const nextBtn = document.getElementById('nextGalleryBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      pos1 += 280;
      pos2 -= 280;
      renderPositions();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      pos1 -= 280;
      pos2 += 280;
      renderPositions();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isMoving = !isMoving;
      pauseBtn.textContent = isMoving ? '⏸' : '▶';
      pauseBtn.title = isMoving ? 'Pause Auto Motion' : 'Play Auto Motion';
    });
  }
}

// Open Detailed Gallery Information Modal
function openGalleryDetailModal(item) {
  let modal = document.getElementById('galleryDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'search-overlay';
    modal.id = 'galleryDetailModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="search-modal gallery-detail-modal" style="max-width: 650px;">
        <div class="search-modal-header">
          <div class="search-modal-title">
            <span style="color:var(--acc-navy); display:inline-flex; align-items:center;">🏛️</span>
            <span id="galleryModalCategory">Campus Detail</span>
          </div>
          <div class="search-modal-close-row">
            <span class="search-esc-tag">ESC</span>
            <button class="search-modal-close" id="closeGalleryModalBtn" aria-label="Close modal">✕</button>
          </div>
        </div>
        <div class="search-modal-body gallery-modal-body">
          <div class="gallery-modal-media">
            <img id="galleryModalImg" src="" alt="">
            <div id="galleryModalTag" class="gallery-modal-tag">Central Campus</div>
          </div>
          <div class="gallery-modal-info">
            <h3 id="galleryModalTitle" class="gallery-modal-title">Title Here</h3>
            <p id="galleryModalDesc" class="gallery-modal-desc">Detailed information...</p>
            
            <div class="gallery-modal-specs">
              <div class="spec-item">
                <span class="spec-label" data-en="Location" data-hi="स्थान">Location:</span>
                <span id="galleryModalLoc" class="spec-val">CUSB Gaya Campus</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" data-en="Category" data-hi="श्रेणी">Category:</span>
                <span id="galleryModalCatVal" class="spec-val">Academic Facility</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" data-en="Access & Features" data-hi="पहुँच और विशेषताएँ">Access & Features:</span>
                <span id="galleryModalAccess" class="spec-val">Students & Faculty</span>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; margin-top:10px;">
              <a id="galleryModalLink" href="facilities.html" class="btn-gallery-explore" data-en="Explore Full Page →" data-hi="पूरा पृष्ठ देखें →">Explore Full Page →</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('closeGalleryModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  const lang = localStorage.getItem('cusb-lang') || 'en';
  const isHi = lang === 'hi';

  const catEl = document.getElementById('galleryModalCategory');
  if (catEl) {
    catEl.textContent = isHi ? item.category_hi : item.category_en;
    catEl.setAttribute('data-en', item.category_en);
    catEl.setAttribute('data-hi', item.category_hi);
  }

  const tagEl = document.getElementById('galleryModalTag');
  if (tagEl) {
    tagEl.textContent = isHi ? item.category_hi : item.category_en;
    tagEl.setAttribute('data-en', item.category_en);
    tagEl.setAttribute('data-hi', item.category_hi);
  }

  const imgEl = document.getElementById('galleryModalImg');
  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.title_en;
  }

  const titleEl = document.getElementById('galleryModalTitle');
  if (titleEl) {
    titleEl.textContent = isHi ? item.title_hi : item.title_en;
    titleEl.setAttribute('data-en', item.title_en);
    titleEl.setAttribute('data-hi', item.title_hi);
  }

  const descEl = document.getElementById('galleryModalDesc');
  if (descEl) {
    descEl.textContent = isHi ? item.desc_hi : item.desc_en;
    descEl.setAttribute('data-en', item.desc_en);
    descEl.setAttribute('data-hi', item.desc_hi);
  }

  document.getElementById('galleryModalLoc').textContent = item.location || 'CUSB Gaya Campus';

  const catValEl = document.getElementById('galleryModalCatVal');
  if (catValEl) {
    catValEl.textContent = isHi ? item.category_hi : item.category_en;
    catValEl.setAttribute('data-en', item.category_en);
    catValEl.setAttribute('data-hi', item.category_hi);
  }
  document.getElementById('galleryModalAccess').textContent = item.access || 'Students & Staff';
  
  const linkEl = document.getElementById('galleryModalLink');
  if (linkEl) {
    linkEl.href = item.link || 'facilities.html';
  }

  modal.classList.add('active');
}

/* ==========================================================================
   17. AUTO-MOVING NEWS SLIDER (RIGHT TO LEFT) & INTERACTIVE NEWS MODAL
   ========================================================================== */
function initNewsTicker() {
  const track = document.getElementById('newsTickerTrack');
  const wrapper = document.getElementById('newsTickerWrapper');
  if (!track || !wrapper) return;

  const cusbNewsItems = [
    {
      id: "news-pg-admissions",
      title_en: "CUSB Admission Bulletin 2026 Released for PG Programs",
      title_hi: "पीजी कार्यक्रमों के लिए सीयूएसबी प्रवेश बुलेटिन 2026 जारी",
      category_en: "CUET PG Admissions",
      category_hi: "सीयूईटी पीजी प्रवेश",
      date: "10 MAR 2026",
      publisher: "Central Admission Cell, CUSB",
      src: "assets/images/blockB.jpg",
      desc_en: "Central University of South Bihar has officially released the admission prospectus and application guidelines for 28 Postgraduate Degree (MA, MSc, MTech, LLM, MPharm, MEd) programs for Academic Session 2026-27 through CUET PG 2026 scores.",
      desc_hi: "दक्षिण बिहार केंद्रीय विश्वविद्यालय ने सीयूईटी पीजी 2026 के माध्यम से शैक्षणिक सत्र 2026-27 के लिए 28 स्नातकोत्तर पाठ्यक्रमों का प्रवेश बुलेटिन जारी किया है।",
      link: "admissions.html"
    },
    {
      id: "news-non-teaching-recruitment",
      title_en: "Recruitment Notification Issued for Non-Teaching Posts",
      title_hi: "गैर-शिक्षण पदों के लिए भर्ती अधिसूचना जारी",
      category_en: "Careers & Jobs",
      category_hi: "करियर और नौकरियां",
      date: "02 MAR 2026",
      publisher: "Recruitment Cell, Registrar Office",
      src: "assets/images/admin_good.jpeg",
      desc_en: "Applications are invited from eligible candidates for administrative and technical non-teaching positions including Section Officer, Assistant Registrar, Senior Technical Assistant, and System Analyst at CUSB Gaya campus.",
      desc_hi: "सीयूएसबी गया परिसर में अनुभाग अधिकारी, सहायक कुलसचिव और वरिष्ठ तकनीकी सहायक सहित गैर-शिक्षण पदों के लिए ऑनलाइन आवेदन आमंत्रित किए जाते हैं।",
      link: "careers.html"
    },
    {
      id: "news-web-competition",
      title_en: "National Hackathon & Website Development Competition",
      title_hi: "वेबसाइट विकास और राष्ट्रीय हैकाथॉन प्रतियोगिता",
      category_en: "Student Innovation",
      category_hi: "छात्र नवाचार",
      date: "14 FEB 2026",
      publisher: "Department of Computer Science",
      src: "assets/images/cs_lab.jpg",
      desc_en: "CUSB Department of Computer Science is hosting a 24-hour National Student Hackathon on 'Smart Web & AI Interface Design'. Cash prizes worth ₹50,000 to be awarded to top winning teams.",
      desc_hi: "कंप्यूटर विज्ञान विभाग द्वारा 'स्मार्ट वेब और एआई इंटरफेस डिजाइन' पर 24 घंटे की राष्ट्रीय छात्र हैकाथॉन का आयोजन किया जा रहा है।",
      link: "cs.html"
    },
    {
      id: "news-research-grant",
      title_en: "CUSB Faculty Secures ₹1.2 Crore DST-SERB Research Grant",
      title_hi: "सीयूएसबी संकाय को ₹1.2 करोड़ का डीएसटी-एसईआरबी शोध अनुदान मिला",
      category_en: "Research & Development",
      category_hi: "अनुसंधान एवं विकास",
      date: "28 JAN 2026",
      publisher: "Dean Research & Development Cell",
      src: "assets/images/audimg.jpg",
      desc_en: "School of Physical Sciences and Bioinformatics team awarded a prestigious major research grant from DST-SERB for advanced quantum materials simulation and molecular docking studies.",
      desc_hi: "भौतिक विज्ञान और बायोइनफॉर्मेटिक्स संकाय को क्वांटम सामग्री सिमुलेशन और आणविक अध्ययन के लिए डीएसटी-एसईआरबी से प्रमुख शोध अनुदान स्वीकृत हुआ।",
      link: "research.html"
    },
    {
      id: "news-naac-accreditation",
      title_en: "NAAC Peer Team Awards CUSB Highest Institutional Grade",
      title_hi: "नेक पीयर टीम ने सीयूएसबी को सर्वोच्च संस्थागत ग्रेड प्रदान किया",
      category_en: "Institutional Excellence",
      category_hi: "संस्थागत उत्कृष्टता",
      date: "15 JAN 2026",
      publisher: "IQAC Cell, CUSB",
      src: "assets/drone.png",
      desc_en: "National Assessment and Accreditation Council (NAAC) has awarded Central University of South Bihar top institutional accreditation rating recognizing excellence in teaching, research, and campus infrastructure.",
      desc_hi: "राष्ट्रीय मूल्यांकन एवं प्रत्यायन परिषद (NAAC) ने अध्यापन, अनुसंधान और बुनियादी ढांचे में उत्कृष्टता को पहचानते हुए सीयूएसबी को शीर्ष ग्रेड प्रदान किया।",
      link: "about.html"
    },
    {
      id: "news-sports-meet",
      title_en: "CUSB Inter-Department Athletics Meet & Sports Carnival 2026",
      title_hi: "सीयूएसबी अंतर-विभागीय एथलेटिक्स मीट और खेल महोत्सव 2026",
      category_en: "Campus Sports",
      category_hi: "परिसर खेल",
      date: "05 JAN 2026",
      publisher: "Department of Physical Education",
      src: "assets/images/spoim.jpg",
      desc_en: "Over 800 student athletes competing across 18 track and field events, football, cricket, table tennis, and outdoor open gym championships at the University Sports Stadium.",
      desc_hi: "विश्वविद्यालय खेल स्टेडियम में 18 ट्रैक और फ़ील्ड प्रतियोगिताओं, फुटबॉल और टेबल टेनिस में 800 से अधिक छात्र एथलीट भाग ले रहे हैं।",
      link: "sports.html"
    }
  ];

  // Merge live announcements added via Admin Panel (filtering out expired ones)
  const storedAnn = localStorage.getItem('cusb_announcements');
  if (storedAnn) {
    try {
      const customItems = JSON.parse(storedAnn);
      const now = Date.now();
      customItems.reverse().forEach(cItem => {
        if (!cItem.expiry_timestamp || cItem.expiry_timestamp === 0 || cItem.expiry_timestamp > now) {
          cusbNewsItems.unshift({
            id: 'cusb-custom-' + cItem.id,
            title_en: cItem.title_en,
            title_hi: cItem.title_hi || cItem.title_en,
            category_en: cItem.type ? cItem.type.toUpperCase() : "CUSB Announcement",
            category_hi: cItem.type ? cItem.type.toUpperCase() : "सीयूएसबी घोषणा",
            date: cItem.date_str || "LATEST",
            publisher: "CUSB Administration",
            src: cItem.image_url || "assets/images/blockB.jpg",
            desc_en: cItem.desc_en,
            desc_hi: cItem.desc_hi || cItem.desc_en,
            link: "news-events.html"
          });
        }
      });
    } catch(e) {}
  }

  // Create news card element
  const createNewsCard = (item) => {
    const lang = localStorage.getItem('cusb-lang') || 'en';
    const card = document.createElement('div');
    card.className = 'news-ticker-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Read news about ${item.title_en}`);

    const isHi = lang === 'hi';
    const title = isHi ? item.title_hi : item.title_en;
    const category = isHi ? item.category_hi : item.category_en;
    const desc = isHi ? item.desc_hi : item.desc_en;

    card.innerHTML = `
      <div class="news-ticker-media">
        <img src="${item.src}" alt="${item.title_en}" loading="lazy" onerror="this.src='assets/images/audimg.jpg'">
        <div class="news-ticker-date-badge">${item.date}</div>
      </div>
      <div class="news-ticker-body">
        <span class="news-ticker-meta" data-en="${item.category_en}" data-hi="${item.category_hi}">${category}</span>
        <h3 class="news-ticker-title" data-en="${item.title_en}" data-hi="${item.title_hi}">${title}</h3>
        <p class="news-ticker-desc" data-en="${item.desc_en}" data-hi="${item.desc_hi}">${desc}</p>
        <span class="news-ticker-link"><span data-en="Read Full Story →" data-hi="पूरा विवरण पढ़ें →">Read Full Story →</span></span>
      </div>
    `;

    card.addEventListener('click', () => {
      if (hasNewsDragged) {
        hasNewsDragged = false;
        return;
      }
      openNewsDetailModal(item);
    });
    return card;
  };

  // Render 2 duplicate sets for infinite continuous loop
  track.innerHTML = '';
  cusbNewsItems.forEach(item => track.appendChild(createNewsCard(item)));
  cusbNewsItems.forEach(item => track.appendChild(createNewsCard(item)));

  // Continuous Right-to-Left Moving Animation & Manual Drag/Scroll
  let position = 0;
  let speed = -0.85; 
  let isMoving = true;
  let isDragging = false;
  let hasNewsDragged = false;
  let startX = 0;
  let startPos = 0;
  let animId = null;

  const getHalfWidth = () => track.scrollWidth / 2 || 1;

  const renderNewsPosition = () => {
    const halfWidth = getHalfWidth();
    while (position <= -halfWidth) position += halfWidth;
    while (position > 0) position -= halfWidth;
    track.style.transform = `translateX(${position}px)`;
  };

  const animate = () => {
    if (isMoving && !isDragging) {
      position += speed;
      renderNewsPosition();
    }
    animId = requestAnimationFrame(animate);
  };

  animId = requestAnimationFrame(animate);

  // Pause movement on mouse hover
  wrapper.addEventListener('mouseenter', () => { if (!isDragging) isMoving = false; });
  wrapper.addEventListener('mouseleave', () => { if (!isDragging) isMoving = true; });

  // Manual Drag (Touch & Mouse)
  const onDragStart = (clientX) => {
    isDragging = true;
    isMoving = false;
    startX = clientX;
    startPos = position;
    hasNewsDragged = false;
    wrapper.style.cursor = 'grabbing';
  };

  const onDragMove = (clientX) => {
    if (!isDragging) return;
    const delta = clientX - startX;
    if (Math.abs(delta) > 5) {
      hasNewsDragged = true;
    }
    position = startPos + delta;
    renderNewsPosition();
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = '';
    setTimeout(() => {
      isMoving = true;
    }, 100);
  };

  // Mouse drag events
  wrapper.addEventListener('mousedown', (e) => {
    onDragStart(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      onDragMove(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    onDragEnd();
  });

  // Touch drag events
  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      onDragStart(e.touches[0].clientX);
    }
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches[0]) {
      onDragMove(e.touches[0].clientX);
    }
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    onDragEnd();
  });

  // Mouse wheel horizontal scroll
  wrapper.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      isMoving = false;
      const delta = (e.deltaX || e.deltaY) * 0.8;
      position -= delta;
      renderNewsPosition();
      clearTimeout(wrapper._wheelTimer);
      wrapper._wheelTimer = setTimeout(() => { isMoving = true; }, 300);
    }
  }, { passive: false });

  // Manual Control Buttons
  const prevBtn = document.getElementById('prevNewsBtn');
  const pauseBtn = document.getElementById('pauseNewsBtn');
  const nextBtn = document.getElementById('nextNewsBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      position += 320;
      renderNewsPosition();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      position -= 320;
      renderNewsPosition();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isMoving = !isMoving;
      pauseBtn.textContent = isMoving ? '⏸' : '▶';
      pauseBtn.title = isMoving ? 'Pause Auto Motion' : 'Play Auto Motion';
    });
  }
}

// Open Detailed News Information Modal
function openNewsDetailModal(item) {
  let modal = document.getElementById('newsDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'search-overlay';
    modal.id = 'newsDetailModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="search-modal news-detail-modal" style="max-width: 660px;">
        <div class="search-modal-header">
          <div class="search-modal-title">
            <span style="color:var(--acc-navy); display:inline-flex; align-items:center;">📰</span>
            <span id="newsModalCategory">University News</span>
          </div>
          <div class="search-modal-close-row">
            <span class="search-esc-tag">ESC</span>
            <button class="search-modal-close" id="closeNewsModalBtn" aria-label="Close modal">✕</button>
          </div>
        </div>
        <div class="search-modal-body gallery-modal-body">
          <div class="gallery-modal-media">
            <img id="newsModalImg" src="" alt="">
            <div id="newsModalDate" class="gallery-modal-tag">10 MAR 2026</div>
          </div>
          <div class="gallery-modal-info">
            <h3 id="newsModalTitle" class="gallery-modal-title">Title Here</h3>
            <p id="newsModalDesc" class="gallery-modal-desc">Detailed story...</p>
            
            <div class="gallery-modal-specs">
              <div class="spec-item">
                <span class="spec-label" data-en="Published By" data-hi="प्रकाशक">Published By:</span>
                <span id="newsModalPublisher" class="spec-val">CUSB Central Office</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" data-en="Category" data-hi="श्रेणी">Category:</span>
                <span id="newsModalCatVal" class="spec-val">Official Announcement</span>
              </div>
              <div class="spec-item">
                <span class="spec-label" data-en="Publication Date" data-hi="प्रकाशन तिथि">Publication Date:</span>
                <span id="newsModalDateVal" class="spec-val">2026</span>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; margin-top:10px;">
              <a id="newsModalLink" href="news-events.html" class="btn-gallery-explore" data-en="Read Full Story on News Portal →" data-hi="समाचार पोर्टल पर पूरा विवरण पढ़ें →">Read Full Story on News Portal →</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('closeNewsModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  const lang = localStorage.getItem('cusb-lang') || 'en';
  const isHi = lang === 'hi';

  const catEl = document.getElementById('newsModalCategory');
  if (catEl) {
    catEl.textContent = isHi ? item.category_hi : item.category_en;
    catEl.setAttribute('data-en', item.category_en);
    catEl.setAttribute('data-hi', item.category_hi);
  }

  document.getElementById('newsModalDate').textContent = item.date || '2026';

  const imgEl = document.getElementById('newsModalImg');
  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.title_en;
  }

  const titleEl = document.getElementById('newsModalTitle');
  if (titleEl) {
    titleEl.textContent = isHi ? item.title_hi : item.title_en;
    titleEl.setAttribute('data-en', item.title_en);
    titleEl.setAttribute('data-hi', item.title_hi);
  }

  const descEl = document.getElementById('newsModalDesc');
  if (descEl) {
    descEl.textContent = isHi ? item.desc_hi : item.desc_en;
    descEl.setAttribute('data-en', item.desc_en);
    descEl.setAttribute('data-hi', item.desc_hi);
  }

  document.getElementById('newsModalPublisher').textContent = item.publisher || 'CUSB Press Office';

  const catValEl = document.getElementById('newsModalCatVal');
  if (catValEl) {
    catValEl.textContent = isHi ? item.category_hi : item.category_en;
    catValEl.setAttribute('data-en', item.category_en);
    catValEl.setAttribute('data-hi', item.category_hi);
  }
  document.getElementById('newsModalDateVal').textContent = item.date || '2026';
  
  const linkEl = document.getElementById('newsModalLink');
  if (linkEl) {
    linkEl.href = item.link || 'news-events.html';
  }

  modal.classList.add('active');
}

/* ==========================================================================
   17. UNIVERSAL CURSOR DRAG & MOBILE TOUCH GESTURE SCROLLER FOR CARDS & FLOATING WIDGETS
   ========================================================================== */
function enableDragToScroll(el) {
  if (!el) return;
  let isDown = false;
  let startX;
  let scrollLeft;

  el.style.cursor = 'grab';

  el.addEventListener('mousedown', (e) => {
    if (['INPUT', 'BUTTON', 'A', 'TEXTAREA'].includes(e.target.tagName)) return;
    isDown = true;
    el.style.cursor = 'grabbing';
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener('mouseleave', () => {
    isDown = false;
    el.style.cursor = 'grab';
  });

  el.addEventListener('mouseup', () => {
    isDown = false;
    el.style.cursor = 'grab';
  });

  el.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 2;
    el.scrollLeft = scrollLeft - walk;
  });

  // Mobile Touch Gestures
  let touchStartX = 0;
  let touchScrollLeft = 0;

  el.addEventListener('touchstart', (e) => {
    if (['INPUT', 'BUTTON', 'A', 'TEXTAREA'].includes(e.target.tagName)) return;
    touchStartX = e.touches[0].pageX - el.offsetLeft;
    touchScrollLeft = el.scrollLeft;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - touchStartX) * 1.5;
    el.scrollLeft = touchScrollLeft - walk;
  }, { passive: true });
}

function makeElementDraggable(el, handleEl) {
  if (!el) return;
  const handle = handleEl || el;
  let posX = 0, posY = 0, initialX = 0, initialY = 0;

  handle.style.cursor = 'grab';

  handle.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    if (['INPUT', 'BUTTON', 'TEXTAREA', 'A'].includes(e.target.tagName)) return;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseup', closeDragElement);
  }

  function elementDrag(e) {
    e.preventDefault();
    posX = initialX - e.clientX;
    posY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    el.style.top = Math.max(10, Math.min(window.innerHeight - 80, el.offsetTop - posY)) + "px";
    el.style.left = Math.max(10, Math.min(window.innerWidth - 80, el.offsetLeft - posX)) + "px";
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.position = "fixed";
  }

  function closeDragElement() {
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseup', closeDragElement);
  }

  // Touch drag for phone & tablet
  handle.addEventListener('touchstart', touchStart, { passive: false });

  function touchStart(e) {
    if (['INPUT', 'BUTTON', 'TEXTAREA', 'A'].includes(e.target.tagName)) return;
    const touch = e.touches[0];
    initialX = touch.clientX;
    initialY = touch.clientY;
    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', touchEnd);
  }

  function touchMove(e) {
    const touch = e.touches[0];
    posX = initialX - touch.clientX;
    posY = initialY - touch.clientY;
    initialX = touch.clientX;
    initialY = touch.clientY;
    el.style.top = Math.max(10, Math.min(window.innerHeight - 80, el.offsetTop - posY)) + "px";
    el.style.left = Math.max(10, Math.min(window.innerWidth - 80, el.offsetLeft - posX)) + "px";
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.position = "fixed";
  }

  function touchEnd() {
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', touchEnd);
  }
}

// Attach Drag & Touch Scrollers Across Site
document.addEventListener('DOMContentLoaded', () => {
  const scrollContainers = [
    'galleryRow1Track', 'galleryRow2Track', 'galleryTickerWrapper', 'newsTickerTrack',
    'newsGrid', 'eventsGrid', 'galleryGrid', 'kpiGrid'
  ];

  scrollContainers.forEach(id => {
    const el = document.getElementById(id);
    if (el) enableDragToScroll(el);
  });

  document.querySelectorAll('.news-grid, .events-grid, .gallery-grid-pastel, .kpi-row-grid, .table-responsive').forEach(el => {
    enableDragToScroll(el);
  });

  // Make Chatbot Floating Button & Window Draggable
  setTimeout(() => {
    const chatbotHost = document.querySelector('cusb-chatbot');
    if (chatbotHost && chatbotHost.shadowRoot) {
      const chatBtn = chatbotHost.shadowRoot.querySelector('.chatbot-toggle');
      const chatWin = chatbotHost.shadowRoot.querySelector('.chatbot-container');
      if (chatBtn) makeElementDraggable(chatBtn);
      if (chatWin) makeElementDraggable(chatWin, chatWin.querySelector('.chatbot-header'));
    }
  }, 1000);
});
