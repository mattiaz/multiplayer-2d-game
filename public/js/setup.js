//
//  INIT SOCKET
//

// New socket.io
var socket = io();
var alive;
var map = {
    objects: null,
    background: null
}
var auth = {
    username : '',
    uid: ''
}
var player = {
    x: null,
    y: null
}
var coordinates = [];
var connected = false;
var allowMove = false;
var keyMove = true;
var keyMoveTimer;

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
    else if(connected){
        popup('Warning,', 'something went wrong while connecting to the server!');
    }
});

socket.on('status', function(status){

    console.log('status update! data: ' + status);
    status = JSON.parse(status);

    if(status.status == 'disconnect'){
        popup('Info,', status.message);
        deleteCookie('auth');
        connected = false;
    }
    if(status.status == 'goodby'){
        popup('Info,', status.message);
        deleteCookie('auth');
        connected = false;
    }
    if(status.status == 'coordinates'){
        allowMove = true;
    }

});

socket.on('map', function(data){
    data = JSON.parse(data);
    map.background = data.background;
    map.objects = data.objects;
});

socket.on('position', function(data){
    coordinates = JSON.parse(data);
    // console.log('new coordinates! data: ' + data);

    if(player.x == null || player.y == null){
        var user = coordinates[auth.username];
        player.x = user.x;
        player.y = user.y;
    }

});

// Disconnected
socket.on('disconnect', function(msg){
    console.log('disconnected!');
    clearInterval(alive);
    connected = false;
});

socket.on('authorization', function(data){
    console.log('authorization complete! data: ' + data);
    socket.emit('alive', 'alive');

    data = JSON.parse(data);
    auth.username = data.username;
    auth.uid = data.uid;

    alive = setInterval(function(){
        socket.emit('alive', '{"alive": true}');
        console.log('alive...')
    }, 10*1000);

    Game.setup();
    Game.start();

    allowMove = true;

});

//
//  GAME AND CANVAS INIT
//

// Objects
Game = {};
Canvas = {};

// Game
Game.tickTimer;
Game.running = false;
Game.setupDone = false;
Game._fps = 60;
Game.ticks = 0;
Game.draws = 0;
Game.joined = Date.now();
Game.playtime = 0;
Game.lastCalledTime = 0
Game.fps = 0;

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
Canvas.paint = function () {};

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

function updatePosition(x,y){
    socket.emit('position', JSON.stringify(player));
    allowMove = false;
}

Date.prototype.hhmmss = function() {
    var hh = this.getHours().toString();
    var mm = this.getMinutes().toString();
    var ss  = this.getSeconds().toString();
    return (hh[1]?hh:""+hh[0]) + ' h ' + (mm[1]?mm:""+mm[0]) + ' m ' + (ss[1]?ss:""+ss[0]) + ' s';
};

//
// KEYBOARD EVENTS
//

$(document).keydown(function (event){

    if(keyMove == false){
        return;
    }
    else{
        keyMove = false;
        keyMoveTimer = setTimeout(function(){
            keyMove = true;
        }, 100);
    }

    var noMove = ['w', 's', 't', 'o'];

    var key = event.keyCode;
    var onChange = false;

    // left
    if(key == 37 && allowMove && player.x > 0){
        for(var _player in coordinates){
            var _x = coordinates[_player].x;
            var _y = coordinates[_player].y;
            if(_player != auth.username && _x == player.x - 1 && player.y == _y)
                return;
        }
        if(noMove.indexOf(getTile(player.x - 1, player.y)) > -1)
            return;
        player.x--;
        onChange = true;
    }
    // up
    if(key == 38 && allowMove && player.y > 0){
        for(var _player in coordinates){
            var _x = coordinates[_player].x;
            var _y = coordinates[_player].y;
            if(_player != auth.username && _x == player.x && player.y - 1 == _y)
                return;
        }
        if(noMove.indexOf(getTile(player.x, player.y - 1)) > -1)
            return;
        player.y--;
        onChange = true;
    }
    // right
    if(key == 39 && allowMove && player.x < 99){
        for(var _player in coordinates){
            var _x = coordinates[_player].x;
            var _y = coordinates[_player].y;
            if(_player != auth.username && _x == player.x + 1 && player.y == _y)
                return;
        }
        if(noMove.indexOf(getTile(player.x + 1, player.y)) > -1)
            return;
        player.x++;
        onChange = true;
    }
    // down
    if(key == 40 && allowMove && player.y < 99){
        for(var _player in coordinates){
            var _x = coordinates[_player].x;
            var _y = coordinates[_player].y;
            if(_player != auth.username && _x == player.x && player.y + 1 == _y)
                return;
        }
        if(noMove.indexOf(getTile(player.x, player.y + 1)) > -1)
            return;
        player.y++;
        onChange = true;
    }

    if(onChange){
        updatePosition(player.x, player.y);
    }

}).on('keyup', function(e) {
    clearTimeout(keyMoveTimer);
    keyMove = true;
});