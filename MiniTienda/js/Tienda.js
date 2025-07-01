class Tienda {
  constructor(catalogo) {
    this.catalogo = catalogo;
    this.carrito = [];
    this.filtros = {
      marca: '',
      nombre: '',
      talla: ''
    };
  }

  agregarAlCarrito(productoId) {
    const idNum = parseInt(productoId, 10);
    const producto = this.catalogo.obtenerTodos().find(item => item.id === idNum);
    if (producto) {
      this.carrito.push(producto);
      this.guardarCarrito();
      this.actualizarContadorCarrito();
    } else {
      console.error(`Producto con ID ${productoId} no encontrado en el catálogo.`);
    }
  }

  eliminarDelCarrito(productoId) {
    const idNum = parseInt(productoId, 10);
    const index = this.carrito.findIndex(item => item.id === idNum);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
      this.actualizarContadorCarrito();
    } else {
      console.error(`Producto con ID ${productoId} no encontrado en el carrito.`);
    }
  }

  aplicarFiltros() {
    let resultado = this.catalogo.obtenerTodos();

    if (this.filtros.nombre) {
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase())
      );
    }

    if (this.filtros.marca) {
      resultado = resultado.filter(p =>
        p.marca.toLowerCase() === this.filtros.marca.toLowerCase()
      );
    }

    if (this.filtros.talla) {
      resultado = resultado.filter(p =>
        p.talla.toLowerCase() === this.filtros.talla.toLowerCase()
      );
    }

    return resultado;
  }

  renderizarCatalogoFiltrado() {
    const productoFiltrado = this.aplicarFiltros();
    renderizarCatalogo({ obtenerTodos: () => productoFiltrado });
  }


  //carrito
  mostrarCarritoEnModal() {
    const lista = document.getElementById('lista-carrito-modal');
    const totalCarrito = document.getElementById('total-carrito');

    if (!lista || !totalCarrito) {
      console.error('Elementos del DOM no encontrados: lista o totalCarrito');
      return; 
    }
    lista.innerHTML = '';

    if (this.carrito.length === 0) {
      lista.innerHTML = '<p>El carrito está vacío.</p>';
      totalCarrito.textContent = '0.00';
      return;
    }

    this.renderizarProductosEnModal(lista);
    totalCarrito.textContent = this.calcularTotalCarrito().toFixed(2);
    this.actualizarContadorCarrito();
    this.eventoEliminarDelCarrito(lista);
  }

  renderizarProductosEnModal(lista) {
    this.carrito.forEach(producto => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex justify-content-between align-items-center';
      item.innerHTML = `
            <div class="d-flex justify-content-between w-100">
    <div>
      <strong>${producto._nombre}</strong><br>
      <small>Marca: ${producto._marca} | Talla: ${producto._talla}</small>
    </div>
    <div class="text-end">
      <span class="badge bg-primary">$${producto._precio}</span><br>
      <button class="btn btn-danger btn-sm eliminar-del-carrito mt-1" data-id="${producto._id}">Eliminar</button>
    </div>
  </div>
`;
      lista.appendChild(item);
    });
  }

    calcularTotalCarrito(){
      let total = 0;
      this.carrito.forEach(producto => {
        total += parseFloat(producto.precio);
      });
      return total;
    }

    eventoEliminarDelCarrito(lista) {
      lista.onclick = (e) => {
    if (e.target.classList.contains('eliminar-del-carrito')) {
      const id = e.target.dataset.id;
      this.eliminarDelCarrito(id);
      this.mostrarCarritoEnModal();
    }
  };
    }
  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  cargarCarrito() {
    const datos = localStorage.getItem('carrito');
    if (datos) {
      const arr = JSON.parse(datos);
      this.carrito = arr.map(obj => new Producto(
        obj._id || obj.id,
        obj._nombre || obj.nombre,
        obj._marca || obj.marca,
        obj._precio || obj.precio,
        obj._talla || obj.talla,
        obj._img || obj.img
      ));
    }
  }

  actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');
    contador.textContent = this.carrito.length;
  }

  vaciarCarrito() {
    this.carrito = [];
    this.guardarCarrito();
    this.actualizarContadorCarrito();
  }

}