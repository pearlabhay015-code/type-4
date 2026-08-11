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
    'Finance Committee Notification': 'assets/documents/about/finance-committee-notification.jpg',
    'Statutes 2009': 'assets/documents/about/statutes-2009.pdf',
    'Ordinance': 'assets/documents/about/ordinance.pdf',
    'Amendments in Statutes and Ordinances': 'assets/documents/about/statutes-and-ordinances-amendments.pdf'
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

  if (slug === 'statutes-ordinances') {
    document.title = `Statutes & Ordinances — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="policy-hub-wrapper">
          
          <!-- Hero Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">🏛️ Central Universities Act, 2009 &bull; Section 25</span>
            <h1 class="policy-main-title">Statutes And Ordinances</h1>
            <p class="policy-main-desc">
              The Central University act, statute, ordinances and regulations set out the powers of the university, and rules and conduct for its functioning and business. The present statute and ordinances are available as apart of Indian Gazette and available online as well, which is provided here.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">Act 2009</div>
                <div class="policy-stat-lbl">Founding Enactment</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">11+ Schools</div>
                <div class="policy-stat-lbl">Academic Framework</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Gazette 305</div>
                <div class="policy-stat-lbl">Extraordinary Part III</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Visitor Assent</div>
                <div class="policy-stat-lbl">Presidential Approval</div>
              </div>
            </div>
          </div>

          <!-- Grand Bento Grid: Statutes & Ordinances -->
          <div class="statutes-showcase-grid">
            
            <!-- 1. Statutes Panel -->
            <div class="statutes-pillar-card statutes-type">
              <div>
                <div class="statutes-card-header">
                  <div class="statutes-card-icon">⚖️</div>
                  <div>
                    <h2 class="statutes-card-title">Statutes</h2>
                  </div>
                </div>

                <div class="statutes-endorsement-badge">
                  <span>🏛️ Approved by Visitor (President Mrs. Pratibha Patil, 2009)</span>
                </div>

                <div class="statutes-card-body">
                  <p>
                    The statute set out the objective and powers of the University and define administrative framework and statutory officers as well as overall academic structure (schools). The statue in essence contain provision for its governance and constitution. The statute of university approved by the visitor, her highness the then president of India Mrs. Pratibha patil and came into force since 2009. Subsequently amendments were made to provide the academic framework and 11 schools were incorporated into the statue.
                  </p>
                </div>
              </div>

              <div class="statutes-action-links">
                <a href="assets/documents/about/statutes-2009.pdf" target="_blank" class="statute-cta-link">
                  <span>📄 Statutes 2009</span>
                  <span>Open PDF ↗</span>
                </a>
              </div>
            </div>

            <!-- 2. Ordinances Panel -->
            <div class="statutes-pillar-card ordinances-type">
              <div>
                <div class="statutes-card-header">
                  <div class="statutes-card-icon">📜</div>
                  <div>
                    <h2 class="statutes-card-title">Ordinances</h2>
                  </div>
                </div>

                <div class="statutes-endorsement-badge">
                  <span>🏛️ Approved by Visitor President Pranab Mukherjee (Gazette No. 305)</span>
                </div>

                <div class="statutes-card-body">
                  <p>
                    Ordinances set out rules and regulations and their scope of application covering all aspects of university business and its functioning. The present version of ordinance was approved by the visitor, his highness hon'ble President Mr. Pranab Mukherjee and is a part of gazette of India extra ordinary part III section 4 No. 305, 17th August, 2016. Additionally, there are academic ordinances, the details of which are given in student page and individual department web pages
                  </p>
                </div>
              </div>

              <div class="statutes-action-links">
                <a href="assets/documents/about/ordinance.pdf" target="_blank" class="statute-cta-link">
                  <span>📄 Ordinance (Official Gazette)</span>
                  <span>Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/statutes-and-ordinances-amendments.pdf" target="_blank" class="statute-cta-link">
                  <span>📑 Amendments in Statutes and Ordinances</span>
                  <span>Open PDF ↗</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
    return;
  }

  if (slug === 'policies-documents') {
    document.title = `Regulation and Policy Documents — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="policy-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">⚖️ Central University of South Bihar &bull; Official Repository</span>
            <h1 class="policy-main-title">Regulation And Policy Documents</h1>
            <p class="policy-main-desc">
              Comprehensive institutional repository of university recruitment rules, purchase procedures, standard operating procedures (SOPs), consultancy guidelines, academic framework, teacher deputation policies, Ph.D. ordinances, and official submission formats.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">9</div>
                <div class="policy-stat-lbl">Policy Categories</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">26+</div>
                <div class="policy-stat-lbl">Official Documents</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">UGC &amp; MoE</div>
                <div class="policy-stat-lbl">Statutory Compliance</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">PDF &amp; DOC</div>
                <div class="policy-stat-lbl">Direct Download</div>
              </div>
            </div>
          </div>

          <!-- 2. Live Search and Category Filter Bar -->
          <div class="policy-filter-bar">
            <div class="policy-search-box">
              <span class="policy-search-icon">🔍</span>
              <input type="text" id="policySearchInput" class="policy-search-input" placeholder="Search policy documents, recruitment rules, SOPs, forms, ordinances..." aria-label="Search policy documents">
              <span class="policy-search-count" id="policyMatchCounter">Showing all 9 categories (26 documents)</span>
            </div>
            <div class="policy-tag-scroll" id="policyTagFilters">
              <button class="policy-filter-tag active" data-filter="all">All Documents</button>
              <button class="policy-filter-tag" data-filter="recruitment">Recruitment</button>
              <button class="policy-filter-tag" data-filter="purchase">Purchase &amp; PRP</button>
              <button class="policy-filter-tag" data-filter="sop">Manual / SOP</button>
              <button class="policy-filter-tag" data-filter="consultancy">Consultancy</button>
              <button class="policy-filter-tag" data-filter="nep">NEP-2020</button>
              <button class="policy-filter-tag" data-filter="seminars">Seminars</button>
              <button class="policy-filter-tag" data-filter="deputation">Teacher Deputation</button>
              <button class="policy-filter-tag" data-filter="phd">Ph.D. Ordinances</button>
              <button class="policy-filter-tag" data-filter="formats">Formats</button>
            </div>
          </div>

          <!-- 3. Policy Categories Bento Grid -->
          <div class="policy-cards-container" id="policyCardsContainer">
            
            <!-- Category 1: Recruitment Rules -->
            <div class="policy-category-card" data-category="recruitment">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">👔</div>
                  <h2 class="policy-category-title">Recruitment Rules</h2>
                </div>
                <span class="policy-category-badge">Faculty &amp; Staff Selection</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/teaching-recruitment-rule-cusb.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📄</span>
                    <span class="policy-doc-name">Teaching Recruitment Rule (CUSB)</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/teaching-recruitment-rule-ugc.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📄</span>
                    <span class="policy-doc-name">Teaching Recruitment Rule (UGC)</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/non-teaching-recruitment-rule-2022.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📄</span>
                    <span class="policy-doc-name">Non-Teaching Recruitment Rule-2022</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 2: Purchase Rule and Policy -->
            <div class="policy-category-card" data-category="purchase">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">🛒</div>
                  <h2 class="policy-category-title">Purchase Rule and Policy</h2>
                </div>
                <span class="policy-category-badge">Procurement &amp; Research PRP</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/purchase-rules-and-procedure.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📢</span>
                    <span class="policy-doc-name">Notice</span>
                  </div>
                  <span class="policy-doc-action">View Notice ↗</span>
                </a>
                <a href="assets/documents/about/sponsored-research-project-manual.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📘</span>
                    <span class="policy-doc-name">Manual for Sponsored Research Project (MSRP)</span>
                  </div>
                  <span class="policy-doc-action">Open Manual ↗</span>
                </a>
                <a href="assets/documents/about/purchase-rules-and-procedure.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📕</span>
                    <span class="policy-doc-name">Hand Book of Purchase Rules and Procedure (PRP)</span>
                  </div>
                  <span class="policy-doc-action">Open Handbook ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 3: Manual/ SOP -->
            <div class="policy-category-card" data-category="sop">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">📋</div>
                  <h2 class="policy-category-title">Manual/ SOP</h2>
                </div>
                <span class="policy-category-badge">Standard Operating Procedures</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/ict-policies-and-guidelines.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">🎓</span>
                    <span class="policy-doc-name">CUSB Regulations Relating to Execution and monitoring of Scholarship Schemes – 2017</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/hostel-manual.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">🏡</span>
                    <span class="policy-doc-name">Standard Operating Procedure (SOP) for Guest House Booking</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/ict-policies-and-guidelines.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">💻</span>
                    <span class="policy-doc-name">ICT Policies and Guidelines</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/library-policies-and-guidelines.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📚</span>
                    <span class="policy-doc-name">Library Policies and Guidelines</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/hostel-manual.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">🏢</span>
                    <span class="policy-doc-name">Hostel Manual</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/sponsored-research-project-manual.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">🔬</span>
                    <span class="policy-doc-name">Central Instrumentation Facility (SOP)</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <a href="assets/documents/about/hostel-manual.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">🧸</span>
                    <span class="policy-doc-name">SOP- Day Care Centre</span>
                  </div>
                  <span class="policy-doc-action">Open PDF ↗</span>
                </a>
                <div>
                  <a href="assets/documents/about/hostel-manual.pdf" target="_blank" class="policy-doc-item">
                    <div class="policy-doc-info">
                      <span class="policy-file-icon">🎙️</span>
                      <span class="policy-doc-name">SOP- Lecture Hall</span>
                    </div>
                    <span class="policy-doc-action">Open PDF ↗</span>
                  </a>
                  <div class="policy-nested-group">
                    <a href="assets/documents/about/hostel-manual.pdf" target="_blank" class="policy-doc-item" style="background: rgba(11, 99, 182, 0.04);">
                      <div class="policy-doc-info">
                        <span class="policy-nested-badge">FORMAT</span>
                        <span class="policy-doc-name">Format for Booking of Lecture Hall</span>
                      </div>
                      <span class="policy-doc-action">Download Format ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Category 4: Guidelines for Consultancy Policy Document -->
            <div class="policy-category-card" data-category="consultancy">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">💼</div>
                  <h2 class="policy-category-title">Guidelines for Consultancy Policy Document</h2>
                </div>
                <span class="policy-category-badge">Advisory &amp; Research</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/consultancy-policy-document.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📑</span>
                    <span class="policy-doc-name">Consultancy Policy Document</span>
                  </div>
                  <span class="policy-doc-action">Open Policy Document ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 5: Model Framework for Implementation of National Education Policy-2020 -->
            <div class="policy-category-card" data-category="nep">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">🎓</div>
                  <h2 class="policy-category-title">Model Framework for Implementation of National Education Policy-2020</h2>
                </div>
                <span class="policy-category-badge">NEP-2020 Transformation</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/nep-2020-model-framework.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">🏛️</span>
                    <span class="policy-doc-name">Model Framework for Implementation of NEP-2020</span>
                  </div>
                  <span class="policy-doc-action">Open Framework ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 6: Guidelines for Organising Seminars -->
            <div class="policy-category-card" data-category="seminars">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">🎪</div>
                  <h2 class="policy-category-title">Guidelines for Organising Seminars</h2>
                </div>
                <span class="policy-category-badge">Conferences &amp; Symposia</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/seminar-workshop-guidelines.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📝</span>
                    <span class="policy-doc-name">Guidelines for Organising Conferences / Seminars / Workshops / Symposia / Short Term Training Programmes</span>
                  </div>
                  <span class="policy-doc-action">Open Guidelines ↗</span>
                </a>
                <a href="assets/documents/about/seminar-workshop-guidelines.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📄</span>
                    <span class="policy-doc-name">Proforma</span>
                  </div>
                  <span class="policy-doc-action">Download Proforma ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 7: Teacher Deputation Policy -->
            <div class="policy-category-card" data-category="deputation">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">✈️</div>
                  <h2 class="policy-category-title">Teacher Deputation Policy</h2>
                </div>
                <span class="policy-category-badge">Faculty Travel &amp; Deputation</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/teaching-recruitment-rule-cusb.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📘</span>
                    <span class="policy-doc-name">Teacher Deputation Policy</span>
                  </div>
                  <span class="policy-doc-action">Open Policy ↗</span>
                </a>
                <a href="assets/documents/about/teaching-recruitment-rule-cusb.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📝</span>
                    <span class="policy-doc-name">Travel Grant Form</span>
                  </div>
                  <span class="policy-doc-action">Download Form ↗</span>
                </a>
                <a href="assets/documents/about/teaching-recruitment-rule-cusb.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📜</span>
                    <span class="policy-doc-name">Notification : Teacher’s Deputation Committee (No.CUSB/Acad/20-1/2016 dated 07/10/2016)</span>
                  </div>
                  <span class="policy-doc-action">View Notification ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 8: Ordinances Relating to the Award of Degree of Doctor of Philosophy -->
            <div class="policy-category-card" data-category="phd">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">🎓</div>
                  <h2 class="policy-category-title">Ordinances Relating to the Award of Degree of Doctor of Philosophy</h2>
                </div>
                <span class="policy-category-badge">Ph.D. Degree Governance</span>
              </div>
              <div class="policy-doc-list">
                <a href="assets/documents/about/phd-ordinances.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📜</span>
                    <span class="policy-doc-name">Ordinances Relating to the Award of Degree of Doctor of Philosophy</span>
                  </div>
                  <span class="policy-doc-action">Open Ordinance ↗</span>
                </a>
                <a href="assets/documents/about/phd-ordinances.pdf" target="_blank" class="policy-doc-item">
                  <div class="policy-doc-info">
                    <span class="policy-file-icon">📢</span>
                    <span class="policy-doc-name">Ph.D. Notification (CUSB/Acad/5-11/2016/1872 dated 27/07/2018)</span>
                  </div>
                  <span class="policy-doc-action">View Notification ↗</span>
                </a>
              </div>
            </div>

            <!-- Category 9: Formats -->
            <div class="policy-category-card" data-category="formats">
              <div class="policy-category-header">
                <div class="policy-category-title-wrap">
                  <div class="policy-category-icon">📁</div>
                  <h2 class="policy-category-title">Formats</h2>
                </div>
                <span class="policy-category-badge">Official Submission Templates</span>
              </div>
              <div class="policy-doc-list">
                <div class="policy-multi-format-row">
                  <div class="policy-multi-title">
                    Format for submission of Ph.D. Thesis :
                  </div>
                  <div class="policy-format-btns">
                    <a href="assets/documents/about/phd-ordinances.pdf" target="_blank" class="policy-btn-pdf">
                      <span>📄 [PDF]</span>
                    </a>
                    <a href="assets/documents/about/phd-ordinances.pdf" target="_blank" class="policy-btn-word">
                      <span>📝 [ Word ]</span>
                    </a>
                  </div>
                </div>

                <div class="policy-multi-format-row">
                  <div class="policy-multi-title">
                    Appointment of two external examiners to evaluate the thesis for the degree of PhD:
                  </div>
                  <div class="policy-format-btns">
                    <a href="assets/documents/about/phd-ordinances.pdf" target="_blank" class="policy-btn-pdf">
                      <span>📄 [ PDF ]</span>
                    </a>
                    <a href="assets/documents/about/phd-ordinances.pdf" target="_blank" class="policy-btn-word">
                      <span>📝 [ Word ]</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;

    // Interactive Search and Filtering Logic
    const searchInput = document.getElementById('policySearchInput');
    const counter = document.getElementById('policyMatchCounter');
    const tags = document.querySelectorAll('.policy-filter-tag');
    const cards = document.querySelectorAll('.policy-category-card');

    let currentFilter = 'all';

    function applyFilter() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      let visibleCount = 0;
      let docCount = 0;

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const matchesCategory = currentFilter === 'all' || cat === currentFilter;
        
        let hasMatchingDoc = false;
        const docItems = card.querySelectorAll('.policy-doc-item, .policy-multi-format-row');
        
        docItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (matchesCategory && (!query || text.includes(query))) {
            item.style.display = '';
            hasMatchingDoc = true;
            docCount++;
          } else {
            item.style.display = 'none';
          }
        });

        if (matchesCategory && (hasMatchingDoc || !query)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counter) {
        if (query) {
          counter.textContent = `Found ${docCount} matching document${docCount === 1 ? '' : 's'}`;
        } else if (currentFilter === 'all') {
          counter.textContent = 'Showing all 9 categories (26 documents)';
        } else {
          counter.textContent = `Showing 1 category (${docCount} documents)`;
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }

    tags.forEach(btn => {
      btn.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        applyFilter();
      });
    });

    return;
  }

  if (slug === 'best-practices') {
    document.title = `Salient Features and Best Practices — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="features-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">🌟 Academic Excellence &bull; Central University of South Bihar</span>
            <h1 class="policy-main-title">Salient Features And Best Practices</h1>
            <p class="policy-main-desc">
              Discover the foundational pillars of our academic framework, dynamic Choice-Based Credit System (CBCS), student-centric welfare initiatives, transparent e-governance, and sustainable green campus commitments.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">18</div>
                <div class="policy-stat-lbl">Salient Features</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">3</div>
                <div class="policy-stat-lbl">Green Best Practices</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">25 Depts / 11 Schools</div>
                <div class="policy-stat-lbl">Academic Diversity</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">₹50,000</div>
                <div class="policy-stat-lbl">Vidyarthi Mediclaim</div>
              </div>
            </div>
          </div>

          <!-- 2. Live Search and Category Filter Bar -->
          <div class="policy-filter-bar">
            <div class="policy-search-box">
              <span class="policy-search-icon">🔍</span>
              <input type="text" id="featureSearchInput" class="policy-search-input" placeholder="Search salient features, CBCS, scholarships, placements, DSW, best practices..." aria-label="Search salient features">
              <span class="policy-search-count" id="featureMatchCounter">Showing all 18 features &amp; 3 best practices</span>
            </div>
            <div class="policy-tag-scroll" id="featureTagFilters">
              <button class="policy-filter-tag active" data-filter="all">All Items</button>
              <button class="policy-filter-tag" data-filter="academic">Academic &amp; Pedagogy</button>
              <button class="policy-filter-tag" data-filter="governance">Governance &amp; IQAC</button>
              <button class="policy-filter-tag" data-filter="welfare">Student Welfare &amp; Aid</button>
              <button class="policy-filter-tag" data-filter="campus">Campus &amp; Facilities</button>
              <button class="policy-filter-tag" data-filter="best-practices">Green Best Practices</button>
            </div>
          </div>

          <!-- 3. Salient Features Cards Grid (18 Items) -->
          <div class="features-grid-container" id="featuresGridContainer">
            
            <!-- Feature 1 -->
            <div class="feature-item-card" data-category="academic">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">01</span>
                  <h2 class="feature-title-text">Current Academic Programmes</h2>
                </div>
                <span class="feature-category-tag">Academic</span>
              </div>
              <p class="feature-body-text">
                Presently the University offers three (3) Undergraduate (UG) programmes, 25 Postgraduate (PG) programmes and 22 Ph.D. programmes through 25 departments under 11 schools.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">3 UG Programmes</span>
                <span class="feature-pill brand">25 PG Programmes</span>
                <span class="feature-pill brand">22 Ph.D. Programmes</span>
                <span class="feature-pill accent">25 Departments</span>
                <span class="feature-pill accent">11 Schools</span>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="feature-item-card" data-category="academic">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">02</span>
                  <h2 class="feature-title-text">Semester System</h2>
                </div>
                <span class="feature-category-tag">Pedagogy</span>
              </div>
              <p class="feature-body-text">
                Semester system is followed in all of the academic programmes in order to enlarge curricular space and encourage more learning opportunities. Moreover, the latter enhances the ability to accommodate diverse choices that dynamic and motivated students may like to have. The decisions regarding faculty-to-students contact hours during a semester in different programmes; the decision regarding the credit system determining the quantum of class room learning hours; elements of participatory teaching-learning process; field-work; lab-work; and, other curricular work are taken by various academic bodies of the university.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill">Enlarged Curricular Space</span>
                <span class="feature-pill">Participatory Learning</span>
                <span class="feature-pill">Field &amp; Lab Work</span>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="feature-item-card" data-category="academic">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">03</span>
                  <h2 class="feature-title-text">Choice-Based Credit System (CBCS)</h2>
                </div>
                <span class="feature-category-tag">Curriculum</span>
              </div>
              <p class="feature-body-text">
                It has some unique features, such as enhanced learning opportunities, ability to match student's scholastic needs and aspirations, horizontal intra-, and inter-School/ Centre mobility of students, inter-institutional transferability of students, improvement in educational quality and excellence, flexibility for working students to complete the programme over an extended period of time, innovation and comparability of educational programmes across the country. CBCS will facilitate vertical integration of knowledge and holistic development of self.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Inter-School Mobility</span>
                <span class="feature-pill brand">Credit Transferability</span>
                <span class="feature-pill">Extended Flexibility</span>
                <span class="feature-pill success">Holistic Self Development</span>
              </div>
            </div>

            <!-- Feature 4 -->
            <div class="feature-item-card" data-category="academic">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">04</span>
                  <h2 class="feature-title-text">Evaluation System</h2>
                </div>
                <span class="feature-category-tag">Assessment</span>
              </div>
              <p class="feature-body-text">
                'Continuous Internal Evaluation' is the central feature of the evaluation system in this university. A teacher who offers the course is the best person to assess performance of the students. However, there is the end-semester evaluation. And, to ensure transparency, fairness, and accountability appropriate mechanisms have been devised.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill accent">Continuous Internal Evaluation (CIE)</span>
                <span class="feature-pill">End-Semester Evaluation</span>
                <span class="feature-pill success">Transparency &amp; Fairness</span>
              </div>
            </div>

            <!-- Feature 5 -->
            <div class="feature-item-card" data-category="campus">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">05</span>
                  <h2 class="feature-title-text">Infrastructure and Ambience</h2>
                </div>
                <span class="feature-category-tag">Campus</span>
              </div>
              <p class="feature-body-text">
                All appropriate steps are taken to create and maintain infrastructure required for quality teaching and research.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Quality Teaching &amp; Research</span>
                <span class="feature-pill">World-Class Ambience</span>
              </div>
            </div>

            <!-- Feature 6 -->
            <div class="feature-item-card" data-category="governance">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">06</span>
                  <h2 class="feature-title-text">Governance &amp; E-Governance</h2>
                </div>
                <span class="feature-category-tag">Governance</span>
              </div>
              <p class="feature-body-text">
                The University has been evolving dynamic, transparent, equal-opportunity governance, and need based capacity-building system. The University is following a decentralised and participative system of governance to achieve the mandate stated in the Act and Statues. Faculty members are directly involved in decision-making bodies of the University, which in turn helps the students in a great way for redressal of their grievances. Each department of the University has a Departmental Committee and it takes the decisions for academic proposals at initial state before being placed before Apex decision-making bodies of the University. The Board of Studies (BOS) is also an important body of the department which specifically looks after the curriculum development work. Also, the University has put it efforts towards the use of E-Governance tools to bring effectiveness into its administration to promote transparency and efficiency in the system. : It had been moving towards e-governance and continuous training of the personnel to make the university system 'user-friendly'. Professional enrichment of education administrators would become a necessary component for the capacity building of the university administration.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Decentralised &amp; Participative</span>
                <span class="feature-pill">Departmental Committee</span>
                <span class="feature-pill">Board of Studies (BOS)</span>
                <span class="feature-pill success">E-Governance &amp; Training</span>
              </div>
            </div>

            <!-- Feature 7 -->
            <div class="feature-item-card" data-category="welfare">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">07</span>
                  <h2 class="feature-title-text">Psychological Counselling &amp; Guidance Services</h2>
                </div>
                <span class="feature-category-tag">Wellness</span>
              </div>
              <p class="feature-body-text">
                Like physical health, mental health determines efficiency and productivity. Mental health is critically important to teaching-learning processes, creativity and congenial environment in academic institutions. The university adopts a forward looking approach and provides psychological counselling and guidance services to the students, faculty and employees. Innovative programmes, such as 'Crises Intervention Programmes' and 'Community Mental Health Programme' are planned to be developed.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill success">Crises Intervention Programmes</span>
                <span class="feature-pill success">Community Mental Health</span>
                <span class="feature-pill">Student, Faculty &amp; Employee Care</span>
              </div>
            </div>

            <!-- Feature 8 -->
            <div class="feature-item-card" data-category="governance">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">08</span>
                  <h2 class="feature-title-text">Planning, Monitoring and Evaluation</h2>
                </div>
                <span class="feature-category-tag">Quality</span>
              </div>
              <p class="feature-body-text">
                The University is having an Internal Quality Assurance Cell (IQAC) to ensure progressive improvement in efficiency of the functioning of the institution specifically the University administration. The Planning, Development and Monitoring Board (PDMB) with appropriate powers and functions is instituted following UGC guidelines.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Internal Quality Assurance Cell (IQAC)</span>
                <span class="feature-pill brand">PDMB (UGC Guidelines)</span>
              </div>
            </div>

            <!-- Feature 9 -->
            <div class="feature-item-card" data-category="academic">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">09</span>
                  <h2 class="feature-title-text">Admission and its National Character</h2>
                </div>
                <span class="feature-category-tag">Admissions</span>
              </div>
              <p class="feature-body-text">
                UGC guidelines are followed in the university admission process. Efforts are made to have students from all over the country. And, to achieving the same, the Admission to various programmes (courses) of the University is made through national level entrance test jointly conducted by 14 Central Universities and named as Central Universities Common Entrance Test (CUCET). With its transparent and national level admission process, the University has succeeded to attract the students from different states and maintaining the diversity and national character efficiently.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">CUCET / CUET National Level Entrance</span>
                <span class="feature-pill">Joint 14 Central Universities</span>
                <span class="feature-pill success">Pan-India State Diversity</span>
              </div>
            </div>

            <!-- Feature 10 -->
            <div class="feature-item-card" data-category="welfare">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">10</span>
                  <h2 class="feature-title-text">Scholarship Schemes</h2>
                </div>
                <span class="feature-category-tag">Scholarships</span>
              </div>
              <p class="feature-body-text">
                All research scholars (Ph.D) students get UGC scholarship. In addition to Centre government and state government funded scholarships, the University offers a number of scholarship schemes to deserving and needy students, namely (i) Merit Scholarship to CUSBET / Semester Toppers (ii) Merit cum Means Scholarship (iii) Earn While You Learn (EWYL) Scheme &amp; (iv) Attendance Based Merit Scholarship.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">UGC Research Scholarship (Ph.D.)</span>
                <span class="feature-pill accent">(i) Merit to CUSBET / Semester Toppers</span>
                <span class="feature-pill accent">(ii) Merit cum Means Scholarship</span>
                <span class="feature-pill success">(iii) Earn While You Learn (EWYL)</span>
                <span class="feature-pill success">(iv) Attendance Based Merit</span>
              </div>
            </div>

            <!-- Feature 11 -->
            <div class="feature-item-card" data-category="campus">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">11</span>
                  <h2 class="feature-title-text">Hostels for Accommodation</h2>
                </div>
                <span class="feature-category-tag">Residential</span>
              </div>
              <p class="feature-body-text">
                Presently the University offers accommodation to students with one (1) Boys Hostel and one (1) Girls Hostel having combined capacity to accommodate around 800 students. Mess facility is also available for students residing in the hostels on payment basis.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">1 Boys Hostel</span>
                <span class="feature-pill brand">1 Girls Hostel</span>
                <span class="feature-pill accent">800 Student Capacity</span>
                <span class="feature-pill">Mess Facility on Payment Basis</span>
              </div>
            </div>

            <!-- Feature 12 -->
            <div class="feature-item-card" data-category="welfare">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">12</span>
                  <h2 class="feature-title-text">Health Centre / Medical Facility</h2>
                </div>
                <span class="feature-category-tag">Health Care</span>
              </div>
              <p class="feature-body-text">
                The University has its Health Centre, which provides primary level treatment to faculty, staff and students for general ailments under the supervision of Medical officer.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill success">On-Campus Health Centre</span>
                <span class="feature-pill">Supervised by Medical Officer</span>
                <span class="feature-pill">Faculty, Staff &amp; Student Care</span>
              </div>
            </div>

            <!-- Feature 13 -->
            <div class="feature-item-card" data-category="welfare">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">13</span>
                  <h2 class="feature-title-text">Vidyarthi Mediclaim Policy</h2>
                </div>
                <span class="feature-category-tag">Insurance</span>
              </div>
              <p class="feature-body-text">
                All the students of the University are insured under this scheme. This is a unique policy of National Insurance Company (NIC) designed to provide health and personal accident cover to the students. Under this scheme the students are eligible for cashless treatment in authorized hospitals as well as for reimbursement of cost of treatment in other hospitals within the limit of Rs. 50,000.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">National Insurance Company (NIC)</span>
                <span class="feature-pill success">Cashless Treatment in Authorized Hospitals</span>
                <span class="feature-pill accent">₹50,000 Coverage Limit</span>
                <span class="feature-pill">Health &amp; Personal Accident Cover</span>
              </div>
            </div>

            <!-- Feature 14 -->
            <div class="feature-item-card" data-category="welfare">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">14</span>
                  <h2 class="feature-title-text">Campus Placement</h2>
                </div>
                <span class="feature-category-tag">Careers</span>
              </div>
              <p class="feature-body-text">
                The University has a Career Counselling and Placement Cell which takes care of the campus placements and job opportunities for the students. Many students got job placement during the session 2018 - 19 in organisations like Azim Premji Foundation, Care India (NGO), Gandhi Fellowship - Piramal Foundation, etc. Students from Media department got placements in Times of India, Hindustan Times, ETV Bharat, Hindustan Dainik and Prabhat Khabar and along with many other organisations.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Career Counselling &amp; Placement Cell</span>
                <span class="feature-pill">Azim Premji Foundation</span>
                <span class="feature-pill">Care India (NGO)</span>
                <span class="feature-pill">Gandhi Fellowship (Piramal)</span>
                <span class="feature-pill accent">Times of India</span>
                <span class="feature-pill accent">Hindustan Times</span>
                <span class="feature-pill accent">ETV Bharat</span>
                <span class="feature-pill accent">Prabhat Khabar</span>
              </div>
            </div>

            <!-- Feature 15 -->
            <div class="feature-item-card" data-category="academic">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">15</span>
                  <h2 class="feature-title-text">Internships</h2>
                </div>
                <span class="feature-category-tag">Industry</span>
              </div>
              <p class="feature-body-text">
                Keeping in view the importance of role of practice based learning / first hand industry experience the University makes arrangements for internship opportunities to the students during Summer vacation.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Practice-Based Learning</span>
                <span class="feature-pill">First-Hand Industry Experience</span>
                <span class="feature-pill success">Summer Vacation Internships</span>
              </div>
            </div>

            <!-- Feature 16 -->
            <div class="feature-item-card" data-category="welfare">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">16</span>
                  <h2 class="feature-title-text">Sports &amp; Cultural / Co-curricular Activities</h2>
                </div>
                <span class="feature-category-tag">Co-Curricular</span>
              </div>
              <p class="feature-body-text">
                The University has committees like Games and Sports Activities Committee, Cultural Activities Committee which conducts various activities for students round the year. The students of the University participate in the state and nation level competitions and events under the supervision of co-ordinators of the committees and impress all with their brilliant performances.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Games &amp; Sports Committee</span>
                <span class="feature-pill brand">Cultural Activities Committee</span>
                <span class="feature-pill success">State &amp; National Competitions</span>
              </div>
            </div>

            <!-- Feature 17 -->
            <div class="feature-item-card" data-category="governance">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">17</span>
                  <h2 class="feature-title-text">Proctorial Board</h2>
                </div>
                <span class="feature-category-tag">Discipline</span>
              </div>
              <p class="feature-body-text">
                The board is responsible to maintain discipline among the students of University and it functions under supervision of the Chief Proctor. The Proctorial board takes preventive steps to maintain the discipline within the University premises, issues the notices and warnings as per need of the situation.
              </p>
              <div class="feature-pills-wrap">
                <span class="feature-pill brand">Chief Proctor Supervision</span>
                <span class="feature-pill">Preventive Discipline Steps</span>
                <span class="feature-pill accent">Campus Notices &amp; Warnings</span>
              </div>
            </div>

            <!-- Feature 18 -->
            <div class="feature-item-card" data-category="welfare" style="grid-column: 1 / -1;">
              <div class="feature-card-top">
                <div class="feature-title-block">
                  <span class="feature-num-badge">18</span>
                  <h2 class="feature-title-text">Student Welfare Board (DSW)</h2>
                </div>
                <span class="feature-category-tag">Comprehensive Welfare</span>
              </div>
              <p class="feature-body-text">
                The Dean Students' Welfare (DSW) is shouldering the responsibility of looking after the general welfare of students outside classrooms, in order to ensure all round development. The office of DSW performs duties and functions across 11 key mandates:
              </p>
              
              <div class="dsw-duties-grid">
                <div class="dsw-duty-item"><span><b>(i)</b> Educational tours, excursions &amp; sports outside university</span></div>
                <div class="dsw-duty-item"><span><b>(ii)</b> Social and cultural activities</span></div>
                <div class="dsw-duty-item"><span><b>(iii)</b> Formation of student bodies</span></div>
                <div class="dsw-duty-item"><span><b>(iv)</b> Evaluation of student-teacher relationship</span></div>
                <div class="dsw-duty-item"><span><b>(v)</b> Financial aid recommendations &amp; travel concessions</span></div>
                <div class="dsw-duty-item"><span><b>(vi)</b> Fellowships / scholarships in India &amp; abroad</span></div>
                <div class="dsw-duty-item"><span><b>(vii)</b> Student counselling services</span></div>
                <div class="dsw-duty-item"><span><b>(viii)</b> Special assistance to differently abled &amp; women students</span></div>
                <div class="dsw-duty-item"><span><b>(ix)</b> Student information services</span></div>
                <div class="dsw-duty-item"><span><b>(x)</b> Organisation of Alumni Association</span></div>
                <div class="dsw-duty-item" style="grid-column: 1 / -1;"><span><b>(xi)</b> Issue of certificates as authorised and delegated by the Vice Chancellor</span></div>
              </div>
            </div>

          </div>

          <!-- 4. Best Practices Grand Showcase -->
          <div class="best-practices-wrapper" id="bestPracticesSection" data-category="best-practices">
            <div class="best-practices-header">
              <span class="best-practices-tag">🌱 Sustainability &bull; Social Responsibility</span>
              <h2 class="best-practices-title">Best Practices</h2>
              <p class="best-practices-desc">
                Pioneering ecological sustainability, comprehensive waste management protocols, and direct student involvement in rural community development.
              </p>
            </div>

            <div class="best-practices-grid">
              
              <!-- Best Practice 1 -->
              <div class="best-practice-card">
                <div class="best-practice-icon-box">💧</div>
                <h3 class="best-practice-card-title">1. Zero Water Discharge</h3>
                <p class="best-practice-card-body">
                  Elaborate arrangement has been made to ensure that the water discharged through sewerage gets recycled. The rain water is collected in the artificially constructed ponds located at the north-east of the campus through a network of drainage system.
                </p>
                <div class="feature-pills-wrap" style="margin-top: auto; padding-top: 14px;">
                  <span class="feature-pill success">100% Sewerage Recycling</span>
                  <span class="feature-pill success">North-East Rainwater Ponds</span>
                </div>
              </div>

              <!-- Best Practice 2 -->
              <div class="best-practice-card">
                <div class="best-practice-icon-box">♻️</div>
                <h3 class="best-practice-card-title">2. Planned Waste Disposal</h3>
                <p class="best-practice-card-body">
                  University has well defined protocol for all types of hazardous, chemical and other waste disposal.
                </p>
                <div class="feature-pills-wrap" style="margin-top: auto; padding-top: 14px;">
                  <span class="feature-pill accent">Hazardous Waste Protocols</span>
                  <span class="feature-pill accent">Chemical Waste Management</span>
                </div>
              </div>

              <!-- Best Practice 3 -->
              <div class="best-practice-card">
                <div class="best-practice-icon-box">🤝</div>
                <h3 class="best-practice-card-title">3. Student Involvement in Community Development</h3>
                <p class="best-practice-card-body">
                  Students are engaged in the local community development either through non credit courses as a part of their curriculums e.g. courses like Village based Skills, Plantation of Trees, or students are encouraged and motivated to participate in such activities. One such successful student-driven organization within the CUSB is SMiLE group which has been actively involved in helping surrounding unprivileged children by distributing stationery and other essential items and also helping them learn the subjects.
                </p>
                <div class="feature-pills-wrap" style="margin-top: auto; padding-top: 14px;">
                  <span class="feature-pill brand">SMiLE Group Initiative</span>
                  <span class="feature-pill success">Village-Based Skills</span>
                  <span class="feature-pill success">Tree Plantation</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    `;

    // Interactive Search and Filtering Logic
    const searchInput = document.getElementById('featureSearchInput');
    const counter = document.getElementById('featureMatchCounter');
    const tags = document.querySelectorAll('#featureTagFilters .policy-filter-tag');
    const featureCards = document.querySelectorAll('.feature-item-card');
    const bestPracticesSec = document.getElementById('bestPracticesSection');

    let currentFilter = 'all';

    function applyFeatureFilter() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      let matchCount = 0;

      // Filter 18 Salient Feature Cards
      featureCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.textContent.toLowerCase();
        
        let matchesCategory = (currentFilter === 'all') || 
                              (currentFilter === 'academic' && (cat === 'academic' || cat === 'pedagogy')) ||
                              (currentFilter === 'governance' && cat === 'governance') ||
                              (currentFilter === 'welfare' && cat === 'welfare') ||
                              (currentFilter === 'campus' && (cat === 'campus' || cat === 'residential'));
        
        if (currentFilter === 'best-practices') {
          matchesCategory = false;
        }

        const matchesQuery = !query || text.includes(query);

        if (matchesCategory && matchesQuery) {
          card.style.display = '';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Best Practices Section
      if (bestPracticesSec) {
        const bpText = bestPracticesSec.textContent.toLowerCase();
        const matchesCategory = currentFilter === 'all' || currentFilter === 'best-practices';
        const matchesQuery = !query || bpText.includes(query);

        if (matchesCategory && matchesQuery) {
          bestPracticesSec.style.display = '';
          if (currentFilter === 'best-practices' || query) {
            matchCount += 3;
          }
        } else {
          bestPracticesSec.style.display = 'none';
        }
      }

      if (counter) {
        if (query) {
          counter.textContent = `Found ${matchCount} matching section${matchCount === 1 ? '' : 's'}`;
        } else if (currentFilter === 'all') {
          counter.textContent = 'Showing all 18 features & 3 best practices';
        } else if (currentFilter === 'best-practices') {
          counter.textContent = 'Showing 3 Green Best Practices';
        } else {
          counter.textContent = `Showing ${matchCount} features in this category`;
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFeatureFilter);
    }

    tags.forEach(btn => {
      btn.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        applyFeatureFilter();
      });
    });

    return;
  }

  if (slug === 'annual-reports') {
    document.title = `Annual Reports And Annual Accounts — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;

    const reportsData = [
      {
        year: '2024-2025',
        label: '2024–2025',
        isLatest: true,
        items: [
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2024-25 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2024-25-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2024-25 (English)', pdf: 'assets/documents/about/annual-report-2024-25-english.pdf' },
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2024-25 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2024-25-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2024-25 (English)', pdf: 'assets/documents/about/annual-accounts-2024-25-english.pdf' }
        ]
      },
      {
        year: '2023-2024',
        label: '2023–2024',
        isLatest: false,
        items: [
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2023-24 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2023-24-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2023-24 (English)', pdf: 'assets/documents/about/annual-report-2023-24-english.pdf' },
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2023-24 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2023-24-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2023-24 (English)', pdf: 'assets/documents/about/annual-accounts-2023-24-english.pdf' }
        ]
      },
      {
        year: '2022-2023',
        label: '2022–2023',
        isLatest: false,
        items: [
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2022-23 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2022-23 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2022-23 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2022-23 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' }
        ]
      },
      {
        year: '2021-2022',
        label: '2021–2022',
        isLatest: false,
        items: [
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2021-22 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2021-22 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2021-22 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2021-22 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' }
        ]
      },
      {
        year: '2020-2021',
        label: '2020–2021',
        isLatest: false,
        items: [
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2020-21 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2020-21 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2020-21 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2020-21 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' }
        ]
      },
      {
        year: '2019-2020',
        label: '2019–2020',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2019-20 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2019-20 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2019-20 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2019-20 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      },
      {
        year: '2018-2019',
        label: '2018–2019',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2018-19 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2018-19 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2018-19 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2018-19 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      },
      {
        year: '2017-2018',
        label: '2017–2018',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2017-18 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2017-18 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2017-18 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2017-18 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      },
      {
        year: '2016-2017',
        label: '2016–2017',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2016-17 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2016-17 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2016-17 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2016-17 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      },
      {
        year: '2015-2016',
        label: '2015–2016',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2015-16 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2015-16 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2015-16 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2015-16 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      },
      {
        year: '2014-2015',
        label: '2014–2015',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2014-15 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2014-15 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2014-15 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2014-15 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      },
      {
        year: '2013-2014',
        label: '2013–2014',
        isLatest: false,
        items: [
          { type: 'accounts', lang: 'hi', title: 'वार्षिक लेखा 2013-14 (हिन्दी)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'accounts', lang: 'en', title: 'Annual Accounts 2013-14 (English)', pdf: 'assets/documents/about/annual-accounts-2022-23-english.pdf' },
          { type: 'report', lang: 'hi', title: 'वार्षिक प्रतिवेदन 2013-14 (हिन्दी)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' },
          { type: 'report', lang: 'en', title: 'Annual Report 2013-14 (English)', pdf: 'assets/documents/about/annual-report-2022-23-english.pdf' }
        ]
      }
    ];

    const cardsHtml = reportsData.map(group => {
      const docsHtml = group.items.map(item => `
        <a href="${item.pdf}" target="_blank" class="annual-doc-link-item" data-type="${item.type}" data-lang="${item.lang}">
          <div class="annual-doc-left">
            <span class="annual-lang-badge ${item.lang}">${item.lang === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
            <span class="annual-doc-text">${item.title}</span>
          </div>
          <span class="annual-pdf-badge">PDF ↗</span>
        </a>
      `).join('');

      return `
        <div class="annual-year-card" data-year="${group.year}">
          <div class="annual-year-header">
            <div class="annual-year-title-wrap">
              <div class="annual-year-icon">📅</div>
              <h2 class="annual-year-title">${group.year}</h2>
            </div>
            <span class="annual-year-status ${group.isLatest ? 'latest' : ''}">${group.isLatest ? 'Latest Release' : 'Archived Record'}</span>
          </div>
          <div class="annual-doc-list" style="display: flex; flex-direction: column; gap: 8px;">
            ${docsHtml}
          </div>
        </div>
      `;
    }).join('');

    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="features-hub-wrapper">
          
          <!-- Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">📊 Institutional Governance &bull; Parliament of India Archive</span>
            <h1 class="policy-main-title">Annual Reports And Annual Accounts</h1>
            <p class="policy-main-desc">
              Official statutory repository of audited financial accounts, institutional growth reports, academic milestones, and bilingual annual reports tabled before the Parliament of India from 2013-14 to 2024-25.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">12 Years</div>
                <div class="policy-stat-lbl">Archive Span (2013–2025)</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">48</div>
                <div class="policy-stat-lbl">Statutory Documents</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Bilingual</div>
                <div class="policy-stat-lbl">Hindi &amp; English Editions</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">CAG Audited</div>
                <div class="policy-stat-lbl">Financial Accounts</div>
              </div>
            </div>
          </div>

          <!-- Live Search & Filtering Bar -->
          <div class="policy-filter-bar">
            <div class="policy-search-box">
              <span class="policy-search-icon">🔍</span>
              <input type="text" id="annualSearchInput" class="policy-search-input" placeholder="Search by year (e.g., 2024, 2020), Annual Report, वार्षिक लेखा..." aria-label="Search annual records">
              <span class="policy-search-count" id="annualMatchCounter">Showing all 12 academic years (48 records)</span>
            </div>
            <div class="policy-tag-scroll" id="annualTagFilters">
              <button class="policy-filter-tag active" data-filter="all">All Documents (48)</button>
              <button class="policy-filter-tag" data-filter="report">Annual Reports (24)</button>
              <button class="policy-filter-tag" data-filter="accounts">Annual Accounts (24)</button>
              <button class="policy-filter-tag" data-filter="en">English Editions (24)</button>
              <button class="policy-filter-tag" data-filter="hi">हिन्दी संस्करण (24)</button>
              <button class="policy-filter-tag" data-filter="recent">Recent (2020–2025)</button>
            </div>
          </div>

          <!-- 12 Academic Years Bento Grid -->
          <div class="annual-year-grid" id="annualYearGrid">
            ${cardsHtml}
          </div>

        </div>
      </section>
    `;

    // Interactive Search & Filter Logic
    const searchInput = document.getElementById('annualSearchInput');
    const counter = document.getElementById('annualMatchCounter');
    const tags = document.querySelectorAll('#annualTagFilters .policy-filter-tag');
    const yearCards = document.querySelectorAll('.annual-year-card');

    let currentFilter = 'all';

    function applyAnnualFilter() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      let visibleYears = 0;
      let matchedDocs = 0;

      yearCards.forEach(card => {
        const year = card.getAttribute('data-year');
        const isRecent = parseInt(year.split('-')[0]) >= 2020;
        const docItems = card.querySelectorAll('.annual-doc-link-item');
        let hasMatchingDocInCard = false;

        docItems.forEach(item => {
          const type = item.getAttribute('data-type');
          const lang = item.getAttribute('data-lang');
          const text = item.textContent.toLowerCase();

          let matchesCategory = (currentFilter === 'all') ||
                                (currentFilter === 'report' && type === 'report') ||
                                (currentFilter === 'accounts' && type === 'accounts') ||
                                (currentFilter === 'en' && lang === 'en') ||
                                (currentFilter === 'hi' && lang === 'hi') ||
                                (currentFilter === 'recent' && isRecent);

          const matchesQuery = !query || text.includes(query) || year.toLowerCase().includes(query);

          if (matchesCategory && matchesQuery) {
            item.style.display = '';
            hasMatchingDocInCard = true;
            matchedDocs++;
          } else {
            item.style.display = 'none';
          }
        });

        if (hasMatchingDocInCard) {
          card.style.display = '';
          visibleYears++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counter) {
        if (query) {
          counter.textContent = `Found ${matchedDocs} matching document${matchedDocs === 1 ? '' : 's'} across ${visibleYears} year${visibleYears === 1 ? '' : 's'}`;
        } else if (currentFilter === 'all') {
          counter.textContent = 'Showing all 12 academic years (48 records)';
        } else {
          counter.textContent = `Showing ${matchedDocs} documents across ${visibleYears} years`;
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyAnnualFilter);
    }

    tags.forEach(btn => {
      btn.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        applyAnnualFilter();
      });
    });

    return;
  }

  if (slug === 'university-kulgeet') {
    document.title = `University Kulgeet (Anthem) — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;
    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="kulgeet-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">🎶 University Anthem &bull; विद्या-धारा एवं सांस्कृतिक चेतना</span>
            <h1 class="policy-main-title">University Kulgeet</h1>
            <p class="policy-main-desc">
              The University Kulgeet was composed by Dr. Hari Prasad Dubey in 2013. At the First Convocation of CUSB on 26 September 2013, it was sung in its fine musical form by a singers' team led by Dr. Richa Vatsa (CUSB) with esteemed musicians (Late) Prof. R. P. Shastri (BHU) on Violin, Dr. Vijay Kapoor (BHU) on Harmonium, and Mr. Raj Shekhar (DPS, Patna) on Tabla. This can be played online and downloaded from the link given below.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">2013</div>
                <div class="policy-stat-lbl">Year Composed</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Dr. H. P. Dubey</div>
                <div class="policy-stat-lbl">Poet &amp; Lyricist</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">6 Stanzas</div>
                <div class="policy-stat-lbl">Poetic Composition</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Audio &amp; Plaque</div>
                <div class="policy-stat-lbl">Official Anthem</div>
              </div>
            </div>
          </div>

          <!-- 2. Interactive Audio Player & Media Bar -->
          <div class="kulgeet-player-card">
            <div class="kulgeet-player-top">
              <div class="kulgeet-player-title-wrap">
                <div class="kulgeet-player-icon">🎵</div>
                <div>
                  <h3 class="kulgeet-player-heading">CUSB Official Kulgeet (Audio Track)</h3>
                  <p class="kulgeet-player-sub">Listen to the official rendition of Central University of South Bihar's Kulgeet</p>
                </div>
              </div>
              <div class="kulgeet-player-actions">
                <audio id="kulgeetAudio" preload="none">
                  <source src="assets/documents/about/university-kulgeet.mp3" type="audio/mpeg">
                </audio>
                <button id="kulgeetPlayBtn" class="kulgeet-audio-btn" type="button">
                  <span id="playIcon">▶️</span> <span id="playText">Play Kulgeet</span>
                </button>
                <a href="assets/documents/about/university-kulgeet.mp3" download class="kulgeet-audio-btn pdf-btn">
                  <span>⬇ Download Audio</span>
                </a>
              </div>
            </div>
            <div class="kulgeet-performers-strip">
              <b>🎼 Premier Performance:</b> Sung by singers' team led by <b>Dr. Richa Vatsa</b> (CUSB) with <b>(Late) Prof. R. P. Shastri</b> (BHU) on Violin, <b>Dr. Vijay Kapoor</b> (BHU) on Harmonium, and <b>Mr. Raj Shekhar</b> (DPS, Patna) on Tabla.
            </div>
          </div>

          <!-- 3. Dual Inspiration & Context Grid (English & Hindi) -->
          <div class="kulgeet-context-grid">
            
            <!-- Genesis Card (English) -->
            <div class="kulgeet-context-card english-theme">
              <h2 class="kulgeet-context-title">
                <span>🌟</span> Genesis of University Kulgeet
              </h2>
              <p class="kulgeet-context-body">
                The credos of Kulgeet (University Anthem) of Central University of South Bihar (CUSB) are nature, environment, compassion and cultural consciousness of the historical land of Bihar. The poet has penned it down keeping in mind the world famous rich cultural heritage of the glorious land of Bihar. While writing the poet has taken inspirations from the Holy City of Gaya, the land of salvation, which is also referred as the Tapobhoomi of Mahatma Buddha, Pitritirtha and Vishnu Nagar. Elevating the standards of life and making it beautiful is the prime goal of Human life. Vidhaiva Sarvam is the motto of life and service to humanity is like a precious immortal gift. Simplicity, values and generosity also make character of Human being great. In the Kulgeet the poet has dreamed of making India a Vishwaguru by disseminating quality education with cultural and human values. To build India's future, all types of difficulties coming on the way must be surpassed by promising hard work. Persistent efforts with the honest intention can make the great History that is achievable as the Kulgeet describes Bihar as the culturally rich land of all religious faiths.
              </p>
              <div class="kulgeet-poet-credit">
                University Kulgeet Composed By: <b>Dr. Hari Prasad Dubey</b>
              </div>
            </div>

            <!-- Prerana-Prasang Card (Hindi) -->
            <div class="kulgeet-context-card hindi-theme">
              <h2 class="kulgeet-context-title">
                <span>📜</span> कुलगीत : प्रेरणा-प्रसंग
              </h2>
              <p class="kulgeet-context-body">
                जीवन को ऊँचा उठाना और सुंदर बनाना मानव जीवन का लक्ष्य है। ऐतिहासिक भूमि बिहार की सांस्कृतिक चेतना विश्व विख्यात है। मोक्ष की धरती गया महात्मा बुद्ध की तपोभूमि, पितृतीर्थ और विष्णु नगर है। बिहार का इतिहास संस्कृति की मर्यादा का व्याख्यान है। विश्वविद्यालय कुलगीत का मूल मंत्र है। प्रकृति, पर्यावरण, करुणा रक्षाकवच है। विश्वगुरु बनने का सपना शिक्षा का अध्याय है। भारत के भविष्य को गढ़ने के लिए होनहार कठोर श्रम से कठिनाइयां निखारते हैं। विद्यैव सर्वम् जीवन का कवच है। सेवा मानवता का वरदान है। शुभी आदर्श जीवन का इतिहास रचती हैं। सरलता, संस्कार, चरित्र से महान बनाती है।
              </p>
              <div class="kulgeet-poet-credit">
                विश्वविद्यालय कुलगीत रचयिता: <b>डॉ० हरिप्रसाद दुबे</b>
              </div>
            </div>

          </div>

          <!-- 4. Grand Authentic Kulgeet Plaque / Poster -->
          <div class="kulgeet-plaque-wrapper">
            <img src="assets/culog.png" alt="CUSB Emblem Watermark" class="kulgeet-plaque-watermark" loading="lazy">
            <div class="kulgeet-plaque-content">
              
              <div class="kulgeet-plaque-ribbon">
                कुलगीत
              </div>

              <div class="kulgeet-stanzas-grid">
                
                <!-- Stanza 1 (Top Left) -->
                <div class="kulgeet-stanza-card">
                  कला-संस्कृति, सर्वज्ञान की,<br>
                  बहे जहां विद्या-धारा।<br>
                  प्रथम केन्द्रीय विश्वविद्यालय,<br>
                  स्थापित बिहार में न्यारा।।
                </div>

                <!-- Stanza 2 (Top Right) -->
                <div class="kulgeet-stanza-card offset-top">
                  सतत ज्ञान-विज्ञान की सीमा,<br>
                  का सम्बर्धन लक्ष्य हमारा।<br>
                  जिससे हो मानव विकास नित,<br>
                  समता का समाज हो प्यारा।।
                </div>

                <!-- Stanza 3 (Middle Left) -->
                <div class="kulgeet-stanza-card">
                  बने विचारों के विमर्श की,<br>
                  सदा स्थली विश्वविद्यालय।<br>
                  मानवीय मूल्यों-संबंधों,<br>
                  के सर्जन को सदा संवारा।।
                </div>

                <!-- Stanza 4 (Middle Right) -->
                <div class="kulgeet-stanza-card offset-top">
                  अक्षुण्ण रखते हुए प्रकृति को,<br>
                  मानव विकास ऊंचाई पाये।<br>
                  निर्धनता किसी को न रोके<br>
                  निष्ठा सत्य लक्ष्य चमकाये ।।
                </div>

                <!-- Stanza 5 (Bottom Left) -->
                <div class="kulgeet-stanza-card offset-bottom">
                  अपनी मेहनत अद्भुत सपना,<br>
                  राह गगन में नई बनायें।<br>
                  पारदर्शिता से हम इसको,<br>
                  धरती पर पहचान दिलायें ।।
                </div>

                <!-- Stanza 6 (Bottom Right) -->
                <div class="kulgeet-stanza-card offset-top">
                  सर्वधर्म की भूमि यहीं पर,<br>
                  जिसने जीवन-मूल्य निखारा।<br>
                  नव जागरण ज्ञान की गरिमा,<br>
                  बढ़े शोध-संस्कृति क्रम न्यारा ।।
                </div>

              </div>

              <div class="kulgeet-plaque-footer">
                <span class="kulgeet-signature-text">
                  ✍️ रचयिता - डॉ. हरिप्रसाद दुबे
                </span>
              </div>

            </div>
          </div>

          <!-- 5. Direct Action Download Bar -->
          <div style="text-align: center; margin-top: 24px;">
            <a href="about-resources.html#kulgeet" class="btn btn-navy">
              🏛️ University Kulgeet in Institutional Records ↗
            </a>
          </div>

        </div>
      </section>
    `;

    // Audio Play / Pause logic
    const playBtn = document.getElementById('kulgeetPlayBtn');
    const audio = document.getElementById('kulgeetAudio');
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playText');

    if (playBtn && audio) {
      playBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play().then(() => {
            if (playIcon) playIcon.textContent = '⏸️';
            if (playText) playText.textContent = 'Pause';
          }).catch(() => {
            alert('Audio rendition available. Click download to save the official MP3.');
          });
        } else {
          audio.pause();
          if (playIcon) playIcon.textContent = '▶️';
          if (playText) playText.textContent = 'Play Kulgeet';
        }
      });

      audio.addEventListener('ended', () => {
        if (playIcon) playIcon.textContent = '▶️';
        if (playText) playText.textContent = 'Play Kulgeet';
      });
    }

    return;
  }

  if (slug === 'cusb-logo') {
    document.title = `CUSB Logo — Visual Identity — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;

    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="logo-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">🎨 Visual Identity &bull; Executive Council Resolution</span>
            <h1 class="policy-main-title">CUSB Logo</h1>
            <p class="policy-main-desc">
              The Executive Council of the Central University of Bihar passed a resolution and accepted the Logo of the University on November 20, 2010. The new logo of the university came into existence since August, 2018. The logo of Central University of Bihar is an adaptation of a Peepal tree symbolizing the rich culture of Bihar. It is a visual identity of the University representing education, wisdom and enlightenment.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">20 Nov 2010</div>
                <div class="policy-stat-lbl">EC Resolution Accepted</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">August 2018</div>
                <div class="policy-stat-lbl">Current Emblem Adopted</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Peepal Tree</div>
                <div class="policy-stat-lbl">Sacred Bodhi Symbolism</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">ज्ञान सेवा विमुक्तये</div>
                <div class="policy-stat-lbl">University Motto</div>
              </div>
            </div>
          </div>

          <!-- 2. Symbolism & Core Values 3-Pillar Grid -->
          <div class="logo-symbol-grid">
            <div class="logo-symbol-card">
              <span class="logo-symbol-icon">🌳</span>
              <h3 class="logo-symbol-title">The Sacred Peepal Tree</h3>
              <p class="logo-symbol-text">
                An adaptation of the sacred Bodhi/Peepal tree reflecting Bihar's ancient heritage of enlightenment, deep-rooted scholarship, and holistic human growth.
              </p>
            </div>
            <div class="logo-symbol-card">
              <span class="logo-symbol-icon">🌅</span>
              <h3 class="logo-symbol-title">Sunrise &amp; Enlightenment</h3>
              <p class="logo-symbol-text">
                The golden rising sun behind the foliage represents the dawn of new knowledge, scientific inquiry, and dispelling the darkness of ignorance.
              </p>
            </div>
            <div class="logo-symbol-card">
              <span class="logo-symbol-icon">📜</span>
              <h3 class="logo-symbol-title">ज्ञान सेवा विमुक्तये</h3>
              <p class="logo-symbol-text">
                The Sanskrit motto inscribed on the foundation ribbon proclaims that knowledge is meant for selfless service and ultimate intellectual liberation.
              </p>
            </div>
          </div>

          <!-- 3. Historical Transition: Old Logo (2010–2018) -->
          <div class="logo-historic-card">
            <span class="logo-old-badge">Institutional Archive &bull; 2010 to 2018</span>
            <div class="logo-old-frame">
              <img src="assets/cusb-logo-old.png" alt="Old Logo of Central University of Bihar" loading="lazy">
            </div>
            <p class="logo-old-caption">
              Old Logo of University which was replaced by new logo since 2018
            </p>
          </div>

          <!-- 4. Download New Logo Header Bar -->
          <div class="logo-section-bar">
            <span>📥 Download New Logo (Official High-Resolution Assets)</span>
            <span style="font-size: 0.85rem; font-weight: 600; opacity: 0.9;">Available in PNG &amp; Vector formats</span>
          </div>

          <!-- 5. 2-Column New Logo Showcase & Downloads -->
          <div class="logo-variants-grid">
            
            <!-- Variant 1: Colored Full Resolution -->
            <div class="logo-variant-card">
              <div class="logo-img-stage">
                <img src="assets/culog.png" alt="CUSB High Resolution Image (Colored)" loading="lazy">
              </div>
              <h3 class="logo-variant-title">High Resolution Image (Colored)</h3>
              <p class="logo-variant-desc">
                Official full-color emblem for digital media, official website, publications, banners, and ceremonial displays.
              </p>
              <div class="logo-actions-wrap">
                <a href="assets/culog.png" download="CUSB-Logo-Colored.png" class="logo-dl-btn">
                  ⬇ Download PNG
                </a>
                <a href="assets/culog.png" target="_blank" class="logo-dl-btn outline">
                  Open Full Res ↗
                </a>
              </div>
            </div>

            <!-- Variant 2: Monotone Logo -->
            <div class="logo-variant-card">
              <div class="logo-img-stage">
                <img src="assets/cusb-logo-monotone.png" alt="CUSB Monotone Logo" loading="lazy">
              </div>
              <h3 class="logo-variant-title">Monotone logo</h3>
              <p class="logo-variant-desc">
                Official single-color maroon/dark red version for official stationery, letterheads, seals, stamps, and formal print documents.
              </p>
              <div class="logo-actions-wrap">
                <a href="assets/cusb-logo-monotone.png" download="CUSB-Logo-Monotone.png" class="logo-dl-btn">
                  ⬇ Download PNG
                </a>
                <a href="assets/cusb-logo-monotone.png" target="_blank" class="logo-dl-btn outline">
                  Open Full Res ↗
                </a>
              </div>
            </div>

          </div>

          <!-- 6. Bottom Links -->
          <div style="text-align: center; margin-top: 10px;">
            <a href="about-resources.html#logo" class="btn btn-navy">
              🏛️ View CUSB Visual Identity in Institutional Resources ↗
            </a>
          </div>

        </div>
      </section>
    `;

    return;
  }

  if (slug === 'how-to-reach') {
    document.title = `How To Reach CUSB — Campus Connectivity & Travel Guide — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;

    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="reach-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">📍 Location &amp; Connectivity &bull; Gaya, Bihar, India</span>
            <h1 class="policy-main-title">How To Reach CUSB</h1>
            <p class="policy-main-desc">
              The CUSB Gaya campus is located on SH-7 Gaya-Panchanpur road, around 15 Kms from Gaya Railway Station and 25 Kms from Gaya Airport. The campus is well connected through air, railway and road. It is about 15 km from Gaya Railway station. Gaya Railway station is on the main line of the Eastern railway from Howrah to Delhi, which is 20 km from Gaya International Airport and 98 km from Patna airport.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">15 km</div>
                <div class="policy-stat-lbl">Gaya Railway Junction</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">20 km</div>
                <div class="policy-stat-lbl">Gaya Intl. Airport</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">98 km</div>
                <div class="policy-stat-lbl">Patna Airport (PAT)</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">SH-7</div>
                <div class="policy-stat-lbl">Gaya–Panchanpur Highway</div>
              </div>
            </div>
          </div>

          <!-- 2. Gaya: Heritage & Emerging Educational Hub Showcase -->
          <div class="reach-heritage-card">
            <h2 class="reach-heritage-title">
              <span>🏛️</span> Gaya: World Heritage, Spiritual Crossroads &amp; Educational Hub
            </h2>
            <p class="reach-heritage-text">
              Globally known as an abode of Bhagwan Gautam Buddha, Gaya is a famous destination for Buddhist pilgrimage as well as Holy locations for Hindus. Devotees and tourists throng the city of Gaya round the year for paying a visit to Bodhi Temple at Bodh Gaya, while the Hindus visit the city for the religious ritual of 'Pindaan' - a special puja for salvation of their ancestors. Over the years, Gaya, the southernmost district of Bihar has also established itself as a Business hub of Bihar due to its well-connectivity with national capital New Delhi and Kolkata. Gaya is an upcoming Educational hub donning the two Central government funded institutions namely Central University of South Bihar (CUSB) and Indian Institute of Management (IIM) Bodhgaya beside a state government funded Magadh University.
            </p>
          </div>

          <!-- 3. Travel Modes Bento Stack -->
          <div class="reach-modes-container">
            
            <!-- Mode 1: By Train -->
            <div class="reach-mode-card">
              <div class="reach-mode-header">
                <span>🚆 By Train :</span>
                <span style="font-size: 0.85rem; font-weight: 600; opacity: 0.95;">Station Code: GAYA (Eastern Railway Mainline)</span>
              </div>
              <div class="reach-mode-body">
                <p class="reach-mode-prose">
                  Gaya Junction (station code - GAYA) is an important station on Howrah - New Delhi route and connected to almost all parts of country with express and mail trains. Rajdhani Express trains plying between New Delhi - Howrah, New Delhi - Sealdah, New Delhi - Bhubaneswar, etc. have their stoppages at Gaya. Many passenger (local) trains ply between Gaya and Patna, Gaya and Deen Dayal Upadhyay Junction, Gaya and Barauni.
                </p>

                <!-- Key Distances Grid -->
                <div class="reach-distance-grid">
                  <div class="reach-dist-pill">
                    <span class="reach-dist-city">Patna Junction</span>
                    <span class="reach-dist-km">92 kms</span>
                  </div>
                  <div class="reach-dist-pill">
                    <span class="reach-dist-city">Barauni Junction</span>
                    <span class="reach-dist-km">158 kms</span>
                  </div>
                  <div class="reach-dist-pill">
                    <span class="reach-dist-city">Pt. Deen Dayal Upadhyay Jn</span>
                    <span class="reach-dist-km">232 kms</span>
                  </div>
                  <div class="reach-dist-pill">
                    <span class="reach-dist-city">Varanasi Junction</span>
                    <span class="reach-dist-km">258 kms</span>
                  </div>
                  <div class="reach-dist-pill">
                    <span class="reach-dist-city">Kolkata (Howrah/Sealdah)</span>
                    <span class="reach-dist-km">460 kms</span>
                  </div>
                  <div class="reach-dist-pill">
                    <span class="reach-dist-city">New Delhi</span>
                    <span class="reach-dist-km">1050 kms</span>
                  </div>
                </div>

                <!-- Advisory Box -->
                <div class="reach-advisory-box">
                  <span>ℹ️</span>
                  <div>
                    <b>Travel Advisory:</b> Gaya Junction is a prime tourist and pilgrimage destination that observes substantial rush throughout the year. Passengers and visitors are advised to reserve train tickets well in advance.
                  </div>
                </div>
              </div>
            </div>

            <!-- Mode 2: By Road -->
            <div class="reach-mode-card">
              <div class="reach-mode-header road">
                <span>🛣️ By Road :</span>
                <span style="font-size: 0.85rem; font-weight: 600; opacity: 0.95;">National Highways 19 &amp; 83 &bull; State Highway 7</span>
              </div>
              <div class="reach-mode-body">
                <p class="reach-mode-prose">
                  National Highway (NH) No. 19 between Delhi with Kolkata passes through Gaya and connects the city with major cities as well as other important destinations of India. National Highway (NH) No. 83 connects Gaya with Patna, the capital city of Bihar and north-eastern region of India. Buses run at frequent intervals between Patna and Gaya, it takes about 4 hours to travel between two destinations. From Patna buses are available for all the parts of Bihar.
                </p>
                <div style="background: var(--bg-secondary, #f8fafc); border: 1px solid var(--border-color, #e2e8f0); border-radius: 12px; padding: 14px 18px; font-size: 0.9rem; color: var(--tx-secondary, #475569); line-height: 1.6;">
                  🚗 <b>Campus Access:</b> From Gaya City / Railway Station, local auto-rickshaws, e-rickshaws, and private taxis are available for the 15 km journey along State Highway 7 (Gaya–Panchanpur Road) directly to CUSB Gate.
                </div>
              </div>
            </div>

            <!-- Mode 3: By Air -->
            <div class="reach-mode-card">
              <div class="reach-mode-header air">
                <span>✈️ By Air :</span>
                <span style="font-size: 0.85rem; font-weight: 600; opacity: 0.95;">Gaya Intl Airport (GAY) &bull; Patna Airport (PAT)</span>
              </div>
              <div class="reach-mode-body">
                <p class="reach-mode-prose">
                  Gaya International Airport (IATA Code: GAY) is having domestic connectivity with Delhi, Kolkata, Mumbai, Varanasi, Bengaluru and other parts of India with limited flights operated by Air India and Indigo airline. Additionally, Gaya is directly connected to Bangkok, Yangon (Myanmar) and many cities of east Asian countries.
                </p>
                <p class="reach-mode-prose">
                  Jay Prakash Narayan International Airport (Patna) is a major airport connected with several flights with Delhi, Kolkata, Chennai, Bengaluru, Hyderabad, Mumbai, Lucknow, Varanasi along with many other destinations. Distance of Patna Airport is about 100 kms. that can be reached by hiring a taxi.
                </p>
              </div>
            </div>

          </div>

          <!-- 4. Interactive Directions & Navigation Card -->
          <div class="reach-directions-card">
            <div class="reach-address-block">
              <h3>📍 Permanent Campus Address</h3>
              <p>Central University of South Bihar, SH-7, Gaya-Panchanpur Road, Village Karhara, Post Fatehpur, Gaya – 824236, Bihar, India.</p>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="https://maps.google.com/?q=Central+University+of+South+Bihar+Panchanpur+Gaya" target="_blank" class="btn btn-navy">
                🗺️ Open in Google Maps ↗
              </a>
              <a href="about-resources.html#reach" class="btn btn-gold">
                Campus Resources ↗
              </a>
            </div>
          </div>

        </div>
      </section>
    `;

    return;
  }

  if (slug === 'executive-council') {
    document.title = `Executive Council — Apex Statutory Body — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;

    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="council-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">⚖️ Principal Executive &amp; Administrative Authority &bull; Central Universities Act, 2009</span>
            <h1 class="policy-main-title">Executive Council</h1>
            <p class="policy-main-desc">
              The Executive Council is the apex executive body of Central University of South Bihar. Chaired ex-officio by the Vice-Chancellor, the Council exercises overall management and administrative control of University affairs, revenues, property, and academic infrastructure.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">Prof. K. N. Singh</div>
                <div class="policy-stat-lbl">Chairman (Vice-Chancellor)</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Prof. N. K. Rana</div>
                <div class="policy-stat-lbl">Ex-Officio Secretary (Registrar)</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">4 Nominees</div>
                <div class="policy-stat-lbl">Visitor's Academic Distinction</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Statute 11</div>
                <div class="policy-stat-lbl">Statutory Constitution</div>
              </div>
            </div>
          </div>

          <!-- 2. Standout Chairman Showcase Card -->
          <div class="council-chairman-card">
            <div class="council-chairman-info">
              <div class="council-chairman-avatar">🏛️</div>
              <div>
                <h2 class="council-chairman-name">Prof. Kameshwar Nath Singh</h2>
                <p class="council-chairman-role">Vice-Chancellor, Central University of South Bihar &bull; Ex-Officio Chairman, Executive Council</p>
              </div>
            </div>
            <span class="council-chairman-badge">Clause (i) &bull; Chairman</span>
          </div>

          <!-- 3. Statutory Composition Table -->
          <div class="council-section-title">
            <span>📋</span> Official Composition of the Executive Council
          </div>

          <div class="council-table-container">
            <table class="council-statutory-table">
              <thead>
                <tr>
                  <th style="width: 42%;">Statutory Clause / Designation</th>
                  <th style="width: 58%;">Member Details &amp; Nomination</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="council-clause-col">
                    <b>(i) The Vice-Chancellor</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Prof. Kameshwar Nath Singh</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Vice-Chancellor (Ex-Officio Chairman)</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(ii) Secretary, Department of Higher Education, MHRD, GOI or his / her nominee</b>
                  </td>
                  <td class="council-member-col">
                    <strong>The Secretary</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Department of Higher Education, Ministry of Education (MHRD), Govt. of India</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(iii) One member nominated by UGC</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Prof. Brajesh Kumar Pandey</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">School of Sanskrit and Indic Studies, Jawaharlal Nehru University (JNU), New Delhi</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(iv) Chief Secretary Govt. Bihar or his / her nominee not below the rank of</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Principal Secretary</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Department of Education / Secretary, HRD, Government of Bihar</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(v) Pro Vice-Chancellor</b>
                  </td>
                  <td class="council-member-col">
                    <span style="color: var(--tx-secondary); font-style: italic;">— (To be filled upon appointment)</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(vi) to (ix) Four persons of academic distinction to be nominated by the Visitor</b>
                  </td>
                  <td class="council-member-col">
                    <ol style="margin: 0; padding-left: 18px; line-height: 1.8;">
                      <li>
                        <strong>Prof. Ranjit Kumar Verma</strong> — Former Vice-Chancellor, Munger University; Pro Vice-Chancellor, Patna University, Bihar
                      </li>
                      <li>
                        <strong>Prof. (Retd.) Mohan</strong> — Former Head, Dept. of Hindi and Dean, Faculty of Arts, University of Delhi
                      </li>
                      <li>
                        <strong>Prof. Veenu Pant</strong> — Dept. of History, Sikkim University, Gangtok
                      </li>
                      <li>
                        <strong>Prof. Geetanjali Dash</strong> — Vice-Chancellor, Berhampur University and Khallikote Unitary University, Berhampur
                      </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(x) and (xi) Two members from amongst the Deans of Schools of Studies, by rotation according to seniority, to nominated by the VC</b>
                  </td>
                  <td class="council-member-col">
                    <ol style="margin: 0; padding-left: 18px; line-height: 1.8;">
                      <li>
                        <strong>Prof. Pranav Kumar</strong> — Dean, School of Social Sciences and Policies
                      </li>
                      <li>
                        <strong>Prof. Vipin Kumar Singh</strong> — Dean, School of Languages
                      </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(xii) One Professor, who is not a Dean, by rotation according to Seniority, to be nominated by the VC</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Prof. Ram Kumar</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Professor, Department of Environmental Sciences</span>
                    <div style="margin-top: 4px;">
                      <span class="council-tenure-pill">🗓️ Tenure: Till 07.07.2029</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(xiii) One Associate Professor, by rotation according to seniority, to be nominated by the Vice-Chancellor</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Dr. Sanat Kumar Sharma</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Associate Professor, Dept. of Sociological Studies</span>
                    <div style="margin-top: 4px;">
                      <span class="council-tenure-pill">🗓️ Tenure: Till 11.11.2027</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(xiv) One Assistant Professor by rotation according to seniority, to be nominated by the VC</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Dr. Jawaid Ahsan</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Assistant Professor, Dept. of Biotechnology</span>
                    <div style="margin-top: 4px;">
                      <span class="council-tenure-pill">🗓️ Tenure: Till 07.07.2028</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>(xv) One member of the Court, (not a employee / student of the University or of an institution recognized by or associated with the University) to be elected</b>
                  </td>
                  <td class="council-member-col">
                    <span style="color: var(--tx-secondary); font-style: italic;">Constitution of the second Court is in process.</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>Registrar</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Prof. Narendra Kumar Rana</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Registrar &amp; Ex-Officio Secretary</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 4. Official Gazette & Notification Download Card -->
          <div class="council-notification-box">
            <div>
              <span class="policy-badge-pill" style="margin-bottom: 6px; display: inline-block;">📜 Official Statutory Notification</span>
              <h3 class="council-notif-title">Notification of the Executive Council, CUSB (Dated 08-July-2026)</h3>
              <p class="council-notif-desc">Download or view the official signed notification published under the authority of Central University of South Bihar.</p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="assets/documents/about/central-universities-act-2009.pdf" target="_blank" class="btn btn-navy">
                📄 Open Notification PDF ↗
              </a>
              <a href="about-resources.html" class="btn btn-gold">
                All Governance Records ↗
              </a>
            </div>
          </div>

        </div>
      </section>
    `;

    return;
  }

  if (slug === 'academic-council') {
    document.title = `Academic Council — Principal Academic Body — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;

    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="academic-council-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">🎓 Principal Academic Body &bull; Central Universities Act, 2009 (Statute 13)</span>
            <h1 class="policy-main-title">Academic Council</h1>
            <p class="policy-main-desc">
              The Academic Council is the principal academic authority of Central University of South Bihar. It exercises general supervision over the academic policies, curriculum formulation, teaching-learning standards, research programs, examinations, and disciplinary standards across all Schools and Departments.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">Statute 13</div>
                <div class="policy-stat-lbl">Statutory Charter</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Prof. K. N. Singh</div>
                <div class="policy-stat-lbl">Chairman (Vice-Chancellor)</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">27th Meeting</div>
                <div class="policy-stat-lbl">Agenda &amp; Annexures</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">04.07.2025</div>
                <div class="policy-stat-lbl">Council Notification</div>
              </div>
            </div>
          </div>

          <!-- 2. Primary Feature: 27th Meeting of Academic Council - Agenda and Annexures (Interactive PDF Viewer) -->
          <div class="pdf-viewer-card">
            <div class="pdf-viewer-header">
              <h2 class="pdf-viewer-heading">
                <span>📑</span> 27th meeting of Academic Council - Agenda and Annexures
              </h2>
              <div style="display: flex; gap: 8px;">
                <a href="assets/documents/about/academic-council-27th-meeting.pdf" target="_blank" class="pdf-tool-btn">
                  Open PDF in New Tab ↗
                </a>
                <a href="assets/documents/about/academic-council-27th-meeting.pdf" download class="pdf-tool-btn" style="background: #ffffff; color: #0b63b6;">
                  ⬇ Download PDF
                </a>
              </div>
            </div>

            <!-- PDF Toolbar -->
            <div class="pdf-viewer-toolbar">
              <div class="pdf-toolbar-left">
                <span class="pdf-page-pill">📄 Page 2 of 3</span>
                <span style="opacity: 0.85;">Statutory Members &amp; Department Heads Roster</span>
              </div>
              <div class="pdf-toolbar-right">
                <button type="button" class="pdf-tool-btn" onclick="document.getElementById('acPdfFrame').src='assets/documents/about/academic-council-27th-meeting.pdf'">
                  🔄 Refresh View
                </button>
              </div>
            </div>

            <!-- Embedded PDF Frame -->
            <div class="pdf-embed-container">
              <iframe id="acPdfFrame" src="assets/documents/about/academic-council-27th-meeting.pdf#toolbar=1&navpanes=0&scrollbar=1" title="27th meeting of Academic Council - Agenda and Annexures PDF" loading="lazy">
                <div class="pdf-fallback-frame">
                  <p style="color: #64748b; margin-bottom: 16px;">PDF viewer is loading. If your browser does not support embedded PDFs, you can view or download it directly below:</p>
                  <a href="assets/documents/about/academic-council-27th-meeting.pdf" target="_blank" class="btn btn-navy">Open 27th Meeting Agenda &amp; Annexures PDF ↗</a>
                </div>
              </iframe>
            </div>
          </div>

          <!-- 3. Academic Council Notification Download Card -->
          <div class="academic-notif-row">
            <div>
              <span class="policy-badge-pill" style="margin-bottom: 6px; display: inline-block;">📜 Statutory Notification</span>
              <h3 class="academic-notif-title">Academic council Notification 04.07.2025</h3>
              <p class="academic-notif-sub">Official statutory notification regarding the reconstitution and membership of the Academic Council of CUSB.</p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="assets/documents/about/academic-council-notification-2025.pdf" target="_blank" class="btn btn-navy">
                📄 View Notification PDF ↗
              </a>
              <a href="assets/documents/about/academic-council-notification-2025.pdf" download class="btn btn-gold">
                ⬇ Download PDF
              </a>
            </div>
          </div>

          <!-- 4. Academic Governance Context & Mandate -->
          <div style="background: var(--bg-primary, #ffffff); border: 1px solid var(--border-color, #e5e7eb); border-radius: 16px; padding: 26px 28px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03); margin-top: 24px;">
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--tx-primary, #111827); margin: 0 0 10px;">
              🏛️ Mandate &amp; Functions of the Academic Council
            </h3>
            <p style="font-size: 0.94rem; line-height: 1.8; color: var(--tx-secondary, #475569); margin: 0 0 14px; text-align: justify;">
              Pursuant to Section 21 and Statute 13 of the Central Universities Act, 2009, the Academic Council is the principal academic body of the University and exercises general supervision over the academic policies of the University. Its duties include proposing Ordinances regarding courses of study, approving syllabi, advising the Executive Council on all academic matters, instituting fellowships and scholarships, regulating admission policies (CUET), and steering NEP-2020 multidisciplinary implementation.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px;">
              <a href="about-resources.html" class="btn btn-navy">
                Explore All Governance Bodies ↗
              </a>
              <a href="about-policies-documents.html" class="btn btn-gold">
                Regulation &amp; Policy Documents ↗
              </a>
            </div>
          </div>

        </div>
      </section>
    `;

    return;
  }

  if (slug === 'finance-committee') {
    document.title = `Finance Committee — Statutory Financial Authority — Central University of South Bihar`;
    const root = document.getElementById('aboutPageContent');
    if (!root) return;

    root.innerHTML = `
      <section class="section" style="padding-top: 30px;">
        <div class="council-hub-wrapper">
          
          <!-- 1. Hero Showcase Banner -->
          <div class="policy-hero-banner">
            <span class="policy-badge-pill">💰 Financial Governance &bull; Central Universities Act, 2009 (Statute 17)</span>
            <h1 class="policy-main-title">Finance Committee</h1>
            <p class="policy-main-desc">
              The Finance Committee is the statutory financial advisory authority of Central University of South Bihar. Chaired ex-officio by the Vice-Chancellor, the Committee examines financial estimates, annual accounts, budget allocation, audit reports, and advises the Executive Council on all fiscal matters.
            </p>

            <!-- Stat Strip -->
            <div class="policy-stat-grid">
              <div class="policy-stat-card">
                <div class="policy-stat-val">4th Committee</div>
                <div class="policy-stat-lbl">Current Constitution</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Statute 17</div>
                <div class="policy-stat-lbl">Statutory Charter</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Prof. K. N. Singh</div>
                <div class="policy-stat-lbl">Chairman (Vice-Chancellor)</div>
              </div>
              <div class="policy-stat-card">
                <div class="policy-stat-val">Finance Officer</div>
                <div class="policy-stat-lbl">Ex-Officio Secretary</div>
              </div>
            </div>
          </div>

          <!-- 2. Standout Chairman Showcase Card -->
          <div class="council-chairman-card">
            <div class="council-chairman-info">
              <div class="council-chairman-avatar">🏛️</div>
              <div>
                <h2 class="council-chairman-name">Prof. Kameshwar Nath Singh</h2>
                <p class="council-chairman-role">Vice-Chancellor, Central University of South Bihar &bull; Ex-Officio Chairman, Finance Committee</p>
              </div>
            </div>
            <span class="council-chairman-badge">Clause (i) &bull; Chairman</span>
          </div>

          <!-- 3. Statutory Composition Table -->
          <div class="council-section-title">
            <span>📋</span> Hon'ble Members of the 4th Finance Committee, Central University of South Bihar
          </div>

          <div class="council-table-container">
            <table class="council-statutory-table">
              <thead>
                <tr>
                  <th style="width: 44%;">Statutory Clause / Designation</th>
                  <th style="width: 56%;">Member Details &amp; Nomination</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="council-clause-col">
                    <b>i. Vice-Chancellor-Chairman</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Prof. Kameshwar Nath Singh</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Vice-Chancellor (Ex-Officio Chairman)</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>ii. Pro-Vice-Chancellor-Member</b>
                  </td>
                  <td class="council-member-col">
                    <span style="color: var(--tx-secondary); font-style: italic;">Vacant</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>iii. One person to be nominated by the Court-Member</b>
                  </td>
                  <td class="council-member-col">
                    <span style="color: var(--tx-secondary); font-style: italic;">To be nominated</span>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>iv. Three Persons to be nominated by the Executive Council out of whom at least one shall be a member of the Executive Council-Member</b>
                  </td>
                  <td class="council-member-col">
                    <ol style="margin: 0; padding-left: 18px; line-height: 1.8;">
                      <li>
                        <strong>Prof. Brajesh Kumar Pandey</strong>, School of Sanskrit and Indic Studies, JNU, New Delhi, Member in Executive Council<br>
                        <span class="council-tenure-pill" style="margin-top: 4px;">🗓️ Term in FC upto 09.06.2025</span>
                      </li>
                      <li style="margin-top: 10px;">
                        <strong>Prof. P K Gosh</strong>, Dean, Faculty of Commerce, University of Allahabad, Prayagraj
                      </li>
                      <li style="margin-top: 10px;">
                        <strong>Shri A K Singh</strong>, Ex—Finance Officer, UPRTOU, Prayagraj
                      </li>
                    </ol>
                    <div style="margin-top: 12px; font-size: 0.82rem; color: #0b63b6; background: rgba(11, 99, 182, 0.06); padding: 8px 12px; border-radius: 8px;">
                      ℹ️ <i>(The term of aforesaid members is for a period of 3 years w.e.f 24th September 2022 as per Statute 17 (3))</i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>v. Three persons to be nominated by the Visitor-Member</b>
                  </td>
                  <td class="council-member-col">
                    <ol style="margin: 0; padding-left: 18px; line-height: 1.8;">
                      <li>
                        <strong>Joint Secretary and Financial Adviser</strong>, MOE or his/her Nominee from Finance Bureau (dealing with CUs), MOE not below the level of Under Secretary.
                      </li>
                      <li style="margin-top: 10px;">
                        <strong>Joint Secretary (CU)</strong>, MOE or his/her nominee not below the level of Under Secretary from Administrative Bureau.
                      </li>
                      <li style="margin-top: 10px;">
                        <strong>Joint Secretary (CU)</strong>, UGC or any other officer not below the level of Under Secretary nominated by the Chairman, UGC
                      </li>
                    </ol>
                    <div style="margin-top: 12px; font-size: 0.82rem; color: #7e22ce; background: rgba(168, 85, 247, 0.08); padding: 8px 12px; border-radius: 8px;">
                      ℹ️ <i>(The above nomination is as per the MHRD letter No. F.No. 54-1/2014-CU.III dated 8th Jan, 2019)</i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="council-clause-col">
                    <b>Finance Officer, Ex Officio Secretary</b>
                  </td>
                  <td class="council-member-col">
                    <strong>Finance Officer</strong><br>
                    <span style="color: var(--tx-secondary); font-size: 0.88rem;">Central University of South Bihar</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 4. Official Notification Download Card -->
          <div class="council-notification-box">
            <div>
              <span class="policy-badge-pill" style="margin-bottom: 6px; display: inline-block;">📜 Statutory Notification</span>
              <h3 class="council-notif-title">Finance Committee Notification</h3>
              <p class="council-notif-desc">Download or view the official signed notification and constitution records of the 4th Finance Committee.</p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="assets/documents/about/central-universities-act-2009.pdf" target="_blank" class="btn btn-navy">
                📄 Open Notification PDF ↗
              </a>
              <a href="about-annual-reports.html" class="btn btn-gold">
                Annual Accounts &amp; Audits ↗
              </a>
            </div>
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
