module.exports = function(socket) {

    socket.on('sys_print', function(data){
        console.log('SYSTEM: '.yellow + data);
    })

}