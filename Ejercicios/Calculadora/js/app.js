console.log('Aplicación Calculadora');

function sumar(){
    const forma = document.getElementById(`forma`);
    let operandoA = forma[`operandoA`];
    let operandoB = forma[`operandoB`];

    ocultarAlertaCalculo();
    if (operandoA.value === '' || operandoB === '') {
        mostrarAlertaCalculo("¡Faltan datos para realizar la suma!")
        return;
    }

    let resultado = parseFloat(operandoA.value) + parseFloat(operandoB.value);
    mostrarResultado(resultado);
    agregarEnHistorialCalculo(`${operandoA.value} + ${operandoB.value}`, resultado);
}
function restar(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];

    ocultarAlertaCalculo();
    if (operandoA.value === '' || operandoB === '') {
        mostrarAlertaCalculo("¡Faltan datos para realizar la resta!")
        return;
    }

    let resultado = parseFloat(operandoA.value) - parseFloat(operandoB.value);
    mostrarResultado(resultado);
    agregarEnHistorialCalculo(`${operandoA.value} - ${operandoB.value}`, resultado);

}
function dividir(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];
    
    ocultarAlertaCalculo();
    if (operandoA.value === '' || operandoB === '') {
        mostrarAlertaCalculo("¡Faltan datos para realizar la division!")
        return;
    }

    let resultado = parseFloat(operandoA.value) / parseFloat(operandoB.value);
    if (operandoB === 0) {
        mostrarAlertaCalculo('No se puede dividir entre cero');
    } else {
        mostrarResultado(resultado);
        agregarEnHistorialCalculo(`${operandoA.value} / ${operandoB.value}`, resultado);

    }
}
function multiplicar(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];

    ocultarAlertaCalculo();
    if (operandoA.value === '' || operandoB === '') {
        mostrarAlertaCalculo("¡Faltan datos para realizar la multiplicacion!")
        return;
    }

    let resultado = parseFloat(operandoA.value) * parseFloat(operandoB.value);
    mostrarResultado(resultado);
    agregarEnHistorialCalculo(`${operandoA.value} * ${operandoB.value}`, resultado);

}

function mostrarResultado(resultado){
    if(isNaN(resultado)){
        mostrarAlertaCalculo("¡La operación no incluye números!")
    }
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;
    console.log(`Resultado: ${resultado}`);
}

function limpiarCalculo(){
    document.getElementById('operandoA').value = '';
    document.getElementById('operandoB').value = '';
    document.getElementById('resultado').innerHTML = '';
}

function limpiarHistorialCalculo(){
    localStorage.removeItem("historialCalculo");
    document.getElementById('listaHistorialCalculo').innerHTML = '';
}

function agregarEnHistorialCalculo(operacion, resultado){
    const lista = document.getElementById("listaHistorialCalculo");
    const item = document.createElement("li"); //vale para listas en html
    item.className = 'list-group-item';
    item.textContent = `${operacion} = ${resultado}`;
    lista.prepend(item); //lo mas nuevo primero

    let historial = JSON.parse(localStorage.getItem("historialCalculo")) || [];
    historial.unshift({ operacion, resultado }); //lo mas nuevo primero
    localStorage.setItem("historialCalculo", JSON.stringify(historial));
}

function cargarHistorialCalculo() {
    const historial = JSON.parse(localStorage.getItem("historialCalculo")) || [];
    const lista = document.getElementById("listaHistorialCalculo");
    lista.innerHTML = ""; // limpia antes de insertar
    historial.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${item.operacion} = ${item.resultado}`;
        lista.appendChild(li);
    });
}

/* Converor
1 pie = 0.3048 metros
1 pulgada = 0.0254 metros
1/16 pulgada ≈ 0.0015875 metros
*/
function piesAMetros() {
    const valor = parseFloat(document.getElementById('valorAConvertir').value);
    ocultarAlertaConversion();
    if (isNaN(valor)) {
        mostrarAlertaConversion("¡La operación no incluye números!")
        return;
    }
    const resultado = (valor * 0.3048).toFixed(4); //redondear a 4 decimales
    mostrarResultadoConversor(`${resultado}`);
    agregarEnHistorialConversor(`${valor} Pies`, `${resultado} m`);
}
function pulgadasAMetros() {
    const valor = parseFloat(document.getElementById('valorAConvertir').value);
    ocultarAlertaConversion();
    if (isNaN(valor)) {
        mostrarAlertaConversion("¡La operación no incluye números!")
        return;
    }
    const resultado = (valor * 0.0254).toFixed(4); 
    mostrarResultadoConversor(`${resultado}`);
    agregarEnHistorialConversor(`${valor} Pulgada`, `${resultado} m`);

}
function fraccionPulgadaAMetro() {
    const valor = parseFloat(document.getElementById('valorAConvertir').value);
    ocultarAlertaConversion();
    if (isNaN(valor)) {
        mostrarAlertaConversion("¡La operación no incluye números!")
        return;
    }
    const resultado = ((valor * 0.0254) / 16).toFixed(4); 
    mostrarResultadoConversor(`${resultado}`);
    agregarEnHistorialConversor(`${valor} Fraccion 1/16 pulgada`, `${resultado} m`);

}

function mostrarResultadoConversor(resultado) {
    if(isNaN(resultado)){
        mostrarAlertaConversion("¡La operación no incluye números!")
    }
    document.getElementById('resultadoConversor').textContent = `Resultado: ${resultado}`;
    console.log(`Resultado: ${resultado}`);
}


function limpiarConversor() {
    document.getElementById('valorAConvertir').value = '';
    document.getElementById('resultadoConversor').textContent = '';
}

function limpiarHistorialConversor() {
    localStorage.removeItem("historialConversor");
    document.getElementById("listaHistorialConversor").innerHTML = '';
}

function agregarEnHistorialConversor(operacion, resultado){
    const lista = document.getElementById("listaHistorialConversor");
    const item = document.createElement("li");
    item.className = 'list-group-item';
    item.textContent = `${operacion} = ${resultado}`;
    lista.prepend(item);

    //localStorage
    let historial = JSON.parse(localStorage.getItem("historialConversor")) || [];
    historial.unshift({ operacion, resultado }); //lo mas nuevo primero
    localStorage.setItem("historialConversor", JSON.stringify(historial));
}

function cargarHistorialConversor() {
    const historial = JSON.parse(localStorage.getItem("historialConversor")) || [];
    const lista = document.getElementById("listaHistorialConversor");
    lista.innerHTML = ""; // limpia antes de insertar
    historial.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${item.operacion} = ${item.resultado}`;
        lista.appendChild(li);
    });
}

//alertas
function mostrarAlertaCalculo(mensaje) {
  const alerta = document.getElementById('AlertaCalculo');
  alerta.textContent = mensaje;
  alerta.classList.remove('invisible');
}

function ocultarAlertaCalculo() {
  const alerta = document.getElementById('AlertaCalculo');
  alerta.classList.add('invisible');
}

function mostrarAlertaConversion(mensaje) {
  const alerta = document.getElementById('AlertaConversion');
  alerta.textContent = mensaje;
  alerta.classList.remove('invisible');
}

function ocultarAlertaConversion() {
  const alerta = document.getElementById('AlertaConversion');
  alerta.classList.add('invisible');
}
