import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltrosProducto } from '../../models/product.model';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {

  // info que llegan del padre
  @Input() categorias: string[] = [];
  @Input() marcas: string[] = [];

  // eventos que se envían al padre
  @Output() filtrosAplicados = new EventEmitter<FiltrosProducto>();
  @Output() filtrosLimpiados = new EventEmitter<void>();

  filtros: FiltrosProducto = {
    precioMinimo: undefined,
    categoria: '',
    marca: ''
  };

  aplicarFiltros(): void {
    this.filtrosAplicados.emit(this.filtros);
  }

  limpiarFiltros(): void {
    this.filtros = {
      precioMinimo: undefined,
      categoria: '',
      marca: ''
    };
    this.filtrosLimpiados.emit();
  }
}
