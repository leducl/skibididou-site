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
    .meteor {
      position: absolute;
      color: white;
      font-size: 18px;
      filter: drop-shadow(0 0 4px white);
      transition: transform 1.5s linear, opacity 1.5s linear;
    }
  `;
  document.head.appendChild(style);

  function createStar() {
    const star = document.createElement('div');
    star.classList.add('meteor');
    star.textContent = '✦';
    star.style.left = Math.random()*100+'%';
    star.style.top = '-20px';
    container.appendChild(star);
    requestAnimationFrame(() => {
      const dx = (Math.random()-0.5)*200;
      star.style.transform = `translate(${dx}px, ${window.innerHeight+40}px)`;
      star.style.opacity = '0';
    });
    setTimeout(() => star.remove(), 1500);
  }

  const interval = setInterval(createStar, 200);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
