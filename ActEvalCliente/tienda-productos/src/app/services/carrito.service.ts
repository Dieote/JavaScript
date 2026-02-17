import { Injectable } from "@angular/core";
import { ItemCarrito, Producto } from "../model/product";
@Injectable({ providedIn: 'root' })
export class CarritoService {
  // observable público; los componentes se suscriben a esto
  readonly items$: Observable<ItemCarrito[]> = this._items.asObservable();

  get itemsActuales(): ItemCarrito[] {
    return this._items.getValue();
  }
