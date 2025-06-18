// Described in documentation
import flatpickr from 'flatpickr';
// Additional import of styles
import 'flatpickr/dist/flatpickr.min.css';

// Described in documentation
import iziToast from 'izitoast';
// Additional import of styles
import 'izitoast/dist/css/iziToast.min.css';

// Get DOM elements
const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Variables for timer functionality
let userSelectedDate = null;
let timerInterval = null;

// Make start button inactive initially
startButton.disabled = true;

// Flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate && selectedDate <= new Date()) {
      // Date is in the past
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else if (selectedDate) {
      // Valid date selected
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

// Initialize flatpickr
flatpickr(dateTimePicker, options);

// Convert milliseconds to time object
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

// Add leading zero for formatting
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Update timer display
function updateTimerDisplay(time) {
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
}

// Start timer function
function startTimer() {
  if (!userSelectedDate) return;

  // Disable controls during countdown
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      // Timer has reached the end
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      // Re-enable input for selecting new date
      dateTimePicker.disabled = false;
      // Keep start button disabled until new valid date is selected

      iziToast.success({
        title: 'Completed',
        message: 'Timer has finished!',
        position: 'topRight',
      });

      return;
    }

    // Update timer display
    const time = convertMs(timeDifference);
    updateTimerDisplay(time);
  }, 1000);
}

// Event listener for start button
startButton.addEventListener('click', startTimer);
