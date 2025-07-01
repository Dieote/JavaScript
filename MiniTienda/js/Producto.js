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
    generarHTML() {
        return `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm">
                <img src="${this.img}" class="card-img-top producto-img" alt="${this.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${this.nombre}</h5>
                    <p class="card-text">${this.marca} - Talla: ${this.talla}</p>
                    <p class="card-text fw-bold">$${this.precio}</p>
                    <button class="btn btn-primary btn-sm agregar-carrito" data-id="${this.id}">Agregar al carrito</button>
                </div>
            </div>
            </div>
        `;
    }
}