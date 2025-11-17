// ---- MONTH DATA (filenames must match /assets/ exactly) ----
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

// ---- CALENDAR GRID BUILDER (correct start day + alignment) ----
function buildGrid(monthIndex) {
  const startDay = new Date(2026, monthIndex, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();

  let grid = `
    <div class="calendar-grid">
      <div class="weekdays">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div class="days">
  `;

  // Empty cells before day 1
  for (let d = 1; d <= daysInMonth; d++) {
  grid += `<span class="calendar-day" data-month="${monthIndex}" data-day="${d}">${d}</span>`;
}


  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    grid += `<span>${d}</span>`;
  }

  grid += `
      </div>
    </div>
  `;

  return grid;
}

// ---- BUILD MONTH PAGES ----
const monthsContainer = document.getElementById("months");

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

// ---- NAVIGATION: ARROWS + SWIPE ----

document.addEventListener("keydown", (e) => {
  const pages = document.querySelectorAll(".page");
  if (!pages.length) return;

  if (e.key === "ArrowRight" && currentIndex < pages.length - 1) {
    showPage(currentIndex + 1);
  }
  if (e.key === "ArrowLeft" && currentIndex > 0) {
    showPage(currentIndex - 1);
  }
});

// Touch swipe (mobile)
let startX = 0;

document.addEventListener("touchstart", (e) => {
  if (!e.touches || !e.touches.length) return;
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  if (!e.changedTouches || !e.changedTouches.length) return;
  const diff = e.changedTouches[0].clientX - startX;
  const pages = document.querySelectorAll(".page");
  if (!pages.length) return;

  if (Math.abs(diff) > 50) {
    if (diff < 0 && currentIndex < pages.length - 1) {
      showPage(currentIndex + 1);
    }
    if (diff > 0 && currentIndex > 0) {
      showPage(currentIndex - 1);
    }
  }
});

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

// attach click handlers to days + apply highlight on load
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
if (btnSave && btnDelete && btnCancel) {
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

  // close modal when clicking outside inner box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeReminder();
  });
}

// run after months are built
setupDayHandlers();
