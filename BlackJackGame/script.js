let nombreJugador = '';
let mazo = [];
let banca = { cartas: [], puntos: 0 };
let jugador = { cartas: [], puntos: 0 };

// DOM
const bancaCartasDiv = querySelector('#bancaCards');
const jugadorCartasDiv = querySelector('#jugadorCards');
const bancaPuntosSpan = querySelector('#bancaScore');
const jugadorPuntosSpan = querySelector('#jugadorScore');
const botonPedir = querySelector('#botonPedir');
const botonPlantarse = querySelector('#botonPlantarse');
const botonReiniciar = querySelector('#botonReiniciar');

const bancaPoints = querySelector('#bancaPoints');
const userPoints = querySelector('#userPoints');
const bancaTotalCards = querySelector('#bancaTotalCards');
const userTotalCards = querySelector('#userTotalCards');
const bancaStatus = querySelector('#bancaStatus');
const userStatus = querySelector('#userStatus');
const userName = querySelector('#userName');

window.addEventListener('DOMContentLoaded', () => {
    pedirNombreJugador();
});

// SweetAlert2 ====
function pedirNombreJugador() {
    Swal.fire({
        title: 'Bienvenido al Blackjack',
        input: 'text',
        inputLabel: 'Introduce tu nombre:',
        inputPlaceholder: 'Nombre del jugador',
        confirmButtonText: 'Iniciar Juego',
        background: '#fcfaf7ff',
        confirmButtonColor: '#7a1f1f',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, introduce un nombre';
            }
        }
    }).then((resultado) => {
        nombreJugador = resultado.value;
        document.getElementById('jugadorNameValue').textContent = nombreJugador;
        userName.textContent = nombreJugador;
        iniciarJuego();
    });
}

// MAzo y cartas
function crearMazo() {
    const palos = [' ♠', ' ♣', ' ♦', ' ♥'];
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    mazo = [];  
    for (let valor of valores) {
        for (let palo of palos) {
            mazo.push({ valor, palo });
        }
    }
    mazo.sort(() => Math.random() - 0.5); // mezcla
}

function repartirCartas(recibeJugador) {
    const carta = mazo.pop(); //saca del mazo la ultma carta
    recibeJugador.cartas.push(carta);
    recibeJugador.puntos = calcularLosPuntos(recibeJugador.cartas);
    actualizarVista();
}

function calcularLosPuntos(cartas) {
    let total = 0;
    for (let carta of cartas) {
        if (carta.valor === 'A') total += 1;
        else if (['J', 'Q', 'K'].includes(carta.valor)) total += 10;
        else total += parseInt(carta.valor);
    }
    return total;
}

function actualizarVista() {
    bancaCartasDiv.innerHTML = banca.cartas.map(c => c.valor + c.palo).join(' ');
    jugadorCartasDiv.innerHTML = jugador.cartas.map(c => c.valor + c.palo).join(' ');
}

function iniciarJuego() {
    crearMazo();
   banca = { cartas: [], puntos: 0 };
    jugador = { cartas: [], puntos: 0 };
    actualizarVista();
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    bancaStatus.textContent = 'Jugando..';
    userStatus.textContent = 'Esperando..';
    juegaLaBanca();
}

function juegaLaBanca() {
    //con set interval puedo ver como la banca saca cartas de forma pausada
    // crea una sensación real de que esta “pensando.
    const bancaIntervalo = setInterval(() => {
        repartirCartas(banca);
        if (banca.puntos >= 17) {
            clearInterval(bancaIntervalo);
            if (banca.puntos > 21) {
                bancaStatus.textContent = 'Se pasó!';
                finalizarJuego('¡Ganaste! La banca se pasó.');
            } else {
                bancaStatus.textContent = 'Plantada';
                comenzarTurnoJugador();
            }
        }
    }, 1000);
}

// Turno Jugador
function comenzarTurnoJugador() {
    botonPedir.disabled = false;
    botonPlantarse.disabled = false;
    userStatus.textContent = 'Jugando..';
}

botonPedir.addEventListener('click', () => {
    // usar la función definida `repartirCartas`
    repartirCartas(jugador);
    if (jugador.puntos > 21) {
        userStatus.textContent = 'Se pasó';
        finalizarJuego('Te has pasado. Pierdes.');
    }
});

botonPlantarse.addEventListener('click', () => {
    userStatus.textContent = 'Plantado';
    decidirGanador();
});

botonReiniciar.addEventListener('click', () => {
    location.reload();
});



function finalizarJuego(mensaje) {
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    userStatus.textContent = 'Finalizado';

    Swal.fire({
        title: 'Resultado',
        text: mensaje,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#7a1f1f',
        background: '#fff5f2'
    });
}
