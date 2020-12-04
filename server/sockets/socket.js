const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        callback(ticketcontrol.siguiente());
    });

    client.emit('estadoActual', {
        estado: ticketcontrol.getUltimoTicket(),
        ultimos4: ticketcontrol.getUltimo4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // actualizar/notificar cambios en los ultimos 4--- broadcast sirve para emitir para todos
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketcontrol.getUltimo4()
        });

    });
});