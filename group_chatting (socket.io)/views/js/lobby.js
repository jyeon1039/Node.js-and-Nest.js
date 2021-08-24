const roomId = document.querySelector("#roomid");

function enterRoom(){
    location = '/chat/' + roomId.value;
}