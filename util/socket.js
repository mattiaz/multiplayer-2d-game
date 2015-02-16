function _info(msg){
    var date = new Date();
    console.log('INFO'.cyan + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}
function _warning(msg){
    var date = new Date();
    console.log('WARNING'.yellow + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}
function _danger(msg){
    var date = new Date();
    console.log('DANGER'.red + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}
function _system(msg){
    var date = new Date();
    console.log('SYSTEM'.yellow + ' [ ' + date.yyyymmdd().gray + ' | '.gray + date.hhmmss().gray + ' ]\n' + msg + '\n');
}

//
//  VARIABLES
//
var fs = require('fs');

var users = [];
var sockets = [];
var alive = [];
var coordinates = {};

var background;

fs.readFile('save/background.map', 'utf8', function (err, data) {
    if (err) throw err;
    background = data;
});

module.exports = function(socket) {

    if(users.indexOf(socket.username) >= 0){
        socket.disconnect();
    }
    else{
        users.push(socket.username);
        sockets.push(socket);
        coordinates[socket.username] = socket.coordinates;

        socket.emit('authorization', JSON.stringify({"username": socket.username, "uid": socket.uid}));
        fs.readFile('save/background.map', 'utf8', function (err, data) {
        if (err) throw err;
            background = data;
            socket.emit('map', JSON.stringify({"background": background}));
        });
        socket.emit('position', JSON.stringify(coordinates));
        socket.broadcast.emit('position', JSON.stringify(coordinates));
    }

    socket.on('disconnect', function(){

        socket.json_save.save_coordinates(socket.username, coordinates[socket.username]);

        delete coordinates[socket.username];
        socket.broadcast.emit('position', JSON.stringify(coordinates));

        var i = users.indexOf(socket.username);
        if(i != -1) {
            users.splice(i, 1);
        }
        var j = users.indexOf(socket.username);
        if(j != -1) {
            users.splice(j, 1);
        }
    });

    socket.on('position', function(data){
        coordinates[socket.username] = JSON.parse(data);
        socket.broadcast.emit('position', JSON.stringify(coordinates));
        socket.emit('status', JSON.stringify({"status": "coordinates"}));
    });

    socket.on('alive', function(){
        if(!(alive.indexOf(socket.username) >= 0))
            alive.push(socket.username);
    });

}

module.exports.getUsers = function(){
    return users;
}
module.exports.getData = function(){
    var data = "<ul class='no-indent'>";

    for (var i = 0; i < users.length; i++) {
        data += '<li>' + users[i] + ' [x: ' + coordinates[users[i]].x + ', y: ' + coordinates[users[i]].y + ']</li>';
    };

    data += '</ul>';
    data = "<em>All in-game users (" + i + "):</em>" + data;
    return data;
}
module.exports.userExist = function(user){
    if(users.indexOf(user) >= 0){
        return true;
    }
    else
        return false;
}
module.exports.interval = function(){
    
    for (var i = sockets.length - 1; i >= 0; i--) {
        if(alive.indexOf(sockets[i].username) < 0){
            sockets[i].emit('status', JSON.stringify({"status": "disconnect", "message": "too long inactivity on this account"}));
            sockets[i].disconnect();
            _system('disconnected: ' + sockets[i].username);
            var j = users.indexOf(sockets[i].username);
            if(j != -1) {
                users.splice(j, 1);
            }
            sockets.splice(i, 1);
        }
    };

    alive.length = 0;

}
module.exports.goodby = function(){
    for (var i = sockets.length - 1; i >= 0; i--) {
        sockets[i].emit('status', JSON.stringify({"status": "goodby", "message": "server is shutting down, all progress is saved"}));
        sockets[i].json_save.save_coordinates(sockets[i].username, coordinates[sockets[i].username]);
    };
    _system('Shuting down!');
    process.exit();
}