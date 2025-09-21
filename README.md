🦸 Marvel Heroes Explorer
Este proyecto es una página web interactiva que consume la Marvel API para mostrar personajes en tiempo real. Permite buscar héroes, ver sus imágenes y nombres, y guardar tus favoritos.
<img width="681" height="295" alt="ProyectoMcu" src="https://github.com/user-attachments/assets/573f21db-625d-4155-9bcc-390d5ccf13a9" />

🚀 Características
• 🔎 Búsqueda de personajes usando la API de Marvel.
• 🖼 Visualización de imágenes y nombres de los héroes.
• ⭐ Sistema de favoritos persistente gracias a localStorage.
• ❌ Eliminar personajes de la lista mostrada.
• 👁 Ver favoritos de forma individual en el panel derecho.
• ⚡ Código escrito en JavaScript moderno (fetch, async/await).
📂 Estructura del Proyecto
.
├── index.html       # Estructura de la página
├── style.css        # Estilos (diseño y colores)
└── script.js        # Lógica principal de conexión a la API y manejo de eventos
🔑 Configuración de la API
Este proyecto usa la Marvel Developer API, así que debes obtener tus llaves:

1. Regístrate en https://developer.marvel.com/
2. Crea un nuevo proyecto para obtener tu Public Key y Private Key.
3. Reemplaza las variables dentro de script.js:

const MI_LLAVE_PUBLICA = 'TU_PUBLIC_KEY';
const MI_LLAVE_PRIVADA = 'TU_PRIVATE_KEY';

⚠ IMPORTANTE: Marvel requiere generar un hash MD5 usando timestamp + privateKey + publicKey. Este proyecto ya lo hace por ti usando CryptoJS.
🛠 Instalación y Uso
1. Clona este repositorio o descarga los archivos:
   git clone https://github.com/TU-USUARIO/marvel-heroes-explorer.git
2. Abre index.html en tu navegador.
3. Escribe el nombre de un personaje en la barra de búsqueda y presiona Enter.
4. Marca como ⭐ favorito a tus héroes preferidos y se guardarán en el panel lateral.

📚 Tecnologías Usadas

• HTML5 – Estructura de la página

• CSS3 – Estilos y diseño visual

• JavaScript (Vanilla) – Conexión a la API y lógica de favoritos

• Marvel API – Datos oficiales de personajes

• CryptoJS – Generación de hash MD5

📜 Licencia

Este proyecto es de código abierto. Puedes modificarlo y adaptarlo para uso personal o educativo.

Proyecto creado por DAnte.Dev. Si te gustó el proyecto, no dudes en dejar una ⭐ en tu repositorio.
