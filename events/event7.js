(() => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes screen-shake {
      0% { transform: translate(0,0); }
      25% { transform: translate(-5px,5px); }
      50% { transform: translate(5px,-5px); }
      75% { transform: translate(-5px,5px); }
      100% { transform: translate(0,0); }
    }
    .screen-shake {
      animation: screen-shake 0.5s infinite;
    }
  `;
  document.head.appendChild(style);
  document.body.classList.add('screen-shake');

  function cleanup() {
    document.body.classList.remove('screen-shake');
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
