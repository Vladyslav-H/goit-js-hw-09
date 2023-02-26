function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.body;
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

btnStartEl.addEventListener('click', onBClicktnStart);
btnStopEl.addEventListener('click', onClickBtnStop);

function onBClicktnStart() {
     btnStartEl.disabled = true;
  btnStopEl.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
 
}
function onClickBtnStop() {
    btnStartEl.disabled = false;
  btnStopEl.disabled = true;
  clearTimeout(timerId);
  
}

