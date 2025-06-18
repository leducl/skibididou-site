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
    .soap-bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      box-shadow: inset 0 0 10px rgba(255,255,255,0.8);
      transition: transform 6s linear;
    }
  `;
  document.head.appendChild(style);

  function spawn() {
    const b = document.createElement('div');
    b.classList.add('soap-bubble');
    const size = 20+Math.random()*40;
    Object.assign(b.style, {
      width: size+'px',
      height: size+'px',
      left: Math.random()*100+'%',
      bottom: '-50px',
      pointerEvents: 'auto'
    });
    b.addEventListener('click', () => b.remove());
    container.appendChild(b);
    requestAnimationFrame(() => {
      b.style.transform = `translateY(-${window.innerHeight+60}px)`;
    });
    setTimeout(() => b.remove(), 6000);
  }

  const interval = setInterval(spawn, 400);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
