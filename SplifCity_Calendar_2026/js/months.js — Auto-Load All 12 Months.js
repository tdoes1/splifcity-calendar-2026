/* --- SPLIF CITY 2026 MONTHS BUILDER --- */

// month names & corresponding image filenames in /assets/
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
  { name: "December", img: "December.jpg" },
];

// create a mini calendar grid for each month
function buildGrid(monthIndex) {
  const startDay = new Date(2026, monthIndex, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
  let grid = `<div class="calendar-grid"><div class="weekdays">S M T W T F S</div><div class="days">`;
  for (let i = 0; i < startDay; i++) grid += `<span></span>`;
  for (let d = 1; d <= daysInMonth; d++) grid += `<span>${d}</span>`;
  grid += `</div></div>`;
  return grid;
}

// build & insert each month section
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

// unified navigation
let currentIndex = 0; // start with cover page

function getAllPages() {
  // '.page' covers cover, months, and contact section
  return document.querySelectorAll(".page");
}

function showPage(index) {
  const pages = getAllPages();
  pages.forEach((p) => p.classList.remove("active"));
  if (pages[index]) {
    pages[index].classList.add("active");
    currentIndex = index;
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const pages = getAllPages();
  if (e.key === "ArrowRight" && currentIndex < pages.length - 1)
    showPage(currentIndex + 1);
  if (e.key === "ArrowLeft" && currentIndex > 0)
    showPage(currentIndex - 1);
});

// Touch swipe detection
let startX = 0;
document.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
document.addEventListener("touchend", (e) => {
  const pages = getAllPages();
  const diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) {
    if (diff < 0 && currentIndex < pages.length - 1) showPage(currentIndex + 1);
    if (diff > 0 && currentIndex > 0) showPage(currentIndex - 1);
  }
});

// Button: Enter Calendar (cover to first month)
document.getElementById('enterBtn').onclick = () => showPage(1);

// Button: Contact page nav (if you want to show contact, for example)
const contactBtn = document.getElementById('contactBtn');
if(contactBtn) {
  contactBtn.onclick = () => showPage(getAllPages().length - 1); // last page
}

// Start with cover page active
showPage(0);
