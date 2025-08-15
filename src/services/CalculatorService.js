import { APP_CONFIG } from '../config/app.config.js';

// Servicio para cálculos de materiales
export class CalculatorService {
  static calculateMaterialCost(width, height, material, quantity = 1, discount = 0) {
    // CÁLCULO PROFESIONAL DE VINILES - Sistema Peruano Real
    const materialWidthCm = material.width;
    
    // 1. CALCULAR METROS LINEALES NECESARIOS
    const metersNeeded = this.calculateLinearMeters(width, height, materialWidthCm, quantity);
    
    // 2. AGREGAR DESPERDICIO REAL DEL RUBRO
    const wastePercentage = this.getWastePercentage(material.type || 'standard');
    const totalMetersWithWaste = metersNeeded * (1 + wastePercentage);
    
    // 3. APLICAR PEDIDO MÍNIMO
    const minimumCharge = this.calculateMinimumCharge(totalMetersWithWaste, material);
    const chargedMeters = minimumCharge.chargedMeters;
    
    // 4. CÁLCULO DE COSTOS REALES
    const costPerMeter = material.cost / material.length;
    
    // 5. GANANCIA PORCENTUAL (NO FIJA)
    const marginPercentage = material.margenGanancia || this.calculateMarkupFromFixed(material);
    const pricePerMeter = costPerMeter * (1 + marginPercentage / 100);
    
    // 6. CÁLCULOS FINALES
    const materialCost = chargedMeters * costPerMeter;
    const totalCostPerUnit = chargedMeters * pricePerMeter;
    
    const subtotal = totalCostPerUnit * quantity;
    const discountAmount = subtotal * (discount / 100);
    const finalCost = subtotal - discountAmount;
    
    // 7. ÁREA EN M² (SOLO REFERENCIA)
    const areaM2 = (width * height * quantity) / 10000;
    
    return {
      // COSTOS
      unitCost: totalCostPerUnit,
      unitRealCost: materialCost,
      totalCost: finalCost,
      realCost: materialCost * quantity,
      
      // MEDIDAS
      metersLinear: chargedMeters,           // METROS LINEALES COBRADOS
      metersUsed: totalMetersWithWaste,      // METROS REALMENTE USADOS
      areaM2: areaM2,                        // ÁREA EN M² (REFERENCIA)
      
      // DETALLES
      quantity,
      wastePercentage: wastePercentage * 100,
      marginPercentage,
      minimumCharge: minimumCharge.hasMinimumCharge,
      
      // DESCUENTOS
      subtotal,
      discount,
      discountAmount,
      
      // PRECIOS UNITARIOS
      costPerMeter,
      pricePerMeter
    };
  }

  static calculateLinearMeters(width, height, materialWidth, quantity) {
    // Si el diseño cabe en el ancho del material
    if (width <= materialWidth) {
      return (height / 100) * quantity; // convertir cm a metros
    }
    
    // Si necesita rotar o usar más material
    if (height <= materialWidth) {
      return (width / 100) * quantity; // rotar el diseño
    }
    
    // Si no cabe de ninguna manera, calcular en secciones
    const sectionsNeeded = Math.ceil(width / materialWidth);
    return ((height / 100) * sectionsNeeded) * quantity;
  }

  static getWastePercentage(materialType) {
    const wasteRates = {
      'standard': 0.08,      // 8% viniles normales
      'premium': 0.12,       // 12% materiales premium (cromados, carbono)
      'reflective': 0.15,    // 15% reflectivos (más difíciles de manejar)
      'printed': 0.05,       // 5% impresos (ya cortados)
      'complex': 0.20        // 20% diseños complejos con muchos cortes
    };
    
    return wasteRates[materialType] || wasteRates.standard;
  }

  static calculateLaborCost(area, laborType = 'standard', designComplexity = 'simple') {
    // 🇵🇪 COSTOS REALES DE MANO DE OBRA EN PERÚ (2025)
    const laborRates = {
      none: 0,           // Sin instalación
      standard: 15,      // 15 soles/m² - Aplicación básica (letras, logos simples)
      complex: 25,       // 25 soles/m² - Diseños complejos, curvas, múltiples piezas
      premium: 40,       // 40 soles/m² - Vehículos completos, diseños intrincados
      vehicle_full: 60,  // 60 soles/m² - Forrado completo de vehículo
      architectural: 35, // 35 soles/m² - Aplicación en edificios, vidrieras grandes
      removal: 8,        // 8 soles/m² - Solo remoción de vinil anterior
      weeding: 12        // 12 soles/m² - Solo desmalezado (trabajo de mesa)
    };
    
    // Factores por complejidad de diseño (típicos en Perú)
    const complexityMultipliers = {
      simple: 1.0,       // Texto simple, formas básicas
      medium: 1.2,       // Logos con 2-3 colores
      complex: 1.5,      // Diseños detallados, muchos elementos pequeños
      intricate: 2.0,    // Calados muy finos, diseños de alta precisión
      vehicle: 1.3       // Factor especial para vehículos (curvas, manijas)
    };
    
    // Recargos por ubicación (Lima y provincias)
    const locationMultipliers = {
      lima_centro: 1.0,     // Precio base
      lima_norte: 0.9,      // 10% menos (Comas, SMP, Independencia)
      lima_sur: 0.95,       // 5% menos (Villa El Salvador, Chorrillos)
      lima_este: 0.85,      // 15% menos (Ate, Santa Anita, El Agustino)
      callao: 1.1,          // 10% más (distancia y tráfico)
      provincias: 1.2       // 20% más (viaje, hospedaje)
    };
    
    const baseRate = laborRates[laborType] || laborRates.standard;
    const complexityMultiplier = complexityMultipliers[designComplexity] || 1.0;
    const locationMultiplier = locationMultipliers['lima_centro']; // Por defecto Lima centro
    
    const finalRate = baseRate * complexityMultiplier * locationMultiplier;
    const areaInM2 = area / 10000;
    
    // Mínimo de cobranza (típico en Perú: S/ 30)
    const minimumCharge = 30;
    const calculatedTotal = areaInM2 * finalRate;
    const finalTotal = Math.max(calculatedTotal, minimumCharge);
    
    return {
      area: areaInM2,
      baseRate,
      complexityMultiplier,
      locationMultiplier,
      finalRate,
      calculatedTotal,
      minimumCharge,
      total: finalTotal,
      hasMinimumCharge: finalTotal > calculatedTotal,
      type: laborType,
      complexity: designComplexity,
      // Información adicional para el cliente
      description: this.getLaborDescription(laborType, designComplexity)
    };
  }

  static getLaborDescription(laborType, complexity) {
    const descriptions = {
      none: "Sin instalación incluida",
      standard: "Instalación básica - Aplicación en superficies planas",
      complex: "Instalación compleja - Diseños con curvas y detalles",
      premium: "Instalación premium - Trabajo especializado de alta calidad",
      vehicle_full: "Forrado completo de vehículo - Incluye desarmado parcial",
      architectural: "Instalación arquitectónica - Vidrieras y fachadas",
      removal: "Solo remoción de material anterior",
      weeding: "Solo trabajo de mesa - Desmalezado y preparación"
    };
    
    return descriptions[laborType] || descriptions.standard;
  }

  static getMaterialFormula(material) {
    const { width, length, discountCm } = material;
    return (width * (length * 100)) - (width * (discountCm * 100));
  }

  static calculateReflectiveTape(rectangles) {
    const { RECTANGLE_LENGTH, PRICE_PER_RECTANGLE } = APP_CONFIG.REFLECTIVE_TAPE;
    
    return {
      totalMeters: rectangles * RECTANGLE_LENGTH,
      totalPrice: rectangles * PRICE_PER_RECTANGLE
    };
  }

  static calculateBulkDiscount(totalAmount) {
    // Descuentos por volumen típicos en Perú
    if (totalAmount >= 1000) return 15; // 15% para pedidos > 1000 soles
    if (totalAmount >= 500) return 10;  // 10% para pedidos > 500 soles
    if (totalAmount >= 200) return 5;   // 5% para pedidos > 200 soles
    return 0;
  }
}

  static calculateMinimumCharge(metersUsed, material) {
    const minimumMeters = material.minOrder || 0.5; // Mínimo 0.5m
    const actualMeters = Math.max(metersUsed, minimumMeters);
    
    return {
      metersUsed,
      minimumMeters,
      chargedMeters: actualMeters,
      hasMinimumCharge: actualMeters > metersUsed
    };
  }

  static calculatePlotterTime(area, complexity = 'simple') {
    // Velocidad de corte aproximada por complejidad (m²/hora)
    const cuttingSpeeds = {
      simple: 15,    // 15 m²/hora para formas simples
      medium: 8,     // 8 m²/hora para diseños medios
      complex: 4,    // 4 m²/hora para diseños complejos
      intricate: 2   // 2 m²/hora para diseños muy detallados
    };
    
    const speed = cuttingSpeeds[complexity] || cuttingSpeeds.simple;
    const timeHours = area / speed;
    
    return {
      estimatedTime: timeHours,
      complexity,
      speed
    };
  }

  static calculateWeedingCost(area, complexity = 'simple') {
    // Costo de desmalezado según complejidad
    const weedingRates = {
      simple: 5,     // 5 soles/m² texto simple
      medium: 12,    // 12 soles/m² logos medianos
      complex: 25,   // 25 soles/m² diseños complejos
      intricate: 45  // 45 soles/m² calados muy finos
    };
    
    const rate = weedingRates[complexity] || weedingRates.simple;
    
    return {
      area,
      rate,
      total: area * rate,
      complexity
    };
  }