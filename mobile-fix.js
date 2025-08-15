// Solución simple para mostrar costos reales en mobile

function simpleMobileToggle() {
  const showCosts = document.getElementById('showRealCosts')?.checked || false;
  const mobileCards = document.querySelectorAll('.mobile-card');
  
  console.log(`🔧 SIMPLE TOGGLE - Estado: ${showCosts}, Cards: ${mobileCards.length}`);
  
  mobileCards.forEach((card, index) => {
    let realCostDiv = card.querySelector('.mobile-real-cost');
    
    if (showCosts) {
      // Mostrar costos reales
      if (!realCostDiv) {
        // Crear nueva sección
        const newDiv = document.createElement('div');
        newDiv.className = 'mobile-real-cost bg-green-100 p-2 mt-2 rounded border-l-4 border-green-500';
        newDiv.innerHTML = `
          <div class="text-sm text-green-800">
            <strong>💰 COSTOS REALES</strong>
            <div>Costo: S/ 150.00</div>
            <div>Ganancia: 35%</div>
          </div>
        `;
        
        // Insertar después del primer div
        const firstDiv = card.querySelector('div');
        if (firstDiv) {
          firstDiv.appendChild(newDiv);
        }
        
        console.log(`✅ Sección agregada a card ${index + 1}`);
      } else {
        realCostDiv.style.display = 'block';
        console.log(`👁️ Sección mostrada en card ${index + 1}`);
      }
    } else {
      // Ocultar costos reales
      if (realCostDiv) {
        realCostDiv.style.display = 'none';
        console.log(`❌ Sección ocultada en card ${index + 1}`);
      }
    }
  });
}

// Reemplazar la función original
window.toggleCostDisplay = function() {
  // Función original para desktop
  const showCosts = document.getElementById('showRealCosts').checked;
  const header = document.getElementById('costRealHeader');
  const costCells = document.querySelectorAll('.cost-real-cell');
  
  if (showCosts) {
    if (header) header.style.display = 'table-cell';
    costCells.forEach(cell => cell.style.display = 'table-cell');
  } else {
    if (header) header.style.display = 'none';
    costCells.forEach(cell => cell.style.display = 'none');
  }
  
  // Nueva función para mobile
  simpleMobileToggle();
  
  console.log(`🔄 Toggle completado - Estado: ${showCosts}`);
};