document.addEventListener('DOMContentLoaded', () => {
  const catalogo = new Catalogo();
  const tienda = new Tienda(catalogo);

  catalogo.cargarInfoJSON(() => {
    tienda.renderizarCatalogoFiltrado();
    configurarFiltros(tienda);
    tienda.cargarCarrito();
    tienda.actualizarContadorCarrito();
    tienda.mostrarCarritoEnModal();
  });

const abrirCarrito = document.getElementById('lista-carrito');
if (abrirCarrito) {
  abrirCarrito.addEventListener('click', () => {
    tienda.mostrarCarritoEnModal();
    const modal = document.getElementById('modalCarrito');
    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();
  });
}

  document.addEventListener('click', e => {
    if (e.target.classList.contains('agregar-carrito')) {
      const id = e.target.getAttribute('data-id');
      tienda.agregarAlCarrito(id);
    }
  });


const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
  const pedidosRealizados = pedidosGuardados.map(p => new Pedido(p.id, p.direccion, p.productos));
  renderizarPedidos(pedidosRealizados);

  document.getElementById('finalizar-compra')?.addEventListener('click', () => {
    if (tienda.carrito.length === 0) {
      alert('Tu carrito está vacío 🛒');
      return;
    }

    const direccion = prompt('📍 Ingrese su dirección de entrega:');
    if (!direccion) return "🚫 Dirección no válida";

    const productosPedido = tienda.carrito.map(prod => ({
      nombre: prod.nombre,
      marca: prod.marca,
      talla: prod.talla,
      precio: prod.precio
    }));

    const nuevoPedido = new Pedido(
      Date.now(),
      direccion,
      productosPedido
    );

    pedidosRealizados.push(nuevoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosRealizados));
    renderizarPedidos(pedidosRealizados);

    tienda.vaciarCarrito(); 
    tienda.actualizarContadorCarrito();

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    modal.hide();

    alert('✅ Pedido registrado con éxito');
  });

  renderizarPedidos(pedidosRealizados);
});

 /*  function renderizarPedidos(pedidos) {
    const lista = document.getElementById('lista-pedidos');
    lista.innerHTML = '';

    pedidos.forEach((pedido) => {
      const productosHTML = pedido.productos.map(prod => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${prod.nombre} (${prod.talla}) - ${prod.marca}   <span class="badge bg-primary rounded-pill">${prod.precio.toFixed(2)}€</span>
        </li>
      `).join('');

      lista.innerHTML += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Pedido #${pedido.id}</h5>
            <p class="card-text">Dirección: ${pedido.direccion}</p>
            <p class="card-text">Total: ${pedido.total.toFixed(2)}€</p>
            <h6 class="card-subtitle mb-2 text-muted">Productos:</h6>
            <ul class="list-group">
              ${productosHTML}
            </ul>
          </div>
        </div>
      `;
    });
  } */

  function configurarFiltros(tienda) {
    const buscador = document.getElementById('buscador-nombre');
    const selectTalla = document.getElementById('filtro-talla');
    const selectMarca = document.getElementById('filtro-marca');
    
    buscador.addEventListener('input', () => {
      tienda.filtros.nombre = buscador.value;
      tienda.renderizarCatalogoFiltrado();
    });
    selectTalla.addEventListener('change', () => {
      tienda.filtros.talla = selectTalla.value;
      tienda.renderizarCatalogoFiltrado();
    });
    selectMarca.addEventListener('change', () => {
      tienda.filtros.marca = selectMarca.value;
      tienda.renderizarCatalogoFiltrado();
    });
    }

    
