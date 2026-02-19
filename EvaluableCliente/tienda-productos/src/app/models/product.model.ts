// producto que viene de la API
export interface Producto {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// respuesta de la API
export interface RespuestaProductos {
  products: Producto[];
  total: number;
  skip: number;
  limit: number;
}

export interface FiltrosProducto {
  precioMinimo?: number;
  categoria?: string;
  marca?: string;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}
