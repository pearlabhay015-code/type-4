(() => {
  const localLink = value => /^(?:[a-z0-9_-]+\.html(?:[?#][^\s]*)?|assets\/[a-z0-9_./-]+(?:[?#][^\s]*)?|#[a-z0-9_-]+)$/i.test(String(value || '').trim());
  const isActive = status => ['active', 'open', 'published', 'ongoing'].includes(String(status || '').toLowerCase());

  const recordCard = item => {
    const card = document.createElement('article');
    card.className = 'opportunity-record';
    const heading = document.createElement('h3');
    heading.textContent = item.title || item.post_name || 'Recruitment notice';
    const meta = document.createElement('p');
    meta.className = 'opportunity-meta';
    meta.textContent = [item.post_name, item.advertisement_no, item.closing_date ? `Closing: ${item.closing_date}` : ''].filter(Boolean).join(' | ');
    const description = document.createElement('p');
    description.textContent = item.description || 'Published recruitment notice.';
    card.append(heading, meta, description);
    [['document_url', 'Open notification'], ['apply_url', 'Open application page']].forEach(([key, label]) => {
      if (!localLink(item[key])) return;
      const link = document.createElement('a');
      link.href = item[key]; link.textContent = label;
      if (String(item[key]).startsWith('assets/')) { link.target = '_blank'; link.rel = 'noopener'; }
      card.appendChild(link);
    });
    return card;
  };

  const render = (container, records) => {
    if (container && records.length) container.replaceChildren(...records.map(recordCard));
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const active = document.getElementById('recruitmentList');
    const archive = document.getElementById('recruitmentArchiveList');
    if (!window.cusbApiUrl) return;
    try {
      const response = await fetch(window.cusbApiUrl('recruitment'));
      if (!response.ok) throw new Error('Recruitment records are unavailable.');
      const records = await response.json();
      if (!Array.isArray(records)) return;
      render(active, records.filter(item => isActive(item.status)));
      render(archive, records.filter(item => !isActive(item.status)));
    } catch (_) {
      // Static empty states explain the publication workflow when the API is offline.
    }
  });
})();
