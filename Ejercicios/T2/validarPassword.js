/*
Implementa un validador de contraseñas que solicite al usuario una contraseña mediante prompt(). 
La contraseña debe tener al menos 8 caracteres, contener números y letras. 
Utiliza operadores lógicos para validar y muestra mensajes apropiados con SweetAlert indicando si la contraseña es válida o qué requisitos faltan.
*/

let password = prompt("Introduce una contraseña:");

if (password === null) {    
    Swal.fire({
        title: "Operación cancelada",
        text: "No se ha introducido ninguna contraseña.",
        icon: "info"
    });
} else {
    let errores = [];
    if (password.length < 8) {
        errores.push("La contraseña debe tener al menos 8 caracteres.");
    }   
    if (!/[a-zA-Z]/.test(password)) {
        errores.push("La contraseña debe contener letras.");
    }
    if (!/[0-9]/.test(password)) {
        errores.push("La contraseña debe contener números.");
    }
    if (errores.length === 0) {
        Swal.fire({
            title: "Contraseña válida",
            text: "La contraseña cumple con todos los requisitos.",
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "Contraseña inválida",
            html: errores.join("<br>"),
            icon: "error"
        });
    }   

    document.getElementById("ej3").innerHTML = 
        '<h3>Password ingresada -></h3>' + password;
}