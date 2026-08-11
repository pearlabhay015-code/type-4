/**
 * Central University of South Bihar — Recruitment Portal Controller
 * Replicates the recruitment advertisements across subpages with elevated, professional visuals.
 */
(() => {
  let allRecruitments = window.CUSB_RECRUITMENT_DATA || [];
  let currentPage = 1;
  const pageSize = 10;
  let currentCategory = 'all';
  let currentAgency = 'all';
  let currentStatus = 'all';
  let searchQuery = '';
  let currentView = 'table'; // 'table' | 'grid'
  let sortOrder = 'default'; // 'default' | 'newest' | 'oldest'

  // Parse page from URL hash or query param
  const parsePageFromUrl = () => {
    const hashMatch = window.location.hash.match(/page[=-](\d+)/i);
    if (hashMatch && hashMatch[1]) {
      const p = parseInt(hashMatch[1], 10);
      if (p >= 1 && p <= 4) return p;
    }
    const params = new URLSearchParams(window.location.search);
    const pParam = parseInt(params.get('page'), 10);
    if (pParam >= 1 && pParam <= 4) return pParam;
    return 1;
  };

  const getFilteredRecruitments = () => {
    let filtered = allRecruitments.filter(item => {
      // Category filter
      const matchCat = (currentCategory === 'all') || 
        (item.categoryKey && item.categoryKey.toLowerCase() === currentCategory.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(currentCategory.toLowerCase()));
      
      // Agency filter
      const matchAgency = (currentAgency === 'all') ||
        (item.fundingAgency && item.fundingAgency.toLowerCase().includes(currentAgency.toLowerCase()));

      // Status filter
      const matchStatus = (currentStatus === 'all') ||
        (item.status && item.status.toLowerCase() === currentStatus.toLowerCase());

      // Search Query
      const q = searchQuery.trim().toLowerCase();
      const matchQuery = !q || 
        item.title.toLowerCase().includes(q) ||
        item.publishedDate.toLowerCase().includes(q) ||
        (item.projectCode && item.projectCode.toLowerCase().includes(q)) ||
        (item.fundingAgency && item.fundingAgency.toLowerCase().includes(q)) ||
        (item.department && item.department.toLowerCase().includes(q)) ||
        (item.principalInvestigator && item.principalInvestigator.toLowerCase().includes(q)) ||
        (item.postName && item.postName.toLowerCase().includes(q));

      return matchCat && matchAgency && matchStatus && matchQuery;
    });

    if (sortOrder === 'newest') {
      filtered.sort((a, b) => (b.publishedDateIso || '').localeCompare(a.publishedDateIso || ''));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => (a.publishedDateIso || '').localeCompare(b.publishedDateIso || ''));
    }

    return filtered;
  };

  const renderTableRows = (recruitments) => {
    if (!recruitments.length) {
      return `
        <tr>
          <td colspan="2">
            <div class="archive-empty-state" style="padding: 40px 20px; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 8px;">💼</div>
              <h3 style="font-size: 1.1rem; margin: 0 0 6px; color: var(--rc-text-main);">No Recruitment Notices Found</h3>
              <p style="margin: 0; font-size: 0.88rem; color: var(--rc-text-muted);">Try adjusting your search keywords, category or agency filters.</p>
            </div>
          </td>
        </tr>
      `;
    }

    return recruitments.map((item) => {
      const isOpen = item.status === 'Open';
      return `
        <tr data-recruitment-id="${item.id}" title="Click to view full recruitment details and eligibility">
          <td>
            <div class="recruitment-item-title-wrap">
              <span class="recruitment-item-title">${item.title}</span>
              <div class="recruitment-meta-row">
                <span class="recruitment-tag accent">${item.category}</span>
                ${item.projectCode ? `<span class="recruitment-tag">Sanction: ${item.projectCode}</span>` : ''}
                ${item.fundingAgency ? `<span class="recruitment-tag">Funded by: ${item.fundingAgency}</span>` : ''}
                <span class="recruitment-tag ${isOpen ? 'status-open' : 'status-closed'}">${isOpen ? '● Open / Active' : 'Archive / Closed'}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="recruitment-date-cell">
              <span class="recruitment-date-icon">🗓️</span>
              <span>${item.publishedDate}</span>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  const renderGridCards = (recruitments) => {
    if (!recruitments.length) {
      return `
        <div class="archive-empty-state" style="grid-column: 1 / -1; padding: 40px 20px; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 8px;">💼</div>
          <h3 style="font-size: 1.1rem; margin: 0 0 6px; color: var(--rc-text-main);">No Recruitment Notices Found</h3>
          <p style="margin: 0; font-size: 0.88rem; color: var(--rc-text-muted);">Try adjusting your search keywords, category or agency filters.</p>
        </div>
      `;
    }

    return recruitments.map(item => {
      const isOpen = item.status === 'Open';
      return `
        <article class="recruitment-card" data-recruitment-id="${item.id}" tabindex="0">
          <div>
            <div class="recruitment-card-top">
              <span class="recruitment-tag accent">${item.category}</span>
              <span class="recruitment-tag ${isOpen ? 'status-open' : 'status-closed'}">${isOpen ? '● Open' : 'Archive'}</span>
            </div>
            <h3 class="recruitment-card-title">${item.title}</h3>
            ${item.department ? `<p class="recruitment-card-desc">📍 ${item.department} &bull; ${item.fundingAgency || 'CUSB'}</p>` : ''}
          </div>
          <div class="recruitment-card-bottom">
            <span class="recruitment-date-cell">
              <span class="recruitment-date-icon">🗓️</span>
              <span>${item.publishedDate}</span>
            </span>
            <span style="font-size: 0.78rem; font-weight: 600; color: var(--rc-accent);">View Vacancy →</span>
          </div>
        </article>
      `;
    }).join('');
  };

  const renderPagination = (totalPages, totalCount) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    let pageBtns = '';
    for (let i = 1; i <= totalPages; i++) {
      pageBtns += `
        <li class="recruitment-page-item">
          <button type="button" class="recruitment-page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" aria-current="${i === currentPage ? 'page' : 'false'}">
            ${i}
          </button>
        </li>
      `;
    }

    return `
      <div class="recruitment-pagination-wrap">
        <ul class="recruitment-pagination" aria-label="Recruitment pagination">
          <li class="recruitment-page-item">
            <button type="button" class="recruitment-page-btn" data-page="1" ${currentPage === 1 ? 'disabled' : ''} aria-label="First page" title="First Page">
              &laquo;
            </button>
          </li>
          <li class="recruitment-page-item">
            <button type="button" class="recruitment-page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page" title="Previous Page">
              &lsaquo;
            </button>
          </li>
          ${pageBtns}
          <li class="recruitment-page-item">
            <button type="button" class="recruitment-page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page" title="Next Page">
              &rsaquo;
            </button>
          </li>
          <li class="recruitment-page-item">
            <button type="button" class="recruitment-page-btn" data-page="${totalPages}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Last page" title="Last Page">
              &raquo;
            </button>
          </li>
        </ul>
        <div class="recruitment-page-info">
          Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong> &bull; Showing entries <strong>${startItem}–${endItem}</strong> of <strong>${totalCount}</strong>
        </div>
      </div>
    `;
  };

  const showDetailModal = (recruitmentId) => {
    const item = allRecruitments.find(e => e.id === Number(recruitmentId));
    if (!item) return;

    let modalOverlay = document.getElementById('recruitmentDetailModal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'recruitmentDetailModal';
      modalOverlay.className = 'recruitment-modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    const isOpen = item.status === 'Open';

    modalOverlay.innerHTML = `
      <div class="recruitment-modal" role="dialog" aria-modal="true" aria-labelledby="modalRecruitmentTitle">
        <button class="recruitment-modal-close" id="closeRecruitmentModalBtn" type="button" aria-label="Close dialog">&times;</button>
        
        <div class="recruitment-modal-header">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
            <span class="recruitment-tag accent">${item.category}</span>
            <span class="recruitment-tag ${isOpen ? 'status-open' : 'status-closed'}">${isOpen ? '● Open / Active Application' : 'Archive / Closed'}</span>
          </div>
          <h2 class="recruitment-modal-title" id="modalRecruitmentTitle">${item.title}</h2>
        </div>

        <div class="recruitment-modal-meta-grid">
          <div class="recruitment-modal-meta-item">
            <strong>Published Date</strong>
            <span>${item.publishedDate}</span>
          </div>
          <div class="recruitment-modal-meta-item">
            <strong>Application Deadline / Status</strong>
            <span>${item.closingDate ? item.closingDate : (isOpen ? 'Active' : 'Closed')}</span>
          </div>
          <div class="recruitment-modal-meta-item">
            <strong>Department / School</strong>
            <span>${item.department || 'Central Administration, CUSB'}</span>
          </div>
          <div class="recruitment-modal-meta-item">
            <strong>Funding Body / Sanction Code</strong>
            <span>${item.fundingAgency || 'CUSB'} (${item.projectCode || 'General'})</span>
          </div>
        </div>

        <div class="recruitment-modal-body">
          ${item.principalInvestigator ? `
            <div style="background: var(--rc-bg); border-left: 3px solid var(--rc-accent); padding: 10px 14px; border-radius: 0 8px 8px 0; margin-bottom: 16px; font-size: 0.86rem;">
              <strong>Principal Investigator / Coordinator:</strong> ${item.principalInvestigator}
            </div>
          ` : ''}

          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--rc-text-main); margin: 0 0 6px;">Eligibility &amp; Essential Qualifications</h4>
          <p style="margin: 0 0 14px; font-size: 0.88rem; line-height: 1.6;">${item.qualifications || 'As per official CUSB / UGC / funding agency advertisement guidelines.'}</p>
          
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--rc-text-main); margin: 0 0 6px;">Emoluments / Remuneration / Fellowship</h4>
          <p style="margin: 0 0 16px; font-size: 0.88rem; line-height: 1.6; color: var(--rc-gold); font-weight: 600;">${item.fellowship || 'As per central government norms.'}</p>
          
          <div style="background: var(--rc-bg); border: 1px solid var(--rc-border); border-radius: 8px; padding: 12px 14px; font-size: 0.82rem; color: var(--rc-text-muted);">
            📌 <em>Interested candidates are advised to send their bio-data along with self-attested supporting documents to the concerned Principal Investigator / Registrar Office before the deadline.</em>
          </div>
        </div>

        <div class="recruitment-modal-footer">
          <button type="button" class="btn btn-white" id="modalPrintRecruitmentBtn" style="font-size: 0.84rem; padding: 7px 16px;">🖨️ Print Notice</button>
          <a href="about-resources.html" class="btn btn-white" style="font-size: 0.84rem; padding: 7px 16px;">Recruitment Rules ↗</a>
          <button type="button" class="btn btn-gold" id="modalDismissRecruitmentBtn" style="font-size: 0.84rem; padding: 7px 18px;">Close</button>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      modalOverlay.classList.add('open');
    });

    const closeModal = () => {
      modalOverlay.classList.remove('open');
    };

    modalOverlay.querySelector('#closeRecruitmentModalBtn')?.addEventListener('click', closeModal);
    modalOverlay.querySelector('#modalDismissRecruitmentBtn')?.addEventListener('click', closeModal);
    modalOverlay.querySelector('#modalPrintRecruitmentBtn')?.addEventListener('click', () => window.print());
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
    const mount = document.getElementById('recruitmentPortalMount');
    if (!mount) return;

    const filtered = getFilteredRecruitments();
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const currentItems = filtered.slice(startIndex, startIndex + pageSize);

    mount.innerHTML = `
      <section class="recruitment-portal-section">
        <div class="container">
          
          <!-- Breadcrumbs -->
          <nav class="recruitment-breadcrumb" aria-label="Breadcrumb navigation">
            <a href="index.html">Home</a>
            <span class="recruitment-breadcrumb-sep">/</span>
            <a href="about.html">About CUSB</a>
            <span class="recruitment-breadcrumb-sep">/</span>
            <span class="recruitment-breadcrumb-curr">Recruitment</span>
          </nav>

          <!-- Top Header Card -->
          <div class="recruitment-header-card">
            <div class="recruitment-header-left">
              <span class="recruitment-eyebrow">Careers &amp; Opportunities</span>
              <h1 class="recruitment-title">Recruitment</h1>
              <p class="recruitment-desc">
                Official notices for faculty positions, non-teaching administrative appointments, JRF / Project Associates under national research grants (ANRF, SERB, ICSSR, IITM, PURSE), and walk-in interviews.
              </p>
            </div>
            
            <div class="recruitment-stats-row">
              <div class="recruitment-stat-pill">
                <span class="recruitment-stat-value">38</span>
                <span class="recruitment-stat-label">Total Notices</span>
              </div>
              <div class="recruitment-stat-pill">
                <span class="recruitment-stat-value">4</span>
                <span class="recruitment-stat-label">Sub-Pages</span>
              </div>
              <div class="recruitment-stat-pill">
                <span class="recruitment-stat-value">2024–26</span>
                <span class="recruitment-stat-label">Active Years</span>
              </div>
            </div>
          </div>

          <!-- Category Chips Bar -->
          <div class="recruitment-chips-bar" role="tablist" aria-label="Filter recruitments by category">
            <button class="recruitment-chip ${currentCategory === 'all' ? 'active' : ''}" data-category="all" role="tab">All Opportunities (38)</button>
            <button class="recruitment-chip ${currentCategory === 'project' ? 'active' : ''}" data-category="project" role="tab">Research &amp; JRF / Project Staff</button>
            <button class="recruitment-chip ${currentCategory === 'faculty' ? 'active' : ''}" data-category="faculty" role="tab">Teaching &amp; Faculty</button>
            <button class="recruitment-chip ${currentCategory === 'non-teaching' ? 'active' : ''}" data-category="non-teaching" role="tab">Non-Teaching Positions</button>
            <button class="recruitment-chip ${currentCategory === 'walkin' ? 'active' : ''}" data-category="walkin" role="tab">Walk-in Interviews</button>
            <button class="recruitment-chip ${currentCategory === 'medical' ? 'active' : ''}" data-category="medical" role="tab">Medical &amp; Healthcare</button>
          </div>

          <!-- Utility Toolbar (Search, Filter, Sort, View) -->
          <div class="recruitment-toolbar">
            <div class="recruitment-search-box">
              <span class="recruitment-search-icon">🔍</span>
              <input 
                type="search" 
                class="recruitment-search-input" 
                id="recruitmentSearchInput" 
                placeholder="Search by post, project code (e.g. CUSB-RP-110), department, funding agency..." 
                value="${searchQuery}"
                aria-label="Search recruitment notices">
            </div>

            <div class="recruitment-filter-group">
              <select class="recruitment-filter-select" id="recruitmentAgencySelect" aria-label="Filter by funding agency">
                <option value="all" ${currentAgency === 'all' ? 'selected' : ''}>All Funding Bodies</option>
                <option value="ANRF" ${currentAgency === 'ANRF' ? 'selected' : ''}>ANRF Grants</option>
                <option value="IITM" ${currentAgency === 'IITM' ? 'selected' : ''}>IITM Pune</option>
                <option value="ICSSR" ${currentAgency === 'ICSSR' ? 'selected' : ''}>ICSSR Projects</option>
                <option value="PURSE" ${currentAgency === 'PURSE' ? 'selected' : ''}>DST-PURSE</option>
                <option value="UGC-DAE-CSR" ${currentAgency === 'UGC-DAE-CSR' ? 'selected' : ''}>UGC-DAE-CSR</option>
                <option value="CDRI" ${currentAgency === 'CDRI' ? 'selected' : ''}>CDRI / ICMR</option>
              </select>

              <select class="recruitment-filter-select" id="recruitmentStatusSelect" aria-label="Filter by status">
                <option value="all" ${currentStatus === 'all' ? 'selected' : ''}>All Status</option>
                <option value="Open" ${currentStatus === 'Open' ? 'selected' : ''}>Open / Active Only</option>
                <option value="Closed" ${currentStatus === 'Closed' ? 'selected' : ''}>Archive / Closed Only</option>
              </select>

              <select class="recruitment-filter-select" id="recruitmentSortSelect" aria-label="Sort notices">
                <option value="default" ${sortOrder === 'default' ? 'selected' : ''}>Default Gazette Order</option>
                <option value="newest" ${sortOrder === 'newest' ? 'selected' : ''}>Published: Newest First</option>
                <option value="oldest" ${sortOrder === 'oldest' ? 'selected' : ''}>Published: Oldest First</option>
              </select>

              <div class="recruitment-view-toggle" role="group" aria-label="View toggle">
                <button type="button" class="recruitment-view-btn ${currentView === 'table' ? 'active' : ''}" id="viewRecTableBtn" title="Tabular View">
                  ☰ Table
                </button>
                <button type="button" class="recruitment-view-btn ${currentView === 'grid' ? 'active' : ''}" id="viewRecGridBtn" title="Card View">
                  ⊞ Cards
                </button>
              </div>
            </div>
          </div>

          <!-- Main Content View Area -->
          <div id="recruitmentContentContainer">
            ${currentView === 'table' ? `
              <div class="recruitment-table-card">
                <table class="recruitment-table" aria-label="Recruitment Advertisements Table">
                  <thead>
                    <tr>
                      <th class="col-title">Title</th>
                      <th class="col-date">Published Date</th>
                    </tr>
                  </thead>
                  <tbody id="recruitmentTableBody">
                    ${renderTableRows(currentItems)}
                  </tbody>
                </table>
              </div>
            ` : `
              <div class="recruitment-grid-view">
                ${renderGridCards(currentItems)}
              </div>
            `}
          </div>

          <!-- Pagination Bar (Exact Recreation of « < 1 2 3 4 > ») -->
          <div id="recruitmentPaginationMount">
            ${renderPagination(totalPages, totalCount)}
          </div>

        </div>
      </section>
    `;

    bindEventListeners();
  };

  const bindEventListeners = () => {
    // Search input
    const searchInput = document.getElementById('recruitmentSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderPortal();
        const reInput = document.getElementById('recruitmentSearchInput');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }

    // Category chips
    document.querySelectorAll('.recruitment-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        currentPage = 1;
        renderPortal();
      });
    });

    // Agency select
    document.getElementById('recruitmentAgencySelect')?.addEventListener('change', (e) => {
      currentAgency = e.target.value;
      currentPage = 1;
      renderPortal();
    });

    // Status select
    document.getElementById('recruitmentStatusSelect')?.addEventListener('change', (e) => {
      currentStatus = e.target.value;
      currentPage = 1;
      renderPortal();
    });

    // Sort select
    document.getElementById('recruitmentSortSelect')?.addEventListener('change', (e) => {
      sortOrder = e.target.value;
      renderPortal();
    });

    // View toggle buttons
    document.getElementById('viewRecTableBtn')?.addEventListener('click', () => {
      currentView = 'table';
      renderPortal();
    });
    document.getElementById('viewRecGridBtn')?.addEventListener('click', () => {
      currentView = 'grid';
      renderPortal();
    });

    // Pagination buttons
    document.querySelectorAll('.recruitment-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (!isNaN(targetPage) && targetPage !== currentPage && !btn.disabled) {
          currentPage = targetPage;
          window.history.pushState(null, '', `#page=${currentPage}`);
          renderPortal();
          const headerCard = document.querySelector('.recruitment-header-card');
          if (headerCard) {
            headerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Row / Card clicks for detail modal
    document.querySelectorAll('[data-recruitment-id]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-recruitment-id');
        if (id) showDetailModal(id);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = el.getAttribute('data-recruitment-id');
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
