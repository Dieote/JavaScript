// servicio maneja toda la lógica relacionada con productos:
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ // @Injectable indica que este servicio puede ser inyectado en componentes
  providedIn: 'root'
})
export class ProductService {

  // URL base de la API
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

//peticiones
