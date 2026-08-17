(function () {
  const departments = window.cusbDepartments || {};
  const aliases = window.cusbDepartmentAliases || {};
  const params = new URLSearchParams(window.location.search);
  const rawSlug = params.get('dept') || '';
  const slug = aliases[rawSlug] || rawSlug.replace(/-/g, '_');
  const requestedType = params.get('type') || '';

  const fallback = {
    name: 'Department',
    school: 'Central University of South Bihar',
    icon: 'graduation',
    summary: 'Explore academic programmes, research areas, and department information.',
    vision: 'Choose a department from the Courses & Programmes page to view detailed information.',
    established: '—',
    programmes: [],
    faculty: [],
    research: ['Teaching', 'Research', 'Field/Lab Practice', 'Student Mentoring']
  };
  const courseTypeLabels = { ug: 'UG Courses', pg: 'PG Courses', integrated: 'Integrated Courses', phd: 'Ph.D. Courses' };
  const schoolImages = [
    { match: 'Mathematics', src: 'assets/images/mathematics-png.jpg' },
    { match: 'Earth', src: 'assets/images/sclab.jpg' },
    { match: 'Human', src: 'assets/images/diversity.webp' },
    { match: 'Social', src: 'assets/images/blockB.jpg' },
    { match: 'Education', src: 'assets/images/admin.jpeg' },
    { match: 'Pharmaceutical', src: 'assets/images/health.webp' },
    { match: 'Languages', src: 'assets/images/libimg.webp' },
    { match: 'Media', src: 'assets/images/audimg.jpg' },
    { match: 'Agriculture', src: 'assets/drone.webp' },
    { match: 'Commerce', src: 'assets/images/admin_good.webp' },
    { match: 'Law', src: 'assets/images/maitreyi.jpeg' },
    { match: 'Physical', src: 'assets/images/sclab.jpg' }
  ];

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || '';
  };
  const programmeType = (programme) => {
    const text = typeof programme === 'string' ? programme.toLowerCase() : `${programme.level || ''} ${programme.name || ''}`.toLowerCase();
    if (text.includes('ph.d') || text.includes('doctoral')) return 'phd';
    if (text.includes('integrated') || text.includes('ll.b')) return 'integrated';
    if (text.includes('b.sc') || text.includes('bachelor') || text.includes('undergraduate')) return 'ug';
    return 'pg';
  };
  const normaliseProgramme = (programme) => typeof programme === 'string'
    ? { name: programme, level: courseTypeLabels[programmeType(programme)] || 'Academic Programme', duration: 'As per ordinance', entrance: 'CUET / CUSB admission process', description: '' }
    : { ...programme, level: programme.level || courseTypeLabels[programmeType(programme)] || 'Academic Programme', duration: programme.duration || 'As per ordinance' };
  const normaliseFaculty = (person) => typeof person === 'string'
    ? { name: person, designation: 'Faculty member', specialization: 'Official departmental faculty directory' }
    : { ...person, designation: person.designation || 'Faculty member', specialization: person.specialization || 'Official departmental faculty directory' };
  const initials = (name) => String(name || 'F').replace(/\b(?:Dr|Prof|Mr|Ms)\.?\s*/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'F';
  const fallbackStatistics = (departmentSlug) => {
    const seed = Array.from(departmentSlug || 'cusb').reduce((sum, character) => sum + character.charCodeAt(0), 0);
    return {
      current_students: 52 + (seed % 47), passed_students: 34 + (seed % 38),
      current_phd_scholars: 8 + (seed % 14), passed_phd_scholars: 6 + (seed % 16),
      is_estimated: true,
      source_note: 'Illustrative placeholder data. Verified department-level enrolment and completion totals were not published in the source academic catalogue.'
    };
  };
  const mergeApiData = (base, apiData) => {
    // The initial catalogue remains the source snapshot. A profile only
    // takes precedence after it has been saved through the complete-profile
    // endpoint, which stamps updated_at and avoids replacing source data with
    // legacy partial database rows.
    if (!apiData || apiData.error) return base;
    if (!apiData.updated_at) {
      // Legacy records can still contribute confirmed people and research areas,
      // while the newer catalogue continues to own programme metadata.
      return {
        ...base,
        faculty: Array.isArray(apiData.faculty) && apiData.faculty.length ? apiData.faculty : (base.faculty || []),
        research: Array.isArray(apiData.research) && apiData.research.length ? apiData.research : (base.research || []),
        statistics: apiData.statistics || base.statistics
      };
    }
    const merged = { ...base, ...apiData };
    ['programmes', 'faculty', 'research'].forEach((field) => {
      if (!Array.isArray(apiData[field]) || apiData[field].length === 0) merged[field] = base[field] || [];
    });
    return merged;
  };

  function renderStatistics(data) {
    const statistics = data.statistics || fallbackStatistics(slug);
    const metrics = [
      { label: 'Students', current: Number(statistics.current_students || 0), completed: Number(statistics.passed_students || 0), colour: 'var(--acc-teal)' },
      { label: 'Ph.D. scholars', current: Number(statistics.current_phd_scholars || 0), completed: Number(statistics.passed_phd_scholars || 0), colour: 'var(--acc-coral)' }
    ];
    const metricsGrid = document.getElementById('studentMetrics');
    if (metricsGrid) {
      metricsGrid.innerHTML = metrics.map((metric) => {
        const total = Math.max(metric.current + metric.completed, 1);
        const completedPercent = Math.round((metric.completed / total) * 100);
        return `
          <article class="department-stat-card">
            <div class="department-pie" style="--completed:${completedPercent}; --chart-colour:${metric.colour};" aria-label="${escapeHtml(metric.label)}: ${metric.current} current and ${metric.completed} completed">
              <div class="department-pie-center"><strong>${metric.current}</strong><span>current</span></div>
            </div>
            <div class="department-stat-copy">
              <h3>${escapeHtml(metric.label)}</h3>
              <p><span class="department-stat-key current-key"></span><strong>${metric.current}</strong> currently enrolled</p>
              <p><span class="department-stat-key complete-key" style="--chart-colour:${metric.colour};"></span><strong>${metric.completed}</strong> completed / passed</p>
            </div>
          </article>`;
      }).join('');
    }
    setText('statisticsNote', statistics.source_note || (statistics.is_estimated ? 'Illustrative placeholder data.' : 'Department statistics from the content system.'));
  }

  function render(data) {
    const pageTitle = `${data.name} Department - CUSB`;
    document.title = pageTitle;
    setText('pageTitle', pageTitle);
    setText('deptSchool', data.school);
    const deptTitle = document.getElementById('deptTitle');
    if (deptTitle) deptTitle.innerHTML = `Department of<br><span>${escapeHtml(data.name)}</span>`;
    setText('deptSummary', data.summary);
    setText('deptVision', data.vision);

    const heroSec = document.querySelector('.dept-page-hero') || document.querySelector('.admin-hero');
    if (heroSec && data.heroImage) heroSec.style.setProperty('--hero-image', `url('${data.heroImage}')`);
    const departmentImage = data.image || (schoolImages.find((item) => String(data.school || '').includes(item.match)) || {}).src || 'assets/images/blockB.jpg';
    const deptImage = document.getElementById('deptImage');
    if (deptImage) { deptImage.src = departmentImage; deptImage.alt = `${data.name} department learning space`; }

    const programmes = (data.programmes || []).map(normaliseProgramme);
    const facts = document.getElementById('deptFacts');
    if (facts) facts.innerHTML = `
      <tr><td>Established</td><td>${escapeHtml(data.established || '—')}</td></tr>
      <tr><td>School</td><td>${escapeHtml(data.school || 'Central University of South Bihar')}</td></tr>
      <tr><td>Programmes</td><td>${programmes.length}</td></tr>
      <tr><td>Faculty strength</td><td>${escapeHtml(data.facultyStrength || `${(data.faculty || []).length || '—'} listed`)}</td></tr>
      <tr><td>Admission mode</td><td>${escapeHtml(data.admission_mode || 'CUET / university admission process as applicable')}</td></tr>`;

    renderStatistics(data);
    const faculty = (data.faculty || []).map(normaliseFaculty);
    const facultyGrid = document.getElementById('facultyGrid');
    if (facultyGrid) {
      facultyGrid.innerHTML = faculty.length ? faculty.map((person) => {
        const profileUrl = (person.profile_url && person.profile_url !== '#') ? person.profile_url : 'https://people.samarth.edu.in/';
        const isExternal = /^https?:\/\//i.test(profileUrl);
        const targetAttr = isExternal ? ' target="_blank" rel="noopener"' : '';
        const btnTextEn = isExternal ? 'View Profile ↗' : 'View Profile';
        const btnTextHi = isExternal ? 'प्रोफ़ाइल देखें ↗' : 'प्रोफ़ाइल देखें';
        return `
        <article class="faculty-card department-faculty-card">
          ${person.image_url ? `<img class="faculty-img" src="${escapeHtml(person.image_url)}" alt="${escapeHtml(person.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/culog.png';">` : `<div class="department-faculty-avatar" aria-hidden="true">${escapeHtml(initials(person.name))}</div>`}
          <h3 class="faculty-name">${escapeHtml(person.name)}</h3>
          <p class="faculty-designation">${escapeHtml(person.designation)}</p>
          <p class="faculty-specialization">${escapeHtml(person.specialization)}</p>
          ${person.qualification ? `<p class="faculty-specialization"><strong>Qualification:</strong> ${escapeHtml(person.qualification)}</p>` : ''}
          ${person.email ? `<a class="department-email" href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a>` : ''}
          <div class="faculty-profile-box">
            <a href="${escapeHtml(profileUrl)}"${targetAttr} class="faculty-profile-btn" data-en="${btnTextEn}" data-hi="${btnTextHi}">${btnTextEn}</a>
          </div>
        </article>`;
      }).join('') : `
        <article class="department-empty-card">
          <h3>Faculty directory update</h3>
          <p>The departmental profile is ready for faculty records from the content system. No names are shown here until they have been verified.</p>
        </article>`;
    }
    setText('facultyStatus', data.facultyStrength ? `${data.facultyStrength}. Named profiles below are from the official faculty pages where available.` : 'Named profiles are shown only when verified; this list can be updated from the content system.');

    const researchGrid = document.getElementById('researchGrid');
    if (researchGrid) researchGrid.innerHTML = (data.research || []).map((area) => `
      <article class="faculty-card dept-research-card">
        <div class="dept-research-icon" aria-hidden="true"><svg class="svg-icon" viewBox="0 0 24 24"><use href="#icon-${escapeHtml(data.icon || 'graduation')}"></use></svg></div>
        <h3 class="faculty-name">${escapeHtml(area)}</h3>
        <p class="faculty-designation">Research focus</p>
        <p class="faculty-specialization">Teaching, projects, and supervision are aligned with this academic area.</p>
      </article>`).join('');

    const programmesGrid = document.getElementById('programmesGrid');
    if (programmesGrid) {
      const visibleProgrammes = requestedType ? programmes.filter((programme) => programmeType(programme) === requestedType) : programmes;
      const programmesTitle = document.getElementById('titleProgrammes');
      if (programmesTitle && requestedType && courseTypeLabels[requestedType]) programmesTitle.textContent = `${courseTypeLabels[requestedType]} - ${data.name}`;
      programmesGrid.innerHTML = visibleProgrammes.length ? visibleProgrammes.map((programme) => {
        const type = programmeType(programme);
        const syllabusAction = programme.syllabus_url
          ? `<a href="${escapeHtml(programme.syllabus_url)}" class="pyq-download-btn" target="_blank" rel="noopener"><svg class="svg-icon" viewBox="0 0 24 24"><use href="#icon-file"></use></svg><span>Open Syllabus</span></a>`
          : `<span class="department-syllabus-pending">Syllabus document is awaiting publication.</span>`;
        return `
          <article class="pyq-card department-programme-card">
            <div class="pyq-card-header"><span class="pyq-course-code">${escapeHtml(programme.level)}</span><h3 class="pyq-course-name">${escapeHtml(programme.name)}</h3></div>
            <div class="pyq-details">
              <div><strong>Duration:</strong> ${escapeHtml(programme.duration)}</div>
              <div><strong>Entrance:</strong> ${escapeHtml(programme.entrance || 'CUET / CUSB rules')}</div>
              <div><strong>Level:</strong> ${escapeHtml(courseTypeLabels[type] || programme.level)}</div>
            </div>
            ${programme.description ? `<p class="department-programme-description">${escapeHtml(programme.description)}</p>` : ''}
            ${syllabusAction}
          </article>`;
      }).join('') : `
        <article class="pyq-card"><div class="pyq-card-header"><span class="pyq-course-code">Not listed</span><h3 class="pyq-course-name">No ${escapeHtml(courseTypeLabels[requestedType] || 'selected programmes')} listed for this department.</h3></div><a href="courses.html" class="pyq-download-btn">View All Courses</a></article>`;
    }
  }

  const baseData = departments[slug] || fallback;
  Promise.resolve(window.cusbFacultyDirectoryPromise || {})
    .then((directory) => {
      const facultyDirectoryKey = slug === 'social_work' ? 'sociological_studies' : slug;
      const officialFaculty = Array.isArray(directory[facultyDirectoryKey]) ? directory[facultyDirectoryKey].map(([name, designation, specialization, qualification, image_url, profile_url]) => ({ name, designation, specialization, qualification, image_url, profile_url })) : [];
      const sourceData = officialFaculty.length ? { ...baseData, faculty: officialFaculty, facultyStrength: `${officialFaculty.length} official faculty profiles` } : baseData;
      render(sourceData);
      if (!departments[slug]) setText('deptSummary', 'Department not found. Please choose a department from the Courses & Programmes page to view detailed information.');

      if (departments[slug] && window.location.protocol !== 'file:') {
        fetch(window.cusbApiUrl(`departments?dept=${encodeURIComponent(slug)}`))
          .then((response) => response.ok ? response.json() : null)
          .then((apiData) => { if (apiData) render(mergeApiData(sourceData, apiData)); })
          .catch(() => { /* The verified directory remains available if the API is offline. */ });
      }
    });
})();
