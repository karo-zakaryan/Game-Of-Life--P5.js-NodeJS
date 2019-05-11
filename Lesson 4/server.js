const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const messages = [];

app.use(express.static("./client/public"));
app.get('/', (req, res) => {
    res.redirect('index.html');
});

io.on('connection', socket => {    
    for (const i in messages) {
        io.sockets.emit("display message", messages[i]);
    }

    socket.on("send message", data => {
        messages.push(data);
        io.sockets.emit("display message", data);
    });
});

server.listen(8000, () => {
    console.log("Server listen to 8000 port");
});