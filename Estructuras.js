/*
let contador = 0;
while( contador < 3 ){
    console.log(contador);
    contador++;
}

do{
    console.log(contador);
    contador++;
}while(contador < 3);
*/

/*
for(let contador = 0; contador < 3 ; contador++ ){
    console.log(contador);
}
console.log("Fin ciclo for");

*/

for(let contador = 0; contador <= 10; contador++){
    if( contador % 2 !== 0){
		 console.log(contador);
        break;//termina la ejecución del ciclo for por completo 
    }
   
}

for(let contador = 0; contador <= 10; contador++){
    if( contador % 2 !== 0){
        continue;//ir a la siguiente iteracion
    }
    console.log(contador);
}

inicio:
for(let contador = 0; contador <= 10; contador++){
    if( contador % 2 !== 0){
        continue inicio;//ir a la siguiente iteracion
    }
    console.log(contador);
}


// ARRAYS
//let autos = new Array('BMW','Mercedes Benz','Volvo');
const autos = ['BMW','Mercedes Benz','Volvo'];
console.log(autos);

console.log(autos[0]);
console.log(autos[2]);

for(let i = 0; i < autos.length; i++){
    console.log(i + ' : ' + autos[i] );
}

autos[1] = 'MerecedesBenz';
console.log(autos[1]);

autos.push('Audi');
console.log(autos);

console.log(autos.length);
autos[autos.length] = 'Cadillac';

console.log(autos);

autos[6] = 'Porshe';
console.log(autos);

console.log(typeof autos);

console.log( Array.isArray(autos) );

console.log( autos instanceof Array);

