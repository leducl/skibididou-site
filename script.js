const grid = document.getElementById("grid");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timer");
const durationInput = document.getElementById("durationInput");
const intervalInput = document.getElementById("intervalInput");

const eventScripts = ["events/event1.js", "events/event2.js", "events/event3.js"];

let totalSeconds, intervalSeconds, numSquares;
let elapsedSeconds = 0;
let secondInterval;

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

function generateSquares() {
  grid.innerHTML = "";
  for (let i = 0; i < numSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
  }
}

function startTimer() {
  const durationMinutes = parseInt(durationInput.value);
  intervalSeconds = parseInt(intervalInput.value);
  totalSeconds = durationMinutes * 60;
  numSquares = Math.ceil(totalSeconds / intervalSeconds);

  startButton.style.display = "none";
  durationInput.disabled = true;
  intervalInput.disabled = true;

  generateSquares();
  // Met à jour dynamiquement la durée d'animation en CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .square.filling::before {
      animation: fillUp ${intervalSeconds}s linear forwards;
    }
  `;
  document.head.appendChild(style);

  updateTimerDisplay();

  secondInterval = setInterval(() => {
    if (elapsedSeconds % intervalSeconds === 0) {
      const index = Math.floor(elapsedSeconds / intervalSeconds);
      const squares = document.querySelectorAll(".square");
      if (index < squares.length) {
        squares[index].classList.add("filling");

        setTimeout(() => {
          squares[index].classList.remove("filling");
          squares[index].classList.add("filled");
          triggerRandomEvent();
        }, intervalSeconds * 1000);
      }
    }

    updateTimerDisplay();
    elapsedSeconds++;

    if (elapsedSeconds >= totalSeconds) {
      clearInterval(secondInterval);
    }
  }, 1000);
}

startButton.addEventListener("click", startTimer);
