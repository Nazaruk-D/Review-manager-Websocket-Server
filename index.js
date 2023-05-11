const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const {createComment} = require("./utils/createComment");
const PORT = process.env.PORT || 8080;

app.use(cors({origin: ['http://localhost:3000', 'https://review-manager-rust.vercel.app/'], credentials: true}))

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('subscribe', (reviewId) => {
        socket.join(reviewId);
    });

    socket.on('unsubscribe', (reviewId) => {
        socket.leave(reviewId);
    });

    socket.on('newComment', async (data) => {
        const {reviewId: review_id, userId: author_id, comment: body} = data
        await createComment(review_id, author_id, body)
        io.to(review_id).emit('commentAdded', "comment added");
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});