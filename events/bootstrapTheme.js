(() => {
    const squares = document.querySelectorAll(".square");
    document.body.classList.add("bg-dark", "text-white");
  
    squares.forEach(sq => sq.style.backgroundColor = "orange");
  
    const modalHTML = `
    <div class="modal fade custom-event-modal" id="customEventModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title">Événement spécial</h5>
          </div>
          <div class="modal-body">
            Thème sombre activé, carrés orange ! 🔥
          </div>
        </div>
      </div>
    </div>
    `;
    const modalWrapper = document.createElement("div");
    modalWrapper.innerHTML = modalHTML;
    document.body.appendChild(modalWrapper);
  
    const modal = new bootstrap.Modal(document.getElementById("customEventModal"));
    modal.show();
  
    window.closeCustomEventModal = () => {
      modal.hide();
      document.body.classList.remove("bg-dark", "text-white");
      squares.forEach(sq => sq.style.backgroundColor = "");
      document.getElementById("customEventModal")?.remove();
      delete window.closeCustomEventModal;
    };
  })();
  