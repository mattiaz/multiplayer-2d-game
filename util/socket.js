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
var map;

fs.readFile('save/world1.map', 'utf8', function (err, data) {
    if (err) throw err;
    map = data;
});

module.exports = function(socket) {

    if(users.indexOf(socket.username) >= 0){
        socket.disconnect();
    }
    else{
        users.push(socket.username);
        sockets.push(socket);
        socket.emit('authorization', JSON.stringify({"username": socket.username, "uid": socket.uid}));
        socket.emit('map', JSON.stringify({"data": map}));
    }

    socket.on('disconnect', function(){
        var i = users.indexOf(socket.username);
        if(i != -1) {
            users.splice(i, 1);
        }
        var j = users.indexOf(socket.username);
        if(j != -1) {
            users.splice(j, 1);
        }
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
    var data = "<em>Nothing here yet</em>";
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
        sockets[i].emit('status', JSON.stringify({"status": "goodby", "message": "server is shuting down"}));
    };
    _system('Shuting down!');
    process.exit();
}