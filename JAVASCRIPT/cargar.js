import { EntidadService } from "./entidadService.js";

// Captura de elementos
const form = document.getElementById("formCargaReceta"); 
const nombreInput = document.getElementById("inputNombre");
const imagenUrlInput = document.getElementById("inputImagenUrl");
const errorMessage = document.getElementById("mensajeError");


form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    
    const nombre = nombreInput.value.trim();
    const imagenUrl = imagenUrlInput.value.trim();

    // 1. Validación de datos (usando la estructura de tu validaciones.js)
    if (!nombre || nombre.length < 3) {
        errorMessage.textContent = "Error: El nombre de la receta debe tener al menos 3 caracteres.";
        return; // Detiene la ejecución si hay error
    }
    
    if (imagenUrl && !imagenUrl.startsWith('http')) {
        errorMessage.textContent = "Error: Por favor, ingrese una URL de imagen válida.";
        return;
    }
    
    // Si la validación es correcta:
    errorMessage.textContent = ""; 

    // 2. Guardar la entidad en localStorage
    EntidadService.add(nombre, imagenUrl);

    // 3. Redirigir a Home (index.html)
    // Redirección para mostrar la nueva tarjeta
    window.location.href = "../HTML/index.html"; 
});