import io from 'socket.io-client';

const socket = io.connect('https://ai-powered-tic-tac-toe.onrender.com/');

export default socket;
