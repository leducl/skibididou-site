(() => {
    const squares = document.querySelectorAll(".square");
    document.body.classList.add("bg-dark", "text-white");
  
    squares.forEach(sq => sq.style.backgroundColor = "orange");
  
    const modalHTML = `
<div class="modal fade custom-event-modal" id="customEventModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content bg-dark text-white">
      <div class="modal-header">
        <h5 class="modal-title">Pornhub coquinou</h5>
      </div>
      <div class="modal-body text-center">
        <img src="images\\pornhub.png" alt="PEGI 18" class="img-fluid mb-3">
        <p>Ce site est réservé aux personnes majeures (18 ans et plus).</p>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">J'ai 18 ans</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Retour</button>
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
  