(() => {
  const container = document.createElement('div');
  container.classList.add('custom-event-modal');
  Object.assign(container.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 20px)',
    gridAutoRows: '20px',
    pointerEvents: 'none',
    zIndex: 1000
  });
  document.body.appendChild(container);

  for (let i = 0; i < Math.ceil(window.innerWidth / 20) * Math.ceil(window.innerHeight / 20); i++) {
    const cell = document.createElement('div');
    container.appendChild(cell);
  }

  const cells = Array.from(container.children);
  let flashes = 0;
  const interval = setInterval(() => {
    cells.forEach(c => {
      c.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    });
    flashes++;
    if (flashes > 10) cleanup();
  }, 200);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
