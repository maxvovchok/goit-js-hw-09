// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const buttonPressed = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
// buttonPressed.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(2023, 11, 21, 21),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      // buttonPressed.disabled = false;
      inputDate.disabled = true;
      buttonPressed.addEventListener('click', () => {
        buttonPressed.disabled = true;

        const interval = setInterval(() => {
          const inputDateValue = new Date(inputDate.value);
          const data = new Date();
          const timeLeft = inputDateValue - data;

          days.textContent = addLeadingZero(convertMs(timeLeft).days);
          hours.textContent = addLeadingZero(convertMs(timeLeft).hours);
          minutes.textContent = addLeadingZero(convertMs(timeLeft).minutes);
          seconds.textContent = addLeadingZero(convertMs(timeLeft).seconds);

          if (
            convertMs(timeLeft).days === 0 &&
            convertMs(timeLeft).hours === 0 &&
            convertMs(timeLeft).minutes === 0 &&
            convertMs(timeLeft).seconds === 0
          ) {
            clearInterval(interval);
            inputDate.disabled = false;
          }
        }, 1000);
      });
    }
  },
};

flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
