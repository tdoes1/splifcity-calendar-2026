// Global page index
let currentIndex = 0;

// Shared showPage function
function showPage(index) {
  const pages = document.querySelectorAll('.page');
  if (!pages.length) return;

  pages.forEach(p => p.classList.remove('active'));

  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;

  pages[index].classList.add('active');
  currentIndex = index;
}

// Start on cover
showPage(0);

// Enter button
document.getElementById('enterBtn').addEventListener('click', () => {
  showPage(1); // first month
});
