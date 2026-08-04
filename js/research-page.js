(() => {
  const appendText = (parent, tag, value, className) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    parent.appendChild(element);
  };

  const makeRecord = (title, meta, summary) => {
    const card = document.createElement('article');
    card.className = 'research-live-record';
    appendText(card, 'h4', title || 'Research record');
    if (meta) appendText(card, 'span', meta, 'research-live-meta');
    if (summary) appendText(card, 'p', summary);
    return card;
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const projectsContainer = document.getElementById('researchProjects');
    const publicationsContainer = document.getElementById('researchPublications');
    if (!projectsContainer || !publicationsContainer || !window.cusbApiUrl) return;

    try {
      const response = await fetch(window.cusbApiUrl('research'));
      if (!response.ok) throw new Error('Research records are unavailable.');
      const data = await response.json();
      const projects = Array.isArray(data.projects) ? data.projects.slice(0, 6) : [];
      const publications = Array.isArray(data.publications) ? data.publications.slice(0, 6) : [];

      if (projects.length) {
        projectsContainer.replaceChildren();
        projects.forEach(project => {
          const meta = [project.department_slug, project.funding_agency].filter(Boolean).join(' - ');
          projectsContainer.appendChild(makeRecord(project.title, meta, project.summary));
        });
      }
      if (publications.length) {
        publicationsContainer.replaceChildren();
        publications.forEach(publication => {
          const meta = [publication.faculty_name, publication.publication_year, publication.journal_or_publisher].filter(Boolean).join(' - ');
          publicationsContainer.appendChild(makeRecord(publication.title, meta, publication.authors));
        });
      }
    } catch (_) {
      // Static research information remains available when API records are unavailable.
    }
  });
})();
