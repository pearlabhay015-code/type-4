/**
 * Central University of South Bihar — Download Centre Portal Controller
 * Divides download forms into Employee, Student, and Hostel divisions with live search.
 */
(() => {
  const data = window.CUSB_DOWNLOADS_DATA || { employee: [], student: [], hostel: [] };
  let currentTab = 'all'; // 'all' | 'employee' | 'student' | 'hostel'
  let searchQuery = '';

  const countItems = (catList) => {
    return catList.reduce((acc, curr) => acc + (curr.items ? curr.items.length : 0), 0);
  };

  const empCount = countItems(data.employee);
  const stuCount = countItems(data.student);
  const hostelCount = countItems(data.hostel);
  const totalCount = empCount + stuCount + hostelCount;

  const renderItemRow = (item) => {
    return `
      <li class="dl-item-row">
        <div class="dl-item-left">
          <span class="dl-bullet-dot"></span>
          <span>${item.title}</span>
          ${item.isNew ? `<span class="dl-new-badge">NEW</span>` : ''}
        </div>
        <div class="dl-item-actions">
          ${item.dualFormat ? `
            <a href="${item.pdfLink || '#'}" target="_blank" class="dl-btn dl-btn-pdf" title="Download PDF document">
              📄 PDF
            </a>
            <a href="${item.wordLink || '#'}" target="_blank" class="dl-btn dl-btn-word" title="Download MS Word document">
              📝 WORD
            </a>
          ` : `
            <a href="${item.link || '#'}" target="_blank" class="dl-btn ${item.format === 'WORD' ? 'dl-btn-word' : 'dl-btn-pdf'}" title="Download ${item.format || 'PDF'} document">
              ${item.format === 'WORD' ? '📝 WORD' : '📄 PDF'}
            </a>
          `}
          ${item.actionLink ? `
            <a href="${item.actionLink}" target="_blank" class="dl-btn dl-btn-apply" title="${item.actionText || 'Open Portal'}">
              🚀 ${item.actionText || 'Apply'}
            </a>
          ` : ''}
        </div>
      </li>
    `;
  };

  const renderSubgroup = (subgroup, typeClass) => {
    const q = searchQuery.trim().toLowerCase();
    const filteredItems = subgroup.items.filter(it => {
      return !q || it.title.toLowerCase().includes(q) || subgroup.subCategory.toLowerCase().includes(q);
    });

    if (!filteredItems.length) return '';

    return `
      <div class="dl-subgroup">
        <h3 class="dl-subgroup-title ${typeClass}">${subgroup.subCategory}</h3>
        <ul class="dl-item-list">
          ${filteredItems.map(renderItemRow).join('')}
        </ul>
      </div>
    `;
  };

  const renderCategoryBlock = (title, headerClass, subClass, list) => {
    const content = list.map(sub => renderSubgroup(sub, subClass)).join('');
    if (!content.trim()) return '';

    return `
      <section class="dl-category-block" id="block-${headerClass}">
        <div class="dl-category-header-bar ${headerClass}">
          <span>${title}</span>
          <span style="font-size: 0.85rem; font-weight: 600; opacity: 0.9;">Official Forms &amp; Circulars</span>
        </div>
        <div class="dl-category-body">
          ${content}
        </div>
      </section>
    `;
  };

  const renderPortal = () => {
    const mount = document.getElementById('downloadsPortalMount');
    if (!mount) return;

    let contentHtml = '';

    if (currentTab === 'all' || currentTab === 'employee') {
      contentHtml += renderCategoryBlock('👨‍💼 Employee Download Forms & Circulars', 'emp', 'emp-title', data.employee);
    }
    if (currentTab === 'all' || currentTab === 'student') {
      contentHtml += renderCategoryBlock('🎓 Student Download Forms & Formats (UG / PG / PhD)', 'stu', 'stu-title', data.student);
    }
    if (currentTab === 'all' || currentTab === 'hostel') {
      contentHtml += renderCategoryBlock('🏠 Campus Hostels Forms & Clearance Proformas', 'hostel', 'hostel-title', data.hostel);
    }

    if (!contentHtml.trim()) {
      contentHtml = `
        <div class="dl-empty-state">
          <div style="font-size: 2.2rem; margin-bottom: 10px;">📄</div>
          <h3 style="font-size: 1.15rem; color: var(--dl-text-main); margin: 0 0 6px;">No Download Documents Found</h3>
          <p style="font-size: 0.9rem; color: var(--dl-text-muted); margin: 0;">Try modifying your search term or switching to another category tab.</p>
        </div>
      `;
    }

    mount.innerHTML = `
      <section class="downloads-section">
        <div class="container">
          
          <!-- Breadcrumb -->
          <nav class="downloads-breadcrumb" aria-label="Breadcrumb navigation">
            <a href="index.html">Home</a>
            <span style="opacity: 0.4;">/</span>
            <a href="about.html">About CUSB</a>
            <span style="opacity: 0.4;">/</span>
            <span style="color: var(--dl-text-main); font-weight: 600;">Download Centre</span>
          </nav>

          <!-- Top Banner Card -->
          <div class="downloads-header-card">
            <div class="downloads-header-left">
              <span class="downloads-eyebrow">Institutional Repository</span>
              <h1 class="downloads-title">Download Centre</h1>
              <p class="downloads-desc">
                Central repository for official university downloadable forms, circulars, proformas, leave applications, identity card requisitions, CAS formats, student academic certificates, and hostel clearance forms.
              </p>
            </div>
            
            <div class="downloads-stats-row">
              <div class="downloads-stat-pill">
                <span class="downloads-stat-value">${totalCount}</span>
                <span class="downloads-stat-label">Total Documents</span>
              </div>
              <div class="downloads-stat-pill">
                <span class="downloads-stat-value">${empCount}</span>
                <span class="downloads-stat-label">Employee Forms</span>
              </div>
              <div class="downloads-stat-pill">
                <span class="downloads-stat-value">${stuCount}</span>
                <span class="downloads-stat-label">Student Forms</span>
              </div>
              <div class="downloads-stat-pill">
                <span class="downloads-stat-value">${hostelCount}</span>
                <span class="downloads-stat-label">Hostel Forms</span>
              </div>
            </div>
          </div>

          <!-- Section Division Tabs -->
          <div class="downloads-nav-tabs" role="tablist" aria-label="Downloads category tabs">
            <button type="button" class="downloads-tab-btn ${currentTab === 'all' ? 'active-all' : ''}" data-tab="all" role="tab">
              📂 All Downloads <span class="downloads-tab-count">${totalCount}</span>
            </button>
            <button type="button" class="downloads-tab-btn ${currentTab === 'employee' ? 'active-emp' : ''}" data-tab="employee" role="tab">
              👨‍💼 Employee Downloads <span class="downloads-tab-count">${empCount}</span>
            </button>
            <button type="button" class="downloads-tab-btn ${currentTab === 'student' ? 'active-stu' : ''}" data-tab="student" role="tab">
              🎓 Students Downloads <span class="downloads-tab-count">${stuCount}</span>
            </button>
            <button type="button" class="downloads-tab-btn ${currentTab === 'hostel' ? 'active-hostel' : ''}" data-tab="hostel" role="tab">
              🏠 Hostels Forms <span class="downloads-tab-count">${hostelCount}</span>
            </button>
          </div>

          <!-- Live Instant Search -->
          <div class="downloads-search-bar">
            <span style="font-size: 1.1rem; color: var(--dl-text-muted);">🔍</span>
            <input 
              type="search" 
              class="downloads-search-input" 
              id="downloadsSearchInput" 
              placeholder="Search downloads by form name, circular, leave, CAS proforma, hostel slip, etc..." 
              value="${searchQuery}"
              aria-label="Search downloads">
          </div>

          <!-- Downloads List Blocks -->
          <div id="downloadsContentArea">
            ${contentHtml}
          </div>

        </div>
      </section>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Search input
    const searchInput = document.getElementById('downloadsSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderPortal();
        const reInput = document.getElementById('downloadsSearchInput');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }

    // Category Tabs
    document.querySelectorAll('.downloads-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTab = btn.getAttribute('data-tab');
        renderPortal();
      });
    });
  };

  // Initial load
  document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'employee' || hash === 'student' || hash === 'hostel') {
      currentTab = hash;
    }
    renderPortal();
  });
})();
