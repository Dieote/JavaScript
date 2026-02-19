import { Injectable } from '@angular/core';
import { Producto, ItemCarrito } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: ItemCarrito[] = [];

  constructor() {
    this.cargarCarrito();
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  agregarProducto(producto: Producto): void {
    const existe = this.items.find(item => item.id === producto.id);

    if (existe) {
      existe.cantidad++;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }

    this.guardarCarrito();
  }

  eliminarProducto(idProducto: number): void {
    this.items = this.items.filter(item => item.id !== idProducto);
    this.guardarCarrito();
  }

  vaciarCarrito(): void {
    this.items = [];
    this.guardarCarrito();
  }

  calcularTotal(): number {
    let total = 0;
    for (let item of this.items) {
      total += item.price * item.cantidad;
    }
    return total;
  }

  private guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  private cargarCarrito(): void {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.items = JSON.parse(guardado);
    }
  }
}
