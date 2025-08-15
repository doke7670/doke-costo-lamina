import { APP_CONFIG } from '../config/app.config.js';

// Servicio para manejo de la tabla
export class TableService {
  constructor(tableId, totalElementId) {
    this.table = document.getElementById(tableId);
    this.totalElement = document.getElementById(totalElementId);
    this.setupEventListeners();
  }

  addRow(data) {
    // Ocultar mensaje vacío si existe
    this.hideEmptyMessage();
    
    const tbody = this.table.getElementsByTagName("tbody")[0];
    const newRow = tbody.insertRow(tbody.rows.length);
    
    // Agregar clases para estilo y animación
    newRow.className = 'table-row table-row-new';
    
    const cells = [
      newRow.insertCell(0), // Item
      newRow.insertCell(1), // Material
      newRow.insertCell(2), // Medidas
      newRow.insertCell(3), // Cantidad
      newRow.insertCell(4), // Área
      newRow.insertCell(5), // Precio Unitario
      newRow.insertCell(6), // Descuento
      newRow.insertCell(7), // Subtotal
      newRow.insertCell(8)  // Acción
    ];

    const areaM2 = (data.area / 10000).toFixed(2);
    const itemNumber = tbody.rows.length;

    // Aplicar estilos específicos a cada celda
    cells[0].className = 'px-4 py-3';
    cells[0].innerHTML = `<span class="cell-item">${itemNumber}</span>`;
    
    cells[1].className = 'px-4 py-3';
    cells[1].innerHTML = `<span class="cell-material tooltip" data-tooltip="${data.materialName}">${this.truncateText(data.materialName, 25)}</span>`;
    
    cells[2].className = 'px-4 py-3';
    cells[2].innerHTML = `<span class="cell-dimensions tooltip" data-tooltip="Área total: ${areaM2} m²">${data.width} × ${data.height} cm</span>`;
    
    cells[3].className = 'px-4 py-3 text-center';
    cells[3].innerHTML = `<span class="cell-quantity number-animate">${data.quantity}</span>`;
    
    cells[4].className = 'px-4 py-3 text-center';
    cells[4].innerHTML = `<span class="cell-area area-indicator tooltip" data-tooltip="Área: ${areaM2} m² | Desperdicio: ${data.wastePercentage?.toFixed(1) || 0}%">${data.metersUsed?.toFixed(2) || areaM2} m</span>`;
    
    cells[5].className = 'px-4 py-3 text-right';
    cells[5].innerHTML = `<span class="cell-price number-animate">S/ ${data.unitCost.toFixed(2)}</span>`;
    
    cells[6].className = 'px-4 py-3 text-center';
    if (data.discount > 0) {
      cells[6].innerHTML = `<span class="discount-badge">-${data.discount}%</span>`;
    } else {
      cells[6].innerHTML = `<span class="cell-discount no-discount">—</span>`;
    }
    
    cells[7].className = 'px-4 py-3 text-right';
    cells[7].innerHTML = `<span class="cell-subtotal number-animate">S/ ${data.totalCost.toFixed(2)}</span>`;
    
    cells[8].className = 'px-4 py-3 text-center';
    cells[8].innerHTML = `
      <button class='btn-eliminar' type='button' title='Eliminar producto'>
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        Eliminar
      </button>
    `;

    // Guardar datos en el row para cálculos
    newRow.dataset.totalCost = data.totalCost;
    newRow.dataset.area = data.area;

    // Remover clase de animación después de la animación
    setTimeout(() => {
      newRow.classList.remove('table-row-new');
    }, 300);

    this.updateTotal();
  }

  hideEmptyMessage() {
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) {
      emptyMessage.style.display = 'none';
    }
  }

  showEmptyMessage() {
    const tbody = this.table.getElementsByTagName("tbody")[0];
    if (tbody.rows.length === 0) {
      const emptyMessage = document.getElementById('emptyMessage');
      if (emptyMessage) {
        emptyMessage.style.display = 'table-row';
      }
    }
  }

  removeRow(row) {
    // Animación de salida
    row.style.transition = 'all 0.3s ease';
    row.style.transform = 'translateX(100%)';
    row.style.opacity = '0';
    
    setTimeout(() => {
      row.remove();
      this.updateTotal();
      this.showEmptyMessage();
      this.renumberRows();
    }, 300);
  }

  renumberRows() {
    const tbody = this.table.getElementsByTagName("tbody")[0];
    const rows = tbody.getElementsByClassName('table-row');
    
    Array.from(rows).forEach((row, index) => {
      const itemCell = row.cells[0].querySelector('.cell-item');
      if (itemCell) {
        itemCell.textContent = index + 1;
      }
    });
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  updateTotal() {
    const rows = this.table.getElementsByTagName("tr");
    let subtotal = 0;
    let totalArea = 0;

    // Calcular subtotal y área total
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cost = parseFloat(row.dataset.totalCost || 0);
      const area = parseFloat(row.dataset.area || 0);
      
      if (!isNaN(cost)) subtotal += cost;
      if (!isNaN(area)) totalArea += area;
    }

    // Actualizar totales en la interfaz
    this.updateTotalDisplay(subtotal, totalArea);
  }

  updateTotalDisplay(subtotal, totalArea) {
    // Calcular mano de obra
    const laborType = document.getElementById('laborType')?.value || 'none';
    const laborCost = this.calculateLaborCost(totalArea, laborType);
    
    // Calcular descuento por volumen
    const bulkDiscount = this.calculateBulkDiscount(subtotal);
    const discountAmount = subtotal * (bulkDiscount / 100);
    
    // Subtotal después de descuento
    const subtotalAfterDiscount = subtotal - discountAmount + laborCost;
    
    // IGV
    const includeIGV = document.getElementById('includeIGV')?.checked || false;
    const igvAmount = includeIGV ? subtotalAfterDiscount * APP_CONFIG.TAXES.IGV_RATE : 0;
    
    // Total final
    const total = subtotalAfterDiscount + igvAmount;

    // Actualizar elementos en la interfaz
    this.updateUIElements({
      subtotal,
      laborCost,
      discountAmount,
      igvAmount,
      total
    });
  }

  calculateLaborCost(totalArea, laborType) {
    const areaM2 = totalArea / 10000; // convertir cm² a m²
    const rate = APP_CONFIG.LABOR.RATES[laborType] || 0;
    return areaM2 * rate;
  }

  calculateBulkDiscount(amount) {
    for (const tier of APP_CONFIG.BULK_DISCOUNTS) {
      if (amount >= tier.min) {
        return tier.discount;
      }
    }
    return 0;
  }

  updateUIElements(totals) {
    const elements = {
      subtotal: document.getElementById('subtotal'),
      laborCost: document.getElementById('laborCost'),
      totalDiscount: document.getElementById('totalDiscount'),
      igv: document.getElementById('igv'),
      total: document.getElementById('total')
    };

    if (elements.subtotal) elements.subtotal.textContent = `S/ ${totals.subtotal.toFixed(2)}`;
    if (elements.laborCost) elements.laborCost.textContent = `S/ ${totals.laborCost.toFixed(2)}`;
    if (elements.totalDiscount) elements.totalDiscount.textContent = `-S/ ${totals.discountAmount.toFixed(2)}`;
    if (elements.igv) elements.igv.textContent = `S/ ${totals.igvAmount.toFixed(2)}`;
    if (elements.total) elements.total.textContent = `S/ ${totals.total.toFixed(2)}`;
  }

  setupEventListeners() {
    this.table.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('btn-eliminar')) {
        const row = e.target.closest('tr');
        this.removeRow(row);
      }
    });
  }
}