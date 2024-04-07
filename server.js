const express = require("express");
const http = require('http');
const { Server: SocketIOServer } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Store text content
let textContent = '';

io.on('connection', (socket) => {
    // Send current text content to the newly connected client
    socket.emit('initialContent', textContent);

    // Listen for changes from clients
    socket.on('textChange', (newContent) => {
        // Update text content
        textContent = newContent;

        // Broadcast the change to all clients except the sender
        socket.broadcast.emit('textChange', newContent);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
