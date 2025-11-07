// URL de la API para obtener recetas de la categoría 'Seafood'
const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";


const cardsContainer = document.getElementById('cards-container');
const loadingState = document.getElementById('loading-state');
function setContent(contentHtml, isError = false) {
    cardsContainer.innerHTML = contentHtml;
}

function createMealCard(meal) {
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

async function loadSeafoodMeals() {
    const spinnerHtml = loadingState ? loadingState.outerHTML : 
        `<div class="loading-state"><span class="loading-spinner"></span> Cargando deliciosas recetas...</div>`;
    cardsContainer.innerHTML = spinnerHtml;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const meals = data.meals;

        if (!meals || meals.length === 0) {
            setContent(`
                <div class="loading-state" style="border: none; color: var(--color-detail);">
                    No se encontraron recetas de Seafood.
                </div>
            `);
            return;
        }
        const mealsHtml = meals.map(createMealCard).join('');
        setContent(mealsHtml);
    } 
    catch (error) {
        console.error("Error al cargar las recetas:", error);
        
        setContent(`
            <div class="error-state">
                Hubo un error al conectar con la API: ${error.message}. Por favor, inténtelo de nuevo.
            </div>
        `, true);
    }
}

document.addEventListener('DOMContentLoaded', loadSeafoodMeals);