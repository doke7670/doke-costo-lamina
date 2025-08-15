# 🧪 **PRUEBA DEL SISTEMA COMPLETO**

## ✅ **VERIFICACIONES A REALIZAR:**

### **1. 🎨 PESTAÑAS SE PINTAN CORRECTAMENTE**

#### **Problema reportado:**
- Las pestañas no se pintan cuando están seleccionadas
- No se sabe en qué pestaña estás

#### **Verificar:**
1. **Abrir sistema**
2. **Pestaña "Cotización"** debe estar:
   - ✅ **Fondo naranja** (tab-active)
   - ✅ **Texto blanco**
3. **Clic en "Calc Rápida":**
   - ✅ Se pinta de naranja
   - ✅ "Cotización" vuelve a gris
4. **Clic en "Materiales":**
   - ✅ Se pinta de naranja
   - ✅ Otras vuelven a gris

#### **CSS que debe aplicarse:**
```css
.tab-active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
}

.tab-inactive {
  background: transparent;
  color: #9ca3af;
}
```

---

### **2. 💾 MATERIALES EN JSON FUNCIONAN**

#### **Problema reportado:**
- ¿Dónde se guardan los materiales nuevos?
- ¿Funcionan los botones de guardar?
- ¿Se actualizan los selects?

#### **Verificar Guardado:**

**Paso 1: Agregar Material Nuevo**
1. Pestaña "Materiales"
2. Llenar formulario:
   ```
   📝 Nombre: Vinil Prueba Sistema
   💰 Costo: 75.00
   📈 Ganancia: 45%
   📏 Ancho: 150cm
   📏 Largo: 30m
   🏷️ Tipo: Premium
   ```
3. **Clic "Guardar Material"**
4. **Verificar mensajes en consola:**
   - ✅ "Material guardado en base de datos: Vinil Prueba Sistema"
   - ✅ "Materiales guardados en base de datos local: X"

**Paso 2: Verificar en Selects**
1. **Pestaña "Cotización":**
   - Abrir select de materiales
   - ✅ "Vinil Prueba Sistema" debe aparecer
2. **Pestaña "Calc Rápida":**
   - Abrir select de materiales  
   - ✅ "Vinil Prueba Sistema" debe aparecer

**Paso 3: Verificar Persistencia**
1. **Recargar página (F5)**
2. **Verificar en consola:**
   - ✅ "Materiales cargados desde base de datos: X"
3. **Verificar en selects:**
   - ✅ "Vinil Prueba Sistema" sigue apareciendo

---

### **3. 🔄 ACTUALIZACIÓN AUTOMÁTICA DE SELECTS**

#### **Verificar que se actualicen todos:**

**Al Agregar Material:**
- ✅ Lista en pestaña "Materiales"
- ✅ Select principal en "Cotización"  
- ✅ Select en "Calc Rápida"

**Al Editar Material:**
1. Editar "Vinil Prueba Sistema" → cambiar nombre a "Vinil Editado"
2. Verificar que se actualiza en todos los selects

**Al Eliminar Material:**
1. Eliminar "Vinil Editado"
2. Verificar que desaparece de todos los selects

---

### **4. 🗂️ ESTRUCTURA JSON EN ESPAÑOL**

#### **Verificar archivo materials.json:**
```json
{
  "materiales": [
    {
      "id": 1,
      "nombre": "Vinil Brillante MGFILMS",
      "costo": 169,
      "ganancia": 119,
      "ancho": 60,
      "largo": 50,
      "desperdiciosCm": 15,
      "tipo": "premium",
      "pedidoMinimo": 1,
      "marca": "MGFILMS",
      "categoria": "decorativo",
      "origen": "China"
    }
  ]
}
```

#### **Verificar conversión automática:**
- ✅ `nombre` → `name`
- ✅ `costo` → `cost`  
- ✅ `ganancia` → `markup`
- ✅ `ancho` → `width`
- ✅ `largo` → `length`

---

## 🔧 **SI ALGO NO FUNCIONA:**

### **Pestañas no se pintan:**
1. **Abrir DevTools (F12)**
2. **Consola → buscar errores**
3. **Elements → verificar clases CSS**
4. **Verificar que existan las clases:**
   - `.tab-active`
   - `.tab-inactive`

### **Materiales no se guardan:**
1. **Consola → buscar errores de JavaScript**
2. **Application → Local Storage → verificar:**
   - `baseDatosMateriales`
   - Debe contener JSON con materiales
3. **Network → verificar carga de materials.json**

### **Selects no se actualizan:**
1. **Verificar que se llamen las funciones:**
   - `loadMaterials()` (select principal)
   - `loadRapidMaterials()` (calc rápida)
   - `loadMaterialsList()` (lista materiales)

---

## ✅ **RESULTADO ESPERADO:**

### **Sistema Completo Funcionando:**
- ✅ **Pestañas visualmente claras** - sabes dónde estás
- ✅ **Materiales en JSON español** - estructura limpia
- ✅ **Guardado automático** - no se pierden datos
- ✅ **Sincronización total** - todos los selects actualizados
- ✅ **Persistencia garantizada** - funciona después de recargar

### **Flujo Completo:**
```
1. Agregar material → Se guarda en JSON
2. Cambiar pestaña → Se pinta correctamente  
3. Usar material → Aparece en todos los selects
4. Recargar página → Todo sigue funcionando
```

**🎯 Si todo funciona correctamente, tienes un sistema profesional y completo!**