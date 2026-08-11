/**
 * Central University of South Bihar — Academic Highlights Controller
 */
(() => {
  let allHighlights = window.CUSB_ACADEMIC_HIGHLIGHTS_DATA || [];
  let currentPage = 1;
  const pageSize = 10;
  let searchQuery = '';

  const parsePageFromUrl = () => {
    const hashMatch = window.location.hash.match(/page[=-](\d+)/i);
    if (hashMatch && hashMatch[1]) {
      const p = parseInt(hashMatch[1], 10);
      if (p >= 1 && p <= 9) return p;
    }
    const params = new URLSearchParams(window.location.search);
    const pParam = parseInt(params.get('page'), 10);
    if (pParam >= 1 && pParam <= 9) return pParam;
    return 1;
  };

  const getFilteredItems = () => {
    const q = searchQuery.trim().toLowerCase();
    return allHighlights.filter(it => {
      return !q || it.title.toLowerCase().includes(q) || (it.category && it.category.toLowerCase().includes(q));
    });
  };

  const renderTableRows = (items) => {
    if (!items.length) {
      return `<tr><td colspan="2" style="text-align: center; padding: 32px; color: var(--ah-text-muted);">No academic highlights found.</td></tr>`;
    }
    return items.map(item => `
      <tr>
        <td>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 600; color: var(--ah-text-main);">${item.title}</span>
            <div style="display: flex; gap: 8px; font-size: 0.75rem; color: var(--ah-text-muted);">
              ${item.category ? `<span style="background: var(--ah-accent-soft); color: var(--ah-accent); padding: 2px 6px; border-radius: 4px; font-weight: 600;">${item.category}</span>` : ''}
              ${item.year ? `<span>Year ${item.year}</span>` : ''}
            </div>
          </div>
        </td>
        <td style="color: var(--ah-text-sub); font-size: 0.88rem;">${item.author || 'Written by: procusb'}</td>
      </tr>
    `).join('');
  };

  const renderPagination = (totalPages, totalCount) => {
    let pageBtns = '';
    for (let i = 1; i <= Math.min(9, totalPages); i++) {
      pageBtns += `
        <li>
          <button type="button" class="academic-page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
        </li>
      `;
    }
    return `
      <div class="academic-pagination-wrap">
        <ul class="academic-pagination">
          <li><button type="button" class="academic-page-btn" data-page="1" ${currentPage === 1 ? 'disabled' : ''}>&laquo;</button></li>
          <li><button type="button" class="academic-page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>&lsaquo;</button></li>
          ${pageBtns}
          <li><button type="button" class="academic-page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>&rsaquo;</button></li>
          <li><button type="button" class="academic-page-btn" data-page="${totalPages}" ${currentPage === totalPages ? 'disabled' : ''}>&raquo;</button></li>
        </ul>
        <div style="font-size: 0.85rem; color: var(--ah-text-muted);">
          Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong>
        </div>
      </div>
    `;
  };

  const renderPortal = () => {
    const mount = document.getElementById('academicHighlightsPortalMount');
    if (!mount) return;

    const filtered = getFilteredItems();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * pageSize;
    const currentItems = filtered.slice(startIndex, startIndex + pageSize);

    mount.innerHTML = `
      <section class="academic-highlights-section">
        <div class="container">
          <nav style="display: flex; gap: 8px; font-size: 0.85rem; margin-bottom: 20px; color: var(--ah-text-muted);">
            <a href="index.html" style="color: var(--ah-text-sub); text-decoration: none;">Home</a>
            <span>/</span>
            <a href="about.html" style="color: var(--ah-text-sub); text-decoration: none;">About CUSB</a>
            <span>/</span>
            <span style="color: var(--ah-text-main); font-weight: 600;">Academic Highlights</span>
          </nav>

          <div class="academic-header-card">
            <div>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--ah-accent); background: var(--ah-accent-soft); padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">Excellence &amp; Achievements</span>
              <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--ah-text-main); margin: 0 0 6px;">Academic Highlights</h1>
              <p style="font-size: 0.92rem; color: var(--ah-text-muted); margin: 0;">Institutional accolades, major research grants (ANRF, BARC, UGC-DAE), international conference papers, campus placements, and student achievements at Central University of South Bihar.</p>
            </div>
            <div style="display: flex; gap: 10px;">
              <div style="background: var(--ah-bg); border: 1px solid var(--ah-border); border-radius: 8px; padding: 8px 14px; text-align: center;">
                <span style="display: block; font-size: 1.2rem; font-weight: 800; color: var(--ah-text-main);">${allHighlights.length}</span>
                <span style="font-size: 0.7rem; color: var(--ah-text-muted); text-transform: uppercase;">Published Highlights</span>
              </div>
            </div>
          </div>

          <div style="background: var(--ah-card-bg); border: 1px solid var(--ah-border); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
            <span>🔍</span>
            <input type="search" id="academicSearchInput" placeholder="Search academic achievements, grants, placements, publications..." value="${searchQuery}" style="width: 100%; border: none; background: transparent; font-size: 0.9rem; color: var(--ah-text-main); outline: none;">
          </div>

          <div class="academic-table-card">
            <table class="academic-table">
              <thead>
                <tr>
                  <th class="col-title">Title</th>
                  <th class="col-author">Author</th>
                </tr>
              </thead>
              <tbody>
                ${renderTableRows(currentItems)}
              </tbody>
            </table>
          </div>

          ${renderPagination(totalPages, filtered.length)}
        </div>
      </section>
    `;

    document.getElementById('academicSearchInput')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      renderPortal();
      const reInput = document.getElementById('academicSearchInput');
      if (reInput) {
        reInput.focus();
        reInput.setSelectionRange(reInput.value.length, reInput.value.length);
      }
    });

    document.querySelectorAll('.academic-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        if (!isNaN(p) && p !== currentPage && !btn.disabled) {
          currentPage = p;
          window.history.pushState(null, '', `#page=${currentPage}`);
          renderPortal();
        }
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    currentPage = parsePageFromUrl();
    renderPortal();
  });
})();
