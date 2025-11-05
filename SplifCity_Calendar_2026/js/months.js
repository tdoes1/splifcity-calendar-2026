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

// calendar grid generator
function buildGrid(monthIndex) {
  const startDay = new Date(2026, monthIndex, 1).getDay();
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
  let grid = `<div class="calendar-grid"><div class="weekdays">S M T W T F S</div><div class="days">`;
  for (let i = 0; i < startDay; i++) grid += `<span></span>`;
  for (let d = 1; d <= daysInMonth; d++) grid += `<span>${d}</span>`;
  grid += `</div></div>`;
  return grid;
}

// build each month section
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

// swipe / arrow navigation
let currentIndex = 0;
function showPage(index) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.remove("active"));
  pages[index].classList.add("active");
  currentIndex = index;
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" && currentIndex < months.length) showPage(currentIndex + 1);
  if (e.key === "ArrowLeft" && currentIndex > 0) showPage(currentIndex - 1);
});

let startX = 0;
document.addEventListener("touchstart", e => (startX = e.touches[0].clientX));
document.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) {
    if (diff < 0 && currentIndex < months.length) showPage(currentIndex + 1);
    if (diff > 0 && currentIndex > 0) showPage(currentIndex - 1);
  }
});

// start with cover active
showPage(0);
