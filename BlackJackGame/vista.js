const vista = {

    // DOM
bancaCartasDiv: document.querySelector('#bancaCards'),
jugadorCartasDiv: document.querySelector('#jugadorCards'),
bancaPuntosSpan: document.querySelector('#bancaScore'),
jugadorPuntosSpan: document.querySelector('#jugadorScore'),
botonPedir: document.querySelector('#botonPedir'),
botonPlantarse: document.querySelector('#botonPlantarse'),
botonReiniciar: document.querySelector('#botonReiniciar'),

bancaPoints: document.querySelector('#bancaPoints'),
userPoints: document.querySelector('#userPoints'),
bancaTotalCards: document.querySelector('#bancaTotalCards'),
userTotalCards: document.querySelector('#userTotalCards'),
bancaStatus: document.querySelector('#bancaStatus'),
userStatus: document.querySelector('#userStatus'),
userName: document.querySelector('#userName'),

actualizarVista(juego){
        this.bancaCartasDiv.innerHTML = juego.banca.cartas.map(c =>
            `<div class='card'>${c.valor}${c.palo}</div>`).join('');

        this.jugadorCartasDiv.innerHTML = juego.jugador.cartas.map(c =>
            `<div class='card'>${c.valor}${c.palo}</div>`).join('');

        this.bancaPuntosSpan.textContent = juego.banca.puntos;
        this.jugadorPuntosSpan.textContent = juego.jugador.puntos;
        this.bancaPoints.textContent = juego.banca.puntos;
        this.userPoints.textContent = juego.jugador.puntos;

        this.bancaTotalCards.textContent = juego.banca.cartas.length;
        this.userTotalCards.textContent = juego.jugador.cartas.length;
}
};