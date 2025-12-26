/*
Desarrolla una aplicación que solicite al usuario introducir 5 calificaciones usando prompt(). 
Almacena las calificaciones en un array, calcula el promedio recorriendo el array, y determina si el estudiante ha aprobado (promedio >= 5). 
Muestra el resultado con SweetAlert incluyendo el promedio y el estado (aprobado/suspendido).
*/

let calificaciones = [];

for (let i = 0; i < 5; i++) {   
    let calificacion;
    while (true) {
        calificacion = prompt(`Introduce la calificación ${i + 1} (0-10):`);
        if (calificacion === null) {
            Swal.fire({
                title: "Operación cancelada",
                text: "No se han introducido todas las calificaciones.",
                icon: "info"
            });
            document.getElementById("ej5").innerHTML = 
            "<h3>Operación cancelada</h3>";
            return; 
            //NO se puede usar return fuera de una función.
        }   
        calificacion = parseFloat(calificacion);
        if (!isNaN(calificacion) && calificacion >= 0 && calificacion <= 10) {
            calificaciones.push(calificacion);
            break; 
        } else {
            Swal.fire({
                title: "Entrada inválida",
                text: "Por favor, introduce una calificación válida entre 0 y 10.",
                icon: "error"
            });
        }   
    }
}

let suma = 0;
for (let i = 0; i < calificaciones.length; i++) {
    suma += calificaciones[i];
}

let promedio = suma / calificaciones.length;
let estado = promedio >= 5 ? "Aprobado" : "Suspendido";
Swal.fire({
    title: "Resultado del Estudiante",
    html: `El promedio es <strong>${promedio.toFixed(2)}</strong>.<br>Estado: <strong>${estado}</strong>.`, 
    icon: promedio >= 5 ? "success" : "error"
    /*
    let icono;
    if (promedio >= 5) {
        icono = "success";
    } else {
        icono = "error";
    }
    */
});

document.getElementById("ej5").innerHTML =  
`<h3>Resultado del Estudiante</h3>
<p>El promedio es <strong>${promedio.toFixed(2)}</strong>.<br>Estado: <strong>${estado}</strong>.</p>`;
