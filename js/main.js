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
  initQuickLinksMenu();
  initChatbot();
  initScrollToTop();
  initTranslateOffsetWatcher();
  initDynamicContent();
  initEnquiryModal();
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
    const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
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

  const openChat = () => {
    windowEl.classList.add('active');
    windowEl.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (greeting) greeting.classList.add('hidden');
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendMessage(value, 'user');
    input.value = '';
    setTimeout(() => appendMessage(getBotReply(value), 'bot'), 350);
  });

  setTimeout(() => {
    if (greeting && !windowEl.classList.contains('active')) greeting.classList.add('hidden');
  }, 7000);
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
   7. GOOGLE TRANSLATE FLOATING BAR OFFSET WATCHER
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
  
  // 1. Fetch & Render Gallery
  const galleryContainer = document.querySelector('.gallery-grid-pastel');
  if (galleryContainer) {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const galleryList = await response.json();
        if (galleryList && galleryList.length > 0) {
          renderGallery(galleryList);
          galleryContainer.querySelectorAll('[data-en], [data-hi]').forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) el.textContent = text;
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  }

  // 2. Fetch & Render News / Events
  const newsContainer = document.querySelector('.news-grid');
  const eventsContainer = document.querySelector('.events-grid');
  if (newsContainer || eventsContainer) {
    try {
      const response = await fetch('/api/announcements');
      if (response.ok) {
        const announcements = await response.json();
        
        // Filter active news
        const newsList = announcements.filter(item => item.type.toLowerCase() === 'news');
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

        // Filter active events
        const eventsList = announcements.filter(item => item.type.toLowerCase() === 'event');
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
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
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

