const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newComment', (comment) => {

        io.emit('commentAdded', comment);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(8080, () => {
    console.log('Server started on port 8080');
});