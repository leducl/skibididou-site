(() => {
  const ghost = document.createElement('div');
  ghost.textContent = '👻';
  ghost.classList.add('custom-event-modal');
  Object.assign(ghost.style, {
    position: 'fixed',
    fontSize: '40px',
    opacity: 0,
    transition: opacity 0.5s ease,
    zIndex: 1000,
    pointerEvents: 'none'
  });
  document.body.appendChild(ghost);

  function appear() {
    ghost.style.left = Math.random()*100+'%';
    ghost.style.top = Math.random()*100+'%';
    ghost.style.opacity = '1';
    setTimeout(() => ghost.style.opacity = '0', 800);
  }

  const interval = setInterval(appear, 1500);
  appear();

  function cleanup() {
    clearInterval(interval);
    ghost.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
