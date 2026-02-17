// Esta interfaz define la estructura de un producto que viene desde la API
export interface Producto {
  id:                  number;    
  title:               string;    
  description:         string;    // Descripción 
  price:               number;    // Precio base
  stock:               number;    // unidades disponibles
  brand:               string;    
  category:            string;    
}

