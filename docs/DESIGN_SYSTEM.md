# Sistema de Diseño - Calculadora de Viniles

## Paleta de Colores

### Colores Principales

| Color | Hex | Uso | Ejemplo |
|-------|-----|-----|---------|
| **Naranja** | `#FF6B35` | Color primario, botones principales, títulos | Botón "Agregar", título principal |
| **Naranja Hover** | `#E55A2B` | Estado hover de elementos naranjas | Hover en botones |
| **Plomo** | `#6B7280` | Color secundario, headers de tabla | Encabezados de tabla |
| **Plomo Claro** | `#9CA3AF` | Texto secundario, bordes | Labels, texto de ayuda |
| **Plomo Oscuro** | `#4B5563` | Inputs, elementos de formulario | Campos de entrada |
| **Negro** | `#1F2937` | Fondo principal | Background del body |
| **Negro Claro** | `#374151` | Contenedores principales | Card principal |
| **Blanco** | `#FFFFFF` | Texto principal, modales | Texto sobre fondos oscuros |

### Variables CSS

```css
:root {
  --color-naranja: #FF6B35;
  --color-naranja-hover: #E55A2B;
  --color-plomo: #6B7280;
  --color-plomo-claro: #9CA3AF;
  --color-plomo-oscuro: #4B5563;
  --color-negro: #1F2937;
  --color-negro-claro: #374151;
  --color-blanco: #FFFFFF;
  --color-blanco-suave: #F9FAFB;
}
```

### Clases Utilitarias

```css
/* Backgrounds */
.bg-naranja { background-color: var(--color-naranja); }
.bg-plomo { background-color: var(--color-plomo); }
.bg-negro { background-color: var(--color-negro); }

/* Text Colors */
.text-naranja { color: var(--color-naranja); }
.text-plomo { color: var(--color-plomo); }

/* Borders */
.border-naranja { border-color: var(--color-naranja); }
.ring-naranja { --tw-ring-color: var(--color-naranja); }
```

## Jerarquía Visual

1. **Primario (Naranja)**: Acciones principales, elementos importantes
2. **Secundario (Plomo)**: Información secundaria, estructura
3. **Neutro (Negro/Blanco)**: Fondos, texto base
4. **Estados**: Hover, focus, active usando variaciones de los colores principales

## Componentes

### Botones
- **Primario**: Fondo naranja, texto blanco
- **Secundario**: Fondo plomo, texto blanco
- **Eliminar**: Fondo naranja con hover más oscuro

### Formularios
- **Inputs**: Fondo plomo oscuro, borde naranja en focus
- **Labels**: Texto blanco
- **Placeholders**: Texto plomo claro

### Tabla
- **Header**: Fondo plomo, texto blanco
- **Filas**: Alternadas con divisores plomo
- **Hover**: Ligero cambio de opacidad

### Modal
- **Fondo**: Blanco
- **Título**: Texto naranja
- **Botón cerrar**: Plomo con hover naranja

## Accesibilidad

- Contraste mínimo 4.5:1 para texto normal
- Contraste mínimo 3:1 para texto grande
- Estados de focus claramente visibles
- Colores no como único indicador de estado