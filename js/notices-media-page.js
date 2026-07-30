(() => {
  const localImage = value => /^assets\/[a-z0-9_./-]+$/i.test(String(value || '').trim());
  const asType = item => String(item.type || '').toLowerCase();

  const makeCard = item => {
    const card = document.createElement('article');
    card.className = 'media-record';
    if (localImage(item.image_url)) {
      const image = document.createElement('img');
      image.src = item.image_url; image.alt = item.title_en || 'Campus update';
      card.appendChild(image);
    }
    const content = document.createElement('div');
    const type = document.createElement('span'); type.textContent = item.type || 'Update';
    const title = document.createElement('h3'); title.textContent = item.title_en || 'Campus update';
    const description = document.createElement('p'); description.textContent = item.desc_en || 'A locally published University update is available.';
    const date = document.createElement('small'); date.textContent = item.date_str || '';
    content.append(type, title, description);
    if (date.textContent) content.appendChild(date);
    card.appendChild(content);
    return card;
  };

  const populate = (id, items) => {
    const container = document.getElementById(id);
    if (container && items.length) container.replaceChildren(...items.map(makeCard));
  };

  document.addEventListener('DOMContentLoaded', async () => {
    if (!window.cusbApiUrl) return;
    try {
      const [currentResponse, archivedResponse, galleryResponse] = await Promise.all([
        fetch(window.cusbApiUrl('announcements')),
        fetch(`${window.cusbApiUrl('announcements')}?archive=true`),
        fetch(window.cusbApiUrl('gallery'))
      ]);
      const current = currentResponse.ok ? await currentResponse.json() : [];
      const archived = archivedResponse.ok ? await archivedResponse.json() : [];
      const gallery = galleryResponse.ok ? await galleryResponse.json() : [];
      const items = Array.isArray(current) ? current : [];
      const events = items.filter(item => asType(item).includes('event'));
      populate('noticeFeed', items.filter(item => !asType(item).includes('event') && !asType(item).includes('circular')).slice(0, 12));
      populate('upcomingFeed', events.slice(0, 12));
      populate('recentFeed', events.slice(0, 6));
      populate('highlightsFeed', items.filter(item => /academic|highlight|research/.test(asType(item))).slice(0, 12));
      populate('circularFeed', items.filter(item => /circular|notification|office/.test(asType(item))).slice(0, 12));
      populate('archivedFeed', (Array.isArray(archived) ? archived : []).filter(item => asType(item).includes('event')).slice(0, 12));

      const galleryContainer = document.getElementById('photoGallery');
      const localGallery = Array.isArray(gallery) ? gallery.filter(item => localImage(item.image_url)).slice(0, 18) : [];
      if (galleryContainer && localGallery.length) {
        galleryContainer.replaceChildren(...localGallery.map(item => {
          const figure = document.createElement('figure');
          const image = document.createElement('img'); image.src = item.image_url; image.alt = item.title_en || 'CUSB campus image';
          const caption = document.createElement('figcaption'); caption.textContent = item.title_en || 'Campus image';
          figure.append(image, caption); return figure;
        }));
      }
    } catch (_) {
      // The static empty states remain clear when local data services are unavailable.
    }
  });
})();
