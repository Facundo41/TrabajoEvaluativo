// URL de la API para obtener recetas de la categoría 'Seafood'
const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

// Elementos del DOM
const cardsContainer = document.getElementById('cards-container');
const loadingState = document.getElementById('loading-state');

// Función auxiliar para manejar la visibilidad y el contenido de los estados
function setContent(contentHtml, isError = false) {
    // Usamos innerHTML para reemplazar el contenido (incluyendo el estado de carga/error)
    cardsContainer.innerHTML = contentHtml;
    // La clase 'error-state' puede ser usada para aplicar estilos visuales de error al grid si es necesario
    // Aunque aquí se inyecta un div de error, la clase en el contenedor podría ser útil para estilos de fallback.
    // cardsContainer.classList.toggle('error-state', isError); 
}

// Función para crear una tarjeta de receta (Meal)
function createMealCard(meal) {
    // Se utiliza la estructura HTML con las clases CSS ya definidas para el estilo
    return `
        <div class="api-card">
            <img 
                src="${meal.strMealThumb}" 
                alt="${meal.strMeal}" 
                class="card-image"
                onerror="this.onerror=null; this.src='https://placehold.co/400x250/1e3a8a/fcd34d?text=Receta+no+disponible';" 
            >
            <div class="card-content">
                <div>
                    <h3 class="card-title">${meal.strMeal}</h3>
                    <p class="card-detail">
                        <strong>ID:</strong> ${meal.idMeal}
                    </p>
                </div>
                <!-- Enlace de ejemplo, asume que una página de detalle podría usar el ID -->
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank" class="index-nav-link" style="align-self: flex-start; margin-top: 1rem; border-bottom: 2px solid var(--color-primary); color: var(--color-primary);">
                    Ver Detalles
                </a>
            </div>
        </div>
    `;
}

/**
 * Función principal para cargar y renderizar las recetas de mariscos (Seafood)
 * Utiliza async/await y try/catch, siguiendo las buenas prácticas de tu profesor.
 */
async function loadSeafoodMeals() {
    // 1. Mostrar estado de carga (Se obtiene el HTML del elemento de carga y se inyecta)
    // Se asegura que el spinner sea lo único visible mientras carga
    const spinnerHtml = loadingState ? loadingState.outerHTML : 
        `<div class="loading-state"><span class="loading-spinner"></span> Cargando deliciosas recetas...</div>`;
    cardsContainer.innerHTML = spinnerHtml;

    try {
        // 2. Petición de los datos
        const response = await fetch(API_URL);

        // Manejo del error de respuesta HTTP (e.g., 404, 500)
        if (!response.ok) {
            // Usamos el throw para que el error sea capturado por el catch
            throw new Error(`Error de red: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Verificar si hay comidas en la respuesta (el campo es 'meals')
        const meals = data.meals;

        if (!meals || meals.length === 0) {
            // Mostrar un mensaje si no se encontraron recetas
            setContent(`
                <div class="loading-state" style="border: none; color: var(--color-detail);">
                    No se encontraron recetas de Seafood.
                </div>
            `);
            return;
        }

        // 3. Renderizar las tarjetas
        const mealsHtml = meals.map(createMealCard).join('');
        
        // Reemplazar el estado de carga con las tarjetas
        setContent(mealsHtml);

    } catch (error) {
        // 4. Manejo de error de red o de proceso (usando try/catch)
        console.error("Error al cargar las recetas:", error);
        
        setContent(`
            <div class="error-state">
                Hubo un error al conectar con la API: ${error.message}. Por favor, inténtelo de nuevo.
            </div>
        `, true);
    }
}

// 5. Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', loadSeafoodMeals);