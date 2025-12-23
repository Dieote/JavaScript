/* 
Crea una aplicación que permita al usuario añadir tareas a un array. 
Utiliza prompt() para solicitar las tareas y un bucle para permitir añadir múltiples tareas. 
Cuando el usuario cancele, muestra todas las tareas almacenadas en el array utilizando SweetAlert con formato de lista.
*/

let tareas = [];
while (true) {
    let tarea = prompt("Introduce una tarea (o pulsa Cancelar para finalizar):");
    if (tarea === null) {
        alert("Has cancelado la entrada de tareas.");
    if (tareas.length === 0)
        alert("No se han añadido tareas.");
    break;
    }
    tareas.push(tarea);
} 

if (tareas.length > 0) {
    let listaTareas = tareas.map((tarea, index) => `${index + 1}. ${tarea}`).join('\n');
    alert("Tareas añadidas:\n" + listaTareas);
}

 document.getElementById("ej1").innerHTML = `
 <h2>Listado de Tareas</h2>
 <p>Las tareas añadidas son:</p>`
    tareas.forEach((tarea, index) => {
        document.getElementById("ej1").innerHTML += `<li>${index + 1}. ${tarea}</li>`;
    });