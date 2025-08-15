// Configuración de materiales
export const MATERIALS_CONFIG = {
    // Constantes para cálculos
    BASE_WIDTH: 60,
    BASE_LENGTH: 50,
    DISCOUNT_CM: 9,
    CM_TO_M: 100,
};

// Función para cargar materiales desde JSON
export async function cargarMaterialesDesdeJSON() {
    try {
        const response = await fetch('./src/data/materials.json');
        const data = await response.json();
        // Convertir nombres en español a formato compatible
        return data.materiales.map(material => ({
            id: material.id,
            name: material.nombre,
            cost: material.costo,
            markup: material.ganancia,
            width: material.ancho,
            length: material.largo,
            discountCm: material.desperdiciosCm,
            type: material.tipo,
            minOrder: material.pedidoMinimo,
            brand: material.marca,
            category: material.categoria,
            origin: material.origen
        }));
    } catch (error) {
        console.error('❌ Error cargando materiales desde JSON:', error);
        return getMaterialsFallback();
    }
}

// Función para guardar materiales en JSON (simulado con localStorage)
export function guardarMaterialesEnJSON(materials) {
    try {
        // En un entorno real, esto sería una llamada al servidor
        // Por ahora usamos localStorage como alternativa
        const datosBaseDatos = {
            materiales: materials,
            ultimaActualizacion: new Date().toISOString(),
            totalMateriales: materials.length
        };
        localStorage.setItem('baseDatosMateriales', JSON.stringify(datosBaseDatos));
        console.log('✅ Materiales guardados en base de datos local:', materials.length);
        return true;
    } catch (error) {
        console.error('❌ Error guardando materiales:', error);
        return false;
    }
}

// Función para cargar materiales desde localStorage si JSON falla
function getMaterialsFromStorage() {
    try {
        const saved = localStorage.getItem('materialsDatabase');
        if (saved) {
            const data = JSON.parse(saved);
            return data.materials || [];
        }
    } catch (error) {
        console.error('❌ Error cargando desde localStorage:', error);
    }
    return [];
}

// Materiales de respaldo si falla todo lo demás
function getMaterialsFallback() {
    return [
    {
        /*  id: 1,
         codigo: "VG-MGFILMS-60",
         name: "Vinil Gloss MGFILMS",
 
         // COSTOS (en Soles)
         costoDolar: 45,          // Costo en USD (referencia)
         tipoCambio: 3.75,        // Tipo de cambio del día
         costoSoles: 169,         // Costo real en soles (costoDolar × tipoCambio)
         margenGanancia: 65,      // % de ganancia (no monto fijo)
         precioVenta: 288,        // Precio final calculado
 
         // Para compatibilidad con sistema actual
         cost: 169,               // costoSoles
         markup: 119,             // precioVenta - costoSoles
 
         // ESPECIFICACIONES TÉCNICAS
         ancho: 60,               // cm (ancho del rollo) */
        largo: 50,               // metros por rollo
        desperdicio: 15,         // cm por extremos (más realista)
        grosor: 100,             // micrones (no mm)

        // Para compatibilidad
        width: 60,
        length: 50,
        discountCm: 15,

        // CLASIFICACIÓN PERUANA
        categoria: "decorativo",  // decorativo, automotriz, arquitectónico
        calidad: "premium",      // económico, estándar, premium, importado
        origen: "China",         // China, Corea, USA, Brasil
        marca: "MGFILMS",

        // CARACTERÍSTICAS TÉCNICAS
        adhesivo: "permanente",  // permanente, removible, reposicionable
        acabado: "brillante",    // brillante, mate, satinado, texturizado
        durabilidad: 5,          // años exterior
        resistenciaUV: true,     // resistente a UV

        // Para compatibilidad
        type: 'standard',
        adhesive: 'permanent',
        finish: 'gloss',

        // APLICACIONES
        usos: ["vehicular", "vidrieras", "decoracion", "señaletica"],
        superficies: ["metal", "vidrio", "plastico", "madera"],
        applications: ['vehicles', 'signage', 'decoration'],

        // COLORES DISPONIBLES
        colores: {
            basicos: ["blanco", "negro", "rojo", "azul", "amarillo"],
            especiales: ["dorado", "plateado", "cromado"],
            personalizados: true
        },
        colors: ['white', 'black', 'red', 'blue', 'yellow', 'green'],

        // COMERCIAL
        pedidoMinimo: 1,         // metros mínimos
        descuentoPorVolumen: [   // descuentos por cantidad
            { desde: 10, descuento: 5 },
            { desde: 50, descuento: 10 },
            { desde: 100, descuento: 15 }
        ],
        minOrder: 1,

        // INSTALACIÓN
        dificultadInstalacion: "media", // facil, media, dificil, experto
        tiempoInstalacion: 0.5,  // horas por m²
        requiereHerramientas: ["pistola_calor", "espatula", "cutter"],

        // ESTADO
        disponible: true,
        stock: 25,               // rollos en stock
        proveedor: "Importadora XYZ",
        fechaActualizacion: "2025-01-31",

        // Para compatibilidad
        brand: 'MGFILMS',
        origin: 'China'
    },
    {
        id: 2,
        codigo: "VG-MCCAL-121",
        name: "Vinil Gloss MCCAL",

        // COSTOS
        costoDolar: 52,
        tipoCambio: 3.75,
        costoSoles: 195,
        margenGanancia: 55,
        precioVenta: 302,

        cost: 195,
        markup: 107,

        // ESPECIFICACIONES
        ancho: 121,
        largo: 25,
        desperdicio: 12,
        grosor: 80,

        width: 121,
        length: 25,
        discountCm: 12,

        // CLASIFICACIÓN
        categoria: "decorativo",
        calidad: "premium",
        origen: "Corea",
        marca: "MCCAL",

        // CARACTERÍSTICAS
        adhesivo: "permanente",
        acabado: "brillante",
        durabilidad: 7,
        resistenciaUV: true,

        type: 'standard',
        adhesive: 'permanent',
        finish: 'gloss',

        // APLICACIONES
        usos: ["vehicular", "arquitectonico", "señaletica"],
        superficies: ["metal", "vidrio", "plastico"],

        // COLORES
        colores: {
            basicos: ["blanco", "negro", "rojo", "azul", "verde"],
            especiales: ["oro", "plata", "cromado", "holografico"],
            personalizados: true
        },

        // COMERCIAL
        pedidoMinimo: 0.5,
        descuentoPorVolumen: [
            { desde: 5, descuento: 3 },
            { desde: 25, descuento: 8 },
            { desde: 50, descuento: 12 }
        ],

        // INSTALACIÓN
        dificultadInstalacion: "media",
        tiempoInstalacion: 0.4,
        requiereHerramientas: ["pistola_calor", "espatula"],

        // ESTADO
        disponible: true,
        stock: 15,
        proveedor: "Distribuidora Corea SAC",
        fechaActualizacion: "2025-01-31",

        minOrder: 0.5,
        brand: 'MCCAL'
    },
    {
        id: 3,
        codigo: "VR-REFL-60",
        name: "Vinil Reflectivo",

        // COSTOS
        costoDolar: 85,
        tipoCambio: 3.75,
        costoSoles: 319,
        margenGanancia: 45,
        precioVenta: 462,

        cost: 319,
        markup: 143,

        // ESPECIFICACIONES
        ancho: 60,
        largo: 50,
        desperdicio: 18,
        grosor: 120,

        width: 60,
        length: 50,
        discountCm: 18,

        // CLASIFICACIÓN
        categoria: "señaletica",
        calidad: "premium",
        origen: "USA",
        marca: "3M",

        // CARACTERÍSTICAS
        adhesivo: "permanente",
        acabado: "reflectivo",
        durabilidad: 10,
        resistenciaUV: true,

        type: 'reflective',
        adhesive: 'permanent',
        finish: 'reflective',

        // APLICACIONES
        usos: ["señaletica", "seguridad", "vehicular"],
        superficies: ["metal", "aluminio", "acero"],

        // COLORES
        colores: {
            basicos: ["blanco", "amarillo", "rojo", "azul"],
            especiales: ["verde_lima", "naranja_seguridad"],
            personalizados: false
        },

        // COMERCIAL
        pedidoMinimo: 2,
        descuentoPorVolumen: [
            { desde: 20, descuento: 8 },
            { desde: 100, descuento: 15 },
            { desde: 500, descuento: 25 }
        ],

        // INSTALACIÓN
        dificultadInstalacion: "dificil",
        tiempoInstalacion: 0.8,
        requiereHerramientas: ["pistola_calor", "espatula", "rodillo", "primer"],

        // ESTADO
        disponible: true,
        stock: 8,
        proveedor: "3M Perú",
        fechaActualizacion: "2025-01-31",

        minOrder: 2,
        brand: '3M'
    },
    {
        id: 4,
        name: "Vinil Cromado",
        cost: 500,
        markup: 200,
        width: 60,
        length: 50,
        discountCm: 9,
        type: 'premium',
        minOrder: 0.5,
        brand: 'Generic'
    },
    {
        id: 5,
        name: "Polarizado Económico",
        cost: 120,
        markup: 200,
        width: 50,
        length: 60,
        discountCm: 9,
        type: 'standard',
        minOrder: 0.5,
        brand: 'Generic'
    },
    {
        id: 6,
        name: "Polarizado Taiwan DRS",
        cost: 250,
        markup: 200,
        width: 50,
        length: 60,
        discountCm: 9,
        type: 'standard',
        minOrder: 0.5,
        brand: 'Taiwan DRS'
    },
    {
        id: 7,
        name: "Polarizado TurboFilm Corean",
        cost: 220,
        markup: 200,
        width: 75,
        length: 30,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.5,
        brand: 'TurboFilm'
    },
    {
        id: 8,
        name: "Polarizado NanoFilm Corean",
        cost: 590,
        markup: 500,
        width: 150,
        length: 30,
        discountCm: 9,
        type: 'premium',
        minOrder: 1.0,
        brand: 'NanoFilm'
    },
    {
        id: 9,
        name: "Polarizado Nanocarbono Taiwan",
        cost: 225,
        markup: 200,
        width: 150,
        length: 15,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.5,
        brand: 'Taiwan'
    },
    {
        id: 10,
        name: "Fibra de Carbono 3D",
        cost: 350,
        markup: 300,
        width: 150,
        length: 30,
        discountCm: 9,
        type: 'premium',
        minOrder: 0.5,
        brand: 'Generic'
    },
    {
        id: 11,
        name: "Fibra de Carbono 4D",
        cost: 400,
        markup: 300,
        width: 150,
        length: 30,
        discountCm: 9,
        type: 'premium',
        minOrder: 0.5,
        brand: 'Generic'
    },
    {
        id: 12,
        name: "Fibra de Carbono 5D",
        cost: 295,
        markup: 250,
        width: 150,
        length: 9,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.5,
        brand: 'Generic'
    },
    {
        id: 13,
        name: "Vinil Panorámico",
        cost: 390,
        markup: 200,
        width: 150,
        length: 18,
        discountCm: 9,
        type: 'standard',
        minOrder: 1.0,
        brand: 'Generic'
    },
    {
        id: 14,
        name: "Vinil Impreso",
        cost: 25,
        markup: 0,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'printed',
        minOrder: 0.1,
        brand: 'Generic'
    },
    {
        id: 15,
        name: "Vinil Impreso Plastificado",
        cost: 35,
        markup: 0,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'printed',
        minOrder: 0.1,
        brand: 'Generic'
    },
    {
        id: 16,
        name: "Vinil M. Cromado",
        cost: 45,
        markup: 40,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.2,
        brand: 'Generic'
    },
    {
        id: 17,
        name: "Vinil L. China",
        cost: 35,
        markup: 30,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'standard',
        minOrder: 0.2,
        brand: 'China'
    },
    {
        id: 18,
        name: "Fibra Carbono Camaleón",
        cost: 50,
        markup: 30,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.2,
        brand: 'Generic'
    },
    {
        id: 20,
        name: "Fibra Carbono Negro 3D SINGCAL",
        cost: 260.10,
        markup: 150,
        width: 127,
        length: 50,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.5,
        brand: 'SINGCAL'
    },
    {
        id: 21,
        name: "Fibra Carbono Negro 3D LR",
        cost: 22,
        markup: 20,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'standard',
        minOrder: 0.2,
        brand: 'LR'
    },
    {
        id: 22,
        name: "Vinil Fotocromatico Moldeable",
        cost: 25,
        markup: 20,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.2,
        brand: 'Generic'
    },
    {
        id: 23,
        name: "Vinil Tornasol",
        cost: 15,
        markup: 10,
        width: 60,
        length: 1,
        discountCm: 0,
        type: 'standard',
        minOrder: 0.2,
        brand: 'Generic'
    },
    {
        id: 24,
        name: "Vinil Verde Tornasol",
        cost: 65,
        markup: 50,
        width: 120,
        length: 1,
        discountCm: 0,
        type: 'premium',
        minOrder: 0.2,
        brand: 'Generic'
    },
    {
        id: 25,
        name: "Vinil Militar Camuflado",
        cost: 30,
        markup: 30,
        width: 150,
        length: 1,
        discountCm: 0,
        type: 'standard',
        minOrder: 0.2,
        brand: 'Generic'
    }
];
}

// Variable global para materiales (se carga dinámicamente)
export let materials = [];

// Inicializar materiales
export async function initializeMaterials() {
    // Intentar cargar desde localStorage primero (más rápido)
    const storedMaterials = getMaterialsFromStorage();
    
    if (storedMaterials.length > 0) {
        materials.length = 0; // Limpiar array
        materials.push(...storedMaterials);
        console.log('✅ Materiales cargados desde localStorage:', materials.length);
    } else {
        // Si no hay en localStorage, cargar desde JSON
        const jsonMaterials = await loadMaterialsFromJSON();
        materials.length = 0; // Limpiar array
        materials.push(...jsonMaterials);
        console.log('✅ Materiales cargados desde JSON:', materials.length);
        
        // Guardar en localStorage para próximas veces
        saveMaterialsToJSON(materials);
    }
    
    return materials;
}