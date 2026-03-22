// Scoreboard App - Optimized for Even Reality G2 Glasses

// State
let state = {
    homeScore: 0,
    awayScore: 0,
    homeName: 'HOME',
    awayName: 'AWAY',
    timeRemaining: 720, // 12:00 in seconds
    period: 1,
    isRunning: false,
    timerInterval: null
};

// DOM Elements
const elements = {
    homeScore: document.getElementById('home-score'),
    awayScore: document.getElementById('away-score'),
    homeName: document.getElementById('home-name'),
    awayName: document.getElementById('away-name'),
    timer: document.getElementById('timer'),
    period: document.getElementById('period'),
    startStopBtn: document.getElementById('start-stop-btn'),
    homeNameInput: document.getElementById('home-name-input'),
    awayNameInput: document.getElementById('away-name-input'),
    timeInput: document.getElementById('time-input')
};

// Initialize
function init() {
    loadState();
    updateDisplay();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    elements.homeNameInput.addEventListener('input', (e) => {
        state.homeName = e.target.value.toUpperCase() || 'HOME';
        elements.homeName.textContent = state.homeName;
        saveState();
    });

    elements.awayNameInput.addEventListener('input', (e) => {
        state.awayName = e.target.value.toUpperCase() || 'AWAY';
        elements.awayName.textContent = state.awayName;
        saveState();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                toggleTimer();
                break;
            case 'h':
                adjustScore('home', 1);
                break;
            case 'H':
                adjustScore('home', -1);
                break;
            case 'a':
                adjustScore('away', 1);
                break;
            case 'A':
                adjustScore('away', -1);
                break;
            case 'g':
                toggleControls();
                break;
        }
    });
}

// Score Functions
function adjustScore(team, amount) {
    if (team === 'home') {
        state.homeScore = Math.max(0, state.homeScore + amount);
        elements.homeScore.textContent = state.homeScore;
        animateScore(elements.homeScore);
    } else {
        state.awayScore = Math.max(0, state.awayScore + amount);
        elements.awayScore.textContent = state.awayScore;
        animateScore(elements.awayScore);
    }
    saveState();
}

function animateScore(element) {
    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 300);
}

// Timer Functions
function toggleTimer() {
    if (state.isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (state.timeRemaining <= 0) return;
    
    state.isRunning = true;
    elements.startStopBtn.textContent = 'Stop';
    elements.startStopBtn.classList.add('running');
    
    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();
        
        if (state.timeRemaining <= 0) {
            stopTimer();
            state.timeRemaining = 0;
            updateTimerDisplay();
        }
        saveState();
    }, 1000);
}

function stopTimer() {
    state.isRunning = false;
    elements.startStopBtn.textContent = 'Start';
    elements.startStopBtn.classList.remove('running');
    
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    saveState();
}

function setTimer() {
    const input = elements.timeInput.value;
    const parts = input.split(':');
    
    if (parts.length === 2) {
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseInt(parts[1]) || 0;
        state.timeRemaining = (minutes * 60) + seconds;
    } else {
        const seconds = parseInt(input) || 0;
        state.timeRemaining = seconds;
    }
    
    stopTimer();
    updateTimerDisplay();
    saveState();
}

function resetTimer() {
    state.timeRemaining = 720; // Default 12:00
    elements.timeInput.value = '12:00';
    stopTimer();
    updateTimerDisplay();
    saveState();
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    elements.timer.textContent = display;
    
    // Update timer color based on time remaining
    elements.timer.classList.remove('warning', 'critical');
    if (state.timeRemaining <= 30) {
        elements.timer.classList.add('critical');
    } else if (state.timeRemaining <= 120) {
        elements.timer.classList.add('warning');
    }
}

// Period Functions
function setPeriod(p) {
    state.period = p;
    elements.period.textContent = p;
    saveState();
}

// Reset Functions
function resetAll() {
    if (confirm('Reset everything?')) {
        state = {
            homeScore: 0,
            awayScore: 0,
            homeName: 'HOME',
            awayName: 'AWAY',
            timeRemaining: 720,
            period: 1,
            isRunning: false,
            timerInterval: null
        };
        stopTimer();
        updateDisplay();
        elements.homeNameInput.value = '';
        elements.awayNameInput.value = '';
        elements.timeInput.value = '12:00';
        localStorage.removeItem('scoreboardState');
    }
}

// Display Functions
function updateDisplay() {
    elements.homeScore.textContent = state.homeScore;
    elements.awayScore.textContent = state.awayScore;
    elements.homeName.textContent = state.homeName;
    elements.awayName.textContent = state.awayName;
    elements.period.textContent = state.period;
    updateTimerDisplay();
    
    if (state.homeName !== 'HOME') {
        elements.homeNameInput.value = state.homeName;
    }
    if (state.awayName !== 'AWAY') {
        elements.awayNameInput.value = state.awayName;
    }
}

// Toggle glasses mode (hide controls)
function toggleControls() {
    document.body.classList.toggle('glasses-mode');
}

// Local Storage
function saveState() {
    const saveData = { ...state };
    delete saveData.timerInterval;
    localStorage.setItem('scoreboardState', JSON.stringify(saveData));
}

function loadState() {
    const saved = localStorage.getItem('scoreboardState');
    if (saved) {
        const loaded = JSON.parse(saved);
        state = { ...state, ...loaded };
        state.isRunning = false; // Don't auto-start timer on load
        state.timerInterval = null;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);