document.addEventListener('DOMContentLoaded', function() {
    // Activa la función de búsqueda cuando se escribe en el buscador
    document.getElementById('searchBox').addEventListener('keyup', searchLinks);
    
    // Activa la función de búsqueda cuando se cambia el filtro de categoría
    document.getElementById('categoryFilter').addEventListener('change', searchLinks);
});


function searchLinks() {
    // 1. Obtener los valores de ambos filtros
    let filterText = document.getElementById('searchBox').value.toUpperCase();
    let filterCategory = document.getElementById('categoryFilter').value;

    let mainSections = document.querySelectorAll('.main-section');

    // 2. Recorrer cada sección principal (ej. SOCMINT, GEOINT)
    mainSections.forEach(function(section) {
        let sectionTitle = section.querySelector('h2').textContent.trim();
        let sectionHasVisibleContent = false;

        // 3. Recorrer cada caja de categoría dentro de la sección
        let categoryBoxes = section.querySelectorAll('.category-box');
        categoryBoxes.forEach(function(box) {
            let links = box.getElementsByTagName('li');
            let boxHasVisibleLinks = false;

            // 4. Recorrer cada enlace
            for (let i = 0; i < links.length; i++) {
                let linkElement = links[i];
                let a = linkElement.getElementsByTagName('a')[0];
                
                // 5. Comprobar si el enlace cumple con los filtros
                
                // Comprobación de Categoría:
                // El enlace es visible si la categoría seleccionada es "all" O si el título de la sección coincide.
                const categoryMatch = (filterCategory === 'all') || (sectionTitle === filterCategory);

                // Comprobación de Texto:
                // Busca en el título visible Y en las etiquetas invisibles (data-tags).
                const titleText = a.textContent || a.innerText;
                const tags = a.dataset.tags || ""; // Obtiene las etiquetas, o un string vacío si no hay
                const textMatch = (titleText.toUpperCase().indexOf(filterText) > -1) || 
                                  (tags.toUpperCase().indexOf(filterText) > -1);

                // 6. Mostrar u ocultar el enlace
                if (categoryMatch && textMatch) {
                    linkElement.style.display = "";
                    boxHasVisibleLinks = true;
                } else {
                    linkElement.style.display = "none";
                }
            }
            
            // Ocultar la caja si no tiene enlaces visibles
            if (boxHasVisibleLinks) {
                box.style.display = "";
                sectionHasVisibleContent = true;
            } else {
                box.style.display = "none";
            }
        });

        // Ocultar la sección entera si no tiene cajas visibles
        if (sectionHasVisibleContent) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });
}