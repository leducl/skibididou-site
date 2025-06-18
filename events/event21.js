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
    zIndex: 1000
  });
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border: 2px solid rgba(255,255,255,0.7);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.7;
      animation: ripple-grow 1.5s linear forwards;
    }
    @keyframes ripple-grow {
      to { transform: translate(-50%, -50%) scale(20); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function spawn() {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = Math.random() * 100 + '%';
    ripple.style.top = Math.random() * 100 + '%';
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1500);
  }

  const interval = setInterval(spawn, 300);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
