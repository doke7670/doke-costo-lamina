// Configuración general de la aplicación
export const APP_CONFIG = {
  // Configuración de cinta reflectiva
  REFLECTIVE_TAPE: {
    RECTANGLE_LENGTH: 0.15, // metros
    PRICE_PER_RECTANGLE: 2.25, // soles
    RECTANGLE_SIZE: 15 // cm
  },
  
  // Configuración de cálculos
  CALCULATION: {
    DECIMAL_PRECISION: 2,
    ROUNDING_MULTIPLIER: 100
  },
  
  // Configuración de UI
  UI: {
    CURRENCY: 'S/',
    DEFAULT_PLACEHOLDER: '0'
  },

  // Configuración de impuestos (Perú)
  TAXES: {
    IGV_RATE: 0.18, // 18%
    INCLUDE_IGV_DEFAULT: true
  },

  // Configuración de mano de obra
  LABOR: {
    RATES: {
      cutting: 2,      // S/ 2 por m² solo corte
      weeding: 3,      // S/ 3 por m² desmalezado
      application: 8,  // S/ 8 por m² aplicación
      complex: 15,     // S/ 15 por m² aplicación compleja
      vehicle: 25      // S/ 25 por m² vehículos
    }
  },

  // Configuración de plotter
  PLOTTER: {
    MIN_ORDER_METERS: 0.5,    // Pedido mínimo en metros
    CUTTING_SPEEDS: {         // m²/hora por complejidad
      simple: 15,
      medium: 8,
      complex: 4,
      intricate: 2
    },
    WASTE_PERCENTAGES: {      // Porcentaje de desperdicio
      standard: 8,
      premium: 12,
      reflective: 15,
      printed: 5,
      complex: 20
    }
  },

  // Configuración de cotizaciones
  QUOTES: {
    VALID_DAYS: 15, // Días de validez
    PREFIX: 'COT',
    AUTO_SAVE: true
  },

  // Descuentos por volumen
  BULK_DISCOUNTS: [
    { min: 1000, discount: 15 },
    { min: 500, discount: 10 },
    { min: 200, discount: 5 }
  ]
};