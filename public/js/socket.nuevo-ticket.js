const buttonNuevoTicket = document.getElementById('nuevoTicket');
const labelNuevoTicket = document.getElementById('lblNuevoTicket');

// Comando para establecer la conexion 
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

//recibimos el ultimo ticket enviado desde el servidor
socket.on('estadoActual', function(estado) {
    labelNuevoTicket.textContent = estado.estado;
});

buttonNuevoTicket.addEventListener('click', () => {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        labelNuevoTicket.textContent = siguienteTicket;
    });
});