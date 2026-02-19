import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { ProductoService } from '../../services/product.service';
import { CarritoService } from '../../services/cart.service';
import { Producto, FiltrosProducto } from '../../models/product.model';
import { FiltrosComponent } from '../filtros/filtros.component';
import { CarritoComponent } from '../carrito/carrito.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FiltrosComponent, CarritoComponent],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  todosLosProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  categorias: string[] = [];
  marcas: string[] = [];

  cargando = false;
  error: string | null = null;
  carritoVisible = false;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;

    this.productoService.obtenerProductos().subscribe({
      next: (respuesta) => {
        this.todosLosProductos = respuesta.products;
        this.productosFiltrados = respuesta.products;
        this.categorias = this.productoService.obtenerCategorias(respuesta.products);
        this.marcas = this.productoService.obtenerMarcas(respuesta.products);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.error
        });
      }
    });
  }

  aplicarFiltros(filtros: FiltrosProducto): void {
    this.productosFiltrados = this.todosLosProductos.filter(producto => {
      let cumple = true;

      if (filtros.precioMinimo && producto.price < filtros.precioMinimo) {cumple = false;
      }

      if (filtros.categoria && producto.category !== filtros.categoria) {cumple = false;
      }

      if (filtros.marca && producto.brand !== filtros.marca) {cumple = false;
      }
      return cumple;
    });

    Swal.fire({
      icon: 'info',
      title: 'Filtros aplicados',
      text: `Se encontraron ${this.productosFiltrados.length} productos`,
      timer: 2000,
      showConfirmButton: false
    });
  }

  limpiarFiltros(): void {
    this.productosFiltrados = this.todosLosProductos;
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);

    Swal.fire({
      icon: 'success',
      title: 'Añadido!',
      text: `${producto.title} se añadió al carrito`,
      timer: 1500,
      showConfirmButton: false
    });
  }

  toggleCarrito(): void {
    this.carritoVisible = !this.carritoVisible;
  }

  cerrarCarrito(): void {
    this.carritoVisible = false;
  }

  get totalUnidades(): number {
    return this.carritoService.calcularTotalUnidades();
  }
}
