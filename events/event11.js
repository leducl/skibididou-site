(() => {
  const cat = document.createElement('div');
  cat.textContent = '🐱';
  cat.classList.add('custom-event-modal');
  Object.assign(cat.style, {
    position: 'fixed',
    fontSize: '40px',
    pointerEvents: 'auto',
    zIndex: 1000
  });
  document.body.appendChild(cat);

  function moveCat() {
    const edge = Math.floor(Math.random()*4);
    const positions = [
      {top: '0', left: Math.random()*100+'%'},
      {bottom: '0', left: Math.random()*100+'%'},
      {left: '0', top: Math.random()*100+'%'},
      {right: '0', top: Math.random()*100+'%'}
    ];
    cat.style.top = '';
    cat.style.bottom = '';
    cat.style.left = '';
    cat.style.right = '';
    Object.assign(cat.style, positions[edge]);
  }

  const interval = setInterval(moveCat, 1000);
  moveCat();

  cat.addEventListener('click', () => moveCat());

  function cleanup() {
    clearInterval(interval);
    cat.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
