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
    .confetti {
      position: absolute;
      width: 8px;
      height: 12px;
      opacity: 0.9;
      pointer-events: none;
      animation: confetti-fall 3s linear forwards;
    }
    @keyframes confetti-fall {
      to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function spawn() {
    const el = document.createElement('div');
    el.classList.add('confetti');
    el.style.left = Math.random() * 100 + '%';
    el.style.top = '-20px';
    el.style.background = `hsl(${Math.random() * 360},70%,60%)`;
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  const interval = setInterval(spawn, 100);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
