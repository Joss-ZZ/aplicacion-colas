const escritorioID = document.getElementById('escritorio');
const atendiendolbl = document.getElementById('atendiendo');
const atenderSiguienteTicketButton = document.getElementById('atenderSiguienteTicket');

var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio');
escritorioID.textContent = `Escritorio ${escritorio}`;

atenderSiguienteTicketButton.addEventListener('click', () => {
    console.log(escritorio);
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(resp) {
        if (resp === 'No hay tickets') {
            atendiendolbl.textContent = resp;
            return;
        }
        atendiendolbl.textContent = `Ticket ${resp.numero}`;
    });
});