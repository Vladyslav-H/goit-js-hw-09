import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');

formEl.addEventListener('input', throttle(onInput, 1000));
formEl.addEventListener('submit', onSubmit);
let inputData = {};
console.log(inputData);
function onInput() {
  inputData = {
    delay: formEl.delay.value,
    step: formEl.step.value,
    amount: formEl.amount.value,
  };
  if (inputData.delay < 0 || inputData.step < 0 || inputData.amount < 0) {
    Notify.warning(`Please, input valid value`);
  }console.log(inputData);
}

function onSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  const { delay, step, amount } = inputData;
  let totalDelay = +delay;
  for (let i = 1; i <= +amount; i++) {
    createPromise(i, totalDelay).then(fullfill).catch(error);
    totalDelay += +step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function fullfill({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function error({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
