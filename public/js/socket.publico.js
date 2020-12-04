const lblTicket1 = document.getElementById('lblTicket1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblTicket4 = document.getElementById('lblTicket4');
const lblEscritorio1 = document.getElementById('lblEscritorio1');
const lblEscritorio2 = document.getElementById('lblEscritorio2');
const lblEscritorio3 = document.getElementById('lblEscritorio3');
const lblEscritorio4 = document.getElementById('lblEscritorio4');

// Comando para establecer la conexion 
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    //console.log(data.ultimos4);
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);
});

function actualizaHTML(ultimos4) {
    for (let i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].textContent = `Ticket ${ultimos4[i].numero}`;
        lblEscritorios[i].textContent = `Escritorio ${ultimos4[i].escritorio}`;
    }
}