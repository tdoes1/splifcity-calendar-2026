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

// --- DESKTOP ARROWS ---

const leftArrow = document.querySelector('.nav-arrow-left');
const rightArrow = document.querySelector('.nav-arrow-right');

function stepPage(delta) {
  const pages = document.querySelectorAll('.page');
  if (!pages.length) return;

  let target = window.currentIndex + delta;
  if (target < 0) target = 0;
  if (target > pages.length - 1) target = pages.length - 1;

  showPage(target);
}

if (leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => stepPage(-1));
  rightArrow.addEventListener('click', () => stepPage(1));
}


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
