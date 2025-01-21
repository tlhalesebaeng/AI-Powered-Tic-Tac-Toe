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

const users = {};

io.on('connection', (socket) => {
    //console.log(socket.id);

    socket.on('register', (username) => {
        users[username] = socket.id;
    });

    socket.on('join_room', (username) => {
        socket.join(username);

        const targetId = users[username];
        if (targetId) {
            socket.to(targetId).emit('receive_join_room');
        }
        //emit an event to mae a user with this username to join the room
    });

    socket.on('make_move', (details) => {
        const targetId = users[details.room];
        if (targetId) {
            socket.to(targetId).emit('receive_move', details);
        }
    });

    socket.on('disconnect', () => {
        // Remove user on disconnect
        for (const username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                break;
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000...');
});
