/**
 * Central University of South Bihar — Upcoming Events Portal
 * Handles 60 official university events across 6 paginated subpages (10 per page).
 */
(() => {
  let allEvents = window.CUSB_UPCOMING_EVENTS_DATA || [];
  let currentPage = 1;
  const pageSize = 10;
  let currentCategory = 'all';
  let searchQuery = '';

  // Extract page from URL hash or param if present
  const parsePageFromUrl = () => {
    const hashMatch = window.location.hash.match(/page[=-](\d+)/i);
    if (hashMatch && hashMatch[1]) {
      const p = parseInt(hashMatch[1], 10);
      if (p >= 1 && p <= 6) return p;
    }
    const params = new URLSearchParams(window.location.search);
    const pParam = parseInt(params.get('page'), 10);
    if (pParam >= 1 && pParam <= 6) return pParam;
    return 1;
  };

  const getCategoryClass = (cat) => {
    const c = String(cat || '').toLowerCase();
    if (c.includes('seminar') || c.includes('conference')) return 'lab';
    if (c.includes('workshop') || c.includes('training')) return 'electrical';
    if (c.includes('foundation')) return 'civil';
    if (c.includes('faculty') || c.includes('fdp')) return 'chemicals';
    if (c.includes('cultural') || c.includes('sport')) return 'services';
    return '';
  };

  const extractEventDate = (title) => {
    const match = title.match(/\[([^\]]+)\]/) || title.match(/\(([^\)]+)\)/);
    return match ? match[1].trim() : null;
  };

  const getFilteredEvents = () => {
    return allEvents.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category && item.category.toLowerCase().includes(currentCategory.toLowerCase()));
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) || 
        item.publishedDate.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  };

  const renderPaginationControls = (totalPages, filteredCount) => {
    if (totalPages <= 1 && filteredCount <= pageSize) {
      return `
        <div class="tenders-pagination-container">
          <div class="tenders-page-counter">Showing all ${filteredCount} events</div>
        </div>
      `;
    }

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, filteredCount);

    let pageButtons = '';
    for (let i = 1; i <= totalPages; i++) {
      pageButtons += `
        <li>
          <button type="button" class="tenders-pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" title="Go to Page ${i}">
            ${i}
          </button>
        </li>
      `;
    }

    return `
      <div class="tenders-pagination-container">
        <ul class="tenders-pagination" aria-label="Events pagination navigation">
          <li>
            <button type="button" class="tenders-pagination-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="1" title="First Page">
              &laquo;
            </button>
          </li>
          <li>
            <button type="button" class="tenders-pagination-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}" title="Previous Page">
              &lsaquo;
            </button>
          </li>
          ${pageButtons}
          <li>
            <button type="button" class="tenders-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}" title="Next Page">
              &rsaquo;
            </button>
          </li>
          <li>
            <button type="button" class="tenders-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${totalPages}" title="Last Page">
              &raquo;
            </button>
          </li>
        </ul>
        <div class="tenders-page-counter">
          Page ${currentPage} of ${totalPages} &bull; <span style="font-weight: 500;">Showing ${startItem}–${endItem} of ${filteredCount} events</span>
        </div>
      </div>
    `;
  };

  const renderPortal = () => {
    const mount = document.getElementById('upcomingEventsPortalMount') || document.getElementById('otherPageContent');
    if (!mount) return;

    const filtered = getFilteredEvents();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    mount.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="tenders-portal-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">📅 Academic &amp; Cultural Calendar &bull; Central University of South Bihar</span>
            <h1 class="policy-main-title">Upcoming Events</h1>
            <p class="policy-main-desc">
              Discover academic conferences, Malaviya Mission Teacher Training (MMTTC) faculty induction programmes, national workshops, Foundation Day celebrations, cultural festivals, moot courts, and special lectures at Central University of South Bihar.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">60 Events</div>
                <div class="policy-stat-lbl">Active Repository</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">6 Sub-Pages</div>
                <div class="policy-stat-lbl">Paginated Archive</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">MMTTC / UGC</div>
                <div class="policy-stat-lbl">Certified Programmes</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">2024–2026</div>
                <div class="policy-stat-lbl">Academic Session</div>
              </div>
            </div>
          </div>

          <!-- 2. Search & Category Filter Toolbar -->
          <div class="policy-filter-bar" style="margin-bottom: 24px;">
            <div class="policy-search-box">
              <span class="policy-search-icon">🔍</span>
              <input 
                id="eventLiveSearch" 
                type="search" 
                class="policy-search-input" 
                placeholder="Search 60 events by title, date, department, keyword..." 
                value="${searchQuery}"
              >
            </div>
            
            <div class="policy-filter-chips" id="eventCatChips">
              <button type="button" class="policy-chip-btn ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">All Events (60)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'seminar' ? 'active' : ''}" data-cat="seminar">🎙️ Seminars &amp; Conferences (14)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'workshop' ? 'active' : ''}" data-cat="workshop">🛠️ Workshops &amp; Training (13)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'foundation' ? 'active' : ''}" data-cat="foundation">🏛️ Foundation Day (6)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'faculty' ? 'active' : ''}" data-cat="faculty">👩‍🏫 Faculty Development (4)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'cultural' ? 'active' : ''}" data-cat="cultural">🎭 Cultural &amp; Sports (8)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'special' ? 'active' : ''}" data-cat="special">📖 Special Lectures (6)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'alumni' ? 'active' : ''}" data-cat="alumni">🎓 Alumni Connect (3)</button>
            </div>
          </div>

          <!-- 3. Upcoming Events Table (Exact Reference Layout) -->
          <div class="tenders-table-card" id="eventsTableAnchor">
            <table class="tenders-statutory-table">
              <thead>
                <tr>
                  <th style="width: 78%;">Title</th>
                  <th class="th-date">Published Date</th>
                </tr>
              </thead>
              <tbody>
                ${paginatedItems.length > 0 ? paginatedItems.map(item => {
                  const eventDate = extractEventDate(item.title);
                  const catClass = getCategoryClass(item.category);

                  return `
                    <tr>
                      <td>
                        <a href="${item.docUrl}" target="_blank" class="tender-title-link">
                          ${item.title}
                        </a>
                        <div class="tender-meta-row">
                          ${item.category ? `<span class="tender-cat-chip ${catClass}">${item.category}</span>` : ''}
                          ${eventDate ? `<span class="tender-last-date-badge" style="background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8;">🗓️ Schedule: ${eventDate}</span>` : ''}
                          <a href="${item.docUrl}" target="_blank" style="font-size: 0.76rem; font-weight: 700; color: #0b63b6; text-decoration: none; margin-left: auto;">
                            Event Brochure / Notice ↗
                          </a>
                        </div>
                      </td>
                      <td class="tender-pub-date-cell">
                        ${item.publishedDate}
                        <span>CUSB Events</span>
                      </td>
                    </tr>
                  `;
                }).join('') : `
                  <tr>
                    <td colspan="2" style="text-align: center; padding: 48px 20px; color: var(--tx-secondary);">
                      <div style="font-size: 2.5rem; margin-bottom: 12px;">📂</div>
                      <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0 0 6px;">No Events Found</h3>
                      <p style="margin: 0;">No upcoming events match your search criteria. Try clearing the search query or category filters.</p>
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <!-- 4. Interactive 6-Page Pagination Controls -->
          ${renderPaginationControls(totalPages, filtered.length)}

          <!-- 5. Event Organization & Registration Support -->
          <div style="background: var(--bg-primary, #ffffff); border: 1px solid var(--border-color, #e5e7eb); border-radius: 16px; padding: 26px 28px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03); margin-top: 36px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
            <div>
              <span class="policy-badge-pill" style="margin-bottom: 6px; display: inline-block;">🎤 Departmental &amp; Student Notice</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--tx-primary, #111827); margin: 0 0 4px;">
                Looking to Register or Propose an Event?
              </h3>
              <p style="font-size: 0.88rem; color: var(--tx-secondary, #64748b); margin: 0;">
                For hall reservations (Swami Vivekananda Auditorium / Chanakya Bhawan), event registration forms, and MMTTC participation inquiries.
              </p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="downloads.html" class="btn btn-navy">Event Booking Forms ↗</a>
              <a href="about-others-archived-events.html" class="btn btn-gold">Archived Events ↗</a>
            </div>
          </div>

        </div>
      </section>
    `;

    // Attach Event Listeners
    attachEventListeners();
  };

  const attachEventListeners = () => {
    // Search Listener
    const searchInput = document.getElementById('eventLiveSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderPortal();
        const newSearch = document.getElementById('eventLiveSearch');
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
        }
      });
    }

    // Category Filter Listeners
    const catChips = document.querySelectorAll('#eventCatChips button');
    catChips.forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.cat;
        currentPage = 1;
        renderPortal();
      });
    });

    // Pagination Listeners
    const pageButtons = document.querySelectorAll('.tenders-pagination button');
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.dataset.page, 10);
        if (p && p !== currentPage) {
          currentPage = p;
          window.location.hash = `page-${p}`;
          renderPortal();
          const tableAnchor = document.getElementById('eventsTableAnchor');
          if (tableAnchor) {
            tableAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  };

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    currentPage = parsePageFromUrl();
    renderPortal();
  });

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    currentPage = parsePageFromUrl();
    renderPortal();
  });

  // If DOM is already ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    currentPage = parsePageFromUrl();
    renderPortal();
  }
})();
