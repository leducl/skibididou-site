(() => {
  const mustache = document.createElement('div');
  mustache.textContent = '︵‿︵ʘʘ︵‿︵';
  mustache.classList.add('custom-event-modal');
  Object.assign(mustache.style, {
    position: 'fixed',
    fontSize: '2rem',
    pointerEvents: 'none',
    zIndex: '1000'
  });
  document.body.appendChild(mustache);

  function follow(e) {
    mustache.style.left = e.clientX - mustache.offsetWidth / 2 + 'px';
    mustache.style.top = e.clientY - mustache.offsetHeight / 2 + 'px';
  }
  document.addEventListener('mousemove', follow);

  function cleanup() {
    document.removeEventListener('mousemove', follow);
    mustache.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
