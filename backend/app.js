const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); //allows the frontend to communicate with the socket.io server
const server = http.createServer(app);

// ---------------Deployment------------

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
});

// ---------------Deployment------------

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

const users = {}; //all connected users

io.on('connection', (socket) => {
    //console.log(socket.id);

    socket.on('register', (username) => {
        //pair the username to the socket id on register
        users[username] = socket.id;
    });

    socket.on('join_room', (details) => {
        const { opponentUsername } = details;
        socket.join(opponentUsername);

        //get the socket id of the user with the opponent username and emit the receive_join_room event to them
        const targetId = users[opponentUsername];
        if (targetId) {
            //request the opponent to join the room
            socket.to(targetId).emit('receive_join_room_request', details);
        } else {
            //socket.to(users[username]).emit('receive_join_room_error');
        }
    });

    socket.on('join_room_accept', (details) => {
        const { username, opponentUsername } = details;
        socket.join(username);

        const targetId = users[opponentUsername];
        if (targetId) {
            //socket.to(targetId).emit('receive_join_room', details);
            socket.to(targetId).emit('receive_join_room', details);
        } else {
            //socket.to(users[username]).emit('receive_join_room_error');
        }
    });

    socket.on('make_move', (details) => {
        // show the move on make_move
        socket.to(details.room).emit('receive_move', details);
    });

    socket.on('replay', (details) => {
        // replay the game
        socket.to(details.room).emit('receive_replay', details);
    });

    socket.on('go_to_home', (details) => {
        // navigate back to hom on go_to_home
        socket.to(details.room).emit('receive_go_to_home', details);
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
