(function () {
  const departments = window.cusbDepartments || {};
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('dept') || '';
  const requestedType = params.get('type') || '';
  const dept = departments[slug];

  const fallback = {
    name: 'Department',
    school: 'Central University of South Bihar',
    icon: 'graduation',
    summary: 'Explore academic programmes, research areas, and department information.',
    vision: 'Choose a department from the Courses & Programmes page to view detailed information.',
    established: '2009',
    programmes: ['Undergraduate Programmes', 'Postgraduate Programmes', 'Ph.D. Programmes'],
    research: ['Teaching', 'Research', 'Field/Lab Practice', 'Student Mentoring']
  };

  const data = dept || fallback;
  const courseTypeLabels = {
    ug: 'UG Courses',
    pg: 'PG Courses',
    integrated: 'Integrated Courses',
    phd: 'Ph.D. Courses'
  };
  const programmeType = (programme) => {
    const text = programme.toLowerCase();
    if (text.includes('ph.d')) return 'phd';
    if (text.includes('integrated') || text.includes('b.a. ll.b')) return 'integrated';
    if (text.includes('m.') || text.includes('master') || text.includes('mba') || text.includes('ll.m')) return 'pg';
    if (text.includes('b.') || text.includes('bachelor')) return 'ug';
    return 'pg';
  };
  const schoolImages = [
    { match: 'Mathematics', src: 'assets/images/mathematics-png.jpg' },
    { match: 'Earth', src: 'assets/images/sclab.jpg' },
    { match: 'Human', src: 'assets/images/diversity.webp' },
    { match: 'Social', src: 'assets/images/blockB.jpg' },
    { match: 'Education', src: 'assets/images/admin.jpeg' },
    { match: 'Pharmaceutical', src: 'assets/images/health.webp' },
    { match: 'Languages', src: 'assets/images/libimg.avif' },
    { match: 'Media', src: 'assets/images/audimg.jpg' },
    { match: 'Agriculture', src: 'assets/drone.png' },
    { match: 'Commerce', src: 'assets/images/admin_good.jpeg' },
    { match: 'Law', src: 'assets/images/maitreyi.jpeg' },
    { match: 'Physical', src: 'assets/images/sclab.jpg' }
  ];
  const departmentImage = data.image || (schoolImages.find(item => data.school.includes(item.match)) || {}).src || 'assets/images/blockB.jpg';

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const pageTitle = `${data.name} Department - CUSB`;
  document.title = pageTitle;
  setText('pageTitle', pageTitle);
  setText('deptSchool', data.school);
  document.getElementById('deptTitle').innerHTML = `Department of<br><span>${data.name}</span>`;
  setText('deptSummary', data.summary);
  setText('deptVision', data.vision);

  // Set per-department hero section background image
  const heroSec = document.querySelector('.dept-page-hero') || document.querySelector('.admin-hero');
  if (heroSec && data.heroImage) {
    heroSec.style.setProperty('--hero-image', `url('${data.heroImage}')`);
  }

  const deptImage = document.getElementById('deptImage');
  if (deptImage) {
    deptImage.src = departmentImage;
    deptImage.alt = `${data.name} department learning space`;
  }

  const facts = document.getElementById('deptFacts');
  if (facts) {
    facts.innerHTML = `
      <tr><td>Established</td><td>${data.established}</td></tr>
      <tr><td>School</td><td>${data.school}</td></tr>
      <tr><td>Programmes</td><td>${data.programmes.join(' - ')}</td></tr>
      <tr><td>Admission Mode</td><td>CUET / university admission process as applicable</td></tr>
    `;
  }

  const researchGrid = document.getElementById('researchGrid');
  if (researchGrid) {
    researchGrid.innerHTML = data.research.map((area) => `
      <div class="faculty-card dept-research-card">
        <div class="dept-research-icon" aria-hidden="true">
          <svg class="svg-icon" viewBox="0 0 24 24"><use href="#icon-${data.icon || 'graduation'}"></use></svg>
        </div>
        <h3 class="faculty-name">${area}</h3>
        <div class="faculty-designation">Research Focus</div>
        <div class="faculty-specialization">Teaching, projects, and supervision are aligned with this academic area.</div>
      </div>
    `).join('');
  }

  const programmesGrid = document.getElementById('programmesGrid');
  if (programmesGrid) {
    const visibleProgrammes = requestedType
      ? data.programmes.filter((programme) => programmeType(programme) === requestedType)
      : data.programmes;
    const programmesTitle = document.getElementById('titleProgrammes');
    if (programmesTitle && requestedType && courseTypeLabels[requestedType]) {
      programmesTitle.textContent = `${courseTypeLabels[requestedType]} - ${data.name}`;
    }
    programmesGrid.innerHTML = visibleProgrammes.length ? visibleProgrammes.map((programme) => `
      <div class="pyq-card">
        <div class="pyq-card-header">
          <span class="pyq-course-code">${programmeType(programme) === 'phd' ? 'Doctoral' : programmeType(programme) === 'pg' ? 'Postgraduate' : programmeType(programme) === 'ug' ? 'Undergraduate' : 'Integrated'}</span>
          <h3 class="pyq-course-name">${programme}</h3>
        </div>
        <div class="pyq-details">
          <div><strong>Duration:</strong> As per ordinance</div>
          <div><strong>Entrance:</strong> CUET / CUSB rules</div>
          <div><strong>Mode:</strong> Full-time</div>
          <div><strong>Level:</strong> ${courseTypeLabels[programmeType(programme)] || 'Academic Programme'}</div>
        </div>
        <p style="font-size:0.75rem; color:var(--tx-secondary); line-height:1.5;">This programme follows the university curriculum structure and academic regulations for the department.</p>
        <a href="courses.html" class="pyq-download-btn">
          <svg class="svg-icon" viewBox="0 0 24 24"><use href="#icon-file"></use></svg>
          <span>Download Syllabus</span>
        </a>
      </div>
    `).join('') : `
      <div class="pyq-card">
        <div class="pyq-card-header">
          <span class="pyq-course-code">Not Offered</span>
          <h3 class="pyq-course-name">No ${courseTypeLabels[requestedType] || 'selected programmes'} listed for this department.</h3>
        </div>
        <p style="font-size:0.85rem; color:var(--tx-secondary); line-height:1.6;">Please choose another course type or return to the complete courses list.</p>
        <a href="courses.html" class="pyq-download-btn">
          <svg class="svg-icon" viewBox="0 0 24 24"><use href="#icon-book"></use></svg>
          <span>View All Courses</span>
        </a>
      </div>
    `;
  }

  if (!dept) {
    const heroSub = document.getElementById('deptSummary');
    if (heroSub) heroSub.textContent = 'Department not found. Please choose a department from the Courses & Programmes page.';
  }
})();
