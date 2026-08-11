/**
 * Central University of South Bihar - Foundation Day portal.
 * The records below mirror the official Foundation Day sidebar and article
 * content, while keeping all visitor-facing assets local to this replica.
 */
(() => {
  const pages = [
    {
      id: 'sell-your-creation',
      category: 'Notice',
      title: 'Foundation Day: Sell Your Creation Mela',
      shortTitle: 'Sell Your Creation Mela',
      subtitle: 'Calling all student creators for Foundation Day 2026',
      date: '27 February 2026',
      time: 'Foundation Day event',
      venue: 'Milkha Singh Sports Complex, CUSB',
      sourceType: 'Official poster notice',
      summary: [
        'Central University of South Bihar celebrates Foundation Day with Sell Your Creation Mela, inviting student creators to bring their own handmade or creative products for sale.',
        'Stalls will be provided. The last date of registration mentioned on the official poster is 24 February 2026.'
      ],
      highlights: [
        'Open for student creators of CUSB.',
        'Bring your own creation to sell.',
        'Registration link printed on the official poster: https://forms.gle/hCRNaGmUiTrokZWA6'
      ],
      actions: [
        { label: 'Open registration form', href: 'https://forms.gle/hCRNaGmUiTrokZWA6', external: true }
      ],
      posters: [
        {
          src: 'assets/foundation-day/sell-your-creation-mela.jpeg',
          alt: 'Sell Your Creation Mela Foundation Day poster',
          caption: 'Official Sell Your Creation Mela poster'
        }
      ]
    },
    {
      id: 'constitution-committee',
      category: 'Notice',
      title: 'The Foundation Day @ 27th February, 2026',
      shortTitle: 'Constitution of Committee',
      subtitle: 'Constitution of Committee for Foundation Day',
      date: '27 February 2026',
      time: 'Official Foundation Day notice',
      venue: 'Central University of South Bihar, Gaya',
      sourceType: 'Official PDF notice',
      summary: [
        'The official Foundation Day page publishes the Constitution of Committee for the 17th Foundation Day celebration through an embedded PDF notice.',
        'The PDF has been copied into the replica so the document opens locally, without sending visitors to the original CUSB page.'
      ],
      highlights: [
        'Foundation Day: 27 February 2026.',
        'Official committee constitution notice.',
        'Local PDF viewer and download are available below.'
      ],
      document: {
        href: 'assets/documents/foundation-day/foundation-day-committee.pdf',
        label: 'Foundation Day committee PDF'
      }
    },
    {
      id: 'reel-competition',
      category: 'Programme Under Foundation Day',
      title: 'Reel Making Competition under Foundation Day Celebrations',
      shortTitle: 'Reel Making Competition',
      subtitle: 'From Foundation to Future: Celebrating Our Legacy, Inspiring Our Tomorrow',
      date: 'Submission deadline: 20 February 2026',
      time: '5:00 PM',
      venue: 'Submit through the QR code provided in the official poster',
      sourceType: 'Official article text and poster',
      summary: [
        'A Reel-Making Competition is being organised for current students of the University as part of the Foundation Day celebrations.',
        'The competition encourages students to creatively highlight the heritage, achievements, academic culture, strengths and future aspirations of their respective departments through short reels.'
      ],
      highlights: [
        'Duration: 30-60 seconds.',
        'Format: portrait video, 9:16.',
        'Participation: individual or group, maximum 6 students from the same department.',
        'Eligibility: open to all current students of CUSB.',
        'Prizes shown on the poster: first prize Rs. 5000, second prize Rs. 3000, third prize Rs. 2000, audience choice Rs. 2000 and 5 consolation prizes.',
        'Ethical checks: original content, prior consent for featuring individuals, no copyrighted audio without permission and no objectionable or political content.',
        'Queries: Dr. Das Ambika Bharti, Dr. Pallavi Singh and Dr. Ankita Kumari.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/reel-making-competition.png',
          alt: 'Reel Making Competition Foundation Day poster',
          caption: 'Official Reel Making Competition poster'
        }
      ]
    },
    {
      id: 'lecture-series-eco-comm',
      category: 'Programme Under Foundation Day',
      title: 'Foundation Day Lecture Series - Dept. of Commerce and Business Studies and Dept. of Economic Studies and Policy',
      shortTitle: 'Lecture Series: Dept. of Eco. & Comm.',
      subtitle: 'Innovative Management Strategies for Viksit Bharat in Post Covid Era',
      date: '18 February 2026',
      time: '2:00 PM onwards',
      venue: 'Vivekananda Lecture Complex',
      sourceType: 'Official poster notice',
      summary: [
        'The Department of Commerce and Business Studies and the Department of Economic Studies and Policy jointly organised a Foundation Day Lecture Series programme.',
        'The poster names Prof. Harendra Kumar Singh, Head and Dean, BHU and former Vice Chancellor, as the special guest.'
      ],
      highlights: [
        'Patron: Prof. Kameshwar Nath Singh, Honorable Vice Chancellor, CUSB.',
        'Organised by the Department of Commerce and Business Studies and Department of Economic Studies and Policy.',
        'Department heads shown on the poster: Prof. Subramanian Shanmugam and Prof. Krishnan Chalil.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/economics-commerce-lecture.jpg',
          alt: 'Economics and Commerce Foundation Day Lecture Series poster',
          caption: 'Official lecture poster'
        }
      ]
    },
    {
      id: 'deriving-meaning-research',
      category: 'Programme Under Foundation Day',
      title: 'Foundation Day Lecture Series - Deriving Meaning from Your Research: The Issues and Concerns',
      shortTitle: 'Deriving Meaning from your Research',
      subtitle: 'School of Earth, Biological and Environmental Sciences Foundation Day Lecture',
      date: '20 February 2026',
      time: '3:00 PM',
      venue: 'Auditorium, Vivekananda Lecture Complex',
      sourceType: 'Official article text and poster',
      summary: [
        'The School of Earth, Biological and Environmental Sciences organised a Foundation Day lecture titled Deriving Meaning from Your Research: The Issues and Concerns.',
        'The official programme schedule includes lamp lighting, University Kulgeet, guest felicitation, welcome address, introductory address, Foundation Day lecture, presidential address, vote of thanks and National Anthem.'
      ],
      highlights: [
        'Speaker: Prof. Vinod Kumar, Prime Minister Professor, CUSB.',
        'Patron: Prof. K. N. Singh, Honorable Vice-Chancellor, CUSB.',
        'Convenor: Prof. Rizwanul Haque, Dean, School of Earth, Biological and Environmental Sciences.',
        'Introductory address: Prof. Durg Vijai Singh, Director, R&D Cell, CUSB.',
        'Vote of thanks: Dr. Sunita Singh, Department of Geography.'
      ],
      schedule: [
        ['3:00 PM - 3:05 PM', 'Inviting the guests to the dais'],
        ['3:05 PM - 3:10 PM', 'Lighting of lamps'],
        ['3:10 PM - 3:15 PM', 'University Kulgeet'],
        ['3:30 PM - 4:00 PM', 'Foundation Day Lecture by Prof. Vinod Kumar'],
        ['4:15 PM - 4:20 PM', 'Vote of thanks'],
        ['4:20 PM - 4:22 PM', 'National Anthem and refreshment']
      ],
      posters: [
        {
          src: 'assets/foundation-day/deriving-meaning-research.jpeg',
          alt: 'Deriving Meaning from Your Research Foundation Day lecture poster',
          caption: 'Official lecture poster'
        }
      ]
    },
    {
      id: 'dept-psychological-sciences',
      category: 'Programme Under Foundation Day',
      title: 'Cordial Invitation to Foundation Day Lecture Series 2026',
      shortTitle: 'Dept. of Psychological Sc.',
      subtitle: 'From Awareness to Action: The Expanding Roles of Psychology in Contemporary Society',
      date: '19 February 2026',
      time: '10:30 AM onwards',
      venue: 'VLC Seminar Hall',
      sourceType: 'Official poster and minute-to-minute PDF',
      summary: [
        'The Department of Psychological Sciences organised a Foundation Day special lecture on the expanding role of psychology in contemporary society.',
        'The official page also provides a minute-to-minute programme PDF, copied locally below.'
      ],
      highlights: [
        'Chief Patron: Prof. Kameshwar Nath Singh, Vice Chancellor, CUSB.',
        'Guest Speaker: Prof. Abhishek Dubey, Department of Psychology, University of Allahabad.',
        'Convenor: Dr. Manglesh Kumar Manglam.',
        'Organising team includes Dr. Das Ambika Bharti, Dr. Ankita Kumari, Dr. Pankaj Kumar Ray and Dr. Chandana Suba.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/psychological-sciences-lecture.jpg',
          alt: 'Psychological Sciences Foundation Day Lecture Series poster',
          caption: 'Official lecture poster'
        }
      ],
      document: {
        href: 'assets/documents/foundation-day/psychological-sciences-minute-programme.pdf',
        label: 'Psychological Sciences minute-to-minute programme'
      }
    },
    {
      id: 'dept-media',
      category: 'Programme Under Foundation Day',
      title: 'Dept. of Mass Communication and Media [Alumni Connect-2026]',
      shortTitle: 'Dept. of Media [Alumni Connect-2026]',
      subtitle: 'Foundation Day Celebration - Welcome to Alumni Connect 2026',
      date: '21 February 2026',
      time: '11:00 AM onwards',
      venue: 'Room 110, Malaviya Bhawan',
      sourceType: 'Official poster notice',
      summary: [
        'The Department of Mass Communication and Media invited alumni for Alumni Connect 2026 as part of the Foundation Day celebration.',
        'The official page presents the programme through a poster, shown below as a local asset.'
      ],
      highlights: [
        'Department: Mass Communication and Media.',
        'Event category: Foundation Day celebration.',
        'Programme: Alumni Connect 2026.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/mass-communication-alumni.jpeg',
          alt: 'Mass Communication and Media Alumni Connect 2026 poster',
          caption: 'Official Alumni Connect poster'
        }
      ]
    },
    {
      id: 'dept-english',
      category: 'Programme Under Foundation Day',
      title: 'Foundation Day Lecture and Alumni Meet-EFL-20/02/26',
      shortTitle: 'Dept. of Eng. [Foundation Day Lecture and Alumni Meet-EFL]',
      subtitle: 'Tracing a Tradition: Women in Select Indian Texts',
      date: '20 February 2026',
      time: '10:30 AM and 2:00 PM',
      venue: 'Malaviya Bhawan, CUSB',
      sourceType: 'Official posters notice',
      summary: [
        'The Department of English and Foreign Languages hosted a Foundation Day lecture and the 4th Alumni Meet on 20 February 2026.',
        'The official article contains two posters: one for the invited Foundation Day lecture and one for the alumni meet.'
      ],
      highlights: [
        'Foundation Day lecture topic: Tracing a Tradition: Women in Select Indian Texts.',
        'Invited speaker: Prof. Sonjoy Mukherji, University of Allahabad, Prayagraj.',
        'Alumni Meet theme: Once Back.',
        'Patron shown on the posters: Prof. K. N. Singh, Vice Chancellor, CUSB.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/english-lecture-1.jpeg',
          alt: 'English and Foreign Languages Foundation Day lecture poster',
          caption: 'Foundation Day lecture poster'
        },
        {
          src: 'assets/foundation-day/english-lecture-2.jpeg',
          alt: 'English and Foreign Languages fourth alumni meet poster',
          caption: '4th Alumni Meet poster'
        }
      ]
    },
    {
      id: 'dept-pharmacy',
      category: 'Programme Under Foundation Day',
      title: 'Foundation Day Lecture organized by the School of Health Science, Department of Pharmacy, on 26th February 2026 (Thursday) at 10:00 AM',
      shortTitle: 'Dept. of Pharmacy Foundation Day Lecture',
      subtitle: 'Strengthening herbal pharmaceutical research through national education policy 2020',
      date: '26 February 2026',
      time: '10:00 AM',
      venue: 'Vivekananda Lecture Complex, CUSB',
      sourceType: 'Official posters notice',
      summary: [
        'The School of Health Science, Department of Pharmacy organised a Foundation Day lecture on strengthening herbal pharmaceutical research through National Education Policy 2020.',
        'The official page provides a poster and a minute-to-minute programme image, both copied locally.'
      ],
      highlights: [
        'Patron: Prof. Kameshwar Nath Singh, Vice Chancellor, CUSB.',
        'Eminent guest: Prof. R. C. Ghosh, former Vice Chancellor, Uttar Banga Krishi Vishwavidyalaya.',
        'Speaker: Dr. Vijay Kumar Rai, Senior Scientist, ICAR - NBPGR, New Delhi.',
        'Chairperson: Prof. Subrat Kumar Bhattamisra.',
        'Convenor: Prof. Vivek Dave.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/pharmacy-lecture.jpg',
          alt: 'Pharmacy Foundation Day lecture poster',
          caption: 'Official lecture poster'
        },
        {
          src: 'assets/foundation-day/pharmacy-minute-programme.jpg',
          alt: 'Pharmacy minute-to-minute programme',
          caption: 'Minute-to-minute programme'
        }
      ]
    },
    {
      id: 'dept-commerce',
      category: 'Programme Under Foundation Day',
      title: 'Invitation for 4th Alumni Meet - 2026 from School of Management',
      shortTitle: 'Dept. of Commerce 4th Alumni Meet',
      subtitle: '4th Alumni Meet, 2026 - Once Back to Roots, Back to Memories',
      date: '21 February 2026',
      time: '11:00 AM onwards',
      venue: 'Room 10-245, Chanakya Bhawan, CUSB',
      sourceType: 'Official poster notice',
      summary: [
        'The Department of Commerce and Business Studies invited alumni for its 4th Alumni Meet, 2026 as part of the Foundation Day linked programmes.',
        'The official page is poster-based and the local replica displays that poster in full.'
      ],
      highlights: [
        'Theme on poster: Once Back to Roots, Back to Memories.',
        'Patron: Prof. Kameshwar Nath Singh.',
        'Dean: Prof. Subramanian Shanmugam.',
        'Faculty names shown include Dr. Brajesh Kumar, Dr. Rajkumaryerman, Dr. Pawan Kumar, Dr. Rachna Vishwakarma, Dr. Prabha Pareek and Ms. Anu.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/commerce-alumni-meet.jpeg',
          alt: 'Commerce and Business Studies fourth alumni meet poster',
          caption: 'Official alumni meet poster'
        }
      ]
    },
    {
      id: 'dept-sociology',
      category: 'Programme Under Foundation Day',
      title: 'Two Days National Training Programme: Special Service for Children Engaged in Begging',
      shortTitle: 'Dept. of Sociology: Special Service for Children Engaged in Begging',
      subtitle: 'Special Services for Children Engaged in Begging',
      date: '25 and 26 February 2026',
      time: '10:00 AM',
      venue: 'National Institute of Social Defence programme, Department of Sociological Studies',
      sourceType: 'Official poster notice',
      summary: [
        'The Department of Sociological Studies organised a two-day national training programme on special services for children engaged in begging.',
        'The programme is associated with Foundation Day activities and is presented on the official page through a poster.'
      ],
      highlights: [
        'Organised by Department of Sociological Studies.',
        'Dates shown: 25 and 26 February 2026.',
        'Theme: special services for children engaged in begging.',
        'Chief guest and dignitary photographs are included on the official poster.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/sociology-service-training.jpeg',
          alt: 'Sociology training programme poster',
          caption: 'Official training programme poster'
        }
      ]
    },
    {
      id: 'dept-biotechnology',
      category: 'Programme Under Foundation Day',
      title: 'Alumni Meet: Department of Biotechnology',
      shortTitle: 'Dept. of Biotechnology: Alumni Meet-2026',
      subtitle: 'Welcome you all - Alumni Meet 2026',
      date: '26 February 2026',
      time: 'As per official poster',
      venue: 'CUSB Campus, Gaya',
      sourceType: 'Official poster notice',
      summary: [
        'The Department of Biotechnology invited alumni to Alumni Meet 2026 as part of the Foundation Day programme set.',
        'The official page is poster-based and the local replica keeps the poster as the main source document.'
      ],
      highlights: [
        'Department: Biotechnology.',
        'Message on poster: It is time to reminisce.',
        'Venue: CUSB Campus, Gaya.'
      ],
      posters: [
        {
          src: 'assets/foundation-day/biotechnology-alumni-meet.jpeg',
          alt: 'Biotechnology Alumni Meet 2026 poster',
          caption: 'Official alumni meet poster'
        }
      ]
    },
    {
      id: 'dept-education',
      category: 'Programme Under Foundation Day',
      title: 'Dept. of Education: Vikshit Bharat Shiksha Adhisthan Bill 2025',
      shortTitle: 'Dept. of Education: Vikshit Bharat Shiksha Adhisthan Bill 2025',
      subtitle: 'Foundation Day Lecture and minute-to-minute programme',
      date: '26 February 2026',
      time: '10:30 AM',
      venue: 'Room 10-201, Academic Building, CUSB',
      sourceType: 'Official posters notice',
      summary: [
        'The Department of Education organised a Foundation Day lecture on Vikshit Bharat Shiksha Adhisthan Bill 2025.',
        'The official page provides the lecture poster and a minute-to-minute programme image. Both are included locally.'
      ],
      highlights: [
        'Chief Patron: Prof. Kameshwar Nath Singh, Vice Chancellor, CUSB.',
        'Guest speaker: Prof. Majhar Asif, Vice Chancellor, Jamia Millia Islamia, New Delhi.',
        'Speaker listed on the minute-to-minute programme: Prof. Vishal Singh Chandel, Department of Teacher Education, CUSB.',
        'Organising Secretary: Dr. Pragya Gupta.'
      ],
      schedule: [
        ['10:00 AM - 10:30 AM', 'Registration and welcome'],
        ['10:30 AM - 10:35 AM', 'Lighting of the lamp'],
        ['10:40 AM - 10:45 AM', 'Welcome address'],
        ['11:05 AM - 12:00 PM', 'Lecture by Prof. Vishal Singh Chandel'],
        ['12:15 PM', 'National Anthem']
      ],
      posters: [
        {
          src: 'assets/foundation-day/education-viksit-bharat.jpeg',
          alt: 'Education Foundation Day lecture poster',
          caption: 'Official lecture poster'
        },
        {
          src: 'assets/foundation-day/education-minute-programme.jpeg',
          alt: 'Education minute-to-minute programme',
          caption: 'Minute-to-minute programme'
        }
      ]
    }
  ];

  let currentPageId = '';

  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    return pages.some(page => page.id === hash) ? hash : 'constitution-committee';
  };

  const escapeHtml = value => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const renderList = items => items && items.length ? `
    <ul class="fd-clean-list">
      ${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  ` : '';

  const renderSchedule = schedule => schedule && schedule.length ? `
    <div class="fd-schedule-card">
      <h3>Programme Schedule</h3>
      <div class="fd-schedule-list">
        ${schedule.map(([time, detail]) => `
          <div class="fd-schedule-row">
            <time>${escapeHtml(time)}</time>
            <span>${escapeHtml(detail)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const renderPosters = posters => posters && posters.length ? `
    <section class="fd-poster-section" aria-label="Official posters">
      <div class="fd-section-heading">
        <span>Official Visuals</span>
        <h3>Posters and programme images</h3>
      </div>
      <div class="fd-poster-grid">
        ${posters.map(poster => `
          <figure class="fd-poster-card">
            <a href="${escapeHtml(poster.src)}" target="_blank" rel="noopener">
              <img src="${escapeHtml(poster.src)}" alt="${escapeHtml(poster.alt)}" loading="lazy">
            </a>
            <figcaption>${escapeHtml(poster.caption)}</figcaption>
          </figure>
        `).join('')}
      </div>
    </section>
  ` : '';

  const renderDocument = document => document ? `
    <section class="fd-document-panel">
      <div class="fd-section-heading">
        <span>Official Document</span>
        <h3>${escapeHtml(document.label)}</h3>
      </div>
      <div class="fd-document-actions">
        <a class="btn btn-gold" href="${escapeHtml(document.href)}" target="_blank" rel="noopener">Open PDF</a>
        <a class="btn btn-white" href="${escapeHtml(document.href)}" download>Download PDF</a>
      </div>
      <iframe class="fd-document-frame" src="${escapeHtml(document.href)}" title="${escapeHtml(document.label)}"></iframe>
    </section>
  ` : '';

  const renderActions = actions => actions && actions.length ? `
    <div class="fd-action-row">
      ${actions.map(action => `
        <a class="btn btn-gold" href="${escapeHtml(action.href)}" ${action.external ? 'target="_blank" rel="noopener"' : ''}>${escapeHtml(action.label)}</a>
      `).join('')}
    </div>
  ` : '';

  const renderContent = page => `
    <article class="fd-content-shell">
      <header class="fd-hero-panel">
        <div>
          <span class="fd-kicker">${escapeHtml(page.category)}</span>
          <h1>${escapeHtml(page.title)}</h1>
          <p>${escapeHtml(page.subtitle)}</p>
        </div>
        <div class="fd-date-card">
          <span>${escapeHtml(page.date)}</span>
          <strong>${escapeHtml(page.time)}</strong>
        </div>
      </header>

      <div class="fd-meta-strip">
        <div>
          <span>Date</span>
          <strong>${escapeHtml(page.date)}</strong>
        </div>
        <div>
          <span>Venue</span>
          <strong>${escapeHtml(page.venue)}</strong>
        </div>
        <div>
          <span>Source Type</span>
          <strong>${escapeHtml(page.sourceType)}</strong>
        </div>
      </div>

      <section class="fd-rich-card">
        <div class="fd-section-heading">
          <span>Extracted Information</span>
          <h2>Official page content</h2>
        </div>
        ${page.summary.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        ${renderActions(page.actions)}
      </section>

      <section class="fd-rich-card">
        <div class="fd-section-heading">
          <span>Details</span>
          <h2>Highlights</h2>
        </div>
        ${renderList(page.highlights)}
      </section>

      ${renderSchedule(page.schedule)}
      ${renderDocument(page.document)}
      ${renderPosters(page.posters)}
    </article>
  `;

  const renderSidebar = () => {
    const notices = pages.filter(page => page.category === 'Notice');
    const programmes = pages.filter(page => page.category !== 'Notice');
    const renderButton = page => `
      <button type="button" class="fd-sidebar-btn ${page.id === currentPageId ? 'active' : ''}" data-target-id="${page.id}">
        ${escapeHtml(page.shortTitle)}
      </button>
    `;

    return `
      <aside class="fd-sidebar-box" aria-label="Foundation Day links">
        <div class="fd-sidebar-header">Foundation Day @ 27th Feb, 2026</div>
        <div class="fd-sidebar-body">
          <span class="fd-section-badge">Notice</span>
          ${notices.map(renderButton).join('')}
          <span class="fd-section-badge fd-programme-badge">Programme Under Foundation Day</span>
          ${programmes.map(renderButton).join('')}
        </div>
      </aside>
    `;
  };

  const renderPortal = () => {
    const mount = document.getElementById('foundationDayPortalMount');
    if (!mount) return;

    currentPageId = getPageFromHash();
    const page = pages.find(item => item.id === currentPageId) || pages[1];

    mount.innerHTML = `
      <section class="foundation-day-section">
        <div class="container">
          <nav class="fd-breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span>/</span>
            <a href="about.html">About</a>
            <span>/</span>
            <span>Foundation Day</span>
          </nav>
          <div class="fd-overview-band">
            <span>17th Foundation Day</span>
            <h2>The Foundation Day @ 27th February, 2026</h2>
            <p>All official Foundation Day notices and programme links from the CUSB Foundation Day page, rebuilt here as local replica pages with the same information, posters and documents.</p>
          </div>
          <div class="fd-layout-grid">
            ${renderSidebar()}
            <main class="fd-content-area" id="fdMainContentArea">
              ${renderContent(page)}
            </main>
          </div>
        </div>
      </section>
    `;

    document.querySelectorAll('.fd-sidebar-btn').forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target-id');
        if (targetId && targetId !== currentPageId) {
          window.location.hash = targetId;
        }
      });
    });
  };

  window.addEventListener('hashchange', renderPortal);
  document.addEventListener('DOMContentLoaded', renderPortal);
})();
