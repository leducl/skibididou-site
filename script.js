const grid = document.getElementById("grid");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timer");
const totalSeconds = 210 * 60; // 3h30 = 210 minutes
let elapsedSeconds = 0;
let secondInterval;
let minuteTrigger = 0;

const eventScripts = ["events/event1.js", "events/event2.js", "events/event3.js"];

// Générer les cases
for (let i = 0; i < 210; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  grid.appendChild(square);
}

function triggerRandomEvent() {
  const script = document.createElement("script");
  script.src = eventScripts[Math.floor(Math.random() * eventScripts.length)];
  document.body.appendChild(script);
}

function updateTimerDisplay() {
  const remaining = totalSeconds - elapsedSeconds;
  const hours = Math.floor(remaining / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((remaining % 3600) / 60).toString().padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function fillNextSquareAndTriggerEvent() {
  const minuteIndex = Math.floor(elapsedSeconds / 60);
  if (minuteIndex < 210) {
    const squares = document.querySelectorAll(".square");
    squares[minuteIndex].classList.add("filled");
    triggerRandomEvent();
  }
}

function startTimer() {
  startButton.style.display = "none";
  updateTimerDisplay();

  secondInterval = setInterval(() => {
    const minuteIndex = Math.floor(elapsedSeconds / 60);

    if (elapsedSeconds % 60 === 0 && minuteIndex < 210) {
      const squares = document.querySelectorAll(".square");

      // Début du remplissage progressif
      squares[minuteIndex].classList.add("filling");

      // Fin de la minute : activer l'effet de fin et l'événement
      setTimeout(() => {
        squares[minuteIndex].classList.remove("filling");
        squares[minuteIndex].classList.add("filled");
        triggerRandomEvent();
      }, 60 * 1000); // À la fin de la minute
    }

    updateTimerDisplay();
    elapsedSeconds++;

    if (elapsedSeconds >= totalSeconds) {
      clearInterval(secondInterval);
    }
  }, 1000);
}


startButton.addEventListener("click", startTimer);
