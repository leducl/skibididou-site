(() => {
  const veggies = ['🥕','🍅','🥦','🥒','🌽'];
  const container = document.createElement('div');
  container.classList.add('custom-event-modal');
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '10%',
    left: 0,
    width: '100%',
    textAlign: 'center',
    pointerEvents: 'none',
    zIndex: 1000
  });
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    .veg {
      display: inline-block;
      font-size: 32px;
      animation: dance 1s infinite alternate;
      margin: 0 5px;
    }
    @keyframes dance { from { transform: translateY(0);} to { transform: translateY(-20px);} }
  `;
  document.head.appendChild(style);

  veggies.forEach(v => {
    const span = document.createElement('span');
    span.textContent = v;
    span.classList.add('veg');
    container.appendChild(span);
  });

  function cleanup() {
    container.remove();
    style.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
