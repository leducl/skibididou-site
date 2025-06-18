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
    .bee {
      position: absolute;
      font-size: 24px;
      cursor: pointer;
      transition: transform 5s linear;
    }
  `;
  document.head.appendChild(style);

  function spawnBee() {
    const bee = document.createElement('div');
    bee.textContent = '🐝';
    bee.classList.add('bee');
    Object.assign(bee.style, {
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      pointerEvents: 'auto'
    });
    container.appendChild(bee);
    requestAnimationFrame(() => {
      bee.style.transform = `translate(${(Math.random()-0.5)*200}px, ${(Math.random()-0.5)*200}px)`;
    });
    bee.addEventListener('click', () => bee.remove());
    setTimeout(() => bee.remove(), 5000);
  }

  const interval = setInterval(spawnBee, 500);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
