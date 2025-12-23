/*
Crea un array con nombres de frutas. Solicita al usuario que introduzca una fruta mediante prompt() y busca si existe en el array. 
Utiliza métodos de array como indexOf() o includes().
 Muestra con SweetAlert si la fruta fue encontrada y en qué posición, o un mensaje indicando que no existe.
*/

let frutas = ["manzana", "banana", "naranja", "pera", "uva", "mango", "kiwi"];

let frutaBuscada = prompt("Introduce el nombre de una fruta:");

if (frutaBuscada === null || frutaBuscada.trim() === "") {  
    Swal.fire({
        title: "Operación cancelada",
        text: "No se ha introducido ninguna fruta.",
        icon: "info"
    });
} else {
    frutaBuscada = frutaBuscada.trim().toLowerCase();
    let posicion = frutas.indexOf(frutaBuscada);
    if (posicion !== -1) {
        Swal.fire({
            title: "Fruta encontrada",
            text: `La fruta "${frutaBuscada}" fue encontrada en la posición ${posicion}.`,
            icon: "success"
        });
        document.getElementById("ej4").innerHTML = 
        `<h3>Fruta encontrada</h3>
        <p>La fruta "${frutaBuscada}" fue encontrada en la posición ${posicion}.</p>`;
    } else {
        Swal.fire({
            title: "Fruta no encontrada",
            text: `La fruta "${frutaBuscada}" no existe en el array.`,
            icon: "error"
        });
        document.getElementById("ej4").innerHTML = 
        `<h3>Fruta no encontrada</h3>
        <p>La fruta "${frutaBuscada}" no existe en el array.</p>`;
    }   
}