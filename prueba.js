/* TEORIA
var nombre = "Diego";

console.log(nombre);

var objeto = {
    nombre : Diego,
    edad : 34,
    telefono : 2321564
}

console.log(objeto);

var bandera = true;

console.log(bandera);
console.log(typeof bandera);

//Tipo de dato function
function miFuncion(){}
console.log(typeof miFuncion);

//Tipo de dato Symbol
var simbolo = Symbol("mi simbolo");
console.log(typeof simbolo);

//Tipo clase es una function
class Persona{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
    }
}
console.log(typeof Persona);

//Tipo undefined
var x;
console.log(typeof x);

x = undefined;
console.log(typeof x);

//null = ausencia de valor
var y = null;
console.log(typeof y);

let nombre;
nombre = "Juan";
console.log( nombre );

const apellido = "Perez";
//apellido = "Lara"; Error no se puede cambiar el valor de una constante

//asignacion de variables
let nombreCompleto = "Juan Perez";
console.log( nombreCompleto );

let x, y;
x = 10, y = 20;
let z = x + y;
console.log(z);

let a = 3, b = 2;
let z = a + b;

//Incremento
//Pre-incremento (el operador ++ antes de la variable)
z = ++a;
console.log(a);
console.log(z);

//Post-incremento (el operador ++ despues de la variable)
z = b++;
console.log(b);
console.log(z);

//Decremento
//Predecremento
z = --a;
console.log(a);
console.log(z);

//Postdecremento
z = b--;
console.log(b);
console.log(z);

// Precedencia
let a = 3, b = 2, c = 1, d = 4;

let z = a * b + c / d;
console.log(z);

z = c + a * b / d;
console.log( z ); 

z = (c + a) * b / c;
console.log(z);


//Operadoes comparacion
let a = 3, b = 2, c = "3";

let z = a == c; // se revisa el valor sin importar el tipo
console.log(z);

z = a === c;// revisa los valores pero tambien los tipos
console.log(z);

//Operador de relacion
let a = 3, b = 2, c = "3";

let z = a < b;
console.log(z);

z = a <= b;
console.log(z);

z = a > b;
console.log(z);

z = a >= b;
console.log(z);

        //Ejercio numero par
        let a = 9;

        if( a % 2 == 0){
            console.log("Es un número par");
    }
        else{
            console.log("Es un número impar");
    }

    //Operador Ternario
let resultado = (1>2) ? "verdadero" : "falso";
console.log(resultado);

let numero = 110;
resultado = ( numero % 2 == 0 ) ? "Número par" : "Número impar"; 
console.log( resultado );

//Conversion string
let miNumero = "18";
 //console.log(typeof miNumero);
 
 let edad = Number(miNumero);
 //console.log(typeof edad);
 if(edad >= 18){
	 console.log("Puede votar");
 }
 else{
	 console.log("Muy joven para votar");
 }
 
 let resultado = (edad >= 18)? "Puede votar" : "Muy joven para votar";
 console.log( resultado );
 



 //Funcion NaN
let miNumero = "17";

let edad = Number(miNumero); 
console.log( edad );

if( isNaN(edad)){
    console.log("No es un número");
}
else{
    if(edad >= 18){
        console.log("Puede votar");
    }
    else{
        console.log("Muy joven para votar");
    }    
}

if( isNaN(edad)){
    console.log("No es un número");
}
else{
    let resultado = (edad >= 18)? "Puede votar" : "Muy joven para votar";
    console.log( resultado ); 
}


//Precedencia
let x = 5;
let y = 10;
let z = ++x + y--;
console.log(x);
console.log(y);
console.log(z);

let resultado = 4 + 5 * 6 / 3;// (4 + ((5*6)/3))
console.log(resultado);

resultado = (4 + 5) * 6 / 3;
console.log(resultado);



*/