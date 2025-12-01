let juego = null;

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
        iniciarJuego(nombreJugador);
    });
}

function iniciarJuego(nombreJugador) {
    juego = new Juego(nombreJugador);
    juego.inicioDeJuego();
    vista.bancaStatus.textContent = 'Jugando..';
    vista.userStatus.textContent = 'Esperando..';
    
    vista.actualizarVista(juego);
    juego.juegaLaBanca(bancaFin, comenzarTurnoJugador);
}

function bancaFin(piensa) {
    if (piensa === "banca-se-paso") {
        finalizarJuego('¡Ganaste! La banca se paso');
    }
}

function comenzarTurnoJugador() {
    botonPedir.disabled = false;
    botonPlantarse.disabled = false;
    vista.bancaStatus.textContent = 'Plantada';
    vista.userStatus.textContent = 'Tu turno';
}

botonPedir.onclick = () => {
    juego.botonPedir();
    vista.actualizarVistaJugador(juego);

    if (juego.jugador.puntos > 21) {
        finalizarJuego('La banca gana! TE PASASTE');
    }
};
botonPlantarse.onclick = () => {
    let resultado = juego.botonPlantarse();
    let mensajes = {
        "gana-banca": "La banca gana.",
        "gana-jugador": "¡Has ganado!",
        "empate": "Empate.",
        "jugador-se-paso": "Te pasaste. Pierdes.",
        "banca-se-paso": "¡La banca se pasó!"
    };
    finalizarJuego(mensajes[resultado]);
}

botonReiniciar.onclick = () => {
    iniciarJuego(nombreJugador);
}


function finalizarJuego(mensaje) {
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    vista.userStatus.textContent = 'Finalizado';

    Swal.fire({
        title: 'Resultado',
        text: mensaje,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#7a1f1f',
        background: '#fff5f2'
    });
}
