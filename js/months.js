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

// build calendar grid for one month
function buildGrid(monthIndex) {
  const startDay = new Date(2026, monthIndex, 1).getDay();
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();

  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  let grid = `
    <div class="calendar-grid">
      <div class="weekdays">
        ${weekdayLabels.map(d => `<span>${d}</span>`).join('')}
      </div>
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
    grid += `<span class="calendar-day" data-month="${monthIndex}" data-day="${d}">${d}</span>`;
  }

  grid += `</div></div>`;
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

  reminderTitle.textContent = `Reminder for ${months[m].name} ${d}, 2026`;
  reminderText.value = existing;
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
