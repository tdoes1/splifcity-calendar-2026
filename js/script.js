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
    enterBtn.addEventListener('click', () => {
  const pages = Array.from(document.querySelectorAll('.page'));
  const jan = document.getElementById('month-0'); // January
  if (!jan) return;

  const janIndex = pages.indexOf(jan);
  if (janIndex !== -1) showPage(janIndex);
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
  document.addEventListener('touchstart', (e) => {
    if (!e.touches || !e.touches.length) return;
    startX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
    if (!e.changedTouches || !e.changedTouches.length) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) < 50) return;

    if (diff < 0) stepPage(1);    // swipe left → next
    if (diff > 0) stepPage(-1);   // swipe right → previous
  });
}
