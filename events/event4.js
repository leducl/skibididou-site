(() => {
  const jokes = [
    "Pourquoi les développeurs n'aiment-ils pas la nature ? Parce qu'il y a trop de bugs !",
    "Que dit un bit à un autre bit ? On se retrouve au prochain octet !",
    "Quels sont les développeurs préférés des végétariens ? Les code-bio !"
  ];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  const overlay = document.createElement('div');
  overlay.classList.add('custom-event-modal');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000'
  });
  const box = document.createElement('div');
  Object.assign(box.style, {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '300px',
    textAlign: 'center',
    fontWeight: 'bold'
  });
  box.textContent = joke;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  function cleanup() {
    overlay.remove();
    delete window.closeCustomEventModal;
  }

  overlay.addEventListener('click', cleanup);
  window.closeCustomEventModal = cleanup;
  setTimeout(cleanup, 5000);
})();
