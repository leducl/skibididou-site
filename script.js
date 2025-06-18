const grid = document.getElementById("grid");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timer");
const durationInput = document.getElementById("durationInput");
const intervalInput = document.getElementById("intervalInput");
let loadedEventScripts = [];

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

  const eventFile = eventScripts[Math.floor(Math.random() * eventScripts.length)];
  const eventInfo = document.getElementById("eventInfo");
  if(eventInfo) {
    const eventName = eventFile.split("/").pop().replace(/\.js$/, "");
    eventInfo.textContent = `Événement : ${eventName}`;
    eventInfo.classList.add("show");
    setTimeout(() => eventInfo.classList.remove("show"), 4000);
  }

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
        // Scroll vers le carré en cours
        squares[index].scrollIntoView({ behavior: "smooth", block: "center" });


        setTimeout(() => {
          squares[index].classList.remove("filling");
          squares[index].classList.add("filled");
        
          if (typeof window.closeCustomEventModal === "function") {
            window.closeCustomEventModal(); // Ferme le modal si un event l’a créé
          }
        
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
