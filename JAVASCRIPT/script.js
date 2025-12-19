import { EntidadService } from "./entidadService.js"; 

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
const cardsContainer = document.getElementById('cards-container');
const loadingState = document.getElementById('loading-state');


function createApiMealCard(meal) { 
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
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank" class="index-nav-link" style="align-self: flex-start; margin-top: 1rem; border-bottom: 2px solid var(--color-primary); color: var(--color-primary);">
                    Ver Detalles (API)
                </a>
            </div>
        </div>
    `;
}

// Función auxiliar para inyectar HTML
function setContent(contentHtml, isError = false) {
    cardsContainer.innerHTML = contentHtml;
}


async function loadSeafoodMeals() {
    
    // Muestra el estado de carga
    const spinnerHtml = loadingState ? loadingState.outerHTML : 
        `<div class="loading-state"><span class="loading-spinner"></span> Cargando deliciosas recetas...</div>`;
    cardsContainer.innerHTML = spinnerHtml;

    // 1. OBTENER DATOS DE LA API (Tu lógica existente)
    let apiMealsHtml = '';
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const apiMeals = data.meals || [];
        
        // Mapea los resultados de la API a su HTML
        apiMealsHtml = apiMeals.map(createApiMealCard).join('');
    } 
    catch (error) {
        // En caso de error de API, seguimos, pero mostramos el error.
        apiMealsHtml = `<div class="error-state">Error de API: ${error.message}. Mostrando solo datos locales.</div>`;
    }

    // 2. OBTENER DATOS DE LOCALSTORAGE (CRUCIAL para la consigna)
    // Llama al servicio para obtener la lista de recetas locales
    const localRecetas = EntidadService.list(); 
    
    // Mapea las entidades locales a HTML usando el método toHTML() del Modelo
    const localCardsHtml = localRecetas.map(receta => receta.toHTML()).join('');
    
    
    // 3. COMBINAR Y RENDERIZAR
    // Concatenamos el HTML de la API con el HTML de las recetas locales
    const allCardsHtml = apiMealsHtml + localCardsHtml;

    if (allCardsHtml.trim() === '') {
        setContent(`<div class="loading-state">No se encontraron recetas.</div>`);
        return;
    }

    setContent(allCardsHtml);
}

document.addEventListener('DOMContentLoaded', loadSeafoodMeals);