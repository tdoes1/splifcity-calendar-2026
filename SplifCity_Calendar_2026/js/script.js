const pages = document.querySelectorAll('.page');
let current = 0;
document.getElementById('enterBtn').onclick = () => switchPage(1);

function switchPage(index) {
  pages[current].classList.remove('active');
  pages[index].classList.add('active');
  current = index;
}

// You can extend this to loop through all 12 months
// and add swipe listeners if desired
