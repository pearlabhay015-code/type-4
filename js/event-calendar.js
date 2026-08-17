/**
 * CUSB WEBSITE - INTERACTIVE EVENT CALENDAR & AUTO-ROTATING HIGHLIGHTS
 * Features:
 * 1. Auto-rotating event slideshow at regular intervals (every 4s)
 * 2. Synchronized calendar date highlighting and automatic month switching
 * 3. Manual date click to jump directly to any clicked day's events
 * 4. Interactive controls (Previous, Next, Pause/Play, Mouse Hover Pause)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Calendar DOM elements
  const monthYearDisplay = document.getElementById('calendarMonthYear');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const daysGrid = document.getElementById('calendarDaysGrid');
  
  // Side panel DOM elements
  const eventSidePanel = document.getElementById('eventSidePanel');
  const selectedDateDisplay = document.getElementById('selectedDateDisplay');
  const eventDetailsList = document.getElementById('eventDetailsList');
  const prevEventBtn = document.getElementById('prevEventBtn');
  const pauseEventBtn = document.getElementById('pauseEventBtn');
  const nextEventBtn = document.getElementById('nextEventBtn');
  
  // State variables
  let currentYear; 
  let currentMonth;
  let eventsMap = {};     // Format: { 'YYYY-MM-DD': [event1, event2, ...] }
  let allEventsList = []; // Flattened array of all events sorted by date
  let selectedDateStr = '';

  // Auto-slide state
  let currentCarouselIndex = 0;
  let isAutoPlayPaused = false;
  let userClickPauseTimer = null;
  let autoSlideInterval = null;

  const eventImages = {
    national: 'assets/images/admin_good.webp',
    gandhi: 'assets/images/2013.jpg',
    holi: 'assets/images/spoim.jpg',
    diwali: 'assets/images/audimg.jpg',
    buddha: 'assets/images/blockB.jpg',
    christmas: 'assets/images/2013.jpg',
    eid: 'assets/images/admin.jpeg',
    jain: 'assets/images/blockB.jpg',
    sikh: 'assets/images/audimg.jpg',
    festival: 'assets/images/spoim.jpg',
    campus: 'assets/images/audimg.jpg'
  };

  function holidayEvent(title, dateStr, category, imageUrl) {
    return {
      title_en: title,
      title_hi: title,
      desc_en: category,
      desc_hi: category,
      type: 'event',
      image_url: imageUrl,
      date_str: dateStr,
      created_at: '2026-07-26 00:00:00'
    };
  }

  const fallbackEvents = [
    holidayEvent("Republic Day Celebration", "26 January 2026", "National Festival & Campus Parade", eventImages.national),
    holidayEvent("Annual Athletic Meet & Sports", "15 February 2026", "CUSB Sports Complex", eventImages.campus),
    holidayEvent("Holi Festival of Colors", "4 March 2026", "Cultural Celebration", eventImages.holi),
    holidayEvent("Idu'l Fitr", "21 March 2026", "Gazetted Holiday", eventImages.eid),
    holidayEvent("Good Friday Observation", "3 April 2026", "Observed Holiday", eventImages.christmas),
    holidayEvent("Buddha Purnima & Peace Lecture", "1 May 2026", "University Academic Lecture", eventImages.buddha),
    holidayEvent("International Yoga Day", "21 June 2026", "CUSB Open Amphitheatre", eventImages.campus),
    holidayEvent("Independence Day Celebrations", "15 August 2026", "National Flag Hoisting & Parade", eventImages.national),
    holidayEvent("Teacher's Day & Excellence Awards", "5 September 2026", "Central Auditorium", eventImages.campus),
    holidayEvent("Mahatma Gandhi Jayanti", "2 October 2026", "Swachhata Abhiyan", eventImages.gandhi),
    holidayEvent("Dussehra Vijay Dashmi", "20 October 2026", "Festival Holiday", eventImages.festival),
    holidayEvent("Diwali & Chhath Puja Mahotsav", "8 November 2026", "Cultural Festival", eventImages.diwali),
    holidayEvent("Guru Nanak Jayanti", "24 November 2026", "Gazetted Holiday", eventImages.sikh),
    holidayEvent("Christmas Day Celebrations", "25 December 2026", "Campus Winter Fest", eventImages.christmas)
  ];
  
  const monthNames = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
  };

  const dayNames = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    hi: ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"]
  };

  // Helper: Get active language
  function getLang() {
    return localStorage.getItem('cusb-lang') || 'en';
  }

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function setInitialSelection() {
    // Prefer real-world current date: show current month and select today by default
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    const todayKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    selectedDateStr = todayKey;
  }

  // Parse event dates dynamically and map them
  function parseEvents(events) {
    eventsMap = {};
    allEventsList = [];
    const monthMapping = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };

    events.forEach(event => {
      // We only care about events
      const type = (event.type || '').toLowerCase();
      if (!type.includes('event')) return;

      let date = null;

      if (event.date_str) {
        const cleanStr = event.date_str.trim().toLowerCase();
        
        // 1. Match "DD MMM YYYY" or "DD Month YYYY" (e.g. "15 Mar 2026" or "18 March 2026")
        const matchFull = cleanStr.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
        if (matchFull) {
          const day = parseInt(matchFull[1], 10);
          const monStr = matchFull[2].substring(0, 3);
          const year = parseInt(matchFull[3], 10);
          const monthIndex = monthMapping[monStr] !== undefined ? monthMapping[monStr] : 0;
          date = new Date(year, monthIndex, day);
        } else {
          // 2. Match "DD MMM" (e.g. "18 MAR", "28 FEB")
          const matchMonthDay = cleanStr.match(/^(\d{1,2})\s+([a-z]+)/);
          if (matchMonthDay) {
            const day = parseInt(matchMonthDay[1], 10);
            const monStr = matchMonthDay[2].substring(0, 3);
            const monthIndex = monthMapping[monStr] !== undefined ? monthMapping[monStr] : 0;
            
            // Assume year from created_at or default to 2026
            let year = 2026;
            if (event.created_at) {
              const creationDate = new Date(event.created_at);
              if (!isNaN(creationDate.getTime())) {
                year = creationDate.getFullYear();
              }
            }
            date = new Date(year, monthIndex, day);
          }
        }
      }

      // Fallback: If parsing failed or date_str empty, use created_at date
      if (!date && event.created_at) {
        const creationDate = new Date(event.created_at);
        if (!isNaN(creationDate.getTime())) {
          date = creationDate;
        }
      }

      // If we got a valid date, store it in our events map
      if (date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const key = `${y}-${m}-${d}`;
        
        event.parsed_date = date;
        event.date_key = key;

        if (!eventsMap[key]) {
          eventsMap[key] = [];
        }
        eventsMap[key].push(event);
        allEventsList.push(event);
      }
    });

    // Sort allEventsList chronologically
    allEventsList.sort((a, b) => a.parsed_date - b.parsed_date);
  }

  // Load events from API or fallback
  async function loadEvents() {
    try {
      const response = await fetch(window.cusbApiUrl('announcements?show_all=true'));
      if (!response.ok) {
        throw new Error(`Announcements API returned ${response.status}`);
      }
      const data = await response.json();
      parseEvents(data);
    } catch (error) {
      console.warn("Using fallback events data for calendar slideshow:", error.message);
      parseEvents(fallbackEvents);
    }

    setInitialSelection();
    renderCalendar();
    
    // Start by displaying today's current date
    displaySelectedEvents();

    if (allEventsList.length > 0) {
      // Find event closest to or on today to begin auto-rotation
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const closestIndex = allEventsList.findIndex(e => e.parsed_date >= today);
      currentCarouselIndex = closestIndex !== -1 ? closestIndex : 0;
    }

    startAutoSlide();
  }

  // Auto-Slide Engine: auto changes dates/events every 5 seconds (5000ms)
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (!isAutoPlayPaused && allEventsList.length > 0) {
        currentCarouselIndex = (currentCarouselIndex + 1) % allEventsList.length;
        displayEventAtIndex(currentCarouselIndex, true);
      }
    }, 5000);
  }

  function pauseAutoSlideTemporarily(durationMs = 7000) {
    isAutoPlayPaused = true;
    clearTimeout(userClickPauseTimer);
    userClickPauseTimer = setTimeout(() => {
      if (pauseEventBtn && pauseEventBtn.textContent !== '▶') {
        isAutoPlayPaused = false;
      }
    }, durationMs);
  }

  // Display Event at a specific Carousel Index
  function displayEventAtIndex(index, isAutoSlide = false) {
    if (allEventsList.length === 0) return;
    
    currentCarouselIndex = index;
    const evt = allEventsList[index];
    const key = evt.date_key;
    selectedDateStr = key;

    // Synchronize Calendar Month if event falls in a different month
    const evtYear = evt.parsed_date.getFullYear();
    const evtMonth = evt.parsed_date.getMonth();
    
    if (evtYear !== currentYear || evtMonth !== currentMonth) {
      currentYear = evtYear;
      currentMonth = evtMonth;
      renderCalendar();
    } else {
      // Update selected class in current grid
      updateCalendarSelection(key);
    }

    // Render Event Card in Side Panel
    renderEventCard(evt, index + 1, allEventsList.length);
  }

  // Update selected class in grid without re-rendering everything
  function updateCalendarSelection(key) {
    document.querySelectorAll('.calendar-day-cell').forEach(c => {
      if (c.getAttribute('data-date') === key) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });
  }

  // Render Event Card into Side Panel
  function renderEventCard(item, currentNum, totalNum) {
    const lang = getLang();

    const parts = item.date_key.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);

    const isHi = lang === 'hi';
    const formattedDate = isHi
      ? `${d} ${monthNames['hi'][m]} ${y}`
      : `${d} ${monthNames['en'][m]} ${y}`;
      
    if (selectedDateDisplay) {
      selectedDateDisplay.textContent = formattedDate;
    }

    const defaultImage = 'assets/images/audimg.jpg';
    const imgUrl = item.image_url || defaultImage;
    const category = item.desc_en || 'CUSB Event';
    const categoryHi = item.desc_hi || 'सीयूएसबी कार्यक्रम';
    
    const title = isHi ? item.title_hi : item.title_en;
    const meta = isHi ? categoryHi : category;
    const timeStr = item.date_str || (isHi ? 'पूरा दिन' : 'Full Day');
    
    const safeTitle = escapeHTML(title || item.title_en || 'CUSB Event');
    const safeImage = escapeHTML(imgUrl);
    const safeMeta = escapeHTML(meta || 'CUSB Event');
    const safeDateLabel = escapeHTML(timeStr || formattedDate);
    const detailsText = lang === 'en'
      ? `Scheduled at Central University of South Bihar, Gaya campus. ${item.desc_en || 'Event details will be updated soon.'}`
      : `Central University of South Bihar, Gaya campus. ${item.desc_hi || item.desc_en || 'Event details will be updated soon.'}`;

    eventDetailsList.style.opacity = '0';
    eventDetailsList.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      eventDetailsList.innerHTML = `
        <div class="panel-event-card">
          <div class="panel-event-media">
            <img src="${safeImage}" alt="${safeTitle}" loading="lazy" onerror="this.src='assets/images/audimg.jpg'">
            <div class="panel-event-date-badge">${safeDateLabel}</div>
          </div>
          <div class="panel-event-body">
            <div class="panel-event-meta">${safeMeta}</div>
            <h4 class="panel-event-title">${safeTitle}</h4>
            <p class="panel-event-desc">${escapeHTML(detailsText)}</p>
            <div class="panel-event-info">
              <span>${escapeHTML(formattedDate)}</span>
              <span>CUSB Gaya Campus</span>
            </div>
            <a class="panel-event-link" href="news-events.html?type=event">View event details</a>
          </div>
        </div>
      `;
      eventDetailsList.style.opacity = '1';
    }, 120);
  }

  // Render Event Details on Manual Date Click
  function displaySelectedEvents() {
    const lang = getLang();

    if (!selectedDateStr) return;
    
    const parts = selectedDateStr.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    
    const formattedDate = lang === 'en' 
      ? `${d} ${monthNames['en'][m]} ${y}`
      : `${d} ${monthNames['hi'][m]} ${y}`;
      
    if (selectedDateDisplay) {
      selectedDateDisplay.textContent = formattedDate;
    }

    const events = eventsMap[selectedDateStr] || [];
    
    if (events.length === 0) {
      const today = new Date();
      const isToday = today.getDate() === d && today.getMonth() === m && today.getFullYear() === y;

      const title = isToday 
        ? (lang === 'en' ? "Today's Academic Session" : "आज का शैक्षणिक सत्र")
        : (lang === 'en' ? "University Working Day" : "विश्वविद्यालय कार्य दिवस");
      const desc = isToday
        ? (lang === 'en' ? "Regular academic lectures, departmental research, and campus library hours are in session today." : "आज नियमित शैक्षणिक कक्षाएं, विभागीय अनुसंधान और केंद्रीय पुस्तकालय सत्र जारी हैं।")
        : (lang === 'en' ? "No public holiday or university event is scheduled for this selected date." : "इस चयनित तिथि के लिए कोई सार्वजनिक अवकाश या विशेष कार्यक्रम निर्धारित नहीं है।");

      eventDetailsList.style.opacity = '0';
      eventDetailsList.style.transition = 'opacity 0.25s ease';

      setTimeout(() => {
        eventDetailsList.innerHTML = `
          <div class="panel-event-card">
            <div class="panel-event-media">
              <img src="assets/images/audimg.jpg" alt="${escapeHTML(title)}" loading="lazy">
              <div class="panel-event-date-badge">${escapeHTML(formattedDate)}</div>
            </div>
            <div class="panel-event-body">
              <div class="panel-event-meta">${isToday ? (lang === 'en' ? 'Active Today' : 'आज सक्रिय') : (lang === 'en' ? 'Campus Schedule' : 'परिसर कार्यक्रम')}</div>
              <h4 class="panel-event-title">${escapeHTML(title)}</h4>
              <p class="panel-event-desc">${escapeHTML(desc)}</p>
              <div class="panel-event-info">
                <span>${escapeHTML(formattedDate)}</span>
                <span>CUSB Gaya Campus</span>
              </div>
              <a class="panel-event-link" href="news-events.html?type=event">${lang === 'en' ? 'Browse All Events & Calendar' : 'सभी कार्यक्रम एवं कैलेंडर देखें'}</a>
            </div>
          </div>
        `;
        eventDetailsList.style.opacity = '1';
      }, 120);
      return;
    }

    // Find matching index in allEventsList
    const index = allEventsList.findIndex(e => e.date_key === selectedDateStr);
    if (index !== -1) {
      displayEventAtIndex(index);
    } else {
      renderEventCard(events[0], 1, events.length);
    }
  }

  // Render Calendar Grid
  function renderCalendar() {
    const lang = getLang();
    
    // Set Header Month Year
    monthYearDisplay.textContent = `${monthNames[lang][currentMonth]} ${currentYear}`;
    
    // Render Weekday headers in active language
    const weekdayHeaders = document.querySelectorAll('.calendar-weekdays div');
    weekdayHeaders.forEach((el, index) => {
      el.textContent = dayNames[lang][index];
    });

    // Clear old days
    daysGrid.innerHTML = '';
    
    // Get start day and total days in current month
    const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Days in previous month to fill spaces
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    
    // Render padding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = prevMonthTotalDays - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      createDayCell(day, prevMonth, prevYear, true);
    }
    
    // Render actual days of the current month
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
      const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
      createDayCell(day, currentMonth, currentYear, false, isToday);
    }
    
    // Render padding days of the next month to complete the grid.
    const cellsSoFar = daysGrid.children.length; 
    const rowsNeeded = Math.ceil(cellsSoFar / 7);
    const totalCellsToRender = rowsNeeded * 7;
    const remainingCells = totalCellsToRender - cellsSoFar;
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      createDayCell(day, nextMonth, nextYear, true);
    }
  }

  // Create individual Day Cell
  function createDayCell(day, month, year, isOtherMonth = false, isToday = false) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell';
    const dayNumber = document.createElement('span');
    dayNumber.className = 'calendar-day-number';
    dayNumber.textContent = day;
    cell.appendChild(dayNumber);
    
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const dateKey = `${year}-${mStr}-${dStr}`;
    
    cell.setAttribute('data-date', dateKey);
    
    if (isOtherMonth) {
      cell.classList.add('other-month');
    }
    if (isToday) {
      cell.classList.add('today');
    }
    
    // Highlight if date has events
    if (eventsMap[dateKey] && eventsMap[dateKey].length > 0) {
      cell.classList.add('has-event');
    }
    
    // Select state
    if (dateKey === selectedDateStr) {
      cell.classList.add('selected');
    }
    
    // Click action
    cell.addEventListener('click', () => {
      document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      selectedDateStr = dateKey;
      displaySelectedEvents();
      pauseAutoSlideTemporarily(7000); // Pause auto-rotation for 7 seconds on click
    });
    
    daysGrid.appendChild(cell);
  }

  // Month navigation click event handlers
  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    selectedDateStr = '';
    renderCalendar();
    displaySelectedEvents();
    pauseAutoSlideTemporarily(5000);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    selectedDateStr = '';
    renderCalendar();
    displaySelectedEvents();
    pauseAutoSlideTemporarily(5000);
  });

  // Event Carousel Control Buttons
  if (prevEventBtn) {
    prevEventBtn.addEventListener('click', () => {
      if (allEventsList.length === 0) return;
      currentCarouselIndex = (currentCarouselIndex - 1 + allEventsList.length) % allEventsList.length;
      displayEventAtIndex(currentCarouselIndex);
      pauseAutoSlideTemporarily(6000);
    });
  }

  if (nextEventBtn) {
    nextEventBtn.addEventListener('click', () => {
      if (allEventsList.length === 0) return;
      currentCarouselIndex = (currentCarouselIndex + 1) % allEventsList.length;
      displayEventAtIndex(currentCarouselIndex);
      pauseAutoSlideTemporarily(6000);
    });
  }

  if (pauseEventBtn) {
    pauseEventBtn.addEventListener('click', () => {
      isAutoPlayPaused = !isAutoPlayPaused;
      pauseEventBtn.textContent = isAutoPlayPaused ? '▶' : '⏸';
      pauseEventBtn.title = isAutoPlayPaused ? 'Play Auto-Slide' : 'Pause Auto-Slide';
    });
  }

  // Mouse Hover Pause / Resume on Side Panel
  if (eventSidePanel) {
    eventSidePanel.addEventListener('mouseenter', () => {
      isAutoPlayPaused = true;
    });
    eventSidePanel.addEventListener('mouseleave', () => {
      if (!pauseEventBtn || pauseEventBtn.textContent !== '▶') {
        isAutoPlayPaused = false;
      }
    });
  }

  // Fetch and initialize on load
  loadEvents();

  // Watch for language change triggers
  window.addEventListener('storage', (e) => {
    if (e.key === 'cusb-lang') {
      renderCalendar();
      displaySelectedEvents();
    }
  });

  const langObserver = new MutationObserver(() => {
    renderCalendar();
    displaySelectedEvents();
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
});
