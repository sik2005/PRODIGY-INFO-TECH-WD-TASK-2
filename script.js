let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(showTime, 10); // Update every 10 milliseconds
}

function showTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10); // Get the first two digits of milliseconds

    display.textContent = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function startStop() {
    if (!running) {
        startStopwatch();
        startStopBtn.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
    }
    running = !running;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00.00";
    startStopBtn.textContent = "Start";
    laps.innerHTML = '';
    lapCounter = 0;
    running = false;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('li');
        lapElement.innerHTML = `Lap ${++lapCounter} <span>${lapTime}</span>`;
        laps.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
