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

  let grid = `
    <div class="calendar-grid">
      <div class="weekdays">S M T W T F S</div>
      <div class="days">
  `;

  for (let i = 0; i < startDay; i++) {
    grid += `<span></span>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    grid += `<span>${d}</span>`;
  }

  grid += `</div></div>`;
  return grid;
}

// insert month pages into #months container
const monthsContainer = document.getElementById("months");
if (monthsContainer) {
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

// after months are added, use showPage navigation
if (typeof showPage === "function") {
  // start at cover (index 0)
  showPage(0);

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    const pages = document.querySelectorAll(".page");
    if (!pages.length) return;

    if (e.key === "ArrowRight" && window.currentIndex < pages.length - 1) {
      showPage(window.currentIndex + 1);
    }
    if (e.key === "ArrowLeft" && window.currentIndex > 0) {
      showPage(window.currentIndex - 1);
    }
  });

  // touch swipe navigation
  let startX = 0;
  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      const pages = document.querySelectorAll(".page");
      if (!pages.length) return;

      if (diff < 0 && window.currentIndex < pages.length - 1) {
        showPage(window.currentIndex + 1);
      }
      if (diff > 0 && window.currentIndex > 0) {
        showPage(window.currentIndex - 1);
      }
    }
  });
}
