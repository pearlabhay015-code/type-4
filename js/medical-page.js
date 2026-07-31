(() => {
  const isMedicalUpdate = item => /health|medical|hospital|wellness|counselling|ambulance|medicine|vaccin/i.test([
    item?.title_en,
    item?.desc_en,
    item?.type
  ].join(' '));

  const makeNotice = item => {
    const card = document.createElement('article');
    card.className = 'medical-notice-card';
    const type = document.createElement('span'); type.textContent = item.type || 'Health update';
    const title = document.createElement('h3'); title.textContent = item.title_en || 'Health update';
    const description = document.createElement('p'); description.textContent = item.desc_en || 'A locally published health update is available.';
    const date = document.createElement('small'); date.textContent = item.date_str || '';
    card.append(type, title, description);
    if (date.textContent) card.appendChild(date);
    return card;
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const feed = document.getElementById('medicalNoticeFeed');
    if (!feed || !window.cusbApiUrl) return;
    try {
      const response = await fetch(window.cusbApiUrl('announcements'));
      const records = response.ok ? await response.json() : [];
      const updates = Array.isArray(records) ? records.filter(isMedicalUpdate).slice(0, 6) : [];
      if (updates.length) feed.replaceChildren(...updates.map(makeNotice));
    } catch (_) {
      // Keep the clear local empty state when the local service is unavailable.
    }
  });
})();
