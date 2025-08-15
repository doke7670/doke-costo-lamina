// Aplicación principal
import { materials } from './data/materials.js';
import { CalculatorService } from './services/CalculatorService.js';
import { TableService } from './services/TableService.js';
import { FormService } from './services/FormService.js';
import { QuoteService } from './services/QuoteService.js';
import { ClientService } from './services/ClientService.js';
import { PDFService } from './services/PDFService.js';

// Función simple para cargar materiales directamente
function loadMaterials() {
  const select = document.getElementById("opciones");
  if (!select) return;
  
  select.innerHTML = '';
  materials.forEach(material => {
    if (material && material.id && material.name) {
      const option = document.createElement("option");
      option.value = material.id;
      option.textContent = material.name;
      select.appendChild(option);
    }
  });
}

class VinylCalculatorApp {
  constructor() {
    this.tableService = null;
    this.formService = null;
    this.quoteService = null;
    this.clientService = null;
    this.currentItems = [];
    this.currentMaterial = materials[0]; // Material por defecto
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener("DOMContentLoaded", () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    // Cargar materiales primero
    loadMaterials();
    
    // Inicializar servicios
    this.tableService = new TableService("miTabla", "total");
    this.quoteService = new QuoteService();
    this.clientService = new ClientService();
    
    // Setup manual de eventos
    this.setupMaterialChange();
    this.setupGlobalFunctions();
    this.setupEventListeners();
  }

  setupMaterialChange() {
    const select = document.getElementById("opciones");
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentMaterial = materials.find(m => m.id === parseInt(e.target.value));
      });
      // Seleccionar el primer material
      if (select.options.length > 0) {
        this.currentMaterial = materials.find(m => m.id === parseInt(select.options[0].value));
      }
    }
  }

  setupEventListeners() {
    // Event listeners para recalcular totales
    const laborType = document.getElementById('laborType');
    const includeIGV = document.getElementById('includeIGV');
    
    if (laborType) {
      laborType.addEventListener('change', () => this.tableService.updateTotal());
    }
    
    if (includeIGV) {
      includeIGV.addEventListener('change', () => this.tableService.updateTotal());
    }
  }

  setupGlobalFunctions() {
    // Función global para agregar fila
    window.agregarFila = () => {
      const width = parseFloat(document.getElementById("ancho").value);
      const height = parseFloat(document.getElementById("alto").value);
      const quantity = parseInt(document.getElementById("cantidad").value) || 1;
      const discount = parseFloat(document.getElementById("descuento").value) || 0;
      const complexity = document.getElementById("complejidad").value || 'simple';

      // Validaciones básicas
      if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert("Por favor, ingrese valores válidos para ancho y alto.");
        return;
      }

      if (!this.currentMaterial) {
        alert("Por favor, seleccione un material.");
        return;
      }

      const calculation = CalculatorService.calculateMaterialCost(
        width, 
        height, 
        this.currentMaterial,
        quantity,
        discount
      );

      // Calcular costo de desmalezado si es necesario
      const weedingCost = CalculatorService.calculateWeedingCost(
        calculation.area, 
        complexity
      );

      const itemData = {
        materialName: this.currentMaterial.name,
        width: width,
        height: height,
        quantity: quantity,
        discount: discount,
        complexity: complexity,
        unitCost: calculation.unitCost,
        totalCost: calculation.totalCost + weedingCost.total,
        realCost: calculation.realCost,
        area: calculation.area,
        metersUsed: calculation.metersUsed,
        wastePercentage: calculation.wastePercentage,
        weedingCost: weedingCost.total
      };

      this.tableService.addRow(itemData);
      this.currentItems.push(itemData);
      
      // Limpiar formulario
      document.getElementById("ancho").value = '';
      document.getElementById("alto").value = '';
      document.getElementById("cantidad").value = '1';
      document.getElementById("descuento").value = '';
    };

    // Función para limpiar todo
    window.clearAll = () => {
      if (confirm('¿Está seguro de que desea limpiar todos los datos?')) {
        const tbody = document.querySelector('#miTabla tbody');
        
        // Animar la limpieza de filas
        const rows = tbody.querySelectorAll('.table-row');
        rows.forEach((row, index) => {
          setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.transform = 'translateX(-100%)';
            row.style.opacity = '0';
          }, index * 50);
        });
        
        setTimeout(() => {
          tbody.innerHTML = `
            <tr id="emptyMessage" class="table-empty-row">
              <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center">
                  <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  <p class="text-lg font-medium">No hay productos agregados</p>
                  <p class="text-sm">Agregue productos usando el formulario de arriba</p>
                </div>
              </td>
            </tr>
          `;
          this.currentItems = [];
          this.tableService.updateTotal();
          
          // Limpiar datos del cliente
          document.getElementById('clientName').value = '';
          document.getElementById('clientPhone').value = '';
          document.getElementById('clientEmail').value = '';
          document.getElementById('clientRuc').value = '';
        }, rows.length * 50 + 200);
      }
    };

    // Función para generar cotización
    window.generateQuote = () => {
      const clientData = {
        name: document.getElementById("clientName").value.trim(),
        phone: document.getElementById("clientPhone").value.trim(),
        email: document.getElementById("clientEmail").value.trim(),
        ruc: document.getElementById("clientRuc").value.trim()
      };
      
      // Si no hay datos del cliente, usar datos referenciales
      if (!clientData.name && !clientData.phone) {
        const fechaHoy = new Date().toLocaleDateString();
        clientData.name = `Cliente Referencial`;
        clientData.phone = `Cotización del ${fechaHoy}`;
        clientData.email = '';
        clientData.ruc = '';
      }

      if (this.currentItems.length === 0) {
        alert('Debe agregar al menos un producto para generar la cotización.');
        return;
      }

      const quote = this.quoteService.createQuote(clientData, this.currentItems);
      alert(`Cotización ${quote.number} generada exitosamente!`);
      
      // Opcional: limpiar después de generar
      if (confirm('¿Desea limpiar los datos para una nueva cotización?')) {
        window.clearAll();
      }
    };

    // Función para guardar cotización
    window.saveQuote = () => {
      const clientData = {
        name: document.getElementById("clientName").value.trim(),
        phone: document.getElementById("clientPhone").value.trim(),
        email: document.getElementById("clientEmail").value.trim(),
        ruc: document.getElementById("clientRuc").value.trim()
      };
      
      if (!clientData.name || !clientData.phone) {
        alert("Nombre y teléfono del cliente son obligatorios");
        return;
      }

      if (this.currentItems.length === 0) {
        alert('No hay productos para guardar.');
        return;
      }

      const quote = this.quoteService.createQuote(clientData, this.currentItems);
      alert(`Cotización guardada como ${quote.number}`);
    };

    // Función para ver cotizaciones
    window.loadQuotes = () => {
      const quotes = this.quoteService.getQuotes();
      if (quotes.length === 0) {
        alert('No hay cotizaciones guardadas.');
        return;
      }

      this.displayQuotesModal(quotes);
    };

    // Función para exportar PDF
    window.exportToPDF = () => {
      const clientData = {
        name: document.getElementById("clientName").value.trim(),
        phone: document.getElementById("clientPhone").value.trim(),
        email: document.getElementById("clientEmail").value.trim(),
        ruc: document.getElementById("clientRuc").value.trim()
      };
      
      if (!clientData.name || !clientData.phone) {
        alert("Nombre y teléfono del cliente son obligatorios");
        return;
      }

      if (this.currentItems.length === 0) {
        alert('No hay datos para exportar.');
        return;
      }

      // Crear cotización temporal para PDF
      const tempQuote = this.quoteService.createQuote(clientData, this.currentItems);
      PDFService.generateQuotePDF(tempQuote);
    };

    // Función para calcular cinta reflectiva
    window.calcular = () => {
      const rectangles = parseInt(document.getElementById("rectangulos").value);
      
      if (isNaN(rectangles) || rectangles <= 0) {
        alert("Por favor ingresa una cantidad válida de rectángulos.");
        return;
      }

      const result = CalculatorService.calculateReflectiveTape(rectangles);
      
      document.getElementById("precio").textContent = result.totalPrice.toFixed(2);
      document.getElementById("metros").textContent = result.totalMeters.toFixed(2);
      document.getElementById("resultado").classList.remove("hidden");
    };

    // Función global para exportar PDF de cotización específica
    window.exportQuotePDF = (quoteId) => {
      const quote = this.quoteService.quotes.find(q => q.id == quoteId);
      if (quote) {
        PDFService.generateQuotePDF(quote);
      }
    };
  }

  displayQuotesModal(quotes) {
    const modal = document.getElementById('modalCotizaciones');
    const listContainer = document.getElementById('cotizacionesList');
    
    listContainer.innerHTML = '';
    
    quotes.slice(0, 20).forEach(quote => {
      const quoteElement = document.createElement('div');
      quoteElement.className = 'bg-gray-100 p-4 rounded-lg flex justify-between items-center';
      
      quoteElement.innerHTML = `
        <div>
          <h4 class="font-semibold text-naranja">${quote.number}</h4>
          <p class="text-sm text-gray-600">${quote.client.name} - ${quote.client.phone}</p>
          <p class="text-xs text-gray-500">${new Date(quote.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-lg">S/ ${quote.total.toFixed(2)}</p>
          <p class="text-xs text-gray-500">${quote.items.length} productos</p>
          <button onclick="this.exportQuotePDF('${quote.id}')" 
                  class="mt-1 bg-naranja text-white px-2 py-1 rounded text-xs hover:bg-naranja-hover">
            PDF
          </button>
        </div>
      `;
      
      listContainer.appendChild(quoteElement);
    });
    
    modal.classList.remove('hidden');
  }

  exportQuotePDF(quoteId) {
    const quote = this.quoteService.quotes.find(q => q.id == quoteId);
    if (quote) {
      PDFService.generateQuotePDF(quote);
    }
  }
}

// Inicializar la aplicación
new VinylCalculatorApp();