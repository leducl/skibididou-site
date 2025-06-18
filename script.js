const grid = document.getElementById("grid");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const darkModeButton = document.getElementById("darkModeButton");
const timerDisplay = document.getElementById("timer");
const durationInput = document.getElementById("durationInput");
const intervalInput = document.getElementById("intervalInput");
const progressBar = document.getElementById("timeProgress");
const progressArc = document.getElementById("progressArc");
const CIRCUMFERENCE = 339;
const CIRCLE_LOOP_SECONDS = 5; // durée de boucle rapide pour un effet satisfaisant

let loadedEventScripts = [];
let recentEvents = [];

const eventScripts = [
  "events/event1.js",
  "events/event2.js",
  "events/event3.js",
  "events/event4.js",
  "events/event5.js",
  "events/event6.js",
  "events/event7.js",
  "events/event8.js",
  "events/event9.js",
  "events/event10.js",
  "events/event11.js",
  "events/event12.js",
  "events/event13.js",
  "events/event14.js",
  "events/event15.js",
  "events/event16.js",
  "events/event17.js",
  "events/event18.js",
  "events/event19.js",
  "events/event20.js",
  "events/event21.js",
  "events/bootstrapTheme.js",
  "events/duckhunt.js",
  "events/starRain.js",
  "events/matrixMode.js",
  "events/bubblePop.js",
  "events/pixelScreen.js",
  "events/puzzleGame.js",
  "events/flashEffect.js",
  "events/heartFountain.js"

];

let totalSeconds, intervalSeconds, numSquares;
let elapsedSeconds = 0;
let secondInterval;
let isPaused = false;
let darkMode = false;
function clearEventsState() {
  if (typeof window.closeCustomEventModal === 'function') {
    try { window.closeCustomEventModal(); } catch (e) { console.error(e); }
  }
  // Supprime modals éventuels
  const modals = document.querySelectorAll('.custom-event-modal');
  modals.forEach(modal => modal.remove());

  // Appelle le cleanup custom de l'event s'il existe
  if (typeof window.closeCustomEvent === "function") {
    window.closeCustomEvent();
    delete window.closeCustomEvent; // on nettoie la fonction après
  }

  // Supprime scripts ajoutés
  loadedEventScripts.forEach(scriptEl => {
    if(scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
  });
  loadedEventScripts = [];
}

function triggerRandomEvent() {
  clearEventsState();

  let available = eventScripts.filter(f => !recentEvents.includes(f));
  if (available.length === 0) {
    available = eventScripts;
    recentEvents = [];
  }
  const eventFile = available[Math.floor(Math.random() * available.length)];
  recentEvents.push(eventFile);
  if (recentEvents.length > 5) recentEvents.shift();
  // Affichage du nom de l'événement supprimé

  const script = document.createElement("script");
  // Ajoute un timestamp pour forcer le reload
  script.src = eventFile + '?_=' + new Date().getTime();
  script.async = true;

  document.body.appendChild(script);
  loadedEventScripts.push(script);
}



function updateTimerDisplay() {
  const remaining = totalSeconds - elapsedSeconds;
  const hours = Math.floor(remaining / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((remaining % 3600) / 60).toString().padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  if (progressBar && totalSeconds) {
    const ratio = elapsedSeconds / totalSeconds;
    progressBar.style.width = `${Math.min(ratio * 100, 100)}%`;
  }

}

function generateSquares() {
  grid.innerHTML = "";
  for (let i = 0; i < numSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
  }
  const sc = document.getElementById('squareCount');
  if (sc) sc.textContent = `Carrés générés : ${numSquares}`;
}

function tick() {
  if (elapsedSeconds % intervalSeconds === 0) {
    const index = Math.floor(elapsedSeconds / intervalSeconds);
    const squares = document.querySelectorAll(".square");
    if (index < squares.length) {
      squares[index].classList.add("filling");
      squares[index].scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        squares[index].classList.remove("filling");
        squares[index].classList.add("filled");

        if (typeof window.closeCustomEventModal === "function") {
          window.closeCustomEventModal();
        }

        triggerRandomEvent();
      }, intervalSeconds * 1000);
    }
  }

  updateTimerDisplay();
  elapsedSeconds++;

  if (elapsedSeconds >= totalSeconds) {
    clearInterval(secondInterval);
    pauseButton.style.display = 'none';
  }
}

function startTimer() {
  const durationMinutes = parseInt(durationInput.value);
  intervalSeconds = parseInt(intervalInput.value);
  totalSeconds = durationMinutes * 60;
  numSquares = Math.ceil(totalSeconds / intervalSeconds);

  startButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  durationInput.disabled = true;
  intervalInput.disabled = true;
  isPaused = false;

  generateSquares();
  if (progressBar) progressBar.style.width = '0%';
  if (progressArc) {
    progressArc.classList.add('looping');
    progressArc.style.animationDuration = `${CIRCLE_LOOP_SECONDS}s`;
    progressArc.style.animationPlayState = 'running';
    progressArc.style.strokeDashoffset = CIRCUMFERENCE;
  }

  // Met à jour dynamiquement la durée d'animation en CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .square.filling::before {
      animation: fillUp ${intervalSeconds}s linear forwards;
    }
  `;
  document.head.appendChild(style);

  updateTimerDisplay();

  secondInterval = setInterval(tick, 1000);
}

startButton.addEventListener("click", startTimer);

function pauseTimer() {
  clearInterval(secondInterval);
  document.querySelectorAll('.square.filling').forEach(sq => {
    sq.style.animationPlayState = 'paused';
  });
  if (progressArc) {
    progressArc.style.animationPlayState = 'paused';
  }
}

function resumeTimer() {
  document.querySelectorAll('.square.filling').forEach(sq => {
    sq.style.animationPlayState = 'running';
  });
  if (progressArc) {
    progressArc.style.animationPlayState = 'running';
  }
  secondInterval = setInterval(tick, 1000);
}

pauseButton.addEventListener('click', () => {
  if (!isPaused) {
    pauseTimer();
    pauseButton.textContent = 'Reprendre';
    isPaused = true;
  } else {
    resumeTimer();
    pauseButton.textContent = 'Pause';
    isPaused = false;
  }
});

function toggleDarkMode() {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add('dark-mode');
    darkModeButton.textContent = 'Mode Clair';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeButton.textContent = 'Mode Sombre';
  }
}

darkModeButton.addEventListener('click', toggleDarkMode);
