// Function to prompt user for time input and validate it
function getTimeInput(promptMessage) {
    let value = prompt(promptMessage);
    while (isNaN(value) || value < 0) {
        value = prompt(`Invalid input. ${promptMessage}`);
    }
    return parseInt(value);
}

const initialDays = getTimeInput("Enter the days here: ");
const initialHours = getTimeInput("Enter the hours here: ");
const initialMinutes = getTimeInput("Enter the minutes here: ");
const initialSeconds = getTimeInput("Enter the seconds here: ");

// Convert initial time values to total seconds
let totalSeconds = (initialDays * 24 * 60 * 60) + (initialHours * 60 * 60) + (initialMinutes * 60) + initialSeconds;

// Function to update the timer display
function updateTimer() {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector('#days .time').textContent = String(days).padStart(2, '0');
    document.querySelector('#hours .time').textContent = String(hours).padStart(2, '0');
    document.querySelector('#minutes .time').textContent = String(minutes).padStart(2, '0');
    document.querySelector('#seconds .time').textContent = String(seconds).padStart(2, '0');

    totalSeconds--;

    if (totalSeconds < 0) {
        clearInterval(interval);
        document.querySelectorAll('.time').forEach(el => el.textContent = '00');
        alert('Oops, Time\'s Up');
    }
}

// Initial call to display the timer immediately
updateTimer();

// Update the timer every second
const interval = setInterval(updateTimer, 1000);
