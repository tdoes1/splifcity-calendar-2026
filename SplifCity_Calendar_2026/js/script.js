// basic navigation between pages
const pages = document.querySelectorAll('.page');
let current = 0;

document.getElementById('enterBtn').onclick = () => switchPage(1);

function switchPage(index) {
  pages[current].classList.remove('active');
  pages[index].classList.add('active');
  current = index;
}

document.getElementById('shareBtn').onclick = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Calendar link copied to clipboard!");
};

