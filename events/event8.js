(() => {
  const container = document.createElement('div');
  container.classList.add('custom-event-modal');
  Object.assign(container.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: '1000'
  });
  document.body.appendChild(container);

  function spawnConfetti() {
    const div = document.createElement('div');
    Object.assign(div.style, {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: `hsl(${Math.random() * 360},80%,50%)`,
      left: Math.random() * 100 + '%',
      top: '-10px',
      opacity: 0.9,
      transform: `rotate(${Math.random() * 360}deg)`,
      transition: 'transform 3s linear, top 3s linear, opacity 3s linear'
    });
    container.appendChild(div);
    requestAnimationFrame(() => {
      div.style.top = window.innerHeight + 'px';
      div.style.transform += ' scale(0.5)';
      div.style.opacity = 0;
    });
    setTimeout(() => div.remove(), 3000);
  }

  const interval = setInterval(spawnConfetti, 150);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
