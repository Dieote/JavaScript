class Jugador {
    constructor(nombre = 'Jugador') {
        this.nombre = nombre;
        this.cartas = [];
        this.puntos = 0;
        this.plantarse = false;
    }

    recibirCarta(carta) {
        this.cartas.push(carta);
        this.calcularPuntos();
    }

    calcularPuntos() {
        let total = 0;  

        for (let carta of this.cartas) {
            if(carta.valor === 'A') total += 1;
            else if (['J', 'Q', 'K'].includes(carta.valor)) total += 10;
            else total += parseInt(carta.valor);
        }

        this.puntos = total;
    }

    resetear() {
        this.cartas = [];
        this.puntos = 0;
        this.plantarse = false;
    }
}