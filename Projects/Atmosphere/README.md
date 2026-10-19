# Dashboard del tiempo

Dashboard responsive para consultar el tiempo actual, el pronóstico de cinco días y la ubicación en un mapa. Está hecho con HTML, CSS y JavaScript, sin framework de estilos.

## Empezar

1. Abre esta carpeta con Visual Studio Code y ejecuta `index.html` con la extensión **Live Server**. También puedes usar cualquier servidor estático local.
2. Busca una ciudad o pulsa **Usar mi ubicación** y acepta el permiso del navegador.

La aplicación usa [Open-Meteo](https://open-meteo.com/) para geocodificación y datos meteorológicos; no hace falta crear una cuenta ni configurar una clave API. La geolocalización es opcional y solo requiere permiso del navegador. Antes de publicar el sitio, revisa las condiciones de uso, límites y requisitos de atribución de Open-Meteo.

## Estructura

- `index.html`: contenido y estructura de la página.
- `styles.css`: estilos de la página, organizados por componentes con nombres descriptivos.
- `app.js`: búsqueda, geolocalización, llamadas a la API y actualización del mapa.

## Como leer los estilos

- Las clases del HTML indican qué representa cada elemento, por ejemplo `.weather-card` o `.metric-card`.
- En `styles.css`, cada bloque empieza con un selector y aplica propiedades CSS a los elementos que coinciden.
- `:root` define la tipografía y los colores base de la página. Las reglas `@media` del final adaptan el diseño a pantallas pequeñas.
- Las clases `forecast-*` se añaden desde `app.js` al crear las filas del pronóstico.

## Servicios usados

- [Open-Meteo](https://open-meteo.com/): geocodificación y datos meteorológicos sin clave API.
- [Leaflet](https://leafletjs.com/) y [OpenStreetMap](https://www.openstreetmap.org/copyright): mapa interactivo.
- [Google Fonts](https://fonts.google.com/): tipografías DM Sans y Manrope.
