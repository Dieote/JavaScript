class Catalogo {

    constructor() {
        this.productos = [];
    }

    agregarProducto(productoNuevo) {
        this.productos.push(productoNuevo);
    }

    cargarDesdeJSON(data) {
        this.productos = data.map(item => new Producto(
            item.id, item.nombre, item.marca, item.precio, item.talla, item.img
        ));
    }

    async cargarInfoJSON(callback) {
        try {
            const res = await fetch('data/productos.json');
            const data = await res.json();
            this.cargarDesdeJSON(data);
            if (callback) callback(); // para renderizar luego
        } catch (error) {
            console.error('Error al cargar JSON:', error);
        }
    }
    /* 
        guardarLocalStoraga() {
            localStorage.setItem('catalogo', JSON.stringify(this.producto.map(p => p.toJSON())));
        }
        cargarDesdeLocalStorage() {
            const datos = localStorage.getItem('catalogo');
            if (datos) {
                this.cargarDesdeJSON(JSON.parse(datos));
            }
        } */

    obtenerTodos() {
        return this.productos;
    }

}

function renderizarCatalogo(catalogo) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) {
    console.error('⚠️ contenedor-productos no encontrado en el DOM');
    return;
  }
    contenedor.innerHTML = '';

    catalogo.obtenerTodos().forEach(producto => {
         contenedor.innerHTML += producto.generarHTML();
    });
}