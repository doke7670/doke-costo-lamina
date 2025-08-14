# Calculadora de Viniles

Una aplicación web para calcular costos de materiales de viniles y polarizados.

## Arquitectura Mejorada

### Estructura del Proyecto

```
├── src/
│   ├── app.js                 # Aplicación principal
│   ├── config/
│   │   └── app.config.js      # Configuración general
│   ├── data/
│   │   └── materials.js       # Datos de materiales
│   └── services/
│       ├── CalculatorService.js # Lógica de cálculos
│       ├── FormService.js      # Manejo del formulario
│       └── TableService.js     # Manejo de la tabla
├── css/
│   └── style.css              # Estilos personalizados
├── scripts/                   # (Deprecated - usar src/)
└── index.html                 # Interfaz principal
```

### Principios Arquitectónicos Aplicados

1. **Separación de Responsabilidades**: Cada servicio tiene una responsabilidad específica
2. **Modularidad**: Código organizado en módulos ES6
3. **Configuración Centralizada**: Constantes y configuraciones en archivos dedicados
4. **Reutilización**: Servicios reutilizables y desacoplados
5. **Mantenibilidad**: Código más fácil de mantener y extender

### Servicios

#### CalculatorService
- Maneja todos los cálculos de materiales
- Calcula costos de cinta reflectiva
- Aplica fórmulas específicas por material

#### FormService
- Gestiona el formulario de entrada
- Valida datos de entrada
- Maneja la selección de materiales

#### TableService
- Administra la tabla de resultados
- Calcula totales automáticamente
- Maneja eliminación de filas

### Beneficios de la Nueva Arquitectura

- **Escalabilidad**: Fácil agregar nuevos materiales o funcionalidades
- **Testabilidad**: Servicios independientes fáciles de probar
- **Mantenibilidad**: Código organizado y documentado
- **Reutilización**: Componentes reutilizables
- **Configurabilidad**: Parámetros centralizados

### Uso

1. Abrir `index.html` en un navegador moderno
2. Seleccionar material del dropdown
3. Ingresar dimensiones (ancho x alto)
4. Hacer clic en "Agregar" para añadir a la tabla
5. Ver el total calculado automáticamente

### Sistema de Diseño

La aplicación utiliza una paleta de colores personalizada:
- **Naranja** (#FF6B35): Color primario para botones y títulos
- **Plomo** (#6B7280): Color secundario para estructura
- **Negro** (#1F2937): Fondo principal
- **Blanco** (#FFFFFF): Texto principal

Ver [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) para más detalles.

### Próximas Mejoras Sugeridas

- Implementar tests unitarios
- Agregar persistencia de datos (localStorage)
- Crear componentes web reutilizables
- Implementar sistema de plugins para nuevos materiales
- Agregar exportación de cotizaciones (PDF/Excel)
- Modo oscuro/claro
- Responsive design mejorado