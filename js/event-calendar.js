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

  const eventImages = {
    national: 'assets/images/admin_good.jpeg',
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
    holidayEvent("New Year (OH)", "1 January 2026", "Gazetted/Observed Holiday", eventImages.festival),
    holidayEvent("Observed Holiday", "2 January 2026", "Gazetted/Observed Holiday", eventImages.campus),
    holidayEvent("Republic Day", "26 January 2026", "Gazetted/Observed Holiday", eventImages.national),
    holidayEvent("Holi (OH)", "3 March 2026", "Gazetted/Observed Holiday", eventImages.holi),
    holidayEvent("Holi", "4 March 2026", "Gazetted/Observed Holiday", eventImages.holi),
    holidayEvent("Holi (OH)", "5 March 2026", "Gazetted/Observed Holiday", eventImages.holi),
    holidayEvent("Holi (OH)", "6 March 2026", "Gazetted/Observed Holiday", eventImages.holi),
    holidayEvent("Idu'l Fitr", "21 March 2026", "Gazetted/Observed Holiday", eventImages.eid),
    holidayEvent("Mahavir Jayanti", "31 March 2026", "Gazetted/Observed Holiday", eventImages.jain),
    holidayEvent("Good Friday", "3 April 2026", "Gazetted/Observed Holiday", eventImages.christmas),
    holidayEvent("Buddha Purnima", "1 May 2026", "Gazetted/Observed Holiday", eventImages.buddha),
    holidayEvent("Idu'l Zuha", "27 May 2026", "Gazetted/Observed Holiday", eventImages.eid),
    holidayEvent("Muharram", "26 June 2026", "Gazetted/Observed Holiday", eventImages.eid),
    holidayEvent("Independence Day", "15 August 2026", "Gazetted/Observed Holiday", eventImages.national),
    holidayEvent("Prophet Mohammad's Birthday (Id-E-Milad)", "26 August 2026", "Gazetted/Observed Holiday", eventImages.eid),
    holidayEvent("Janamashtami (Vaishnavi)", "4 September 2026", "Gazetted/Observed Holiday", eventImages.festival),
    holidayEvent("Mahatma Gandhi's Birthday", "2 October 2026", "Gazetted/Observed Holiday", eventImages.gandhi),
    holidayEvent("An Additional Day for Dussehra", "19 October 2026", "Gazetted/Observed Holiday", eventImages.festival),
    holidayEvent("Dussehra (Vijay Dashmi)", "20 October 2026", "Gazetted/Observed Holiday", eventImages.festival),
    holidayEvent("Diwali (Deepavali)", "8 November 2026", "Gazetted/Observed Holiday", eventImages.diwali),
    holidayEvent("Diwali & Chhath Pooja (OH)", "9 November 2026", "Gazetted/Observed Holiday", eventImages.diwali),
    holidayEvent("Diwali & Chhath Pooja (OH)", "10 November 2026", "Gazetted/Observed Holiday", eventImages.diwali),
    holidayEvent("Diwali & Chhath Pooja (OH)", "11 November 2026", "Gazetted/Observed Holiday", eventImages.diwali),
    holidayEvent("Diwali & Chhath Pooja (OH)", "12 November 2026", "Gazetted/Observed Holiday", eventImages.diwali),
    holidayEvent("Diwali & Chhath Pooja (OH)", "13 November 2026", "Gazetted/Observed Holiday", eventImages.diwali),
    holidayEvent("Guru Nanak's Birthday", "24 November 2026", "Gazetted/Observed Holiday", eventImages.sikh),
    holidayEvent("Christmas Day", "25 December 2026", "Gazetted/Observed Holiday", eventImages.christmas),
    holidayEvent("New Year's Day", "1 January 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Hazrat Ali's Birthday", "3 January 2026", "Restricted Holiday", eventImages.eid),
    holidayEvent("Makar Sankranti/Magha Bihu/Pongal", "14 January 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Sri Panchami, Basant Panchami", "23 January 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Guru Ravi Das's Birthday", "1 February 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Birthday of Swami Dayananda Saraswati", "12 February 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Maha Shivratri", "15 February 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Shiva Ji Jayanti", "19 February 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Holika Dahan/Dolyatra", "3 March 2026", "Restricted Holiday", eventImages.holi),
    holidayEvent("Chaitra Sukladi/Gudi Padava/Ugadi/Cheti", "19 March 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Jamat-Ul-Vida/Naoraz", "20 March 2026", "Restricted Holiday", eventImages.eid),
    holidayEvent("Ram Navami", "26 March 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Easter Sunday", "5 April 2026", "Restricted Holiday", eventImages.christmas),
    holidayEvent("Vaisakhi/Vishu/Meshadi (Tamil New Year's Day)", "14 April 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Vaisakhadi (Bengal)/Bahag Bihu (Assam)", "15 April 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Birthday of Guru Rabindranath Tagore", "9 May 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Rath Yatra", "16 July 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Parsi New Year's Day/Nauraj", "15 August 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Onam or Thiru Onam Day", "26 August 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Raksha Bandhan", "28 August 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Ganesh Chaturthi/Vinayak Chaturthi", "14 September 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("1st Navratra", "11 October 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Dussehra (Saptami)", "18 October 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Dussehra (Mahaashtami)", "19 October 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Dussehra (Mahanavmi)", "20 October 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Maharishi Valmiki's Birthday", "26 October 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Karaka Chaturthi (Karwa Chouth)", "29 October 2026", "Restricted Holiday", eventImages.festival),
    holidayEvent("Naraka Chaturdasi", "8 November 2026", "Restricted Holiday", eventImages.diwali),
    holidayEvent("Govardhan Puja", "9 November 2026", "Restricted Holiday", eventImages.diwali),
    holidayEvent("Bhai Duj", "11 November 2026", "Restricted Holiday", eventImages.diwali),
    holidayEvent("Pratihar Shashthi or Surya Shashthi (Chhath)", "15 November 2026", "Restricted Holiday", eventImages.diwali),
    holidayEvent("Guru Teg Bahadur's Martyrdom Day", "24 November 2026", "Restricted Holiday", eventImages.sikh),
    holidayEvent("Hazrat Ali's Birthday", "23 December 2026", "Restricted Holiday", eventImages.eid),
    holidayEvent("Christmas Eve", "24 December 2026", "Restricted Holiday", eventImages.christmas)
  ];
  
  const monthNames = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    hi: ["à¤œà¤¨à¤µà¤°à¥€", "à¤«à¤°à¤µà¤°à¥€", "à¤®à¤¾à¤°à¥à¤š", "à¤…à¤ªà¥à¤°à¥ˆà¤²", "à¤®à¤ˆ", "à¤œà¥‚à¤¨", "à¤œà¥à¤²à¤¾à¤ˆ", "à¤…à¤—à¤¸à¥à¤¤", "à¤¸à¤¿à¤¤à¤‚à¤¬à¤°", "à¤…à¤•à¥à¤Ÿà¥‚à¤¬à¤°", "à¤¨à¤µà¤‚à¤¬à¤°", "à¤¦à¤¿à¤¸à¤‚à¤¬à¤°"]
  };

  const dayNames = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    hi: ["à¤¸à¥‹à¤®", "à¤®à¤‚à¤—à¤²", "à¤¬à¥à¤§", "à¤—à¥à¤°à¥", "à¤¶à¥à¤•à¥à¤°", "à¤¶à¤¨à¤¿", "à¤°à¤µà¤¿"]
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
    const keys = Object.keys(eventsMap).sort();
    if (keys.length > 0) {
      const parts = keys[0].split('-');
      currentYear = parseInt(parts[0], 10);
      currentMonth = parseInt(parts[1], 10) - 1;
      return;
    }

    const today = new Date();
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
      eventDetailsList.innerHTML = `<div class="no-events-msg" data-en="Failed to load events." data-hi="à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤® à¤²à¥‹à¤¡ à¤•à¤°à¤¨à¥‡ à¤®à¥‡à¤‚ à¤µà¤¿à¤«à¤²à¥¤">Failed to load events.</div>`;
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

    if (!selectedDateStr) {
      selectedDateDisplay.textContent = 'No date selected';
      eventDetailsList.innerHTML = `
        <div class="no-events-msg" data-en="Click a highlighted date to view only that day's events." data-hi="Click a highlighted date to view only that day's events.">
          Click a highlighted date to view only that day's events.
        </div>
      `;
      return;
    }
    
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
        <div class="no-events-msg" data-en="No events scheduled for this date." data-hi="à¤‡à¤¸ à¤¤à¤¿à¤¥à¤¿ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥‹à¤ˆ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤® à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤">
          ${lang === 'en' ? 'No events scheduled for this date.' : 'à¤‡à¤¸ à¤¤à¤¿à¤¥à¤¿ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥‹à¤ˆ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤® à¤¨à¤¿à¤°à¥à¤§à¤¾à¤°à¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤'}
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
      const categoryHi = item.desc_hi || 'à¤¸à¥€à¤¯à¥‚à¤à¤¸à¤¬à¥€ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®';
      
      const title = lang === 'en' ? item.title_en : item.title_hi;
      const meta = lang === 'en' ? category : categoryHi;
      const timeStr = item.date_str || (lang === 'en' ? 'Full Day' : 'à¤ªà¥‚à¤°à¤¾ à¤¦à¤¿à¤¨');
      
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
    selectedDateStr = '';
    renderCalendar();
    displaySelectedEvents();
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
