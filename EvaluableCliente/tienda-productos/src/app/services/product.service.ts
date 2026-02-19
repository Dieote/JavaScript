import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producto, RespuestaProductos } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<RespuestaProductos> {
    return this.http.get<RespuestaProductos>(this.urlApi);
  }

  obtenerCategorias(productos: Producto[]): string[] {
    const categorias = productos.map(p => p.category);
    const unicas = [...new Set(categorias)];
    return unicas.sort();
  }

  obtenerMarcas(productos: Producto[]): string[] {
    const marcas = productos.map(p => p.brand);
    const unicas = [...new Set(marcas)];
    return unicas.sort();
  }
}


