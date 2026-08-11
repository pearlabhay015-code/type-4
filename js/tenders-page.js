/**
 * Central University of South Bihar — Tenders & Procurement Portal
 * Handles full 82 statutory tenders across 5 paginated subpages (20 per page).
 */
(() => {
  let allTenders = window.CUSB_TENDERS_DATA || [];
  let currentPage = 1;
  const pageSize = 20;
  let currentCategory = 'all';
  let searchQuery = '';

  // Extract page from URL hash or param if present
  const parsePageFromUrl = () => {
    const hashMatch = window.location.hash.match(/page[=-](\d+)/i);
    if (hashMatch && hashMatch[1]) {
      const p = parseInt(hashMatch[1], 10);
      if (p >= 1 && p <= 5) return p;
    }
    const params = new URLSearchParams(window.location.search);
    const pParam = parseInt(params.get('page'), 10);
    if (pParam >= 1 && pParam <= 5) return pParam;
    return 1;
  };

  const getCategoryClass = (cat) => {
    const c = String(cat || '').toLowerCase();
    if (c.includes('civil') || c.includes('infra')) return 'civil';
    if (c.includes('lab') || c.includes('research')) return 'lab';
    if (c.includes('electrical') || c.includes('it')) return 'electrical';
    if (c.includes('chemical')) return 'chemicals';
    if (c.includes('services') || c.includes('shop') || c.includes('security')) return 'services';
    return '';
  };

  const extractRefNo = (title) => {
    const match = title.match(/\((CUSB\/[^\)]+)\)/i) || title.match(/\((F\.No\.[^\)]+)\)/i) || title.match(/\((Gem[^\)]+)\)/i);
    return match ? match[1] : null;
  };

  const extractLastDate = (title) => {
    const match = title.match(/\[\s*Last Date:?\s*([^\]]+)\]/i) || title.match(/\[\s*Last Dated\s*([^\]]+)\]/i);
    return match ? match[1].trim() : null;
  };

  const cleanTitle = (title) => {
    return title;
  };

  const getFilteredTenders = () => {
    return allTenders.filter(item => {
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
          <div class="tenders-page-counter">Showing all ${filteredCount} notices</div>
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
        <ul class="tenders-pagination" aria-label="Tenders pagination navigation">
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
          Page ${currentPage} of ${totalPages} &bull; <span style="font-weight: 500;">Showing ${startItem}–${endItem} of ${filteredCount} notices</span>
        </div>
      </div>
    `;
  };

  const renderPortal = () => {
    const mount = document.getElementById('tendersPortalMount');
    if (!mount) return;

    const filtered = getFilteredTenders();
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
            <span class="policy-badge-pill">📋 Purchase &amp; Stores Division &bull; Executive Engineering &bull; CUSB</span>
            <h1 class="policy-main-title">Tenders &amp; Procurement Notices</h1>
            <p class="policy-main-desc">
              Central University of South Bihar invites bids and tenders for infrastructure, laboratory equipment, chemicals, solar systems, campus civil works, security, and administrative services. All bid notices are published in compliance with the General Financial Rules (GFR) and Central Public Procurement Portal (CPPP).
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">82 Notices</div>
                <div class="policy-stat-lbl">Published Tenders</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">5 Sub-Pages</div>
                <div class="policy-stat-lbl">Paginated Archive</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">2024–2027</div>
                <div class="policy-stat-lbl">Active Procurement Cycle</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">CPPP / GeM</div>
                <div class="policy-stat-lbl">E-Procurement Compliant</div>
              </div>
            </div>
          </div>

          <!-- 2. Search & Category Filter Toolbar -->
          <div class="policy-filter-bar" style="margin-bottom: 24px;">
            <div class="policy-search-box">
              <span class="policy-search-icon">🔍</span>
              <input 
                id="tenderLiveSearch" 
                type="search" 
                class="policy-search-input" 
                placeholder="Search 82 tenders by title, ref no. (e.g. CUSB/PSD/EE...), department, date..." 
                value="${searchQuery}"
              >
            </div>
            
            <div class="policy-filter-chips" id="tenderCatChips">
              <button type="button" class="policy-chip-btn ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">All Notices (82)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'civil' ? 'active' : ''}" data-cat="civil">🏗️ Civil &amp; Infra (31)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'lab' ? 'active' : ''}" data-cat="lab">🔬 Lab &amp; Research (22)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'chemical' ? 'active' : ''}" data-cat="chemical">🧪 Chemicals (7)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'electrical' ? 'active' : ''}" data-cat="electrical">⚡ Electrical &amp; IT (12)</button>
              <button type="button" class="policy-chip-btn ${currentCategory === 'services' ? 'active' : ''}" data-cat="services">🛡️ Services &amp; Shops (10)</button>
            </div>
          </div>

          <!-- 3. Tenders Table Card (Matching Reference Layout) -->
          <div class="tenders-table-card" id="tenderTableAnchor">
            <table class="tenders-statutory-table">
              <thead>
                <tr>
                  <th style="width: 78%;">Title</th>
                  <th class="th-date">Published Date</th>
                </tr>
              </thead>
              <tbody>
                ${paginatedItems.length > 0 ? paginatedItems.map(item => {
                  const refNo = extractRefNo(item.title);
                  const lastDate = extractLastDate(item.title);
                  const catClass = getCategoryClass(item.category);

                  return `
                    <tr>
                      <td>
                        <a href="${item.docUrl}" target="_blank" class="tender-title-link">
                          ${cleanTitle(item.title)}
                        </a>
                        <div class="tender-meta-row">
                          ${refNo ? `<span class="tender-ref-chip">📄 ${refNo}</span>` : ''}
                          ${item.category ? `<span class="tender-cat-chip ${catClass}">${item.category}</span>` : ''}
                          ${lastDate ? `<span class="tender-last-date-badge">⏳ Last Date: ${lastDate}</span>` : ''}
                          <a href="${item.docUrl}" target="_blank" style="font-size: 0.76rem; font-weight: 700; color: #0b63b6; text-decoration: none; margin-left: auto;">
                            Download Bid Doc ↗
                          </a>
                        </div>
                      </td>
                      <td class="tender-pub-date-cell">
                        ${item.publishedDate}
                        <span>CUSB Portal</span>
                      </td>
                    </tr>
                  `;
                }).join('') : `
                  <tr>
                    <td colspan="2" style="text-align: center; padding: 48px 20px; color: var(--tx-secondary);">
                      <div style="font-size: 2.5rem; margin-bottom: 12px;">📂</div>
                      <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0 0 6px;">No Tender Notices Found</h3>
                      <p style="margin: 0;">No procurement notices match your search criteria. Try clearing the search or category filters.</p>
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <!-- 4. Interactive 5-Page Pagination Controls -->
          ${renderPaginationControls(totalPages, filtered.length)}

          <!-- 5. Procurement Clarification & Help Desk -->
          <div style="background: var(--bg-primary, #ffffff); border: 1px solid var(--border-color, #e5e7eb); border-radius: 16px; padding: 26px 28px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03); margin-top: 36px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
            <div>
              <span class="policy-badge-pill" style="margin-bottom: 6px; display: inline-block;">ℹ️ Vendor &amp; Supplier Assistance</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--tx-primary, #111827); margin: 0 0 4px;">
                Need Clarification on Any Tender or Bid Document?
              </h3>
              <p style="font-size: 0.88rem; color: var(--tx-secondary, #64748b); margin: 0;">
                For pre-bid queries, site inspections, or tender submissions, contact the Purchase &amp; Stores Division (PSD) or Executive Engineering Office.
              </p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="enquiry.html" class="btn btn-navy">Open Pre-Bid Enquiry ↗</a>
              <a href="about-resources.html" class="btn btn-gold">Governance &amp; Acts ↗</a>
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
    const searchInput = document.getElementById('tenderLiveSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderPortal();
        // Restore focus
        const newSearch = document.getElementById('tenderLiveSearch');
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
        }
      });
    }

    // Category Filter Listeners
    const catChips = document.querySelectorAll('#tenderCatChips button');
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
          const tableAnchor = document.getElementById('tenderTableAnchor');
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
