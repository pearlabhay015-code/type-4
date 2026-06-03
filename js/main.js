/**
 * CUSB WEBSITE - MAIN INTERACTIVE LOGIC
 * Handles: Bilingual Translation, Site Search Engine, Font Scaling, Theme Switching, and Mobile Menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize custom components and attach event handlers
  initTheme();
  initFontSize();
  initLanguage();
  initSearch();
  initMobileNav();
  initTranslateOffsetWatcher();
  if (window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(document);
});

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
    if (currentSize < 22) {
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
   3. LANGUAGE CONVERTER
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
  setLanguage(savedLang, { skipGoogle: true });

  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  }

  loadGoogleTranslate();
  watchGoogleTranslateReset();
}

function setLanguage(lang, options = {}) {
  localStorage.setItem('cusb-lang', lang);
  const manualLang = lang === 'en' || lang === 'hi';
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang);
  
  if (manualLang) {
    // Scan DOM for fast, hand-authored English/Hindi text content.
    const elements = document.querySelectorAll('[data-en], [data-hi]');
    elements.forEach(el => el.classList.add('text-fade-out'));
    window.setTimeout(() => {
      elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
          if (text.includes('<') && text.includes('>')) {
            el.innerHTML = text;
          } else {
            el.textContent = text;
          }
        }
        el.classList.remove('text-fade-out');
      });

      if (window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(document);
    }, 120);
  }

  if (!manualLang && window.cusbReplaceEmojiIcons) window.cusbReplaceEmojiIcons(document);

  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect && languageSelect.value !== lang) {
    languageSelect.value = lang;
  }

  if (!options.skipGoogle) {
    if (manualLang) {
      resetGoogleTranslate();
    } else {
      applyGoogleTranslate(lang);
    }
  }
}

function loadGoogleTranslate() {
  if (!document.getElementById('google_translate_element')) {
    const widget = document.createElement('div');
    widget.id = 'google_translate_element';
    widget.setAttribute('aria-hidden', 'true');
    document.body.appendChild(widget);
  }

  window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: googleTranslateLanguages.join(','),
      autoDisplay: false
    }, 'google_translate_element');

    const storedLang = localStorage.getItem('cusb-lang') || 'en';
    const savedLang = googleTranslateLanguages.includes(storedLang) ? storedLang : 'en';
    if (savedLang !== 'en' && savedLang !== 'hi') {
      applyGoogleTranslate(savedLang);
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
    if (attempt < 20) {
      setTimeout(() => applyGoogleTranslate(lang, attempt + 1), 250);
    }
    return;
  }

  combo.value = lang;
  combo.dispatchEvent(new Event('change'));
}

function resetGoogleTranslate() {
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  if (window.location.hostname) {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
  }

  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = '';
    combo.dispatchEvent(new Event('change'));
  }
}

function watchGoogleTranslateReset() {
  setInterval(() => {
    const selectedLang = localStorage.getItem('cusb-lang') || 'en';
    if (selectedLang === 'en' || selectedLang === 'hi') return;

    const combo = document.querySelector('.goog-te-combo');
    if (!combo) return;

    if (!combo.value || combo.value === 'en') {
      localStorage.setItem('cusb-lang', 'en');
      document.documentElement.setAttribute('lang', 'en');
      const languageSelect = document.getElementById('languageSelect');
      if (languageSelect) languageSelect.value = 'en';
    }
  }, 1000);
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
  const searchInput = document.getElementById('siteSearchInput');
  const searchBtn = document.getElementById('siteSearchBtn');
  
  if (!searchInput || !searchBtn) return;

  // Create Search Modal Dynamically if it doesn't exist
  if (!document.getElementById('siteSearchOverlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'siteSearchOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search Website Results');
    
    overlay.innerHTML = `
      <div class="search-modal">
        <div class="search-modal-header">
          <span class="search-modal-title" data-en="CUSB Search Portal" data-hi="सीयूएसबी खोज पोर्टल">CUSB Search Portal</span>
          <button class="search-modal-close" id="closeSearchModalBtn" aria-label="Close search overlay">${window.cusbIconSvg ? window.cusbIconSvg('close') : 'Close'}</button>
        </div>
        <div class="search-modal-body">
          <input type="search" class="search-modal-input" id="modalSearchInput" placeholder="Type search keywords...">
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
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    
    // Attach input search listener inside modal
    const modalInput = document.getElementById('modalSearchInput');
    modalInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  // Trigger search modal on header input
  const openModal = () => {
    const overlay = document.getElementById('siteSearchOverlay');
    const modalInput = document.getElementById('modalSearchInput');
    overlay.classList.add('active');
    modalInput.value = searchInput.value;
    performSearch(modalInput.value);
    setTimeout(() => modalInput.focus(), 100);
  };

  searchBtn.addEventListener('click', openModal);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      openModal();
    }
  });
}

function performSearch(query) {
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

  const matches = searchIndex.filter(item => 
    item.title.toLowerCase().includes(trimmed) || 
    item.tags.toLowerCase().includes(trimmed) || 
    item.desc.toLowerCase().includes(trimmed)
  );

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
}

/* ==========================================================================
   5. MOBILE RESPONSIVE DRAWER & DROPDOWN NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggleBtn');
  const navMenu = document.getElementById('navbarMenu');
  
  if (!toggleBtn || !navMenu) return;

  const closeAllDropdowns = () => {
    navMenu.querySelectorAll('.navbar-item.active').forEach(item => item.classList.remove('active'));
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('is-open');
    toggleBtn.innerHTML = window.cusbIconSvg ? window.cusbIconSvg('menu') : 'Menu';
    navMenu.classList.remove('active');
    closeAllDropdowns();
  };

  const openMenu = () => {
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
      if (!wasActive) item.classList.add('active');
    });

    link.parentElement.addEventListener('mouseenter', () => {
      if (window.innerWidth > 991 && link.parentElement.querySelector('.megamenu')) {
        closeAllDropdowns();
        link.parentElement.classList.add('active');
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
    if (window.innerWidth > 991) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('is-open');
      toggleBtn.innerHTML = window.cusbIconSvg ? window.cusbIconSvg('menu') : 'Menu';
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. GOOGLE TRANSLATE FLOATING BAR OFFSET WATCHER
   ========================================================================== */
function initTranslateOffsetWatcher() {
  setInterval(() => {
    const iframe = document.querySelector('.goog-te-banner-frame');
    let offset = 0;
    
    // Check if the iframe exists and is visible (display !== none)
    if (iframe && iframe.style.display !== 'none' && window.getComputedStyle(iframe).display !== 'none') {
      offset = iframe.offsetHeight || 40; // Fallback to 40px
    }
    
    // Set the CSS variable on the root document
    document.documentElement.style.setProperty('--translate-offset', `${offset}px`);
  }, 250);
}
