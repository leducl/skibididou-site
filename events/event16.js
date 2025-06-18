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
    .butterfly {
      position: absolute;
      font-size: 24px;
      transition: transform 4s linear;
    }
  `;
  document.head.appendChild(style);

  function spawn() {
    const b = document.createElement('div');
    b.textContent = '🦋';
    b.classList.add('butterfly');
    Object.assign(b.style, {
      left: Math.random()*100+'%',
      top: Math.random()*100+'%',
      pointerEvents: 'none'
    });
    container.appendChild(b);
    requestAnimationFrame(() => {
      b.style.transform = `translate(${(Math.random()-0.5)*200}px, ${(Math.random()-0.5)*200}px)`;
    });
    setTimeout(() => b.remove(), 4000);
  }

  const interval = setInterval(spawn, 500);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
