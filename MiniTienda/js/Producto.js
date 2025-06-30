class Producto {

    constructor(id, nombre, marca, precio, talla, img) {
        this._id = id;
        this._nombre = nombre;
        this._marca = marca;
        this._precio = precio;
        this._talla = talla;
        this._img = img;
    }
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get marca() {
        return this._marca;
    }
    set marca(marca) {
        this._marca = marca;
    }

    get precio() {
        return this._precio;
    }
    set precio(precio) {
        this._precio = precio;
    }

    get talla() {
        return this._talla;
    }
    set talla(talla) {
        this._talla = talla;
    }

    get img() {
        return this._img;
    }
    set img(img) {
        this._img = img;
    }
    mostrarInformacion() {
        return ' * ' + this._nombre + ' ' + this._marca + ' ' + this._talla + ' | €' + this._precio;
    }

    toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      marca: this.marca,
      precio: this.precio,
      talla: this.talla,
      img: this.img
    };
  }
  
    toString() {
        return this.mostrarInformacion();
    }
}