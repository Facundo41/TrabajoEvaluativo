export class Receta {
    // Las propiedades que se guardarán, siguiendo la estructura de card
    constructor(nombre, imagenUrl) { 
        this.strMeal = nombre;
        this.strMealThumb = imagenUrl;
        // Asignamos un ID único local para evitar colisiones
        this.idMeal = "LOCAL_" + Date.now(); 
        this.origen = 'Carga Local'; // Para identificarla
    }
    // toHTML() - El método para dibujarse a sí misma
    toHTML() {
        // Estructura de card para LocalStorage (añade la clase 'local-card' para CSS)
        return `
            <div class="api-card local-card">
                <img 
                    src="${this.strMealThumb}" 
                    alt="${this.strMeal}" 
                    class="card-image"
                    onerror="this.onerror=null; this.src='https://placehold.co/400x250/e63946/ffffff?text=Receta+Local';" 
                >
                <div class="card-content">
                    <div>
                        <h3 class="card-title">${this.strMeal}</h3>
                        <p class="card-detail">
                            <strong>Origen:</strong> ${this.origen}
                        </p>
                    </div>
                    <a href="#" class="index-nav-link local-link">
                        Receta Creada por Ti
                    </a>
                </div>
            </div>
        `;
    }
}
