(() => {
  const container = document.createElement('div');
  container.classList.add('custom-event-modal');
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: '1000'
  });
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    .firework {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      animation: explode 1s ease-out forwards;
    }
    @keyframes explode {
      from {transform: translate(0,0) scale(1);opacity:1;}
      to {transform: translate(var(--dx), var(--dy)) scale(0);opacity:0;}
    }
  `;
  document.head.appendChild(style);

  function launchFirework(x, y) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('firework');
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 40;
      p.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
      p.style.backgroundColor = `hsl(${Math.random() * 360},100%,50%)`;
      container.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

  const fwInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight / 2;
    launchFirework(x, y);
  }, 500);

  function cleanup() {
    clearInterval(fwInterval);
    style.remove();
    container.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
  setTimeout(cleanup, 5000);
})();
