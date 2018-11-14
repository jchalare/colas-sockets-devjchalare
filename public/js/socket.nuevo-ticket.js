//####################################
// Parte Front End
//####################################

//comando para hacer conexion de socket
var socket = io();

var label = $('#lblNuevoTicket'); //aqui se relaciona el label html

socket.on('connect', function() {
    console.log('Usuario conectado');

});

socket.on('disconnect', function() {
    console.log('Usuario desconectado');
});


//se recibe los datos que se estan enviando desde el socket.js
socket.on('estadoActual', (data) => {

    label.text(data.actual);
})

$('button').on('click', function() {
    console.log('click');
    //primer parametro es como quiero que se llame el servicio
    //el segundo parametro son objetos, cadenas, numeros etc
    //el ultimo parametro es una funcion
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        //se le asigna a la etiquete html lo que responda el metodo
        label.text(siguienteTicket);
    });




});