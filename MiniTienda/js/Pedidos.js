class Pedido {
    constructor(id, direccion, productos = []) {
        this.id = id;
        this.direccion = direccion;
        this.productos = productos;
        this.total = this.calcularTotal();
    }

    calcularTotal() {
        let total = 0;
        for (let i = 0; i < this.productos.length; i++) {
            const producto = this.productos[i];
            total += producto.precio;
        }
        return total;
    }

    toHTML() {
        const fecha = new Date(this.id).toLocaleString();
        const cantidadTotal = this.productos.length;
        const productosHTML = this.productos.map(prod => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${prod.nombre} (${prod.talla}) - ${prod.marca}
        <span class="badge bg-primary rounded-pill">${(prod.precio).toFixed(2)}€</span>
      </li>
    `).join('');

          return `
            <div class="card shadow mb-4 border-primary">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Pedido #${this.id}</h5>
            <span class="badge bg-warning text-dark">En preparación</span>
          </div>
          <div class="card-body">
            <p><i class="bi bi-geo-alt-fill"></i> Dirección: <strong>${this.direccion}</strong></p>
            <p><i class="bi bi-box-seam"></i> Cantidad total: <strong>${cantidadTotal}</strong></p>
            <p><i class="bi bi-cash-coin"></i> Total: <strong>${this.total.toFixed(2)}€</strong></p>
            <p class="text-muted align-content-right"><i class="bi bi-clock"></i> Fecha: <strong>${fecha}</strong></p>
              <div>
        <div>
          <button class="btn btn-outline-primary btn-sm d-flex justify-content-between align-items-center w-100"
            data-bs-toggle="collapse" data-bs-target="#pedidoCollapse${this.id}"
            aria-expanded="false" aria-controls="pedidoCollapse${this.id}">
            <span><i class="bi bi-box"></i> Productos del pedido</span>
            <span class="ms-auto"><i class="bi bi-chevron-down"></i></span>
          </button>

          <div class="collapse mt-3 border-start border-3 border-primary ps-3" id="pedidoCollapse${this.id}">
            <div class="d-flex justify-content-end mb-2">
              <button class="btn-close cerrar-collapse" data-bs-target="#pedidoCollapse${this.id}" aria-label="Cerrar"></button>
            </div>
            <ul class="list-group">
              ${productosHTML}
            </ul>
          </div>
        </div>
  
            <div class="btn-group mt-3 mb-2 me-2 ms-2" role="group">
              <button type="button" class="btn btn-danger me-2 cancelar-pedido" title="Cancelar pedido">
                <i class="bi bi-x-circle"></i> Cancelar
              </button>
              <button type="button" class="btn btn-warning me-2 editar-direccion" title="Editar dirección">
                <i class="bi bi-pencil-square"></i> Dirección
              </button>
              <button type="button" class="btn btn-info me-2 seguimiento-envio" title="Ver seguimiento">
                <i class="bi bi-truck"></i> Envío
              </button>
            </div>
          </div>
        </div>
          `;
    }
}


function renderizarPedidos(pedidos) {
    const lista = document.getElementById('lista-pedidos');
    if (!lista) return "🚫 No se encontraron pedidos en la lista de pedidos";

    lista.innerHTML = '';

    pedidos.forEach(pedido => {
        lista.innerHTML += pedido.toHTML();
    });

    lista.querySelectorAll('.cancelar-pedido').forEach(btn => {
        btn.addEventListener('click', () => alert('🛑 Comunicarse con atención al cliente'));
    });

    lista.querySelectorAll('.editar-direccion').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const nuevaDireccion = prompt('📬 Ingrese nueva dirección:');
            if (nuevaDireccion) {
              pedidos[index].direccion = nuevaDireccion; 
              localStorage.setItem('pedidos', JSON.stringify(pedidos)); 
              renderizarPedidos(pedidos);
              alert('✅ Dirección actualizada');
            }
        });
    });

    lista.querySelectorAll('.seguimiento-envio').forEach(btn => {
        btn.addEventListener('click', () => alert('📦 Comunicarse con su agente de envíos'));
    });
    lista.querySelectorAll('.cerrar-collapse').forEach(btn => {
  btn.addEventListener('click', e => {
    const targetId = btn.getAttribute('data-bs-target');
    const collapseElement = document.querySelector(targetId);
    const collapseInstance = bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement);
    collapseInstance.hide();
  });
});

}

document.addEventListener('DOMContentLoaded', () => {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedidos = pedidosGuardados.map(p => new Pedido(p.id, p.direccion, p.productos));
    renderizarPedidos(pedidos);
});
