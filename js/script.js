// --- GLOBAL PAGE NAVIGATION ---

window.currentIndex = 0;

function showPage(index) {
  const pages = document.querySelectorAll('.page');
  if (!pages.length) return;

  pages.forEach(p => p.classList.remove('active'));

  if (index < 0) index = 0;
  if (index > pages.length - 1) index = pages.length - 1;

  pages[index].classList.add('active');
  window.currentIndex = index;
}

// called AFTER months have been built
function initNavigation() {
  // start at cover
  showPage(0);

  // Enter button → go to first month page (index 1)
const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const pages = Array.from(document.querySelectorAll('.page'));
    const jan = document.getElementById('month-0');
    if (!jan) return;

    const janIndex = pages.indexOf(jan);
    if (janIndex !== -1) showPage(janIndex);
  }, true);
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

  // Desktop arrows
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

  if (leftArrow) {
    leftArrow.addEventListener('click', () => stepPage(-1));
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', () => stepPage(1));
  }

  // Keyboard arrows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') stepPage(1);
    if (e.key === 'ArrowLeft') stepPage(-1);
  });

  // Touch swipe
  let startX = 0;
let startY = 0;
let ignoreSwipe = false;

document.addEventListener('touchstart', (e) => {
  if (!e.touches || !e.touches.length) return;

  const t = e.target;
  // Don’t treat taps on interactive elements as swipes
  ignoreSwipe = !!(t.closest && t.closest('button, a, input, textarea, select, .reminder-inner'));

  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (ignoreSwipe) return;
  if (!e.changedTouches || !e.changedTouches.length) return;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  // Require a mostly-horizontal swipe
  if (Math.abs(diffX) < 60) return;
  if (Math.abs(diffY) > 60) return;

  if (diffX < 0) stepPage(1);
  if (diffX > 0) stepPage(-1);
}, { passive: true });

