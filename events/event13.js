(() => {
  const spider = document.createElement('div');
  spider.textContent = '🕷';
  spider.classList.add('custom-event-modal');
  Object.assign(spider.style, {
    position: 'fixed',
    left: '50%',
    top: '-40px',
    fontSize: '30px',
    zIndex: 1000,
    pointerEvents: 'none',
    transition: 'top 5s linear'
  });
  document.body.appendChild(spider);

  function move() {
    spider.style.left = Math.random()*100 + '%';
    spider.style.top = Math.random()*100 + '%';
  }

  const interval = setInterval(move, 5000);
  move();

  function cleanup() {
    clearInterval(interval);
    spider.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
