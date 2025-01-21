const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('make_move', (board) => {
        socket.broadcast.emit('receive_move', board);
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000...');
});
