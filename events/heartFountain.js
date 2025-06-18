(() => {
  const container = document.createElement('div');
  container.classList.add('custom-event-modal');
  Object.assign(container.style, {
    position: 'fixed',
    bottom: 0,
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
    .heart {
      position: absolute;
      color: pink;
      font-size: 24px;
      opacity: 0.9;
      transition: transform 3s linear, opacity 3s linear;
    }
  `;
  document.head.appendChild(style);

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤';
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-20px';
    container.appendChild(heart);
    requestAnimationFrame(() => {
      const dx = (Math.random() * 40 - 20);
      heart.style.transform = `translate(${dx}px, -${window.innerHeight + 50}px)`;
      heart.style.opacity = '0';
    });
    setTimeout(() => heart.remove(), 3000);
  }

  const interval = setInterval(spawnHeart, 200);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
