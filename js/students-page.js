(() => {
  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('studentUpdates');
    if (!container || !window.cusbApiUrl) return;

    try {
      const response = await fetch(window.cusbApiUrl('announcements'));
      if (!response.ok) throw new Error('Student announcements are unavailable.');
      const notices = await response.json();
      const visibleNotices = Array.isArray(notices) ? notices.slice(0, 6) : [];
      if (!visibleNotices.length) return;

      container.replaceChildren();
      visibleNotices.forEach(notice => {
        const card = document.createElement('article');
        card.className = 'student-update-card';
        const type = document.createElement('span');
        type.textContent = notice.type || 'Student notice';
        const title = document.createElement('h3');
        title.textContent = notice.title_en || 'Student update';
        const description = document.createElement('p');
        description.textContent = notice.desc_en || 'A student update is available.';
        card.append(type, title, description);
        container.appendChild(card);
      });
    } catch (_) {
      // Static Student Corner resources remain available if notice data is unavailable.
    }
  });
})();
