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

    async cargarInfoJSON(callback){
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
  contenedor.innerHTML = '';

  catalogo.obtenerTodos().forEach(producto => {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4';

    div.innerHTML = `
      <div class="card shadow-sm">
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.marca} - Talla: ${producto.talla}</p>
          <p class="card-text fw-bold">$${producto.precio}</p>
          <button class="btn btn-primary btn-sm">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}