
document.addEventListener('DOMContentLoaded', function() {

    // Pon aquí tus llaves de la API de Marvel.
    const MI_LLAVE_PUBLICA = '';
    const MI_LLAVE_PRIVADA = '';

    // La dirección base de la API de Marvel a la que haremos las peticiones.
    const URL_API_MARVEL = 'https://gateway.marvel.com/v1/public/characters';

    // Aquí "guardamos" los elementos de nuestro HTML en variables de JavaScript
    // para poder manipularlos fácilmente (mostrar personajes, escuchar clics, etc.).
    const formularioDeBusqueda = document.getElementById('search-form');
    const inputDeBusqueda = document.getElementById('search-input');
    const contenedorDeResultados = document.getElementById('results-container');
    const contenedorDeFavoritos = document.getElementById('favorites-container');

    // Usamos 'let' porque esta variable va a cambiar.
    // Al principio, intentamos cargar los favoritos guardados en el navegador.
    // Si no hay nada guardado (la primera vez que visitas la página), creamos una lista vacía.
    let listaDeFavoritos = JSON.parse(localStorage.getItem('marvelFavorites')) || [];

    /**
     * Esta función se conecta a la API de Marvel y busca personajes.
     */
    async function buscarPersonajesEnAPI(busqueda) {
        // Mostramos un mensaje de "Cargando..." mientras esperamos la respuesta.
        contenedorDeResultados.innerHTML = '<p style="color: var(--neon-blue);">Buscando héroes en el Multiverso...</p>';

        // La API de Marvel nos pide 3 cosas para confirmar que somos nosotros:
        // 1. Un 'timestamp': Un número único basado en la fecha y hora actual.
        const timestamp = new Date().getTime();
        
        // 2. Nuestra llave pública (la que ya definimos arriba).
        
        // 3. Un 'hash': Una "firma digital" que se crea combinando el timestamp, nuestra llave privada y nuestra llave pública.
        // Gracias a la librería que añadimos en el HTML:
        const hash = CryptoJS.MD5(timestamp + MI_LLAVE_PRIVADA + MI_LLAVE_PUBLICA).toString();

        // Ahora, construimos la URL completa para la petición.
        let urlCompleta = `${URL_API_MARVEL}?ts=${timestamp}&apikey=${MI_LLAVE_PUBLICA}&hash=${hash}&limit=20`;
        
        // Si el usuario escribió algo en la barra de búsqueda, lo añadimos a la URL.
        if (busqueda) {
            urlCompleta = urlCompleta + `&nameStartsWith=${busqueda}`;
        }

        // El bloque 'try...catch' es como una red de seguridad.
        // Intenta (try) ejecutar el código para pedir los datos.
        try {
            const respuesta = await fetch(urlCompleta); // Espera a que el servidor de Marvel responda.
            const datos = await respuesta.json(); // Espera a que la respuesta se convierta a formato JSON.
            
            // Una vez que tenemos los datos, llamamos a la función que los mostrará en pantalla.
            mostrarPersonajesEnPantalla(datos.data.results);

        } catch (error) {
            // Si algo sale mal, como que no hay internet, mostramos un mensaje de error.
            contenedorDeResultados.innerHTML = `<p style="color: #ff4757;">¡Oh no! Parece que Thanos chasqueó los dedos y perdimos la conexión.</p>`;
            console.error('Error al conectar con Marvel:', error);
        }
    }

    
    function mostrarPersonajesEnPantalla(listaDePersonajes) {
        // Primero, vaciamos el contenedor para limpiar cualquier resultado anterior.
        contenedorDeResultados.innerHTML = '';

        // Si la lista de personajes que nos llegó está vacía, mostramos un mensaje.
        if (listaDePersonajes.length === 0) {
            contenedorDeResultados.innerHTML = '<p>No encontramos a nadie con ese nombre. ¿Quizás está en otra línea temporal?</p>';
            return; // Salimos de la función porque no hay más que hacer.
        }

        // Usamos un bucle 'for...of' para recorrer cada personaje de la lista, uno por uno.
        for (const personaje of listaDePersonajes) {
            
            // Creamos un nuevo elemento 'div' en la memoria del navegador. Será nuestra tarjeta.
            const tarjetaDelPersonaje = document.createElement('div');
            tarjetaDelPersonaje.className = 'character-card'; // Le ponemos la clase CSS para que tenga estilos.

            // A veces, la API no tiene una imagen para un personaje.
            // Aquí comprobamos si la imagen es la de "imagen no disponible".
            let urlDeLaImagen;
            if (personaje.thumbnail.path.includes('image_not_available')) {
                // Si es la imagen genérica, usamos una URL a esa misma imagen pero sin la extensión.
                urlDeLaImagen = 'http://i.annih.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
            } else {
                // Si sí hay imagen, construimos la URL completa.
                urlDeLaImagen = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;
            }

            // Llenamos la tarjeta con el HTML del personaje (su imagen, nombre y botones).
            tarjetaDelPersonaje.innerHTML = `
                <img src="${urlDeLaImagen}" alt="Imagen de ${personaje.name}">
                <h3>${personaje.name}</h3>
                <div class="card-buttons">
                    <button class="btn-fav" data-id="${personaje.id}" data-nombre="${personaje.name}" data-imagen="${urlDeLaImagen}">⭐ Favorito</button>
                    <button class="btn-remove">❌ Quitar</button>
                </div>
            `;

            // Finalmente, añadimos la tarjeta que acabamos de crear al contenedor de resultados en la página.
            contenedorDeResultados.appendChild(tarjetaDelPersonaje);
        }
    }

    /**
     * Muestra la lista de favoritos guardados en el panel derecho.
     */
    function mostrarFavoritosEnPantalla() {
        contenedorDeFavoritos.innerHTML = '';

        if (listaDeFavoritos.length === 0) {
            contenedorDeFavoritos.innerHTML = '<p>Aún no tienes favoritos.</p>';
            return;
        }

        for (const favorito of listaDeFavoritos) {
            const itemFavorito = document.createElement('div');
            itemFavorito.className = 'favorite-item';
            
            itemFavorito.innerHTML = `
                <p>${favorito.nombre}</p>
                <div class="fav-buttons">
                    <button class="btn-view" data-id="${favorito.id}">👁️ Ver</button>
                    <button class="btn-remove-fav" data-id="${favorito.id}">🗑️</button>
                </div>
            `;
            contenedorDeFavoritos.appendChild(itemFavorito);
        }
    }
    
    function agregarPersonajeAFavoritos(id, nombre, imagen) {
        // Antes de añadir, revisamos si el personaje ya está en la lista para no repetirlo.
        let yaEsFavorito = false;
        for (const favorito of listaDeFavoritos) {
            if (favorito.id === id) {
                yaEsFavorito = true;
                break; // Si lo encontramos, rompemos el bucle, no hace falta seguir buscando.
            }
        }

        if (yaEsFavorito) {
            alert(`${nombre} ya está en tu lista de favoritos.`);
        } else {
            // Si no estaba en la lista, creamos un nuevo objeto y lo añadimos.
            const nuevoFavorito = {
                id: id,
                nombre: nombre,
                imagen: imagen
            };
            listaDeFavoritos.push(nuevoFavorito);
            
            // Guardamos la lista actualizada en el navegador y refrescamos la pantalla.
            guardarFavoritos();
            mostrarFavoritosEnPantalla();
        }
    }
    
    
    function quitarPersonajeDeFavoritos(idDelPersonaje) {
        const nuevosFavoritos = []; // Creamos una nueva lista temporal vacía.
        
        // Recorremos la lista actual de favoritos.
        for (const favorito of listaDeFavoritos) {
            // Solo añadimos a la nueva lista aquellos que NO queremos borrar.
            if (favorito.id !== idDelPersonaje) {
                nuevosFavoritos.push(favorito);
            }
        }
        
        // Reemplazamos la lista vieja por la nueva que ya no tiene el personaje eliminado.
        listaDeFavoritos = nuevosFavoritos;
        
        // Guardamos y actualizamos la pantalla.
        guardarFavoritos();
        mostrarFavoritosEnPantalla();
    }
    
    /**
     * Guarda la lista actual de favoritos en el almacenamiento local del navegador.
     * 'JSON.stringify' convierte nuestra lista de objetos en un texto plano para poder guardarla.
     */
    function guardarFavoritos() {
        localStorage.setItem('marvelFavorites', JSON.stringify(listaDeFavoritos));
    }

    // 1. Cuando el usuario envía el formulario de búsqueda (haciendo clic en el botón o pulsando Enter).
    formularioDeBusqueda.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Evita que la página se recargue, que es el comportamiento por defecto de un formulario.
        const terminoDeBusqueda = inputDeBusqueda.value; // Obtenemos el texto que el usuario escribió.
        buscarPersonajesEnAPI(terminoDeBusqueda); // Llamamos a la función principal de búsqueda.
    });

    // 2. Cuando el usuario hace clic DENTRO del contenedor de resultados.
    // Esto se llama "delegación de eventos". En lugar de poner un listener en cada botón,
    // ponemos uno solo en el contenedor padre y luego averiguamos a qué se le hizo clic.
    contenedorDeResultados.addEventListener('click', function(evento) {
        // 'evento.target' es el elemento exacto donde el usuario hizo clic (podría ser un h3, una imagen, etc.).
        
        // Si el elemento donde se hizo clic tiene la clase 'btn-fav'...
        if (evento.target.classList.contains('btn-fav')) {
            const boton = evento.target;
            agregarPersonajeAFavoritos(
                boton.dataset.id, 
                boton.dataset.nombre, 
                boton.dataset.imagen
            );
        }

        // Si el elemento donde se hizo clic tiene la clase 'btn-remove'...
        if (evento.target.classList.contains('btn-remove')) {
            // 'closest' busca el "ancestro" más cercano que coincida con el selector.
            // En este caso, busca la tarjeta completa a la que pertenece el botón.
            const tarjetaParaQuitar = evento.target.closest('.character-card');
            if (tarjetaParaQuitar) {
                tarjetaParaQuitar.remove(); // Elimina la tarjeta de la pantalla.
            }
        }
    });
    
    // 3. Cuando el usuario hace clic DENTRO del contenedor de favoritos.
    contenedorDeFavoritos.addEventListener('click', function(evento) {
        const id = evento.target.dataset.id;
        if (!id) return; // Si el clic no fue en un botón con id, no hacemos nada.

        // Si el clic fue en un botón para quitar de favoritos...
        if (evento.target.classList.contains('btn-remove-fav')) {
            quitarPersonajeDeFavoritos(id);
        }

        // Si el clic fue en un botón para "ver"...
        if (evento.target.classList.contains('btn-view')) {
            let personajeParaVer;
            // Buscamos en nuestra lista el personaje con ese ID.
            for (const favorito of listaDeFavoritos) {
                if (favorito.id === id) {
                    personajeParaVer = favorito;
                    break;
                }
            }
            
            // Creamos un objeto con el formato que la función 'mostrarPersonajesEnPantalla' espera.
            const personajeFormateado = {
                id: personajeParaVer.id,
                name: personajeParaVer.nombre,
                thumbnail: {
                    path: personajeParaVer.imagen.substring(0, personajeParaVer.imagen.lastIndexOf('.')),
                    extension: personajeParaVer.imagen.substring(personajeParaVer.imagen.lastIndexOf('.') + 1)
                }
            };
            // Mostramos solo esa tarjeta en el panel principal.
            mostrarPersonajesEnPantalla([personajeFormateado]);
        }
    });


    // Cuando la página carga por primera vez, mostramos los favoritos guardados en el navegador.
    mostrarFavoritosEnPantalla();
    
});