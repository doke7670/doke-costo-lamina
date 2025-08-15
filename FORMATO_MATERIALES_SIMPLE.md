# 📦 **FORMATO SIMPLIFICADO DE MATERIALES**

## ✅ **FORMATO ACTUAL (SIMPLIFICADO)**

### **🎯 Solo las propiedades que realmente usas:**

```json
{
  "id": 25,
  "name": "Vinil Militar Camuflado",
  "cost": 30,
  "markup": 30,
  "width": 150,
  "length": 1,
  "discountCm": 0,
  "type": "standard",
  "minOrder": 0.2,
  "brand": "Generic"
}
```

### **📋 EXPLICACIÓN DE CADA PROPIEDAD:**

| Propiedad | ¿Para qué sirve? | Ejemplo |
|-----------|------------------|---------|
| **`id`** | Identificador único del material | `25` |
| **`name`** | Nombre que aparece en los selects | `"Vinil Militar Camuflado"` |
| **`cost`** | Lo que te cuesta el material (S/) | `30` |
| **`markup`** | Tu ganancia por rollo (S/) | `30` |
| **`width`** | Ancho del rollo (cm) | `150` |
| **`length`** | Largo del rollo (metros) | `1` |
| **`discountCm`** | Desperdicio por extremos (cm) | `0` |
| **`type`** | Categoría para organizar | `"standard"` |
| **`minOrder`** | Pedido mínimo (metros) | `0.2` |
| **`brand`** | Marca del material | `"Generic"` |

---

## ❌ **PROPIEDADES ELIMINADAS (No las usabas):**

- ~~`category`~~ - No se usa en cálculos
- ~~`origin`~~ - Solo información extra
- ~~`durability`~~ - No afecta precios
- ~~`adhesive`~~ - No se usa en el sistema
- ~~`finish`~~ - Solo descripción
- ~~`applications`~~ - No se usa
- ~~`colors`~~ - Muy complejo
- ~~`superficies`~~ - No necesario
- ~~`resistenciaUV`~~ - Solo info técnica

---

## 🎯 **VENTAJAS DEL FORMATO SIMPLE:**

### **✅ Para ti:**
- **Fácil de leer** - Solo lo esencial
- **Rápido de editar** - Menos campos
- **Sin confusión** - Solo lo que usas
- **Mantenimiento simple** - Menos datos que actualizar

### **✅ Para el sistema:**
- **Carga más rápida** - Menos datos
- **Menos errores** - Campos simples
- **Fácil backup** - Archivo más pequeño
- **Compatible** - Funciona con todo el código existente

---

## 🔧 **CÓMO AGREGAR MATERIAL NUEVO:**

### **Opción 1: Desde la interfaz (Recomendado)**
1. Pestaña "Materiales"
2. Llenar formulario
3. Clic "Guardar" → Se agrega automáticamente al JSON

### **Opción 2: Editar JSON directamente**
```json
{
  "id": 26,
  "name": "Tu Material Nuevo",
  "cost": 50,
  "markup": 25,
  "width": 150,
  "length": 10,
  "discountCm": 9,
  "type": "standard",
  "minOrder": 0.5,
  "brand": "Tu Marca"
}
```

---

## 📊 **TIPOS DE MATERIALES:**

### **`type` - Categorías disponibles:**
- **`"standard"`** - Materiales comunes
- **`"premium"`** - Materiales de alta calidad
- **`"printed"`** - Materiales impresos
- **`"reflective"`** - Materiales reflectivos

### **Ejemplos por tipo:**
```json
// Standard
"type": "standard"  // Vinil básico, económico

// Premium  
"type": "premium"   // Fibra carbono, cromados

// Printed
"type": "printed"   // Vinil impreso, personalizado

// Reflective
"type": "reflective" // Señalética, seguridad
```

---

## 💡 **CONSEJOS PARA MANTENER EL JSON:**

### **✅ Buenas prácticas:**
- **IDs únicos:** Nunca repitas un ID
- **Nombres claros:** "Polarizado Taiwan" mejor que "Pol-TW"
- **Costos reales:** Actualiza precios regularmente
- **Markup realista:** Ganancia según el mercado

### **❌ Evita:**
- IDs duplicados
- Nombres muy largos (más de 30 caracteres)
- Costos en 0 (salvo casos especiales)
- Markup negativo

---

## 🎉 **RESULTADO:**

**Formato limpio, simple y funcional:**
- ✅ **Solo 10 propiedades** esenciales
- ✅ **Fácil de entender** y mantener
- ✅ **Compatible** con todo el sistema
- ✅ **Rápido** de cargar y procesar
- ✅ **Escalable** para crecer contigo

**🎯 Ahora tienes un JSON simple que contiene exactamente lo que necesitas, nada más, nada menos!**