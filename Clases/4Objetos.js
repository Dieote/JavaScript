let persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'jperez@mail.com',
    edad: 28,
    nombreCompleto: function(){
        return this.nombre + ' ' + this.apellido;
    }
}

console.log(persona.nombre);
console.log(persona.edad);
console.log(persona.apellido);
console.log(persona.nombreCompleto());

console.log(persona);

let persona2 = new Object();
persona2.nombre = 'Carlos';
persona2.direccion = 'Saturno 15';
persona2.tel = '55443322';

console.log( persona2.tel );


//for in
for( nombrePropiedad in persona){
    console.log( nombrePropiedad );
    console.log( persona[nombrePropiedad]);
}


persona.tel = '55443322';
persona.tel = '44332211'; //reemplaza valor

console.log( persona );

delete persona.tel;

console.log( persona );

//Concatenar cada valor de cada propiedad
console.log( persona.nombre + ', ' + persona.apellido);

//for in
for( nombrePropiedad in persona){
    console.log( persona[nombrePropiedad]);
}

let personaArray = Object.values( persona );
console.log( personaArray );

let personaString = JSON.stringify( persona );
console.log( personaString );


//Funcion constructor de objetos de tipo Persona
function Persona(nombre, apellido, email){
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
}

let padre = new Persona('Juan', 'Perez', 'jperez@mail.com');
console.log( padre );

let madre = new Persona('Laura', 'Quintero', 'lquintero@mail.com');
console.log( madre );

padre.nombre = 'Carlos';

console.log( padre );
console.log( madre );

//USO DE CALL
let persona0 = {
    nombre: 'Juan',
    apellido: 'Perez',
    nombreCompleto: function(){
        return this.nombre + ' ' + this.apellido;
    }

    /*
    nombreCompleto: function(titulo, tel){
        return titulo + ': ' + this.nombre + ' ' + this.apellido + ', ' + tel;
    }
    */
}

let persona2 = {
    nombre: 'Carlos',
    apellido: 'Lara'
}

//Uso de call para usar 
//el metodo persona1.nombreCompleto con los datos del persona2
console.log( persona0.nombreCompleto() );

console.log( persona0.nombreCompleto.call( persona2 ) );

//Uso de apply para usar 
//el metodo persona1.nombreCompleto con los datos del persona2
console.log( persona0.nombreCompleto('Lic', '66887711') );

let arreglo = ['Ing','55443322'];
console.log( persona0.nombreCompleto.apply( persona2, arreglo) );



//Static

class Persona{

    static contadorPersonas = 0;//atributo de nuestra clase

    static get MAX_OBJ(){
        return 5;
    }

    constructor(nombre, apellido){
        this._nombre = nombre; 
        this._apellido = apellido;
        if( Persona.contadorPersonas < Persona.MAX_OBJ){
            this.idPersona = ++Persona.contadorPersonas;
        }
        else{
            console.log('Se han superado el máximo de objetos permitidos');
        }
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre = nombre;
    }
    get apellido(){
        return this._apellido;
    }
    set apellido(apellido){
        this._apellido = apellido;
    }
    nombreCompleto(){
        return this.idPersona + ' ' + this._nombre + ' ' + this._apellido;
    }
    //Sobreescribiendo el metodo de la clase Padre (Object)
    toString(){
        //Se aplica poliformismo (multiples formas en tiempo de ejecucion)
        //el metodo que se ejecuta depende si es una referencia de tipo padre 
        //o de tipo hijo
        return this.nombreCompleto();
    }
    static saludar(){
        console.log('saludos desde método static');
    }
    static saludar2(persona){
        console.log(persona.nombre + ' ' + persona.apellido);
    }
}

class Empleado extends Persona{
    constructor(nombre, apellido, departamento){
        super(nombre, apellido);//llamar al constructor de la clase padre
        this._departamento = departamento;
    }
    get departamento(){
        return this._departamento;
    }
    set departamento(departamento){
        this._departamento = departamento;
    }
    //Sobreescritura
    nombreCompleto(){
        return super.nombreCompleto() + ', ' + this._departamento;
    }
}

let persona1 = new Persona('Juan', 'Perez');
console.log( persona1.toString() );

let empleado1 = new Empleado('Maria', 'Jimenez', 'Sistemas');
console.log( empleado1.toString() );

console.log( Persona.contadorPersonas );

let persona2 = new Persona('Karla', 'Ramirez');
console.log( persona2.toString() );
console.log( Persona.contadorPersonas);

console.log( Persona.MAX_OBJ);
Persona.MAX_OBJ = 10;
console.log( Persona.MAX_OBJ);

let persona3 = new Persona('Mariano', 'Lara');
let persona4 = new Persona('Armando', 'Toledo');
let persona5 = new Persona('Laura', 'Quintero');
console.log( persona5.toString() );
