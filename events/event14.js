(() => {
  const fly = document.createElement('div');
  fly.textContent = '🪰';
  fly.classList.add('custom-event-modal');
  Object.assign(fly.style, {
    position: 'fixed',
    fontSize: '24px',
    zIndex: 1000,
    pointerEvents: 'auto'
  });
  document.body.appendChild(fly);

  function move() {
    fly.style.left = Math.random()*100 + '%';
    fly.style.top = Math.random()*100 + '%';
  }
  const interval = setInterval(move, 500);
  move();

  fly.addEventListener('click', () => fly.remove());

  function cleanup() {
    clearInterval(interval);
    fly.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
