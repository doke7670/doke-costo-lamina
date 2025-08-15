// Utilidades de validación
export class Validators {
  static validatePhone(phone) {
    // Validar teléfono peruano (9 dígitos)
    const phoneRegex = /^9\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  static validateEmail(email) {
    if (!email) return true; // Email es opcional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateRUC(ruc) {
    if (!ruc) return true; // RUC es opcional
    // RUC peruano: 11 dígitos
    const rucRegex = /^\d{11}$/;
    return rucRegex.test(ruc);
  }

  static validateDimensions(width, height) {
    return !isNaN(width) && !isNaN(height) && width > 0 && height > 0 && width <= 1000 && height <= 1000;
  }

  static validateQuantity(quantity) {
    return !isNaN(quantity) && quantity > 0 && quantity <= 1000;
  }

  static validateDiscount(discount) {
    return !isNaN(discount) && discount >= 0 && discount <= 50;
  }

  static sanitizeInput(input) {
    return input.toString().trim().replace(/[<>]/g, '');
  }
}