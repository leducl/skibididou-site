(() => {
  const squares = document.querySelectorAll('.square');
  const overlay = document.createElement('div');
  overlay.textContent = 'Mode arc-en-ciel !';
  overlay.classList.add('custom-event-modal');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '8px',
    zIndex: '1000',
    fontWeight: 'bold'
  });
  document.body.appendChild(overlay);

  const colorInterval = setInterval(() => {
    squares.forEach(sq => {
      sq.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    });
  }, 200);

  function cleanup() {
    clearInterval(colorInterval);
    squares.forEach(sq => (sq.style.backgroundColor = ''));
    overlay.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
