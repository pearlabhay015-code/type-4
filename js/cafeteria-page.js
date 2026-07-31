(() => {
  const isCafeteriaUpdate = item => /cafeteria|canteen|madhuban|food|juice|dining/i.test([
    item?.title_en,
    item?.desc_en,
    item?.type
  ].join(' '));

  const makeNotice = item => {
    const card = document.createElement('article');
    card.className = 'cafeteria-notice-card';
    const type = document.createElement('span'); type.textContent = item.type || 'Cafeteria update';
    const title = document.createElement('h3'); title.textContent = item.title_en || 'Cafeteria update';
    const description = document.createElement('p'); description.textContent = item.desc_en || 'A locally published cafeteria update is available.';
    const date = document.createElement('small'); date.textContent = item.date_str || '';
    card.append(type, title, description);
    if (date.textContent) card.appendChild(date);
    return card;
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const feed = document.getElementById('cafeteriaNoticeFeed');
    if (!feed || !window.cusbApiUrl) return;
    try {
      const response = await fetch(window.cusbApiUrl('announcements'));
      const records = response.ok ? await response.json() : [];
      const updates = Array.isArray(records) ? records.filter(isCafeteriaUpdate).slice(0, 6) : [];
      if (updates.length) feed.replaceChildren(...updates.map(makeNotice));
    } catch (_) {
      // Keep the clear local empty state when the local service is unavailable.
    }
  });
})();
