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
    .shooting-star {
      position: absolute;
      color: white;
      font-size: 20px;
      filter: drop-shadow(0 0 6px white);
      opacity: 0.8;
      transition: transform 2s linear, opacity 2s linear;
    }
  `;
  document.head.appendChild(style);

  function createStar() {
    const star = document.createElement('div');
    star.textContent = '★';
    star.classList.add('shooting-star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = '-20px';
    container.appendChild(star);
    requestAnimationFrame(() => {
      const dx = (Math.random() * 200 - 100);
      star.style.transform = `translate(${dx}px, ${window.innerHeight + 50}px)`;
      star.style.opacity = '0';
    });
    setTimeout(() => star.remove(), 2000);
  }

  const interval = setInterval(createStar, 300);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
