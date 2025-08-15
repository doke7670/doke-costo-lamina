import { Validators } from '../utils/validators.js';

// Servicio para manejo del formulario
export class FormService {
  constructor(formId, materials) {
    this.form = document.getElementById(formId);
    this.materials = materials;
    this.currentMaterial = null;
    this.initializeForm();
  }

  initializeForm() {
    if (!this.materials || this.materials.length === 0) {
      console.error('FormService initialized without materials!');
      return;
    }
    
    this.populateMaterialSelect();
    this.setupEventListeners();
    this.selectFirstMaterial();
  }

  populateMaterialSelect() {
    const select = document.getElementById("opciones");
    
    if (!select) {
      console.error('Select element "opciones" not found');
      return false;
    }

    if (!this.materials || this.materials.length === 0) {
      console.error('No materials available');
      return false;
    }

    // Limpiar opciones existentes
    select.innerHTML = '';
    
    // Cargar materiales
    this.materials.forEach(material => {
      if (material && material.id && material.name) {
        const option = document.createElement("option");
        option.value = material.id;
        option.textContent = material.name;
        select.appendChild(option);
      }
    });

    console.log(`Loaded ${select.options.length} materials into select`);
    return select.options.length > 0;
  }

  setupEventListeners() {
    const select = document.getElementById("opciones");
    select.addEventListener('change', (e) => {
      this.onMaterialChange(e.target.value);
    });
  }

  onMaterialChange(materialId) {
    this.currentMaterial = this.materials.find(m => m.id === parseInt(materialId));
  }

  selectFirstMaterial() {
    const select = document.getElementById("opciones");
    if (select.options.length > 0) {
      this.onMaterialChange(select.options[0].value);
    }
  }

  getFormData() {
    const width = parseFloat(document.getElementById("ancho").value);
    const height = parseFloat(document.getElementById("alto").value);
    const quantity = parseInt(document.getElementById("cantidad").value) || 1;
    const discount = parseFloat(document.getElementById("descuento").value) || 0;
    const complexity = document.getElementById("complejidad").value || 'simple';
    
    return {
      width,
      height,
      quantity,
      discount,
      complexity,
      material: this.currentMaterial,
      isValid: !isNaN(width) && !isNaN(height) && width > 0 && height > 0 && quantity > 0
    };
  }

  getClientData() {
    return {
      name: document.getElementById("clientName").value.trim(),
      phone: document.getElementById("clientPhone").value.trim(),
      email: document.getElementById("clientEmail").value.trim(),
      ruc: document.getElementById("clientRuc").value.trim()
    };
  }

  validateClientData(clientData) {
    if (!clientData.name.trim()) {
      return {
        isValid: false,
        message: "El nombre del cliente es obligatorio"
      };
    }

    if (!clientData.phone.trim()) {
      return {
        isValid: false,
        message: "El teléfono del cliente es obligatorio"
      };
    }

    if (!Validators.validatePhone(clientData.phone)) {
      return {
        isValid: false,
        message: "El teléfono debe tener 9 dígitos y comenzar con 9"
      };
    }

    if (clientData.email && !Validators.validateEmail(clientData.email)) {
      return {
        isValid: false,
        message: "El formato del email no es válido"
      };
    }

    if (clientData.ruc && !Validators.validateRUC(clientData.ruc)) {
      return {
        isValid: false,
        message: "El RUC debe tener 11 dígitos"
      };
    }

    return { isValid: true };
  }

  validateFormData(formData) {
    if (!Validators.validateDimensions(formData.width, formData.height)) {
      return {
        isValid: false,
        message: "Las dimensiones deben ser números positivos menores a 1000 cm"
      };
    }

    if (!Validators.validateQuantity(formData.quantity)) {
      return {
        isValid: false,
        message: "La cantidad debe ser un número positivo menor a 1000"
      };
    }

    if (!Validators.validateDiscount(formData.discount)) {
      return {
        isValid: false,
        message: "El descuento debe estar entre 0% y 50%"
      };
    }

    return { isValid: true };
  }

  resetForm() {
    this.form.reset();
    this.selectFirstMaterial();
  }

  showValidationError(message) {
    alert(message); // Podrías mejorar esto con un toast o modal más elegante
  }
}