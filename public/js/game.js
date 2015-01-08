//
//  INIT SOCKET
//

// New socket.io
var socket = io();

// New connection (or reconnect)
socket.on('connect', function(msg){
    console.log('connected!');
});

// Error on connect
socket.on('error', function (reason){
    if(reason == 'user'){
        location.href = "/logout";
    }
    else if(reason == 'duplicate'){
        popup('Sorry,', 'another client is playing on this account!');
    }
    else if(reason == 'host'){
        popup('Sorry,', 'you can not play this game from this server!');
    }
    else{
        popup('Warning,', 'something went wrong while connecting to the server!');
    }
});

// Disconnected
socket.on('disconnect', function(msg){
    console.log('disconnected!');
});

socket.on('authorization', function(data){
    console.log('authorization complete! data: ' + data);
    socket.emit('alive', 'alive');
    setInterval(function(){
        console.log('I\'m alive...');
        socket.emit('alive', 'alive');
    },10*1000);
});

function popup(title, desc){
    $("#title").html(title);
    $("#desc").html(desc);
    $("#status").css('display', 'block');
    $("#game").css('display', 'none');
}

//
//  INIT CANVAS
//

var canvas = {};

canvas.canvas = document.getElementById("game");
canvas.context = canvas.canvas.getContext("2d");