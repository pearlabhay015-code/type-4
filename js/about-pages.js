/* Official About-section content and document links, adapted from cusb.ac.in. */
(function () {
  const pages = {
    'the-university': {
      title: 'The University', eyebrow: 'About University', image: 'assets/drone.webp',
      paragraphs: [
        'Central University of South Bihar, Gaya, India, is one of the Central Universities under the Department of Higher Education, Ministry of Education, Government of India. It was established as the Central University of Bihar under the Central Universities Act, 2009 (Section 25 of 2009), and was renamed the Central University of South Bihar by the Central Universities (Amendment) Act, 2014.',
        'With the motto “Collective Reasoning”, the University conducts its academic and administrative work from a 300-acre permanent campus at Panchanpur, about 15 km from Gaya. The campus includes the Entrance Plaza, Stupa, Administrative Block, Aryabhatta Bhawan, Chanakya Bhawan, Malaviya Bhawan, Vivekanand Lecture Complex, Sangharam Guest House, Gargi Sadan and Maitreyi Sadan.',
        'CUSB offers a research-oriented, multidisciplinary learning environment, a Choice Based Credit System and internal evaluation at undergraduate and postgraduate levels. Its academic journey began in 2009 at the Birla Institute of Technology, Patna, with the two-year M.A. programme in Development Studies.',
        'Campus address: SH-7, Gaya Panchanpur Road, Village Karhara, Post Fatehpur, Gaya – 824236, Bihar.'
      ]
    },
    'central-universities-act': {
      title: 'Central Universities Act, 2009', eyebrow: 'Founding legislation',
      paragraphs: ['The Central Universities Act, 2009 was passed by Parliament in the 60th year of the Republic of India to establish universities governed by the Federal Government for teaching and research across the States. Central University of Bihar was one of the 16 new Central Universities created under the Act. The Central Universities (Amendment) Act, 2014 changed its name to Central University of South Bihar.'],
      documents: [
        ['The Central Universities Act, 2009'], ['The Central Universities (Amendment) Act, 2014']
      ]
    },
    'history-development': {
      title: 'History and Development', eyebrow: 'Since 2009',
      paragraphs: ['The first Vice-Chancellor, Prof. Janak Pandey, joined on 2 March 2009 and the University began functioning from Hindi Bhawan, Patna. The first academic session began on 1 September 2009 with the PG programme in Development Studies. The permanent campus spans about 300 acres on Gaya–Panchanpur Road.', 'The University expanded from its first postgraduate programme to integrated undergraduate, postgraduate, professional and doctoral programmes. Its approved framework comprises fourteen Schools, including Mathematics, Statistics & Computer Science; Physical & Chemical Sciences; Earth, Biological & Environmental Science; Social Sciences & Policy; Human Sciences; Languages & Literature; Media, Arts & Aesthetics; Management; Education; Law & Governance; Vocational Studies; Technology; Health Sciences; and Agriculture & Development.'],
      milestones: [
        ['2009–10', 'Centre for Development Studies established and the first postgraduate programme launched.'],
        ['2010–13', 'Programmes added in biotechnology, computer science, environmental sciences, mathematics, statistics, bioinformatics, media studies, psychology, life science, economics, languages and political science.'],
        ['26 Sep 2013', 'First convocation held; 156 graduates of the first three batches received degrees.'],
        ['27 Feb 2014', 'Bhoomi Pujan for the Panchanpur campus.'],
        ['31 Aug 2015', 'Foundation stone for Phase I buildings laid.'],
        ['2016', 'Accredited Grade A by NAAC and ranked 94th in NIRF.'],
        ['2017–18', 'Administrative and academic activities moved to the permanent Panchanpur campus.'],
        ['2020', 'Ranked first in Bihar among government universities in Education World India Ranking.']
      ]
    },
    'statutes-ordinances': {
      title: 'Statutes & Ordinances', eyebrow: 'Governance framework',
      paragraphs: ['The Central University Act, Statutes, Ordinances and Regulations establish the University’s powers and the rules that govern its functioning and business. Statutes set out the objectives and powers of the University, the administrative framework, statutory officers, governance, constitution and academic structure. Ordinances specify rules and their scope of application in University business.'],
      documents: [
        ['Statutes 2009'], ['Ordinance'], ['Amendments in Statutes and Ordinances']
      ]
    },
    'vision-mission': {
      title: 'Vision & Mission', eyebrow: 'Core directives',
      directives: [
        ['Vision', 'To develop enlightened citizenship of a knowledge society for peace and prosperity of individuals, nation and the world, through promotion of innovation, creative endeavours and scholarly inquiry, and to be a global destination for higher education and research.'],
        ['Mission', 'To serve as a beacon of change through multi-disciplinary learning, creating a knowledge community with strong character, value-based transparent work ethics, creative and critical thinking, and holistic development and self-sustenance for the people of India.']
      ]
    },
    'policies-documents': {
      title: 'Regulation and Policy Documents', eyebrow: 'Official documents',
      paragraphs: ['Official University recruitment rules, purchase procedures, manuals, standard operating procedures, policies, regulations and formats are provided below. Each button opens the corresponding live document from the official CUSB website.'],
      documents: [['Teaching Recruitment Rule (CUSB)'], ['Teaching Recruitment Rule (UGC)'], ['Non-Teaching Recruitment Rule-2022'], ['Manual for Sponsored Research Project (MSRP)'], ['Hand Book of Purchase Rules and Procedure (PRP)'], ['Scholarship Schemes Regulations – 2017'], ['SOP for Guest House Booking'], ['ICT Policies and Guidelines'], ['Library Policies and Guidelines'], ['Hostel Manual'], ['Central Instrumentation Facility (SOP)'], ['SOP – Day Care Centre'], ['SOP – Lecture Hall'], ['Lecture Hall Booking Format'], ['Consultancy Policy Document'], ['Model Framework for Implementation of NEP-2020'], ['Guidelines for Conferences, Seminars & Workshops'], ['Seminar Proforma'], ['Teacher Deputation Policy'], ['Travel Grant Form'], ['Ph.D. Ordinances'], ['Ph.D. Notification'], ['Ph.D. Thesis Submission Form (PDF)'], ['Ph.D. Thesis Submission Form (Word)'], ['External Panel Proposal (PDF)'], ['External Panel Proposal (Word)']]
    },
    'best-practices': {
      title: 'Salient Features and Best Practices', eyebrow: 'Academic and campus commitments',
      paragraphs: ['CUSB follows a semester system, Choice-Based Credit System and Continuous Internal Evaluation to provide curricular flexibility, participatory teaching-learning, field and laboratory work, transparency and accountability. The University works towards transparent, participative governance, e-governance, quality improvement through IQAC, and planning through the Planning, Development and Monitoring Board.', 'The University supports psychological counselling and guidance, national-character admissions, scholarships, student accommodation, a Health Centre, Vidyarthi Mediclaim, placement support, internships, sports, cultural activities, discipline through the Proctorial Board and holistic support through the Dean Students’ Welfare.'],
      features: [['Academic programmes', 'The official page lists UG, PG and Ph.D. programmes offered through departments and Schools.'], ['Community & environment', 'Zero-water discharge, rainwater collection in artificial ponds, planned waste disposal and student involvement in local community development.'], ['Student support', 'Scholarships, hostel accommodation, medical support, insurance, counselling, placements and internship opportunities.'], ['Co-curricular life', 'Games, sports, cultural activities and other student-led initiatives are supported year-round.']]
    },
    'annual-reports': {
      title: 'Annual Reports and Annual Accounts', eyebrow: 'Institutional records',
      paragraphs: ['The official archive contains annual reports and annual accounts in English and Hindi for recent and earlier academic years. These links open the current records hosted by CUSB.'],
      documents: [['Annual Report 2024–25 (English)'], ['Annual Accounts 2024–25 (English)'], ['Annual Report 2024–25 (Hindi)'], ['Annual Accounts 2024–25 (Hindi)'], ['Annual Report 2023–24 (English)'], ['Annual Accounts 2023–24 (English)'], ['Annual Report 2022–23 (English)'], ['Annual Accounts 2022–23 (English)'], ['Annual Report 2021–22 (English)'], ['Annual Accounts 2021–22 (English)'], ['Annual Report 2020–21 (English)'], ['Annual Accounts 2020–21 (English)']]
    },
    'university-kulgeet': {
      title: 'University Kulgeet', eyebrow: 'University anthem',
      paragraphs: ['The University Kulgeet was composed by Dr. Hari Prasad Dubey in 2013 and was sung at CUSB’s first convocation on 26 September 2013 by a singers’ team led by Dr. Richa Vatsa, with Prof. R. P. Shastri on violin, Dr. Vijay Kapoor on harmonium and Mr. Raj Shekhar on tabla.', 'Its themes include nature, environment, compassion and the cultural consciousness of Bihar. It draws inspiration from Gaya, the heritage of Bihar, education, service to humanity, values and the ideal of India as a Vishwaguru.'],
      documents: [['University Kulgeet']]
    },
    'cusb-logo': {
      title: 'CUSB Logo', eyebrow: 'Visual identity', image: 'assets/culog.png',
      paragraphs: ['The Executive Council of the Central University of Bihar passed a resolution accepting the University logo on 20 November 2010. The present logo came into use in August 2018. It adapts the Peepal tree, symbolising the rich culture of Bihar and representing education, wisdom and enlightenment.'],
      documents: []
    },
    'how-to-reach': {
      title: 'How to Reach CUSB', eyebrow: 'Visit CUSB',
      paragraphs: ['The CUSB Gaya campus is located on SH-7, Gaya–Panchanpur Road, around 15 km from Gaya Railway Station and 25 km from Gaya Airport. Gaya is a well-connected pilgrimage, educational and business centre in Bihar.'],
      features: [['By train', 'Gaya Junction (GAYA) is on the Howrah–New Delhi route and is connected to much of the country by express and mail trains.'], ['By road', 'Gaya is connected with Delhi and Kolkata through NH 19 and with Patna and the north-eastern region through NH 83.'], ['By air', 'Gaya International Airport provides domestic and seasonal international connections. Patna Airport is about 98 km away.']],
      documents: []
    },
    'the-court': { title: 'The Court', eyebrow: 'Statutory body', paragraphs: ['Constitution of the second Court is in process.'] },
    'executive-council': {
      title: 'Executive Council', eyebrow: 'Statutory body',
      paragraphs: ['The Executive Council is chaired ex officio by the Vice-Chancellor. Its constitution includes nominees of the Department of Higher Education, UGC, Government of Bihar and the Visitor, as well as Deans and faculty representatives. The official notification provides the complete, current membership and terms.'],
      documents: [['Notification of the Executive Council, CUSB (08 July 2026)']]
    },
    'academic-council': {
      title: 'Academic Council', eyebrow: 'Statutory body',
      paragraphs: ['The Academic Council is the University’s principal academic body. Its official agenda, annexures and notification are available below.'],
      documents: [['27th Meeting of Academic Council – Agenda and Annexures'], ['Academic Council Notification (04 July 2025)']]
    },
    'finance-committee': {
      title: 'Finance Committee', eyebrow: 'Statutory body',
      paragraphs: ['The Finance Committee is chaired by the Vice-Chancellor. Its membership includes University, Court, Executive Council and Visitor nominees; the Finance Officer serves as ex-officio secretary. The official notification contains the current composition.'],
      documents: [['Finance Committee Notification']]
    }
  };
  const localDocuments = {
    'The Central Universities Act, 2009': 'assets/documents/about/central-universities-act-2009.pdf',
    'The Central Universities (Amendment) Act, 2014': 'assets/documents/about/central-universities-amendment-act-2014.pdf',
    'ICT Policies and Guidelines': 'assets/documents/about/ict-policies-and-guidelines.pdf',
    'Hostel Manual': 'assets/documents/about/hostel-manual.pdf',
    'Consultancy Policy Document': 'assets/documents/about/consultancy-policy-document.pdf',
    'Annual Report 2024–25 (English)': 'assets/documents/about/annual-report-2024-25-english.pdf',
    'Annual Accounts 2024–25 (English)': 'assets/documents/about/annual-accounts-2024-25-english.pdf',
    'Annual Report 2023–24 (English)': 'assets/documents/about/annual-report-2023-24-english.pdf',
    'Annual Accounts 2023–24 (English)': 'assets/documents/about/annual-accounts-2023-24-english.pdf',
    'Annual Report 2022–23 (English)': 'assets/documents/about/annual-report-2022-23-english.pdf',
    'Annual Accounts 2022–23 (English)': 'assets/documents/about/annual-accounts-2022-23-english.pdf',
    'Notification of the Executive Council, CUSB (08 July 2026)': 'assets/documents/about/executive-council-notification-2026.pdf',
    'Academic Council Notification (04 July 2025)': 'assets/documents/about/academic-council-notification-2025.pdf',
    'Finance Committee Notification': 'assets/documents/about/finance-committee-notification.jpg'
  };

  const slug = document.body.dataset.aboutPage;
  if (slug === 'the-university') {
    document.title = `About CUSB — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="about-modern-wrapper">
          <!-- 1. Hero Showcase -->
          <div class="about-hero-showcase">
            <span class="about-badge-tag">🏛️ Ministry of Education &bull; Government of India</span>
            <h1 class="about-main-heading">About Central University of South Bihar</h1>
            <p class="about-main-subtitle">
              Established under the Central Universities Act, 2009 &bull; Operating from a 300-acre permanent green campus with the motto <strong>“Collective Reasoning”</strong>
            </p>

            <!-- Stat Strip -->
            <div class="about-stat-strip">
              <div class="about-stat-item">
                <div class="about-stat-number">1 of 54</div>
                <div class="about-stat-label">Central Universities</div>
              </div>
              <div class="about-stat-item">
                <div class="about-stat-number">Act 2009</div>
                <div class="about-stat-label">Section 25 of 2009</div>
              </div>
              <div class="about-stat-item">
                <div class="about-stat-number">300 Acres</div>
                <div class="about-stat-label">Permanent Campus</div>
              </div>
              <div class="about-stat-item">
                <div class="about-stat-number">Panchanpur</div>
                <div class="about-stat-label">15 km from Gaya</div>
              </div>
            </div>
          </div>

          <!-- 2. Featured Aerial Campus Panorama -->
          <div class="about-featured-panorama">
            <img src="assets/images/cusb-aerial-entrance.png" alt="Panoramic Aerial View of CUSB Campus Entrance Plaza and Administrative Block" loading="eager">
            <div class="about-panorama-caption">
              <div class="about-caption-text">
                <span>📸</span>
                <span>Aerial view of the Grand Entrance Plaza, Stupa, and multi-storied Administrative Block at Panchanpur, Gaya</span>
              </div>
              <a href="assets/images/cusb-aerial-entrance.png" target="_blank" class="admin-link-box" style="padding: 6px 14px; font-size: 0.82rem; margin: 0; box-shadow: none;">
                <span>View Full Size ↗</span>
              </a>
            </div>
          </div>

          <!-- 3. Statutory Framework & Campus Setting Bento -->
          <div class="about-bento-grid">
            <div class="about-bento-card">
              <div class="about-bento-header">
                <div class="about-bento-icon">⚖️</div>
                <h2 class="about-bento-title">Statutory Mandate &amp; Establishment</h2>
              </div>
              <p>
                <strong>Central University of South Bihar, Gaya, India</strong>, is one among 54 such universities of Federal Government, which come under the purview of the Department of Higher Education under the Ministry of Education of Government of India.
              </p>
              <p>
                <strong>It was established under the Central Universities Act, 2009 (Section 25 of 2009) as Central University of Bihar (CUB) and the name since changed by the Central Universities (Amendment) Act, 2014 to Central University of South Bihar (CUSB).</strong> It is an institution of higher learning in the state of Bihar.
              </p>
            </div>

            <div class="about-bento-card">
              <div class="about-bento-header">
                <div class="about-bento-icon">🌿</div>
                <h2 class="about-bento-title">Permanent Campus &amp; Setting</h2>
              </div>
              <p>
                With the motto, i.e. <strong>‘Collective Reasoning’</strong> the University has been conducting its academic and administrative activities from permanent campus on a <strong>300 acre plot of land at Panchanpur</strong>, situated about 15 kms away from Gaya town.
              </p>
              <p>
                The University welcomes all with a grand Entrance Plaza and further provides visual delight with a half-globe shaped Stupa and a magnificent multi-storied Administrative Block building, offering a pristine environs for running academic and co-curricular activities.
              </p>
            </div>
          </div>

          <!-- 4. Campus Infrastructure & Architectural Highlights -->
          <div class="about-section-header">
            <span class="about-section-tag">State-of-the-Art Infrastructure</span>
            <h2 class="about-section-h2">Architectural Highlights &amp; Key Buildings</h2>
          </div>

          <div class="about-landmarks-grid">
            <div class="about-landmark-card">
              <span class="about-landmark-icon">🏛️</span>
              <h3 class="about-landmark-title">Aryabhatta Bhawan</h3>
              <p class="about-landmark-desc">School of Earth, Biological &amp; Environmental Sciences massive facility.</p>
            </div>

            <div class="about-landmark-card">
              <span class="about-landmark-icon">📜</span>
              <h3 class="about-landmark-title">Chanakya Bhawan</h3>
              <p class="about-landmark-desc">School of Social Sciences &amp; Policy academic building.</p>
            </div>

            <div class="about-landmark-card">
              <span class="about-landmark-icon">🎓</span>
              <h3 class="about-landmark-title">Malaviya Bhawan</h3>
              <p class="about-landmark-desc">School of Education dedicated learning building.</p>
            </div>

            <div class="about-landmark-card">
              <span class="about-landmark-icon">🎙️</span>
              <h3 class="about-landmark-title">Vivekanand Lecture Complex</h3>
              <p class="about-landmark-desc">Modern smart lecture complex for interdisciplinary courses.</p>
            </div>

            <div class="about-landmark-card">
              <span class="about-landmark-icon">🏡</span>
              <h3 class="about-landmark-title">Sangharam Guest House</h3>
              <p class="about-landmark-desc">Hospitality facility for visiting dignitaries and scholars.</p>
            </div>

            <div class="about-landmark-card">
              <span class="about-landmark-icon">🏢</span>
              <h3 class="about-landmark-title">Hostel Complexes</h3>
              <p class="about-landmark-desc">Gargi Sadan (Boys Hostel) and Maitreyi Sadan (Girls Hostel).</p>
            </div>
          </div>

          <!-- 5. Academic Excellence & Pedagogy -->
          <div class="about-section-header">
            <span class="about-section-tag">Pedagogical Framework</span>
            <h2 class="about-section-h2">Academic Excellence &amp; Student Support</h2>
          </div>

          <div class="about-pillars-grid">
            <div class="about-pillar-card">
              <div class="about-pillar-icon">👨‍🏫</div>
              <h3 class="about-pillar-title">World-Class Faculty</h3>
              <p class="about-pillar-text">
                Along with world-class highly qualified faculty members and high teacher-student ratio, baskets full of elective courses are offered across diverse programmes.
              </p>
            </div>

            <div class="about-pillar-card">
              <div class="about-pillar-icon">🎯</div>
              <h3 class="about-pillar-title">CBCS &amp; Evaluation</h3>
              <p class="about-pillar-text">
                The University offers Choice Based Credit System (CBCS) with total internal evaluation of students’ performance at Undergraduate (UG) and Postgraduate (PG) levels.
              </p>
            </div>

            <div class="about-pillar-card">
              <div class="about-pillar-icon">💡</div>
              <h3 class="about-pillar-title">Holistic Environment</h3>
              <p class="about-pillar-text">
                A conducive and research oriented environment with multidisciplinary approach, innovative pedagogies, promising infrastructural facilities and effective student support.
              </p>
            </div>
          </div>

          <!-- 6. Historical Journey -->
          <div class="about-history-banner">
            <h3><span>🌱</span> Academic Journey &amp; Inception</h3>
            <p>
              The University's academic programme started functioning with a rented building in the premises of Birla Institute of Technology, Patna (BIT) in 2009. The zeal and enthusiasm among the administration, faculty, staff and students helped the university to move ahead in the desired direction in the field of higher studies. The academic journey of (the) university began with the Centre for Development Studies (under the School of Social Sciences &amp; Policy), and a (two) 2-year Master of Arts in Development Studies was launched in the academic year 2009-10 at the BIT campus.
            </p>
          </div>

          <!-- 7. Official Campus Address -->
          <div class="about-address-box">
            <div class="about-address-content">
              <div class="about-address-title">📍 Official Campus Address</div>
              <p class="about-address-text">
                SH-7, Gaya Panchanpur Road, Village - Karhara, Post. Fatehpur, Gaya – 824236 (Bihar)
              </p>
            </div>
            <div class="about-address-actions">
              <a href="about-how-to-reach.html" class="about-address-btn">
                <span>How to Reach CUSB →</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
    return;
  }

  if (slug === 'central-universities-act') {
    document.title = `Central Universities Act, 2009 — CUSB`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `
      <section class="section">
        <div class="container admin-official-view" style="max-width: 900px;">
          <div class="admin-page-header">
            <h1 class="admin-official-title">Central Universities Act, 2009</h1>
          </div>
          <div class="admin-article-body">
            <div class="about-hero-image-wrap" style="margin: 16px 0 24px; text-align: center;">
              <img src="assets/images/cusb-act-building.png" alt="CUSB Administrative Building - Central Universities Act" style="display: block; width: 100%; height: auto; border: 1px solid #d1d5db; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);" loading="eager">
            </div>

            <p>
              Central University Act, 2009 was passed by the Parliament in the 60th year of the Republic of India, which aims to establish universities directly governed by the federal government for teaching and research purposes, across all the States in India. The Central University of Bihar (CUB) is one amongst the 16 new Central Universities, established by the Government of India under the Central Universities Act, 2009 (Section 25 of 2009). <strong>Subsequently, the name of the university was changed by the Central Universities (Amendment) Act, 2014 to Central University of South Bihar (CUSB).</strong>
            </p>

            <ul class="admin-doc-list" style="margin-top: 20px; padding-left: 22px; line-height: 2;">
              <li style="margin-bottom: 8px;">
                <a href="assets/documents/about/central-universities-act-2009.pdf" target="_blank" style="color: #0b63b6; font-weight: 700; text-decoration: underline;">
                  The Central Universities ACT, 2009
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a href="assets/documents/about/central-universities-amendment-act-2014.pdf" target="_blank" style="color: #0b63b6; font-weight: 700; text-decoration: underline;">
                  The Central Universities (Amendment) ACT, 2014
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    `;
    return;
  }

  if (slug === 'history-development') {
    const timeline = [
      ['2009 – 10', 'The University made its beginning by establishing the Centre for Development Studies under the School of Social Sciences and Policy, and launched its first PG Programme.'],
      ['2010 – 11', 'Five more PG Programmes in Biotechnology, Computer Science, Environmental Sciences, Mathematics and Statistics were launched.'],
      ['2011 – 12', 'Three more PG Programmes in Bioinformatics, Communication and Media Studies, and Psychology were added.'],
      ['2012 – 13', 'Seven more PG Programmes started: Life Science, Economics, English, Hindi, Political Science and International Relations, Sociology, and M.Tech in Computer Science.'],
      ['2013 – 14', 'Integrated BA B.Ed, Integrated BSc B.Ed, Integrated BA LLB (Hons), Integrated BSc LLB (Hons), and Integrated M.Phil-Ph.D. programmes in Bioinformatics, Biotechnology, Computer Science, Development Studies, Economics, Environmental Science, Hindi, Life Science, Mathematics, Political Science & International Relations and Statistics were introduced. The integrated M.Phil-Ph.D. programme was replaced with the Ph.D. programme from Academic Year 2016-17.'],
      ['2014 – 15', 'B.Voc (Arts & Crafts) was introduced under the School of Vocational Studies from the 2015-16 academic session. The course was withdrawn from 2017-18 due to technical reasons.'],
      ['2016 – 17', 'The University introduced the LLM programme under the School of Law and Governance. Ph.D. programmes were introduced in accordance with the UGC Regulations, 2016 across Biotechnology, Life Science, Environmental Science, Mathematics, Statistics, Communication and Media Studies, Psychology, Computer Science, Hindi, English, Sociology, Development Studies, Economics, Political Science & International Relations, Education, Law and Bioinformatics.'],
      ['2017 – 18', 'The M.Ed. programme was introduced under the Department of Teacher Education.'],
      ['2018 – 19', 'Five new postgraduate programmes began in Chemistry, Physics, Social Work, M.Com and History under the Departments of Chemistry, Physics, Sociological Studies, Commerce & Business Studies, and Historical Studies & Archaeology.'],
      ['2019 – 20', 'The University introduced a Ph.D. programme in the Department of Chemistry, School of Physical and Chemical Sciences.']
    ];
    const schools = ['Schools of Mathematics, Statistics & Computer Science', 'School of Physical and Chemical Sciences', 'Schools of Earth, Biological and Environmental Science', 'School of Social Sciences & Policy', 'School of Human Science', 'School of Languages & Literature', 'School of Media, Arts & Aesthetics', 'Schools of Management', 'Schools of Education', 'School of Law & Governance', 'School of Vocational Studies', 'School of Technology', 'School of Health Sciences', 'School of Agriculture and Development'];
    const landmarks = [
      ['Bhoomi Pujan — 27 February 2014', 'The University Chancellor and Lok Sabha Speaker, Hon’ble Smt. Meira Kumar laid the foundation stone at the 300-acre Panchanpur campus-site. Hon’ble Shri P. K. Shahi, Education Minister of Bihar, was present along with public representatives, Prof. Janak Pandey, the Pro-Vice Chancellor, Registrar, Executive Council members, faculty, officers, staff, students and a large gathering from neighbouring areas.'],
      ['CUBET — 2014', 'For the first time, the University successfully conducted the online Central University of Bihar Entrance Test on 30 and 31 May 2014 for undergraduate, postgraduate and Integrated MPhil-PhD admissions. A total of 2,127 candidates appeared across 15 centres in Bihar and other states.'],
      ['Foundation Laying of Buildings — 31 August 2015', 'Union HRD Minister Smt. Smriti Zubin Irani laid the foundation stone at the 300-acre campus-site in the presence of CUSB Vice-Chancellor Prof. Harish Chandra Singh Rathore and the University fraternity. Seven Phase I buildings were launched: Central Office, Schools of Earth, Biological & Environmental Sciences, School of Social Sciences & Policy, Boys Hostel, Girls Hostel, Lecture Complex and Dining Hall.'],
      ['Professional accreditations — 2015', 'The University received AICTE recognition for the M.Tech in Computer Science programme, NCTE recognition for the four-year integrated BA B.Ed and BSc B.Ed programmes, and Bar Council of India recognition for the five-year Integrated BA LLB (Hons) and BSc LLB (Hons) programmes.'],
      ['Grade A NAAC accreditation — 25 May 2016', 'CUSB was accredited with Grade A by the National Assessment and Accreditation Council in its first attempt.'],
      ['Second Vice-Chancellor — 05 August 2015', 'Prof. H. C. S. Rathore assumed charge as the second Vice-Chancellor of CUSB. Before joining CUSB he was Dean of the Faculty of Education at Banaras Hindu University and coordinator of its Internal Quality Assurance Cell. He has held fellowships including DAAD and Humboldt, served as BHU Chief Proctor for about six years, and participated in national committees constituted by MHRD, UGC, NAAC and NCTE.'],
      ['NIRF ranking — 2016', 'CUSB secured the 94th position in the National Institutional Ranking Framework released by the Ministry of Human Resource Development on 4 April 2016. It was the only University in Bihar to be included and held the top position among universities in the State.'],
      ['Permanent campus — 2017–18', 'Administrative work began from the permanent Panchanpur, Gaya campus in July 2017. Academic activities commenced there from the 2018-19 session, after which the temporary Patna and Gaya campuses closed.'],
      ['India Today rankings — 2018 and 2019', 'The University secured 25th position among India’s Best Government Universities in 2018 and 22nd position in 2019 in the India Today Group rankings.'],
      ['Education World ranking — 2020', 'CUSB ranked first in Bihar among government-funded universities in the Education World India Ranking, placed 56th among India’s 150 top government universities and described as the best among the 16 new Central Universities established under the 2009 Act. The assessment covered faculty competence, welfare and development, research and innovation, curriculum and pedagogy, industry interface, placement, infrastructure, internationalism, leadership and diversity of programmes.']
    ];
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `<section class="history-page"><div class="container"><header class="history-hero"><div><span class="section-tag">Since 2009</span><h1>History and <em>Development</em></h1><p>From a single room at Hindi Bhawan, Patna to a 300-acre academic campus at Panchanpur, Gaya.</p></div><figure><img src="assets/about-history-academic.jpg" alt="Academic building shown on the official History and Development page" loading="eager"></figure></header><section class="history-highlights" aria-label="University milestones"><article><strong>2 March 2009</strong><span>First Vice-Chancellor Prof. Janak Pandey joined</span></article><article><strong>1 September 2009</strong><span>First academic session with Development Studies</span></article><article><strong>26 September 2013</strong><span>First convocation; 156 graduates received degrees</span></article><article><strong>300 acres</strong><span>Permanent campus on Gaya–Panchanpur Road</span></article></section><section class="history-story"><div class="history-prose"><h2>Milestones</h2><p><strong>First Vice-Chancellor:</strong> Prof. Janak Pandey, joined on March 2, 2009.</p><p><strong>Started functioning from:</strong> Hindi Bhawan, Patna.</p><p><strong>Started Academic Session:</strong> On 1 September 2009, with the PG Programme in Development Studies.</p><p><strong>First Convocation held on 26 September 2013 (Thursday):</strong> The First Convocation was graced by Hon’ble Shri M. Hamid Ansari, Vice President of India, as Chief Guest. Hon’ble Smt. Meira Kumar, Chancellor of the University and Speaker, Lok Sabha attended along with Hon’ble Nitish Kumar, Chief Minister of Bihar; Hon’ble Shri P. K. Shahi, Education Minister of the Government of Bihar; and other distinguished guests. A total of 156 graduates of the first three batches since the inception of CUB in 2009 were awarded degrees.</p><p>The Central University of Bihar (CUB) is one of the 16 new Central Universities established by the Government of India under the Central Universities Act, 2009 (Section 25 of 2009). The first Vice-Chancellor, Prof. Janak Pandey, joined on 2 March 2009 and started functioning from a single room at Hindi Bhawan in Patna. Since then, the University has made steady progress in academic achievements, courses taught, faculty and staff strength, computer, media and science laboratories, and e-learning classrooms.</p><p>The University began its academic activities with the MA Programme in Development Studies in 2009. The official page records four integrated undergraduate programmes, 25 postgraduate programmes and 22 Ph.D. programmes. The campus is spread over about 300 acres on Gaya–Panchanpur Road, around 15 km from Gaya Railway Station.</p></div></section><section class="history-section"><div class="history-section-heading"><span>Academic expansion</span><h2>A timeline of programmes</h2></div><div class="history-timeline">${timeline.map(([year, text]) => `<article><div class="history-year">${year}</div><p>${text}</p></article>`).join('')}</div></section><section class="history-schools"><div><span>Academic structure</span><h2>Fourteen approved Schools</h2><p>Smt. Pratibha Devi Singh Patil, the former President of India in her capacity as Visitor, approved the amendment to Statute 15 under Section 27(3) of the Act, 2009 through letter F. 42–26/2009-Desk (U) dated 28 July 2010. The official page records that 14 Schools were approved, of which 11 were then active.</p></div><ol>${schools.map((school, index) => `<li><b>${String(index + 1).padStart(2, '0')}</b>${school}</li>`).join('')}</ol></section><section class="history-section history-landmarks"><div class="history-section-heading"><span>Campus and recognition</span><h2>Institutional milestones</h2></div><div class="history-landmark-grid">${landmarks.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section></div></section>`;
    return;
  }

  const data = pages[slug];
  if (!data) return;
  document.title = `${data.title} — CUSB`;
  const root = document.getElementById('aboutPageContent');
  const escape = (text) => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const paras = (data.paragraphs || []).map(p => `<p>${escape(p)}</p>`).join('');
  const docs = (data.documents || []).map(([label]) => {
    const documentPath = localDocuments[label];
    return `<article><h3>${documentPath ? `<a href="${documentPath}" target="_blank">${escape(label)} ↗</a>` : escape(label)}</h3><p>${documentPath ? 'Open the replica-site document.' : 'Included in the University records and document collection.'}</p></article>`;
  }).join('');
  const tiles = (data.milestones || data.features || []).map(([heading, text]) => `<article><h3>${escape(heading)}</h3><p>${escape(text)}</p></article>`).join('');
  const directives = (data.directives || []).map(([heading, text]) => `<article><span>${escape(heading)}</span><p>${escape(text)}</p></article>`).join('');
  root.innerHTML = `
    <section class="section"><div class="container information-panel about-detail-content"><span class="section-tag">${escape(data.eyebrow)}</span><h1 class="section-title information-title" style="text-align:left; margin-bottom:20px;">${escape(data.title)}</h1>${data.image ? `<figure class="about-detail-image"><img src="${data.image}" alt="${escape(data.title)}" loading="lazy"></figure>` : ''}${paras}${directives ? `<div class="directive-grid">${directives}</div>` : ''}${tiles ? `<div class="feature-list-grid">${tiles}</div>` : ''}${docs ? `<div class="feature-list-grid">${docs}</div>` : ''}</div></section>`;
})();
