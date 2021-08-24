const express = require("express");
const http = require('http'); //웹소켓은 http 기반
const app = express(); 
const path = require("path");
const ejs = require('ejs');

const server = http.createServer(app);
const PORT = process.env.PORT || 5000; //프로세스 환경에 포트가 지정되어있으면 그것을 사용하고, 아니면 5000번 사용

const socketIO = require("socket.io");
const io = socketIO(server); 

app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/chat/:room', (req, res) => {
    res.render('chat', {room: req.params.room});
});

io.on("connection", (socket) => {
    socket.on('join', (data) => {
        socket.join(data);
    });

    socket.on('chatting', (data) => {
        io.to(data.room_id).emit('chatting', data);
    });
});

server.listen(PORT, ()=>console.log(`server is running ${PORT}`));