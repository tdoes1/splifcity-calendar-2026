// --- SPLIF CITY 2026 MONTH BUILDER ---

const months = [
  { name: "January", img: "January.jpg" },
  { name: "February", img: "February.jpg" },
  { name: "March", img: "March.jpg" },
  { name: "April", img: "April.jpg" },
  { name: "May", img: "May.jpg" },
  { name: "June", img: "June.jpg" },
  { name: "July", img: "July.jpg" },
  { name: "August", img: "August.jpg" },
  { name: "September", img: "September.jpg" },
  { name: "October", img: "October.jpg" },
  { name: "November", img: "November.jpg" },
  { name: "December", img: "December.jpg" }
];

// US holidays 2026 (0-based month index)
const holidays = {
  "0-1":  "New Year's Day",
  "0-19": "Martin Luther King Jr. Day",
  "1-16": "Presidents Day",
  "4-25": "Memorial Day",
  "5-19": "Juneteenth",
  "6-4":  "Independence Day",
  "8-7":  "Labor Day",
  "9-12": "Columbus Day",
  "10-11": "Veterans Day",
  "10-26": "Thanksgiving Day",
  "11-25": "Christmas Day"
};

// build calendar grid for one month
function buildGrid(monthIndex) {
  const startDay = new Date(2026, monthIndex, 1).getDay();
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();

  let grid = `
    <div class="calendar-grid">
      <div class="weekdays">S M T W T F S</div>
      <div class="days" style="
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 4px;
        text-align: center;
      ">
  `;

  // empty slots before first day
  for (let i = 0; i < startDay; i++) {
    grid += `<span></span>`;
  }

  // actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${monthIndex}-${d}`;
    const holidayName = holidays[key] || "";
    const holidayClass = holidayName ? " holiday-day" : "";

    grid += `<span 
      class="calendar-day${holidayClass}" 
      data-month="${monthIndex}" 
      data-day="${d}" 
      ${holidayName ? `data-holiday="${holidayName}"` : ""}
    >${d}</span>`;
  }

  grid += `</div></div>`; // close .days and .calendar-grid

  // month-specific holiday list
  const monthHolidays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${monthIndex}-${d}`;
    const holidayName = holidays[key];
    if (holidayName) {
      monthHolidays.push(`${months[monthIndex].name} ${d}: ${holidayName}`);
    }
  }

  if (monthHolidays.length) {
    grid += `
      <div class="holiday-list">
        <strong>Holidays this month:</strong>
        <ul>
          ${monthHolidays.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // legend
  grid += `
    <div class="calendar-legend">
      <span><span class="legend-box legend-holiday"></span>Holiday</span>
      <span><span class="legend-box legend-note"></span>Your reminder</span>
    </div>
  `;

  return grid;
}

// build and insert months
function buildMonths() {
  const monthsContainer = document.getElementById("months");
  if (!monthsContainer) return;

  months.forEach((m, i) => {
    const section = document.createElement("section");
    section.className = "page";
    section.innerHTML = `
      <h2 class="month-title">${m.name} 2026</h2>
      <img src="assets/${m.img}" alt="${m.name}" class="month-image" />
      ${buildGrid(i)}
    `;
    monthsContainer.appendChild(section);
  });
}

// --- REMINDER LOGIC ---

const modal = document.getElementById('reminderModal');
const reminderTitle = document.getElementById('reminderTitle');
const reminderText = document.getElementById('reminderText');
const btnSave = document.getElementById('reminderSave');
const btnDelete = document.getElementById('reminderDelete');
const btnCancel = document.getElementById('reminderCancel');

let activeDayEl = null;

function reminderKey(monthIndex, day) {
  return `note-2026-${monthIndex}-${day}`;
}

function openReminder(el) {
  activeDayEl = el;
  const m = el.dataset.month;
  const d = el.dataset.day;
  const key = reminderKey(m, d);
  const existing = localStorage.getItem(key) || '';

  const holidayName = el.dataset.holiday || "";
  let titleLabel = `${months[m].name} ${d}, 2026`;
  if (holidayName) {
    titleLabel += ` – ${holidayName}`;
  }

  reminderTitle.textContent = `Reminder for ${titleLabel}`;

  if (!existing && holidayName) {
    reminderText.value = holidayName;
  } else {
    reminderText.value = existing;
  }

  modal.classList.remove('hidden');
  reminderText.focus();
}

function closeReminder() {
  modal.classList.add('hidden');
  activeDayEl = null;
}

function setupDayHandlers() {
  const dayEls = document.querySelectorAll('.calendar-day');
  dayEls.forEach(el => {
    const m = el.dataset.month;
    const d = el.dataset.day;
    const key = reminderKey(m, d);
    const existing = localStorage.getItem(key);

    if (existing) {
      el.classList.add('day-has-note');
    }

    el.addEventListener('click', () => openReminder(el));
  });
}

// modal buttons
if (btnSave && btnDelete && btnCancel && modal) {
  btnSave.addEventListener('click', () => {
    if (!activeDayEl) return;
    const m = activeDayEl.dataset.month;
    const d = activeDayEl.dataset.day;
    const key = reminderKey(m, d);
    const text = reminderText.value.trim();

    if (text) {
      localStorage.setItem(key, text);
      activeDayEl.classList.add('day-has-note');
    } else {
      localStorage.removeItem(key);
      activeDayEl.classList.remove('day-has-note');
    }
    closeReminder();
  });

  btnDelete.addEventListener('click', () => {
    if (!activeDayEl) return;
    const m = activeDayEl.dataset.month;
    const d = activeDayEl.dataset.day;
    const key = reminderKey(m, d);
    localStorage.removeItem(key);
    activeDayEl.classList.remove('day-has-note');
    closeReminder();
  });

  btnCancel.addEventListener('click', closeReminder);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeReminder();
  });
}

// run everything after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  buildMonths();
  setupDayHandlers();
  if (typeof initNavigation === 'function') {
    initNavigation();
  }
});
