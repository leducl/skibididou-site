(() => {
  const body = document.body;
  const originalBg = body.style.backgroundColor;
  const overlay = document.createElement('div');
  overlay.classList.add('custom-event-modal');
  overlay.textContent = 'Disco time!';
  Object.assign(overlay.style, {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '6px',
    zIndex: '1000',
    fontWeight: 'bold'
  });
  document.body.appendChild(overlay);

  const colorInterval = setInterval(() => {
    body.style.backgroundColor = `hsl(${Math.random() * 360},70%,60%)`;
  }, 150);

  function cleanup() {
    clearInterval(colorInterval);
    body.style.backgroundColor = originalBg;
    overlay.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
