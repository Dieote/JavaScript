import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/cart.service';
import { ItemCarrito } from '../../models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  @Input() visible = false;
  @Output() cerrado = new EventEmitter<void>();

  constructor(public carritoService: CarritoService) { }

  get items(): ItemCarrito[] {
    return this.carritoService.obtenerItems();
  }

  get total(): number {
    return this.carritoService.calcularTotal();
  }

  get totalUnidades(): number {
    return this.carritoService.calcularTotalUnidades();
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  cerrarPanel(): void {
    this.cerrado.emit();
  }

  comprar(): void {
    const total = this.total;

    Swal.fire({
      title: '¿Confirmar compra?',
      html: `Vas a realizar una compra por valor de <strong>€${total.toFixed(2)}</strong>. Estás seguro?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#f44336'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.carritoService.vaciarCarrito();
        this.cerrarPanel();

        Swal.fire({
          icon: 'success',
          title: 'Compra realizada!',
          text: `Tu pedido por €${total.toFixed(2)} ha sido procesado con éxito`,
          confirmButtonText: 'Genial'
        });
      }
    });
  }
}
