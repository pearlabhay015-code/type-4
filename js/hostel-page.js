(() => {
  const isHostelNotice = item => /hostel|allotment|residen|warden|mess/i.test([
    item?.title_en,
    item?.desc_en,
    item?.type
  ].join(' '));

  const makeNotice = item => {
    const card = document.createElement('article');
    card.className = 'hostel-notice-card';
    const label = document.createElement('span');
    label.textContent = item.type || 'Hostel update';
    const title = document.createElement('h3');
    title.textContent = item.title_en || 'Hostel update';
    const description = document.createElement('p');
    description.textContent = item.desc_en || 'A locally published hostel update is available.';
    const date = document.createElement('small');
    date.textContent = item.date_str || '';
    card.append(label, title, description);
    if (date.textContent) card.appendChild(date);
    return card;
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const feed = document.getElementById('hostelNoticeFeed');
    if (!feed || !window.cusbApiUrl) return;
    try {
      const response = await fetch(window.cusbApiUrl('announcements'));
      const records = response.ok ? await response.json() : [];
      const notices = Array.isArray(records) ? records.filter(isHostelNotice).slice(0, 6) : [];
      if (notices.length) feed.replaceChildren(...notices.map(makeNotice));
    } catch (_) {
      // Keep the clear static empty state when the local service is unavailable.
    }
  });
})();
