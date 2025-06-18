(() => {
  const emojis = ['😂','🤣','😍','🥳','🤩','😎','😜','😁','😇','😊'];
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

  function dropEmoji() {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    Object.assign(span.style, {
      position: 'absolute',
      left: Math.random()*100 + '%',
      top: '-30px',
      fontSize: '24px',
      transition: 'transform 4s linear, opacity 4s linear'
    });
    container.appendChild(span);
    requestAnimationFrame(() => {
      const dx = (Math.random()-0.5)*100;
      span.style.transform = `translate(${dx}px, ${window.innerHeight+50}px)`;
      span.style.opacity = '0';
    });
    setTimeout(() => span.remove(), 4000);
  }

  const interval = setInterval(dropEmoji, 200);

  function cleanup() {
    clearInterval(interval);
    container.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
