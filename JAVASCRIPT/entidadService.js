import { Receta } from "./entidad.js"; // Importa el Modelo

let recetas = []; 
const STORAGE_KEY = "recetas_locales"; 

// Función auxiliar para guardar el array
const saveToLocalStorage = () => {
    // Convierte el array de objetos a un string JSON
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recetas));
};

export const EntidadService = {
    // READ: Carga los datos de LocalStorage
    list: () => {
        const recetasItem = localStorage.getItem(STORAGE_KEY);

        if (recetasItem) {
            let recetasPlain = JSON.parse(recetasItem);
            // "Revive" los objetos planos a instancias de la clase Receta
            recetas = recetasPlain.map(r => new Receta(r.strMeal, r.strMealThumb));
        }
        return recetas;
    },

    // CREATE: Agrega una nueva entidad (receta)
    add: (nombre, imagenUrl) => {
        const newReceta = new Receta(nombre, imagenUrl);
        recetas.push(newReceta); 
        saveToLocalStorage(); // Persiste el cambio
    },
};

// Ejecuta la carga inicial de datos al cargarse el módulo
EntidadService.list();