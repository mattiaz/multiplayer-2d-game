//
//  PRIVATE FUNCTIONS
//

//
//  FUNCTIONS TO EXPORT
//

function log_hello () {
    console.log('');
    console.log(' Hello!'.cyan + ' a HTTP server is listenig on port: ' + settings['http']['port'].cyan);
}

//
//  EXPORT MODULE
//

// Util.log
var log = {
    hello: log_hello
}
// Util.render
var render = {

};

module.exports = {
    log: log
}