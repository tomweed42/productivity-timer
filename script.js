// Productivity quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Done is better than perfect. - Sheryl Sandberg",
    "Focus on being productive instead of busy. - Tim Ferriss",
    "Time is what we want most, but what we use worst. - William Penn",
    "The key is not to prioritize what's on your schedule, but to schedule your priorities. - Stephen Covey",
    "Productivity is never an accident. It is always the result of a commitment to excellence. - Paul J. Meyer",
    "You don't need more time, you need more focus.",
    "Small progress is still progress.",
    "Work smarter, not harder.",
    "Start where you are, use what you have, do what you can."
];

// Timer variables
let timeElapsed = 0;
let timerInterval = null;
let isCountingDown = false;

// DOM elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const quoteElement = document.getElementById('quote');
const themeToggle = document.getElementById('themeToggle');
const taskNote = document.getElementById('taskNote');
const presetButtons = document.querySelectorAll('.preset-btn');

// Theme functions
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', newTheme);
}

// Timer functions
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (isCountingDown) {
                timeElapsed--;
                if (timeElapsed <= 0) {
                    stopTimer();
                    timeElapsed = 0;
                }
            } else {
                timeElapsed++;
            }
            timerDisplay.textContent = formatTime(timeElapsed);
        }, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

function resetTimer() {
    stopTimer();
    timeElapsed = 0;
    isCountingDown = false;
    timerDisplay.textContent = formatTime(timeElapsed);
}

function setCustomTime(seconds) {
    stopTimer();
    timeElapsed = seconds;
    isCountingDown = true;
    timerDisplay.textContent = formatTime(timeElapsed);
}

// Task note functions
function saveTaskNote() {
    localStorage.setItem('taskNote', taskNote.value);
}

function loadTaskNote() {
    const savedNote = localStorage.getItem('taskNote');
    if (savedNote) {
        taskNote.value = savedNote;
    }
}

// Quote functions
function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
themeToggle.addEventListener('click', toggleTheme);
taskNote.addEventListener('input', saveTaskNote);
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => setCustomTime(parseInt(btn.dataset.time)));
});

// Initialize
updateQuote();
setInterval(updateQuote, 30000); // Change quote every 30 seconds
stopBtn.disabled = true;
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
loadTaskNote(); // Load saved task note
