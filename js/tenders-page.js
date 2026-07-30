(() => {
  const localLink = value => /^(?:[a-z0-9_-]+\.html(?:[?#][^\s]*)?|assets\/[a-z0-9_./-]+(?:[?#][^\s]*)?|#[a-z0-9_-]+)$/i.test(String(value || '').trim());
  const isActive = status => ['active', 'open', 'published', 'ongoing'].includes(String(status || '').toLowerCase());
  let records = [];
  let activeOnly = true;
  let query = '';

  const makeCard = item => {
    const card = document.createElement('article');
    card.className = 'opportunity-record';
    const heading = document.createElement('h3'); heading.textContent = item.title || 'Tender notice';
    const meta = document.createElement('p'); meta.className = 'opportunity-meta'; meta.textContent = [item.tender_no, item.opening_date ? `Published: ${item.opening_date}` : '', item.closing_date ? `Closing: ${item.closing_date}` : ''].filter(Boolean).join(' | ');
    const description = document.createElement('p'); description.textContent = item.description || 'Locally published procurement notice.';
    card.append(heading, meta, description);
    if (localLink(item.document_url)) { const link = document.createElement('a'); link.href = item.document_url; link.textContent = 'Open local tender document'; if (String(item.document_url).startsWith('assets/')) { link.target = '_blank'; link.rel = 'noopener'; } card.appendChild(link); }
    return card;
  };

  const render = () => {
    const active = document.getElementById('tenderList');
    const archive = document.getElementById('tenderArchiveList');
    const matches = item => `${item.title || ''} ${item.tender_no || ''} ${item.description || ''}`.toLowerCase().includes(query);
    const current = records.filter(item => (!activeOnly || isActive(item.status)) && matches(item));
    const archived = records.filter(item => !isActive(item.status) && matches(item));
    if (current.length) active.replaceChildren(...current.map(makeCard));
    if (archived.length) archive.replaceChildren(...archived.map(makeCard));
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const search = document.getElementById('tenderSearch');
    const activeButton = document.getElementById('activeTenderFilter');
    const allButton = document.getElementById('allTenderFilter');
    search?.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });
    activeButton?.addEventListener('click', () => { activeOnly = true; activeButton.classList.add('btn-navy'); allButton?.classList.remove('btn-navy'); render(); });
    allButton?.addEventListener('click', () => { activeOnly = false; allButton.classList.add('btn-navy'); activeButton?.classList.remove('btn-navy'); render(); });
    if (!window.cusbApiUrl) return;
    try { const response = await fetch(window.cusbApiUrl('tenders')); if (!response.ok) throw new Error(); const data = await response.json(); if (Array.isArray(data)) { records = data; render(); } } catch (_) { /* Static empty states remain visible. */ }
  });
})();
