console.log('Aplicación Calculadora');

function sumar(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];
    let resultado = parseFloat(operandoA.value) + parseFloat(operandoB.value);
    mostrarResultado(resultado);
}
function restar(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];
    let resultado = parseFloat(operandoA.value) - parseFloat(operandoB.value);
    mostrarResultado(resultado);
}
function dividir(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];
    let resultado = parseFloat(operandoA.value) / parseFloat(operandoB.value);
    if (operandoB === 0) {
        mostrarResultado('No se puede dividir entre cero');
    } else {
        mostrarResultado(resultado);
    }
}
function multiplicar(){
    const forma = document.getElementById('forma');
    let operandoA = forma['operandoA'];
    let operandoB = forma['operandoB'];
    let resultado = parseFloat(operandoA.value) * parseFloat(operandoB.value);
    mostrarResultado(resultado);
}

function mostrarResultado(resultado){
    if(isNaN(resultado)){
        resultado = 'La operación no incluye números';
    }
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;
    console.log(`Resultado: ${resultado}`);
}

function limpiar(){
    document.getElementById('operandoA').value = '';
    document.getElementById('operandoB').value = '';
    document.getElementById('resultado').innerHTML = '';
}
