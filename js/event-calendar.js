/**
 * CUSB WEBSITE - INTERACTIVE EVENT CALENDAR
 * Fetches events from server, highlights dates on calendar, and displays event details in side panel.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Calendar DOM elements
  const monthYearDisplay = document.getElementById('calendarMonthYear');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const daysGrid = document.getElementById('calendarDaysGrid');
  
  // Side panel DOM elements
  const selectedDateDisplay = document.getElementById('selectedDateDisplay');
  const eventDetailsList = document.getElementById('eventDetailsList');
  
  // State variables
  let currentYear = 2026; // Default to 2026 matching database records
  let currentMonth = 5;  // Default to June (0-indexed: 5)
  let eventsMap = {};     // Format: { 'YYYY-MM-DD': [event1, event2, ...] }
  let selectedDateStr = '';

  const fallbackEvents = [
    {
      title_en: '45th INCA International Congress hosting at Gaya campus',
      title_hi: '45th INCA International Congress hosting at Gaya campus',
      desc_en: 'International Conference',
      desc_hi: 'International Conference',
      type: 'event',
      image_url: 'assets/images/audimg.jpg',
      date_str: '18 MAR',
      created_at: '2026-06-03 09:38:42'
    },
    {
      title_en: 'National Science Day celebrations in Science block',
      title_hi: 'National Science Day celebrations in Science block',
      desc_en: 'School of Physical Sciences',
      desc_hi: 'School of Physical Sciences',
      type: 'event',
      image_url: 'assets/images/sclab.jpg',
      date_str: '28 FEB',
      created_at: '2026-06-03 09:38:42'
    },
    {
      title_en: 'Foundation Day celebrations and cultural programs',
      title_hi: 'Foundation Day celebrations and cultural programs',
      desc_en: 'Annual Celebration',
      desc_hi: 'Annual Celebration',
      type: 'event',
      image_url: 'assets/images/convo.png',
      date_str: '20 FEB',
      created_at: '2026-06-03 09:38:42'
    }
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
    const today = new Date();
    const currentYearStr = today.getFullYear();
    const currentMonthStr = String(today.getMonth() + 1).padStart(2, '0');
    const currentDayStr = String(today.getDate()).padStart(2, '0');
    const todayKey = `${currentYearStr}-${currentMonthStr}-${currentDayStr}`;

    if (eventsMap[todayKey]) {
      selectedDateStr = todayKey;
      currentYear = today.getFullYear();
      currentMonth = today.getMonth();
      return;
    }

    const keys = Object.keys(eventsMap).sort();
    if (keys.length > 0) {
      const futureKey = keys.find(k => k >= todayKey) || keys[0];
      selectedDateStr = futureKey;
      const parts = futureKey.split('-');
      currentYear = parseInt(parts[0], 10);
      currentMonth = parseInt(parts[1], 10) - 1;
      return;
    }

    selectedDateStr = todayKey;
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
  }

  // Parse event dates dynamically and map them
  function parseEvents(events) {
    eventsMap = {};
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
        
        if (!eventsMap[key]) {
          eventsMap[key] = [];
        }
        eventsMap[key].push(event);
      }
    });
  }

  // Load events from API
  async function loadEvents() {
    try {
      const response = await fetch('/api/announcements?show_all=true');
      if (!response.ok) {
        throw new Error(`Announcements API returned ${response.status}`);
      }
      const data = await response.json();
      parseEvents(data);
      setInitialSelection();
      renderCalendar();
      displaySelectedEvents();
      return;
    } catch (error) {
      console.error("Error loading events for calendar:", error);
      parseEvents(fallbackEvents);
      setInitialSelection();
      renderCalendar();
      displaySelectedEvents();
      return;
      eventDetailsList.innerHTML = `<div class="no-events-msg" data-en="Failed to load events." data-hi="कार्यक्रम लोड करने में विफल।">Failed to load events.</div>`;
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
    // Week starts on Monday in our layout, so adjust day index (0 = Sun, 1 = Mon, ..., 6 = Sat)
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
    
    // Render padding days of the next month to complete the grid (usually 42 cells total)
    const totalCells = daysGrid.children.length;
    const remainingCells = (totalCells <= 35) ? 35 - totalCells : 42 - totalCells;
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
    });
    
    daysGrid.appendChild(cell);
  }

  // Render Event Details in Side Panel
  function displaySelectedEvents() {
    const lang = getLang();
    
    // Parse selected date to display nicely
    const parts = selectedDateStr.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    
    const formattedDate = lang === 'en' 
      ? `${d} ${monthNames['en'][m]} ${y}`
      : `${d} ${monthNames['hi'][m]} ${y}`;
      
    selectedDateDisplay.textContent = formattedDate;
    
    // Load events from map
    const events = eventsMap[selectedDateStr] || [];
    
    if (events.length === 0) {
      eventDetailsList.innerHTML = `
        <div class="no-events-msg" data-en="No events scheduled for this date." data-hi="इस तिथि के लिए कोई कार्यक्रम निर्धारित नहीं है।">
          ${lang === 'en' ? 'No events scheduled for this date.' : 'इस तिथि के लिए कोई कार्यक्रम निर्धारित नहीं है।'}
        </div>
      `;
      return;
    }
    
    eventDetailsList.innerHTML = '';
    events.forEach(item => {
      const card = document.createElement('div');
      card.className = 'panel-event-card';
      
      const defaultImage = 'assets/images/audimg.jpg';
      const imgUrl = item.image_url || defaultImage;
      const category = item.desc_en || 'CUSB Event'; // e.g. "School of Physical Sciences" or "International Conference"
      const categoryHi = item.desc_hi || 'सीयूएसबी कार्यक्रम';
      
      const title = lang === 'en' ? item.title_en : item.title_hi;
      const meta = lang === 'en' ? category : categoryHi;
      const timeStr = item.date_str || (lang === 'en' ? 'Full Day' : 'पूरा दिन');
      
      // Let's create details card content
      card.innerHTML = `
        <div class="panel-event-media">
          <img src="${imgUrl}" alt="${title}" onerror="this.src='assets/images/audimg.jpg'">
        </div>
        <div class="panel-event-meta">${meta}</div>
        <h4 class="panel-event-title">${title}</h4>
        <div style="font-size:0.75rem; color:var(--acc-gold); font-weight:600; display:flex; align-items:center; gap:5px;">
          <span>📅</span> <span>${timeStr}</span>
        </div>
      `;
      const safeTitle = escapeHTML(title || item.title_en || 'CUSB Event');
      const safeImage = escapeHTML(imgUrl);
      const safeMeta = escapeHTML(meta || 'CUSB Event');
      const safeDateLabel = escapeHTML(timeStr || formattedDate);
      const detailsText = lang === 'en'
        ? `Scheduled at Central University of South Bihar, Gaya campus. ${item.desc_en || 'Event details will be updated soon.'}`
        : `Central University of South Bihar, Gaya campus. ${item.desc_hi || item.desc_en || 'Event details will be updated soon.'}`;

      card.innerHTML = `
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
      `;
      eventDetailsList.appendChild(card);
    });
  }

  // Month navigation click event handlers
  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

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
