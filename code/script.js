let timer;
let isRunning = false;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = timeToString(elapsedTime);
}

function timeToString(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
        isPaused = false;
        startBtn.textContent = 'Resume';
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        isPaused = true;
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    isRunning = false;
    isPaused = false;
    laps.innerHTML = '';
    lapCounter = 1;
    startBtn.textContent = 'Start';
}

function lap() {
    if (isRunning) {
        const lapTime = timeToString(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapCounter++;
    }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);