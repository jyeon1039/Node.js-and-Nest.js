const socket = io(); 

function joinRoom(room) {
    socket.emit('join', room);
}

function sendMsg() {
    var roomId = document.querySelector("#roomid");
    var nickname = document.querySelector("#nickname");
    var chatInput = document.querySelector(".chatting-input");
    const param = {
        room_id: roomId.textContent,
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param);
    chatInput.value = "";
}

socket.on("chatting", (data) => {
    var chatList = document.querySelector(".chatting-list");
    const li = document.createElement("li");
    li.innerText = `${data.name}님이 -  ${data.msg}`;
    chatList.appendChild(li);
})