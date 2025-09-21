# 🦸‍♂️ Proyecto MCU


<img width="681" height="295" alt="ProyectoMcu" src="https://github.com/user-attachments/assets/d4de91c6-3c14-48d0-91ff-4a84921a4d86" />


Una aplicación web interactiva para explorar el universo Marvel utilizando la API oficial de Marvel Comics. Busca tus personajes favoritos, agrégalos a tu lista personal y descubre el multiverso de héroes y villanos.

## 🚀 Características

- **Búsqueda en tiempo real**: Encuentra personajes de Marvel por nombre
- **Sistema de favoritos**: Guarda tus personajes preferidos localmente
- **Interfaz cyberpunk**: Diseño futurista con efectos neon y gradientes
- **Responsive**: Compatible con dispositivos móviles y desktop
- **Persistencia local**: Tus favoritos se guardan en el navegador

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados con efectos visuales
- **JavaScript ES6+**: Lógica de aplicación y manejo de API
- **Marvel API**: Fuente de datos de personajes
- **CryptoJS**: Para autenticación con la API de Marvel
- **LocalStorage**: Persistencia de datos local

## 📦 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/proyecto-mcu.git
```

2. Navega al directorio del proyecto:
```bash
cd proyecto-mcu
```

3. Obtén tus claves de API de Marvel:
   - Visita [Marvel Developer Portal](https://developer.marvel.com/)
   - Regístrate y obtén tu clave pública y privada

4. Edita el archivo `script.js` y reemplaza las claves de API:
```javascript
const MI_LLAVE_PUBLICA = 'tu_clave_publica_aqui';
const MI_LLAVE_PRIVADA = 'tu_clave_privada_aqui';
```

5. Abre `index.html` en tu navegador favorito

## 🎮 Cómo Usar

1. **Buscar personajes**: Escribe el nombre de un personaje en la barra de búsqueda
2. **Agregar favoritos**: Haz clic en el botón "⭐ Favorito" en cualquier personaje
3. **Ver favoritos**: Usa el botón "👁️ Ver" en el panel de favoritos
4. **Quitar personajes**: Usa los botones de eliminar según necesites

## 🌟 Funcionalidades

### Búsqueda Inteligente
- Búsqueda por nombre que comience con el texto ingresado
- Manejo de errores de conexión
- Mensajes informativos durante la carga

### Sistema de Favoritos
- Almacenamiento local persistente
- Prevención de duplicados
- Gestión completa (agregar/quitar/visualizar)

### Interfaz Moderna
- Efectos de hover y animaciones suaves
- Paleta de colores cyberpunk (azul neon, magenta, verde)
- Gradientes y efectos de brillo
- Diseño card-based para mejor organización

## 🎨 Capturas de Pantalla

La aplicación presenta un diseño futurista con:
- Fondo oscuro con efectos de partículas
- Tarjetas de personajes con bordes neon
- Panel lateral de favoritos
- Efectos visuales dinámicos

## 🔧 Estructura del Proyecto

```
proyecto-mcu/
│
├── index.html          # Estructura principal
├── styles.css          # Estilos y animaciones
├── script.js           # Lógica de la aplicación
└── README.md           # Este archivo
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Reconocimientos

- **Marvel Comics** por proporcionar la API
- **CryptoJS** por las herramientas de encriptación
- La comunidad de desarrolladores por inspiración y recursos

**DAnte.Dev** - Creador del Proyecto



⭐ **¡No olvides darle una estrella al proyecto si te gustó!** ⭐

*Sistema The Goog775 © 2025 | Creado por DAnte.Dev | Todos los derechos reservados*
