(() => {
  // tout ton code dans cette fonction auto-exécutée

  // exemple :
  const p = document.createElement('p');
  p.textContent = "Event 1 activé !";
  p.classList.add('custom-event-modal');
  document.body.appendChild(p);

  window.closeCustomEventModal = () => {
    p.remove();
    delete window.closeCustomEventModal;
  };
})();
