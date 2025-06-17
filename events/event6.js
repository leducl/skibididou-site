(() => {
  const emojis = ['😂','🤣','🤪','😜','🎉','✨','🐶','😺','🍕','🌮','🎈','💥'];
  const container = document.createElement('div');
  container.classList.add('custom-event-modal');
  Object.assign(container.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: '1000'
  });
  document.body.appendChild(container);

  function dropEmoji() {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    Object.assign(span.style, {
      position: 'absolute',
      left: Math.random() * 100 + '%',
      top: '-2em',
      fontSize: '24px',
      transition: 'transform 3s linear'
    });
    container.appendChild(span);
    requestAnimationFrame(() => {
      span.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`;
    });
    setTimeout(() => span.remove(), 3000);
  }

  const dropInterval = setInterval(dropEmoji, 300);

  function cleanup() {
    clearInterval(dropInterval);
    container.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
