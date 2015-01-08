//
//  INIT SOCKET
//

// New socket.io
var socket = io();
var alive;

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
        popup('Warning,', 'you are connecting from an invalid host address');
    }
    else{
        popup('Warning,', 'something went wrong while connecting to the server!');
    }
});

socket.on('status', function(status){
    console.log('status update! data: ' + status);
    status = JSON.parse(status);

    if(status.status == 'disconnect'){
        popup('Info,', status.message);
        deleteCookie('auth');
    }
    if(status.status == 'goodby'){
        popup('Info,', status.message);
        deleteCookie('auth');
    }

});

// Disconnected
socket.on('disconnect', function(msg){
    console.log('disconnected!');
    clearInterval(alive);
});

socket.on('authorization', function(data){
    console.log('authorization complete! data: ' + data);
    socket.emit('alive', 'alive');
    alive = setInterval(function(){
        socket.emit('alive', '{"alive": true}');
        console.log('alive...')
    }, 10*1000);
});

//
//  GAME AND CANVAS INIT
//

// Objects
Game = {};
Canvas = {};
Items = {};

// Game
Game.tickTimer;
Game.running = false;
Game.setupDone = false;
Game.fps = 60;
Game.ticks = 0;
Game.draws = 0;

// Canvas
Canvas.canvas;
Canvas.context;
Canvas.window = {};
Canvas.window.width = null;
Canvas.window.height = null;
Canvas.offset = {};
Canvas.offset.x = null;
Canvas.offset.y = null;
Canvas.visibleArea = {};
Canvas.visibleArea.x = null;
Canvas.visibleArea.y = null;

// Game

Game.run = function () {};
Game.tick = function () {};
Game.draw = function () {};
Game.start = function () {};

// Canvas

Canvas.redraw = function () {};
Canvas.getWidth = function () {};
Canvas.getHeight = function () {};
Canvas.clear = function () {};

//
//  HELPER FUNCTIONS
//

function popup(title, desc){
    $("#title").html(title);
    $("#desc").html(desc);
    $("#status").css('display', 'block');
    $("#game").css('display', 'none');
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};