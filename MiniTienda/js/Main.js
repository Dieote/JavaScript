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

  const abrirCarrito = document.getElementById('lista-carrito')
  if (abrirCarrito) {
  abrirCarrito.addEventListener('click', () => {
    tienda.mostrarCarritoEnModal();
    modalOn.show();

    const cerrarCarrito = document.getElementById('modalCarrito');
const modalOff = bootstrap.Modal.getInstance(cerrarCarrito) || new bootstrap.Modal(cerrarCarrito);
modalOff.hide();
  });
}

  document.addEventListener('click', e => {
    if (e.target.classList.contains('agregar-carrito')) {
      const id = e.target.getAttribute('data-id');
      tienda.agregarAlCarrito(id);
    }
  });
});
    
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
    const listaCarrito = document.getElementById('lista-carrito');
    if (listaCarrito) {
      listaCarrito.addEventListener('click', (e) => {
        if (e.target === listaCarrito) {
          tienda.mostrarCarritoEnModal();
          const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
          modal.show();
        }
      });
    }
  }
    
  