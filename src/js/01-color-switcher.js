function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.body;
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let timerId = null;

btnStartEl.addEventListener('click', onBClicktnStart);
btnStopEl.addEventListener('click', onClickBtnStop);

function onBClicktnStart() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;
}
function onClickBtnStop() {
  clearTimeout(timerId);
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
}
