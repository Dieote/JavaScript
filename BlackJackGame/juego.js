class Juego {
    constructor(nombreJugador) {
        this.mazo = new Mazo();
        this.banca = new Jugador('Banca');
        this.jugador = new Jugador(nombreJugador);
    }
    inicioDeJuego() {
        this.banca.resetear();
        this.jugador.resetear();
        this.mazo.crearMazo();
    }

    juegaLaBanca(bancaFin, comenzarTurnoJugador) {
        let turnoBanca = () => {
            this.banca.recibirCarta(this.mazo.robarCarta());

    vista.actualizarVistaBanca(this);

    if(this.banca.puntos > 21) {
        bancaFin("banca-se-paso");
        return;
    }

    if (this.banca.puntos >= 17) {
        comenzarTurnoJugador();
        return;
    }
        setTimeout(turnoBanca, 1000);
    };
    turnoBanca();
}

    botonPedir() {
        this.jugador.recibirCarta(this.mazo.robarCarta());
    }

    botonPlantarse() {
        return this.decidirGanador();
    }

    decidirGanador() {
        let bancaPuntos = this.banca.puntos;
        let jugadorPuntos = this.jugador.puntos;

        if (jugadorPuntos > 21) return "jugador-se-paso";
        if (bancaPuntos > 21) return "banca-se-paso";
        if (bancaPuntos > jugadorPuntos) return "gana-banca";
        if (jugadorPuntos > bancaPuntos) return "gana-jugador";
        return "empate";
 /*       if (bancaPuntos > jugadorPuntos) {
            finalizarJuego('La banca gana.');
        } else if (bancaPuntos < jugadorPuntos) {
            finalizarJuego('¡Ganaste! La banca pierde.');
        } else if (jugadorPuntos > 21) {
            finalizarJuego('La banca gana! TE PASASTE');
        } else if (bancaPuntos > 21) {
            finalizarJuego('¡Ganaste! La banca se paso');
        } else {
            finalizarJuego('Empate.');
        } */
    }
}
    