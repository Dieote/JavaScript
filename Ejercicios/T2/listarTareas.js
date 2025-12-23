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
        break;
    }
    tareas.push(tarea);
} 

if (tareas.length > 0) {

    let listaTareas = "<ul>";
    for (let i = 0; i < tareas.length; i++) {
        listaTareas += `<li>${tareas[i]}</li>`;
    }
    listaTareas += "</ul>";

    Swal.fire({
        title: "Tareas añadidas",
        html: listaTareas,
        icon: "info"
    });
    
    document.getElementById("ej2").innerHTML = 
        '<h3>Listado de Tareas</h3>' + listaTareas;

} else {
    Swal.fire({
        title: "Sin tareas",
        text: "No se añadieron tareas",
        icon: "warning"
    });
    
    document.getElementById("ej2").textContent =
    "No se añadieron tareas.";
}


 
 /* `
 <h2>Listado de Tareas</h2>
 <p>Las tareas añadidas son:</p>`
    tareas.forEach((tarea, index) => {
        document.getElementById("ej2").innerHTML += `<li>${index + 1}. ${tarea}</li>`;
    }); */