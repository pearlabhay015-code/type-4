/**
 * Central University of South Bihar — Circulars, Notifications & Office Orders Controller
 */
(() => {
  let allCirculars = window.CUSB_CIRCULARS_DATA || [];
  let currentCategory = 'all';
  let searchQuery = '';

  const getFilteredItems = () => {
    return allCirculars.filter(it => {
      const matchCat = (currentCategory === 'all') || (it.categoryKey === currentCategory);
      const q = searchQuery.trim().toLowerCase();
      const matchQuery = !q || it.title.toLowerCase().includes(q) || (it.type && it.type.toLowerCase().includes(q)) || (it.orderNo && it.orderNo.toLowerCase().includes(q)) || (it.description && it.description.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  };

  const showDetailModal = (id) => {
    const item = allCirculars.find(e => e.id === Number(id));
    if (!item) return;

    let modalOverlay = document.getElementById('circularDetailModal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'circularDetailModal';
      modalOverlay.className = 'circulars-modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    modalOverlay.innerHTML = `
      <div class="circulars-modal" role="dialog" aria-modal="true">
        <button id="closeCirModalBtn" type="button" style="position: absolute; top: 18px; right: 18px; border: none; background: transparent; font-size: 1.3rem; cursor: pointer; color: var(--cir-text-muted);">&times;</button>
        <span style="font-size: 0.75rem; font-weight: 700; background: var(--cir-accent-soft); color: var(--cir-accent); padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">${item.type}</span>
        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--cir-text-main); margin: 8px 0 12px; line-height: 1.35;">${item.title}</h2>
        <div style="background: var(--cir-bg); border: 1px solid var(--cir-border); border-radius: 8px; padding: 12px; font-size: 0.84rem; margin-bottom: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div><strong style="color: var(--cir-text-muted); display: block; font-size: 0.72rem;">REF / ORDER NO.</strong><span>${item.orderNo || 'N/A'}</span></div>
          <div><strong style="color: var(--cir-text-muted); display: block; font-size: 0.72rem;">DISPATCH DATE</strong><span>${item.date || 'Current Session'}</span></div>
          <div><strong style="color: var(--cir-text-muted); display: block; font-size: 0.72rem;">ISSUING AUTHORITY</strong><span>${item.author || 'PRO / Media Cell'}</span></div>
          <div><strong style="color: var(--cir-text-muted); display: block; font-size: 0.72rem;">STATUS</strong><span style="color: #059669; font-weight: 700;">● Active / Official</span></div>
        </div>
        <p style="font-size: 0.9rem; color: var(--cir-text-sub); line-height: 1.6; margin: 0 0 16px;">${item.description || ''}</p>
        <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid var(--cir-border); padding-top: 14px;">
          <button type="button" class="btn btn-white" onclick="window.print()" style="font-size: 0.84rem; padding: 6px 14px;">🖨️ Print Order</button>
          <a href="${item.link || '#'}" target="_blank" class="btn btn-gold" style="font-size: 0.84rem; padding: 6px 16px;">Download PDF ↗</a>
        </div>
      </div>
    `;

    requestAnimationFrame(() => modalOverlay.classList.add('open'));
    modalOverlay.querySelector('#closeCirModalBtn')?.addEventListener('click', () => modalOverlay.classList.remove('open'));
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('open'); });
  };

  const renderTableRows = (items) => {
    if (!items.length) {
      return `<tr><td colspan="2" style="text-align: center; padding: 32px; color: var(--cir-text-muted);">No circulars or notifications found.</td></tr>`;
    }
    return items.map(item => `
      <tr data-cir-id="${item.id}" title="Click to view full order details">
        <td>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 600; color: var(--cir-text-main); font-size: 0.92rem;">${item.title}</span>
            <div style="display: flex; gap: 8px; font-size: 0.75rem; color: var(--cir-text-muted);">
              ${item.type ? `<span style="background: var(--cir-accent-soft); color: var(--cir-accent); padding: 2px 6px; border-radius: 4px; font-weight: 600;">${item.type}</span>` : ''}
              ${item.date ? `<span>📅 ${item.date}</span>` : ''}
              ${item.orderNo ? `<span>Ref: ${item.orderNo}</span>` : ''}
            </div>
          </div>
        </td>
        <td style="color: var(--cir-text-sub); font-size: 0.88rem;">${item.author || 'Written by: mrahman'}</td>
      </tr>
    `).join('');
  };

  const renderPortal = () => {
    const mount = document.getElementById('circularsPortalMount');
    if (!mount) return;

    const filtered = getFilteredItems();

    mount.innerHTML = `
      <section class="circulars-section">
        <div class="container">
          <nav style="display: flex; gap: 8px; font-size: 0.85rem; margin-bottom: 20px; color: var(--cir-text-muted);">
            <a href="index.html" style="color: var(--cir-text-sub); text-decoration: none;">Home</a>
            <span>/</span>
            <a href="about.html" style="color: var(--cir-text-sub); text-decoration: none;">About CUSB</a>
            <span>/</span>
            <span style="color: var(--cir-text-main); font-weight: 600;">Circular / Notification / Office Order</span>
          </nav>

          <div class="circulars-header-card">
            <div>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--cir-accent); background: var(--cir-accent-soft); padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">Official Gazettes &amp; Orders</span>
              <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--cir-text-main); margin: 0 0 6px;">Circular / Notification / Office Order</h1>
              <p style="font-size: 0.92rem; color: var(--cir-text-muted); margin: 0;">Official institutional circulars, statutory notifications, administrative office orders, safety advisories, and public self-disclosures issued by Central University of South Bihar.</p>
            </div>
            <div style="display: flex; gap: 10px;">
              <div style="background: var(--cir-bg); border: 1px solid var(--cir-border); border-radius: 8px; padding: 8px 14px; text-align: center;">
                <span style="display: block; font-size: 1.2rem; font-weight: 800; color: var(--cir-text-main);">${allCirculars.length}</span>
                <span style="font-size: 0.7rem; color: var(--cir-text-muted); text-transform: uppercase;">Published Gazettes</span>
              </div>
            </div>
          </div>

          <!-- Category Chips -->
          <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 16px;">
            <button class="btn btn-white ${currentCategory === 'all' ? 'active' : ''}" data-cat="all" style="font-size: 0.8rem; padding: 6px 14px; border-radius: 20px;">All Gazettes (${allCirculars.length})</button>
            <button class="btn btn-white ${currentCategory === 'office-order' ? 'active' : ''}" data-cat="office-order" style="font-size: 0.8rem; padding: 6px 14px; border-radius: 20px;">Office Orders</button>
            <button class="btn btn-white ${currentCategory === 'advisory' ? 'active' : ''}" data-cat="advisory" style="font-size: 0.8rem; padding: 6px 14px; border-radius: 20px;">Safety Advisories</button>
            <button class="btn btn-white ${currentCategory === 'sports' ? 'active' : ''}" data-cat="sports" style="font-size: 0.8rem; padding: 6px 14px; border-radius: 20px;">Sports &amp; Trials</button>
            <button class="btn btn-white ${currentCategory === 'disclosure' ? 'active' : ''}" data-cat="disclosure" style="font-size: 0.8rem; padding: 6px 14px; border-radius: 20px;">Public Disclosures</button>
          </div>

          <div style="background: var(--cir-card-bg); border: 1px solid var(--cir-border); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
            <span>🔍</span>
            <input type="search" id="cirSearchInput" placeholder="Search circulars, notifications, office orders, advisories..." value="${searchQuery}" style="width: 100%; border: none; background: transparent; font-size: 0.9rem; color: var(--cir-text-main); outline: none;">
          </div>

          <div class="circulars-table-card">
            <table class="circulars-table">
              <thead>
                <tr>
                  <th class="col-title">Title</th>
                  <th class="col-author">Author</th>
                </tr>
              </thead>
              <tbody>
                ${renderTableRows(filtered)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;

    document.getElementById('cirSearchInput')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPortal();
      const reInput = document.getElementById('cirSearchInput');
      if (reInput) {
        reInput.focus();
        reInput.setSelectionRange(reInput.value.length, reInput.value.length);
      }
    });

    document.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-cat');
        renderPortal();
      });
    });

    document.querySelectorAll('[data-cir-id]').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-cir-id');
        if (id) showDetailModal(id);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', renderPortal);
})();
