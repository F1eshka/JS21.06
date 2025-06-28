document.addEventListener('DOMContentLoaded', () => {
    const currencies = [
      { name: "Долар", symbol: "$" },
      { name: "Євро", symbol: "€" },
      { name: "Фунт", symbol: "£" },
      { name: "Єна", symbol: "¥" },
      { name: "Гривня", symbol: "₴" },
      { name: "Рупія", symbol: "₹" },
      { name: "Біткоїн", symbol: "₿" }
    ];
  
    const startPanel = document.getElementById('start-panel');
    const zoneLeft = document.getElementById('zone-left');
    const zoneRight = document.getElementById('zone-right');
    const output = document.getElementById('output');
  
    currencies.forEach(currency => {
      const item = document.createElement('div');
      item.className = 'currency';
      item.textContent = `${currency.name} (${currency.symbol})`;
      item.draggable = true;
  
      item.addEventListener('dragstart', dragStart);
      startPanel.appendChild(item);
    });
  
    [zoneLeft, zoneRight].forEach(zone => {
      zone.addEventListener('dragover', dragOver);
      zone.addEventListener('dragleave', dragLeave);
      zone.addEventListener('drop', drop);
    });
  
    let draggedItem = null;
  
    function dragStart(e) {
      draggedItem = e.target;
      setTimeout(() => e.target.style.display = 'none', 0);
    }
  
    function dragOver(e) {
      e.preventDefault();
      e.currentTarget.classList.add('active');
    }
  
    function dragLeave(e) {
      e.currentTarget.classList.remove('active');
    }
  
    function drop(e) {
      e.preventDefault();
      e.currentTarget.classList.remove('active');
  
      if (draggedItem) {
        e.currentTarget.appendChild(draggedItem);
        draggedItem.style.display = 'block';
        draggedItem = null;
        updateOutput();
      }
    }
  
    function updateOutput() {
      const listLeft = Array.from(zoneLeft.querySelectorAll('.currency')).map(el => el.textContent);
      const listRight = Array.from(zoneRight.querySelectorAll('.currency')).map(el => el.textContent);
  
      output.innerHTML = `
        <div><strong>Кишеня:</strong> ${listLeft.join(', ') || 'порожньо'}</div>
        <div><strong>Гаманець:</strong> ${listRight.join(', ') || 'порожньо'}</div>
      `;
    }
  });
  