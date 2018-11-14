const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }


    //metodo que reinicia el ticket
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    //metodo que incremente el ticket
    siguienteTicket() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);

        //llenar un arreglo
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.lenght === 0) {
            return 'No hay tickets';
        }

        console.log('tickets en atender tickets:' + this.tickets);

        let numeroTicket = this.tickets[0].numero; //se extrae el numero

        //borrar elemento de un arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //para agregar al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.lenght > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento de un arreglo
        }

        console.log('ultimos 4', this.ultimos4);

        this.grabarArchivo(); ///forma de ejecutar una funcion

        return atenderTicket;

    }


    //metodo que graba la informacion en el archivo o BD
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }

}

module.exports = {
    TicketControl
}