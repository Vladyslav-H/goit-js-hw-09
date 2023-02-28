import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
const LOCALSTORAGE_KEY = 'input-date-value';

const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');

buttonEl.addEventListener('click', onButtonClick);
buttonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (this.defaultDate > selectedDates[0].getTime()) {
      return window.alert('Please choose a date in the future');
    }
    localStorage.setItem(LOCALSTORAGE_KEY, selectedDates[0].getTime());
    buttonEl.disabled = false;
  },
};

flatpickr(inputEl, options);

function onButtonClick() {
  buttonEl.disabled = true;
  inputEl.disabled = true;
  const startTime = +localStorage.getItem(LOCALSTORAGE_KEY);
  const timerId = setInterval(() => {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    const currentTime = Date.now();
    const timerTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timerTime);

    daysValueEl.textContent = days;
    hoursValueEl.textContent = hours;
    minutesValueEl.textContent = minutes;
    secondsValueEl.textContent = seconds;

    setTimeout(() => {
      clearInterval(timerId), (inputEl.disabled = false);
    }, timerTime);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
