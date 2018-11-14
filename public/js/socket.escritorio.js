//####################################
// Parte Front End
//####################################

//comando para hacer conexion de socket
var socket = io();

//extraer parametros desde la url
var searchParams = new URLSearchParams(window.location.search);

//funcion que retorna true o false dependiendo de si contiene lo que se le envia en parentesis en el 'has'
var escritorioExist = searchParams.has('escritorio');

if (!escritorioExist) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

//se extrae el valor del parametro
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio: ' + escritorio)

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        //console.log(resp.numero);

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('ticket ' + resp.numero);
    });
});