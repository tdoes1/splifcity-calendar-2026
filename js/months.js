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
  for (let i = 0; i < startDay; i++) {
    grid += `<span class="empty"></span>`;
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
