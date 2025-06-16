//Declaración de la función
function miFuncion(a, b){
    console.log("Suma: " + (a + b));   
}

//Llamando a la función
miFuncion(2, 3);

//Declaración de la función con return
function miFuncion(a, b){
     return a + b;
}

//Llamando a la función
let resultado = miFuncion(2, 3);
console.log(resultado);


//Declaración Función de tipo Expresión
let sumar = function (a, b){return a + b};

resultado = sumar(1, 2);
console.log(resultado);

//Self invoking

resultado = sumar(1, 2);
console.log(resultado);

(function (a, b){
    console.log('Ejecutando la función: ' + (a + b));
})(3, 4);


// como objeto
console.log(typeof miFuncion);

var miFuncionTexto = miFuncion.toString();
console.log(miFuncionTexto);


//FlechaArrow
//Declaración Función de tipo Expresión
let sumar1 = function (a, b){return a + b};

resultado = sumar(1, 2);
console.log(resultado);

const sumarFuncionTipoFlecha = (a, b) => a + b;
resultado = sumarFuncionTipoFlecha(3, 5);
console.log(resultado);


//Como argumento
let sumar2 = function (a = 4, b = 5){
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
    return a + b + arguments[2];
};

resultado = sumar(3, 6, 7);
console.log(resultado);


//ejemplo
let resultado1 = sumarTodo(5, 4, 13, 10, 9, 10, 11, 3);
console.log( resultado );

function sumarTodo(){
    let suma = 0;
    for(let i = 0; i < arguments.length; i++){
        suma += arguments[i]; // suma = suma + arguments[i]
    }
    return suma;
}

//Tipos primitivos
let x = 10;

function cambiarValor(a){
    a = 20;
}

//Paso por valor
cambiarValor(x);//10
console.log(x);
//console.log(a);

const persona = {
    nombre: 'Juan',
    apellido: 'Perez'
}

function cambiarValorObjeto(p1){
    p1.nombre = 'Carlos';
    p1.apellido = 'Lara';
}

//Paso por referencia
cambiarValorObjeto( persona );
console.log( persona );