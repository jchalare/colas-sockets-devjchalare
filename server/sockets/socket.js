const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado al servidor');
    //escuchando :
    //primer parametro es el nombre del servicio, debe ser el mismo que el archivo socket.nuevo-ticket.js
    //data, que es un objeto o array, debe de ser del mismo tipo del archivo socket.nuevo-ticket.js
    //callback es la funcion que se envia como tercer parametro
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);
        callback(siguiente);
    });

    //se envia informacion a socket.nuevo-ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(), //se llama informacion de los metodos de la clase
        ultimos4: ticketControl.getUltimos4()
    });



    //se atienden los tickets
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        //let ultimos4Pantalla=ticketControl.atenderTicket(data.escritorio);


        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });
});