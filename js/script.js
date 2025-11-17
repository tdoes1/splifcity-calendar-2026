// --- BASIC PAGE NAVIGATION ---

// Show a given page index (0 = cover, 1 = first month, last = contact)
function showPage(index) {
  const pages = document.querySelectorAll('.page');
  if (!pages.length) return;

  pages.forEach(p => p.classList.remove('active'));

  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;

  pages[index].classList.add('active');
  window.currentIndex = index;
}

// Start at cover
window.currentIndex = 0;
showPage(0);

// Enter Calendar → go to first month page (index 1)
// (because months.js will insert month pages right after the cover)
const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    showPage(1);
  });
}

// Share button (copies current URL)
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
