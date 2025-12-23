/*
Desarrolla un formulario de registro que solicite nombre, email y edad usando prompt(). 
Antes de procesar los datos, utiliza confirm() para verificar que el usuario desea continuar. 
Si confirma, muestra un resumen de los datos con SweetAlert. Si cancela, muestra un mensaje de cancelación.
*/

let nombre = prompt("Por favor, ingresa tu nombre:");
let email = prompt("Por favor, ingresa tu correo electrónico:");
let edad = prompt("Por favor, ingresa tu edad:");

let confirmacion = confirm(`Desea continuar con el registro para ${nombre}`);
if (confirmacion) {
    Swal.fire({
        title: 'Registro Exitoso',
        html: `<p><strong>Nombre:</strong> ${nombre}</p>
               <p><strong>Correo Electrónico:</strong> ${email}</p>
               <p><strong>Edad:</strong> ${edad}</p>`,
               icon: 'success'
            });

// También lo mostramos en la página
    document.getElementById("ej1").innerHTML =
        `Nombre: ${nombre} <br>
         Email: ${email} <br>
         Edad: ${edad}`;

} else {
    // Si cancela
    Swal.fire({
        title: "Registro cancelado",
        text: "El usuario canceló el registro",
        icon: "warning"
    });

    document.getElementById("ej1").textContent =
        "Registro cancelado por el usuario.";
}
