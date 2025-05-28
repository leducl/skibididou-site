(() => {
    // tout ton code dans cette fonction auto-exécutée
  
    // exemple :
    let p = document.createElement('p');
    p.textContent = "Event 1 activé !";
    p.classList.add("custom-event-modal");
    document.body.appendChild(p);
  
    // si modal, tu peux aussi définir window.closeCustomEventModal ici
    window.closeCustomEventModal = () => {
      p.remove();
      delete window.closeCustomEventModal;
    };
  })();
  