//
//  REQUIRE
//

var ws_module = require('websocket').server;
var http_module = require('http');
var fs_module = require('fs');
var package_json = require(./package.json);

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