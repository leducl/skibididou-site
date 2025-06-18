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
    zIndex: 1000,
    pointerEvents: 'none'
  });
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    .bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(173, 216, 230, 0.7);
      box-shadow: inset 0 0 10px rgba(255,255,255,0.9);
      pointer-events: auto;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .bubble.pop {
      transform: scale(1.5);
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  function spawnBubble() {
    const size = 20 + Math.random() * 40;
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    Object.assign(bubble.style, {
      width: size + 'px',
      height: size + 'px',
      left: Math.random() * 100 + '%',
      bottom: '-50px',
      pointerEvents: 'auto',
      transition: 'transform 5s linear, bottom 5s linear, opacity 0.3s ease'
    });
    bubble.addEventListener('click', () => {
      bubble.classList.add('pop');
      setTimeout(() => bubble.remove(), 300);
    });
    container.appendChild(bubble);
    requestAnimationFrame(() => {
      bubble.style.bottom = '110%';
    });
    setTimeout(() => bubble.remove(), 5200);
  }

  const interval = setInterval(spawnBubble, 400);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
