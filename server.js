//
//  REQUIRE
//

var ws_module = require('websocket').server;
var http_module = require('http');
var fs_module = require('fs');
var color_module = require('colors');
var package_json = require('./package.json');
var util = require('./controllers/util.js');

//
//  SETTINGS
//

var settings = {
    app: {
        name: package_json.name,
        version: package_json.version
    },
    http: {
        port: 80
    }
};

//
//  HTTP SERVER
//

var http_server = http_module.createServer(function(req, res){

    res.write('Hello World');
    res.end();

});

http_server.listen(settings['http']['port'], function(){
    util.log.hello();
});