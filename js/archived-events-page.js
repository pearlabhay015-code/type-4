/**
 * Central University of South Bihar — Archive Events Portal Controller
 * Replicates the Archive Events tabular records with enhanced, professional visuals.
 */
(() => {
  let allEvents = window.CUSB_ARCHIVED_EVENTS_DATA || [];
  let currentPage = 1;
  const pageSize = 10;
  let currentCategory = 'all';
  let currentYear = 'all';
  let searchQuery = '';
  let currentView = 'table'; // 'table' | 'grid'
  let sortOrder = 'default'; // 'default' | 'newest' | 'oldest'

  // Parse page from URL hash or query param
  const parsePageFromUrl = () => {
    const hashMatch = window.location.hash.match(/page[=-](\d+)/i);
    if (hashMatch && hashMatch[1]) {
      const p = parseInt(hashMatch[1], 10);
      if (p >= 1 && p <= 2) return p;
    }
    const params = new URLSearchParams(window.location.search);
    const pParam = parseInt(params.get('page'), 10);
    if (pParam >= 1 && pParam <= 2) return pParam;
    return 1;
  };

  const getFilteredEvents = () => {
    let filtered = allEvents.filter(item => {
      // Category filter
      const matchCat = (currentCategory === 'all') || 
        (item.categoryKey && item.categoryKey.toLowerCase() === currentCategory.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(currentCategory.toLowerCase()));
      
      // Year filter
      const matchYear = (currentYear === 'all') || (item.year === currentYear);

      // Search Query
      const q = searchQuery.trim().toLowerCase();
      const matchQuery = !q || 
        item.title.toLowerCase().includes(q) ||
        item.publishedDate.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.organizer && item.organizer.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      return matchCat && matchYear && matchQuery;
    });

    if (sortOrder === 'newest') {
      filtered.sort((a, b) => (b.publishedDateIso || '').localeCompare(a.publishedDateIso || ''));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => (a.publishedDateIso || '').localeCompare(b.publishedDateIso || ''));
    }

    return filtered;
  };

  const renderTableRows = (events) => {
    if (!events.length) {
      return `
        <tr>
          <td colspan="2">
            <div class="archive-empty-state">
              <div class="archive-empty-icon">📁</div>
              <h3 style="font-size: 1.1rem; margin: 0 0 6px; color: var(--arc-text-main);">No Archived Events Found</h3>
              <p style="margin: 0; font-size: 0.88rem;">Try adjusting your search query or category filters.</p>
            </div>
          </td>
        </tr>
      `;
    }

    return events.map((item, idx) => {
      return `
        <tr data-event-id="${item.id}" title="Click to view detailed archive record">
          <td>
            <div class="archive-event-title-wrap">
              <span class="archive-event-title">${item.title}</span>
              <div class="archive-event-meta">
                <span class="archive-meta-tag accent">${item.category}</span>
                ${item.eventDate ? `<span class="archive-meta-tag">📅 ${item.eventDate}</span>` : ''}
                <span class="archive-meta-tag">ID: ARC-2024-${String(item.id).padStart(3, '0')}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="archive-date-cell">
              <span class="archive-date-icon">🗓️</span>
              <span>${item.publishedDate}</span>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  const renderGridCards = (events) => {
    if (!events.length) {
      return `
        <div class="archive-empty-state" style="grid-column: 1 / -1;">
          <div class="archive-empty-icon">📁</div>
          <h3 style="font-size: 1.1rem; margin: 0 0 6px; color: var(--arc-text-main);">No Archived Events Found</h3>
          <p style="margin: 0; font-size: 0.88rem;">Try adjusting your search query or category filters.</p>
        </div>
      `;
    }

    return events.map(item => `
      <article class="archive-card" data-event-id="${item.id}" tabindex="0">
        <div>
          <div class="archive-card-top">
            <span class="archive-meta-tag accent">${item.category}</span>
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--arc-text-muted);">Year ${item.year}</span>
          </div>
          <h3 class="archive-card-title">${item.title}</h3>
          <p class="archive-card-desc">${item.description || ''}</p>
        </div>
        <div class="archive-card-bottom">
          <span class="archive-date-cell">
            <span class="archive-date-icon">🗓️</span>
            <span>${item.publishedDate}</span>
          </span>
          <span style="font-size: 0.78rem; font-weight: 600; color: var(--arc-accent);">View Record →</span>
        </div>
      </article>
    `).join('');
  };

  const renderPagination = (totalPages, totalCount) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    let pageBtns = '';
    for (let i = 1; i <= totalPages; i++) {
      pageBtns += `
        <li class="archive-page-item">
          <button type="button" class="archive-page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" aria-current="${i === currentPage ? 'page' : 'false'}">
            ${i}
          </button>
        </li>
      `;
    }

    return `
      <div class="archive-pagination-wrap">
        <ul class="archive-pagination" aria-label="Archive events pagination">
          <li class="archive-page-item">
            <button type="button" class="archive-page-btn" data-page="1" ${currentPage === 1 ? 'disabled' : ''} aria-label="First page" title="First Page">
              &laquo;
            </button>
          </li>
          <li class="archive-page-item">
            <button type="button" class="archive-page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page" title="Previous Page">
              &lsaquo;
            </button>
          </li>
          ${pageBtns}
          <li class="archive-page-item">
            <button type="button" class="archive-page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page" title="Next Page">
              &rsaquo;
            </button>
          </li>
          <li class="archive-page-item">
            <button type="button" class="archive-page-btn" data-page="${totalPages}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Last page" title="Last Page">
              &raquo;
            </button>
          </li>
        </ul>
        <div class="archive-page-info">
          Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong> &bull; Showing entries <strong>${startItem}–${endItem}</strong> of <strong>${totalCount}</strong>
        </div>
      </div>
    `;
  };

  const showDetailModal = (eventId) => {
    const event = allEvents.find(e => e.id === Number(eventId));
    if (!event) return;

    let modalOverlay = document.getElementById('archiveDetailModal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'archiveDetailModal';
      modalOverlay.className = 'archive-modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    modalOverlay.innerHTML = `
      <div class="archive-modal" role="dialog" aria-modal="true" aria-labelledby="modalEventTitle">
        <button class="archive-modal-close" id="closeArchiveModalBtn" type="button" aria-label="Close dialog">&times;</button>
        
        <div class="archive-modal-header">
          <span class="archive-meta-tag accent">${event.category}</span>
          <h2 class="archive-modal-title" id="modalEventTitle">${event.title}</h2>
        </div>

        <div class="archive-modal-meta-grid">
          <div class="archive-modal-meta-item">
            <strong>Published Date</strong>
            <span>${event.publishedDate}</span>
          </div>
          ${event.eventDate ? `
          <div class="archive-modal-meta-item">
            <strong>Event Duration / Date</strong>
            <span>${event.eventDate}</span>
          </div>` : ''}
          <div class="archive-modal-meta-item">
            <strong>Organizer / Department</strong>
            <span>${event.organizer || 'Central University of South Bihar'}</span>
          </div>
          <div class="archive-modal-meta-item">
            <strong>Venue / Campus Location</strong>
            <span>${event.venue || 'CUSB Main Campus, Gaya'}</span>
          </div>
        </div>

        <div class="archive-modal-body">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--arc-text-main); margin: 0 0 8px;">Event Overview &amp; Summary</h4>
          <p style="margin: 0 0 16px;">${event.description}</p>
          
          ${event.highlights && event.highlights.length ? `
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--arc-text-main); margin: 0 0 8px;">Key Highlights &amp; Outcomes</h4>
            <ul class="archive-modal-highlights">
              ${event.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          ` : ''}
        </div>

        <div class="archive-modal-footer">
          <button type="button" class="btn btn-white" id="modalPrintBtn" style="font-size: 0.84rem; padding: 7px 16px;">🖨️ Print Record</button>
          <button type="button" class="btn btn-gold" id="modalDismissBtn" style="font-size: 0.84rem; padding: 7px 18px;">Close</button>
        </div>
      </div>
    `;

    // Open transition
    requestAnimationFrame(() => {
      modalOverlay.classList.add('open');
    });

    const closeModal = () => {
      modalOverlay.classList.remove('open');
    };

    modalOverlay.querySelector('#closeArchiveModalBtn')?.addEventListener('click', closeModal);
    modalOverlay.querySelector('#modalDismissBtn')?.addEventListener('click', closeModal);
    modalOverlay.querySelector('#modalPrintBtn')?.addEventListener('click', () => window.print());
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  };

  const renderPortal = () => {
    const mount = document.getElementById('archiveEventsPortalMount');
    if (!mount) return;

    const filtered = getFilteredEvents();
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const currentEvents = filtered.slice(startIndex, startIndex + pageSize);

    mount.innerHTML = `
      <section class="archive-events-section">
        <div class="container">
          
          <!-- Breadcrumbs -->
          <nav class="archive-breadcrumb" aria-label="Breadcrumb navigation">
            <a href="index.html">Home</a>
            <span class="archive-breadcrumb-sep">/</span>
            <a href="about.html">About CUSB</a>
            <span class="archive-breadcrumb-sep">/</span>
            <span class="archive-breadcrumb-curr">Archive Events</span>
          </nav>

          <!-- Top Header Card -->
          <div class="archive-header-card">
            <div class="archive-header-left">
              <span class="archive-eyebrow">Institutional Repository</span>
              <h1 class="archive-title">Archive Events</h1>
              <p class="archive-desc">
                Chronological historical archive of conferences, national workshops, distinguished scientific lectures, orientation programmes, and outreach initiatives at Central University of South Bihar.
              </p>
            </div>
            
            <div class="archive-stats-row">
              <div class="archive-stat-pill">
                <span class="archive-stat-value">16</span>
                <span class="archive-stat-label">Archived Events</span>
              </div>
              <div class="archive-stat-pill">
                <span class="archive-stat-value">2</span>
                <span class="archive-stat-label">Archive Pages</span>
              </div>
              <div class="archive-stat-pill">
                <span class="archive-stat-value">2024–26</span>
                <span class="archive-stat-label">Record Years</span>
              </div>
            </div>
          </div>

          <!-- Filter Chips Bar -->
          <div class="archive-chips-bar" role="tablist" aria-label="Filter events by category">
            <button class="archive-chip ${currentCategory === 'all' ? 'active' : ''}" data-category="all" role="tab">All Records (16)</button>
            <button class="archive-chip ${currentCategory === 'workshop' ? 'active' : ''}" data-category="workshop" role="tab">Workshops &amp; Training</button>
            <button class="archive-chip ${currentCategory === 'conference' ? 'active' : ''}" data-category="conference" role="tab">Conferences &amp; Seminars</button>
            <button class="archive-chip ${currentCategory === 'orientation' ? 'active' : ''}" data-category="orientation" role="tab">Orientation &amp; Student Life</button>
            <button class="archive-chip ${currentCategory === 'fdp' ? 'active' : ''}" data-category="fdp" role="tab">Faculty Development (NEP)</button>
            <button class="archive-chip ${currentCategory === 'outreach' ? 'active' : ''}" data-category="outreach" role="tab">Institutional &amp; Outreach</button>
          </div>

          <!-- Utility Toolbar (Search, Filter, Sort, View) -->
          <div class="archive-toolbar">
            <div class="archive-search-box">
              <span class="archive-search-icon">🔍</span>
              <input 
                type="search" 
                class="archive-search-input" 
                id="archiveSearchInput" 
                placeholder="Search archive events by title, keyword, year..." 
                value="${searchQuery}"
                aria-label="Search archive events">
            </div>

            <div class="archive-filter-group">
              <select class="archive-filter-select" id="archiveYearSelect" aria-label="Filter by year">
                <option value="all" ${currentYear === 'all' ? 'selected' : ''}>All Years</option>
                <option value="2026" ${currentYear === '2026' ? 'selected' : ''}>Year 2026 Records</option>
                <option value="2024" ${currentYear === '2024' ? 'selected' : ''}>Year 2024 Records</option>
              </select>

              <select class="archive-filter-select" id="archiveSortSelect" aria-label="Sort events">
                <option value="default" ${sortOrder === 'default' ? 'selected' : ''}>Default Gazette Order</option>
                <option value="newest" ${sortOrder === 'newest' ? 'selected' : ''}>Published: Newest First</option>
                <option value="oldest" ${sortOrder === 'oldest' ? 'selected' : ''}>Published: Oldest First</option>
              </select>

              <div class="archive-view-toggle" role="group" aria-label="View toggle">
                <button type="button" class="archive-view-btn ${currentView === 'table' ? 'active' : ''}" id="viewTableBtn" title="Tabular View">
                  ☰ Table
                </button>
                <button type="button" class="archive-view-btn ${currentView === 'grid' ? 'active' : ''}" id="viewGridBtn" title="Card View">
                  ⊞ Cards
                </button>
              </div>
            </div>
          </div>

          <!-- Main Content View Area -->
          <div id="archiveEventsContainer">
            ${currentView === 'table' ? `
              <div class="archive-table-card">
                <table class="archive-table" aria-label="Archive Events Table">
                  <thead>
                    <tr>
                      <th class="col-title">Title</th>
                      <th class="col-date">Published Date</th>
                    </tr>
                  </thead>
                  <tbody id="archiveTableBody">
                    ${renderTableRows(currentEvents)}
                  </tbody>
                </table>
              </div>
            ` : `
              <div class="archive-grid-view">
                ${renderGridCards(currentEvents)}
              </div>
            `}
          </div>

          <!-- Pagination Bar -->
          <div id="archivePaginationMount">
            ${renderPagination(totalPages, totalCount)}
          </div>

        </div>
      </section>
    `;

    bindEventListeners();
  };

  const bindEventListeners = () => {
    // Search input
    const searchInput = document.getElementById('archiveSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderPortal();
        // Restore focus to search input
        const reInput = document.getElementById('archiveSearchInput');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }

    // Category chips
    document.querySelectorAll('.archive-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        currentPage = 1;
        renderPortal();
      });
    });

    // Year select
    const yearSelect = document.getElementById('archiveYearSelect');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        currentYear = e.target.value;
        currentPage = 1;
        renderPortal();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('archiveSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortOrder = e.target.value;
        renderPortal();
      });
    }

    // View toggles
    document.getElementById('viewTableBtn')?.addEventListener('click', () => {
      currentView = 'table';
      renderPortal();
    });
    document.getElementById('viewGridBtn')?.addEventListener('click', () => {
      currentView = 'grid';
      renderPortal();
    });

    // Pagination clicks
    document.querySelectorAll('.archive-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (!isNaN(targetPage) && targetPage !== currentPage && !btn.disabled) {
          currentPage = targetPage;
          window.history.pushState(null, '', `#page=${currentPage}`);
          renderPortal();
          const tableCard = document.querySelector('.archive-header-card');
          if (tableCard) {
            tableCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Row / Card clicks to open modal
    document.querySelectorAll('[data-event-id]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-event-id');
        if (id) showDetailModal(id);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = el.getAttribute('data-event-id');
          if (id) showDetailModal(id);
        }
      });
    });
  };

  // Initial load
  document.addEventListener('DOMContentLoaded', () => {
    currentPage = parsePageFromUrl();
    renderPortal();

    window.addEventListener('popstate', () => {
      currentPage = parsePageFromUrl();
      renderPortal();
    });
  });
})();
