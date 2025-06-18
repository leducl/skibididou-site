(() => {
  const overlay = document.createElement('div');
  overlay.classList.add('custom-event-modal');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'white',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 1000
  });
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes flash {
      0%,100% { opacity: 0; }
      50% { opacity: 1; }
    }
    .flash-anim {
      animation: flash 0.5s linear 3;
    }
  `;
  document.head.appendChild(style);

  overlay.classList.add('flash-anim');
  overlay.addEventListener('animationend', cleanup);

  function cleanup() {
    overlay.removeEventListener('animationend', cleanup);
    overlay.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
