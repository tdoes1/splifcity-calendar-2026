// MONTH DATA
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

// BUILD MONTH SECTIONS
const monthsContainer = document.getElementById("months");

months.forEach((m, i) => {
  const section = document.createElement("section");
  section.className = "page";
  section.innerHTML = `
    <h2 class="month-title">${m.name} 2026</h2>
    <img src="assets/${m.img}" class="month-image" alt="${m.name}">
    ${buildGrid(i)}
  `;
  monthsContainer.appendChild(section);
});

// KEYBOARD NAV
document.addEventListener("keydown", (e) => {
  const pages = document.querySelectorAll(".page");
  if (e.key === "ArrowRight" && currentIndex < pages.length - 1) {
    showPage(currentIndex + 1);
  }
  if (e.key === "ArrowLeft" && currentIndex > 0) {
    showPage(currentIndex - 1);
  }
});

// TOUCH SWIPE NAV
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - startX;
  const pages = document.querySelectorAll(".page");

  if (Math.abs(dx) > 50) {
    if (dx < 0 && currentIndex < pages.length - 1) showPage(currentIndex + 1);
    if (dx > 0 && currentIndex > 0) showPage(currentIndex - 1);
  }
});
