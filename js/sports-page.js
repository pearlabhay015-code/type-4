(() => {
  const isSportsUpdate = item => /sport|athlet|fitness|game|tournament|championship|khel|yoga|gym/i.test([
    item?.title_en,
    item?.desc_en,
    item?.type
  ].join(' '));

  const makeNotice = item => {
    const card = document.createElement('article');
    card.className = 'sports-notice-card';
    const type = document.createElement('span'); type.textContent = item.type || 'Sports update';
    const title = document.createElement('h3'); title.textContent = item.title_en || 'Sports update';
    const description = document.createElement('p'); description.textContent = item.desc_en || 'A published sports update is available.';
    const date = document.createElement('small'); date.textContent = item.date_str || '';
    card.append(type, title, description);
    if (date.textContent) card.appendChild(date);
    return card;
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const feed = document.getElementById('sportsNoticeFeed');
    if (!feed || !window.cusbApiUrl) return;
    try {
      const response = await fetch(window.cusbApiUrl('announcements'));
      const records = response.ok ? await response.json() : [];
      const updates = Array.isArray(records) ? records.filter(isSportsUpdate).slice(0, 6) : [];
      if (updates.length) feed.replaceChildren(...updates.map(makeNotice));
    } catch (_) {
      // Keep the clear empty state when the service is unavailable.
    }
  });
})();
