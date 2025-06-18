(() => {
  const overlay = document.createElement('div');
  overlay.classList.add('custom-event-modal');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1000
  });
  document.body.appendChild(overlay);

  const grid = document.createElement('div');
  Object.assign(grid.style, {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 60px)',
    gap: '5px'
  });
  overlay.appendChild(grid);

  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    Object.assign(cell.style, {
      width: '60px',
      height: '60px',
      background: '#ccc',
      cursor: 'pointer'
    });
    cell.addEventListener('click', () => {
      cell.style.background = cell.style.background === 'steelblue' ? '#ccc' : 'steelblue';
      checkWin();
    });
    grid.appendChild(cell);
    cells.push(cell);
  }

  function checkWin() {
    if (cells.every(c => c.style.background === 'steelblue')) {
      message.textContent = 'Gagn\xE9!';
      setTimeout(cleanup, 1000);
    }
  }

  const message = document.createElement('div');
  Object.assign(message.style, {color: 'white', marginTop: '10px', textAlign: 'center', fontSize: '20px'});
  overlay.appendChild(message);

  function cleanup() {
    overlay.remove();
    delete window.closeCustomEventModal;
  }

  window.closeCustomEventModal = cleanup;
})();
