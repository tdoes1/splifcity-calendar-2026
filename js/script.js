// Global current page index
let currentIndex = 0;

// Shared function to show a page by index
function showPage(index) {
  const pages = document.querySelectorAll('.page');
  if (!pages.length) return;

  // clamp index
  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;

  pages.forEach(p => p.classList.remove('active'));
  pages[index].classList.add('active');
  currentIndex = index;
}

// Start on cover
showPage(0);

// Enter Calendar button → go to first month (which will be page index 1)
const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    showPage(1);
  });
}

// Share button → copy URL
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href);
      alert('Calendar link copied to clipboard!');
    } else {
      alert('Copy not supported in this browser.');
    }
  });
}
