(() => {
  const body = document.body;
  const originalBg = body.style.backgroundColor;
  body.style.backgroundColor = '#001';

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
    .snowflake {
      position: absolute;
      color: white;
      user-select: none;
      pointer-events: none;
      animation: fall linear forwards;
    }
    @keyframes fall {
      to { transform: translateY(100vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function spawnFlake() {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.textContent = '❄';
    flake.style.left = Math.random() * 100 + '%';
    flake.style.top = '-20px';
    flake.style.fontSize = 10 + Math.random() * 20 + 'px';
    flake.style.animationDuration = 5 + Math.random() * 5 + 's';
    container.appendChild(flake);
    setTimeout(() => flake.remove(), 10000);
  }

  const interval = setInterval(spawnFlake, 200);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    body.style.backgroundColor = originalBg;
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
