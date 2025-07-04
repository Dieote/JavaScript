/*
'use strict'
try{
    let x = 10;
    //miFuncion();
}
catch(error){
    console.log(error);
}
finally{
    console.log('termina la revisión de errores');
}

console.log('continuamos...');

*/

'use strict'
let resultado = -1;

try{
    if(isNaN(resultado)) throw 'No es un número';
    else if( resultado === '') throw 'Es cadena vacía';
    else if( resultado >= 0) throw 'Valor positivo';
    else if( resultado < 0 ) throw 'Valor negativo';
}
catch(error){
    console.log(error);
    //console.log(error.name);
    //console.log(error.message);
}
finally{
    console.log('Termina revisión de errores');
}