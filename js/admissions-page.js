(() => {
  const isLocalLink = value => /^(?:[a-z0-9_-]+\.html(?:[?#][^\s]*)?|assets\/[a-z0-9_./-]+(?:[?#][^\s]*)?|#[a-z0-9_-]+)$/i.test(String(value || '').trim());

  const addLink = (card, href, label) => {
    if (!isLocalLink(href)) return;
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (/^assets\//i.test(href)) {
      link.target = '_blank';
      link.rel = 'noopener';
    }
    card.appendChild(link);
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('localAdmissionUpdates');
    if (!container || !window.cusbApiUrl) return;

    try {
      const response = await fetch(window.cusbApiUrl('admissions'));
      if (!response.ok) throw new Error('Unable to load local updates.');
      const updates = await response.json();
      const published = Array.isArray(updates)
        ? updates.filter(item => item && item.status === 'published').slice(0, 8)
        : [];
      if (!published.length) return;

      container.replaceChildren();
      published.forEach(item => {
        const card = document.createElement('article');
        card.className = 'admission-update-card';
        const year = document.createElement('span');
        year.textContent = item.academic_year || 'Admission update';
        const title = document.createElement('h3');
        title.textContent = item.title || 'Admission update';
        const description = document.createElement('p');
        description.textContent = item.description || 'A locally published admission update is available.';
        card.append(year, title, description);
        addLink(card, item.brochure_url, 'Open local document');
        addLink(card, item.apply_url, 'Open local application page');
        container.appendChild(card);
      });
    } catch (_) {
      // The static 2026-27 archive remains available when the optional local feed is offline.
    }
  });
})();
