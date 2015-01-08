//
//  BASIC FUNCTIONS
//

console.log('');

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString();
    var dd = this.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

Date.prototype.hhmmss = function() {
    var hh = this.getHours().toString();
    var mm = this.getMinutes().toString();
    var ss  = this.getSeconds().toString();
    return (hh[1]?hh:"0"+hh[0]) + ':' + (mm[1]?mm:"0"+mm[0]) + ':' + (ss[1]?ss:"0"+ss[0]);
};

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
//  REQUIRE, SETTINGS AND VARIABLES
//

var cookie_parser = require('cookie-parser');
var body_parser   = require('body-parser');
var socket_api    = require('./util/socket.js');
var json_save     = require('./util/save.js');
var favicon       = require('serve-favicon');
var session       = require('express-session');
var json_db       = require('node-json-db');
var sockets       = require('socket.io');
var express       = require('express');
var exphbs        = require('express3-handlebars');
var colors        = require('colors');
var sass          = require('node-sass-middleware');
var util          = require('util');
var url           = require('url');
var fs            = require('fs');

var settings = {
    http: {
        port: 80
    },
    app: {
        name: '2D Game'
    }
};

// Import database from json data (users)
var db_users = new json_db("save/users", true, true);
// Connect a helper class to the database
json_save.import_users(db_users);

// The express app for the server
var app = express();
// Copy express app to standard http server
var server = require('http').Server(app);
// The socket.io class
var io = require('socket.io')(server);

// handlebar replacement
var hbs = exphbs.create({
    extname: '.hb',
    defaultLayout: 'main',
    login: true,
    show_nav: true,
    helpers: {
        name: function(){return settings.app.name;},
        title: function(){
            return settings.app.name + ' - Welcome'
        }
    }
});

// use handlebar as engine to replace .hb with .html
app.engine('.hb', hbs.engine);
app.set('view engine', '.hb');

//
//  HTTP SERVER
//

// use favicon
app.use(favicon("public/icon/square.ico")); 

// dev only, compress and build .scss to .css
app.use('/public/css',
    sass({
        src: __dirname + '/public/css/',
        debug: false,
        outputStyle: 'compressed'
    })
);

// static folder
app.use('/public', express.static(__dirname + '/public'));

// use cookie parser, for sessions
app.use(cookie_parser());
// parse JSON data, used in all socket requests
app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended: true
})); 

// init of sessions
app.use(session({
    secret: '3xT3rM!NAT3',
    // maxage = 3h
    cookie: {
        maxAge: 3*60*60*1000
    },
    name: 'session',
    resave: true,
    saveUninitialized: true
}));

// basic security to sign out person if auth is missing
app.use(function(req, res, next){

    if(req.session.auth){
        req.session.auth = true;
    }
    else{
        req.session.auth = false;
        req.session.user = null;
        req.session.uid = null;
        res.clearCookie('auth', {path: '/'});
    }
    req.session.save();
    next();
});

// random message if signed in and ready to play
function message(user){
    var items = [""];
    return items[Math.floor(Math.random()*items.length)];
}

// homepage, render home.hb
app.get('/', function(req, res, next){
    res.render('home', {
        show_nav:true,
        login:req.session.auth,
        helpers:{
            user: function(){return req.session.user},
            message: function(){return message(req.session.user)},
            players: function(){return socket_api.getData()}
        }
    });
});

// signup, render signup.hb
app.get('/signup', function(req, res, next){
    res.render('signup', {
        show_nav:false,
        login:false,
        helpers: {
            title: function(){
                return settings.app.name + ' - Sign up'
            },
            page: function(){
                return url.parse(req.url).pathname
            }
        }
    });
});

// play, render play.hb
app.get('/play', function(req, res, next){

    if(!req.session.auth){
        res.redirect('/');
    }
    else{
        res.render('play', {
        layout: 'plain',
        helpers: {
            title: function(){
                return settings.app.name + ' - Play'
            },
            page: function(){
                return url.parse(req.url).pathname
            }
        }
        });
    }
});

// handle all post data for signup
app.post('/signup', function(req, res){

    var username = req.body.username;
    var password = req.body.password;

    if(username == "" || password == "" || username == null || password == null){
        res.redirect('/signup#' + req.body.username);
    }
    else{
        username = username.toLowerCase();

        var exist = json_save.get_user(username);
        if(exist == null){
            json_save.add_user(username, password);
            res.redirect('/#' + req.body.username);
        }
        else{
            res.redirect('/signup#' + req.body.username);
        }
    }

});

// handle all post data for sign in (using ajax)
app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    if(username == "" || password == "" || username == null || password == null){
        res.end('{"login": false}');
    }
    else{
        username = username.toLowerCase();

        var user = json_save.get_user(username);

        if(user == null){
            res.end('{"login": false, "error": "username"}');
        }
        else if(password != user.pass){
            res.end('{"login": false, "error": "password"}');
        }
        else{
            req.session.auth = true;
            req.session.user = username;
            req.session.uid = user.id;
            req.session.save();
            res.cookie('auth', user.id, { maxAge: 3*60*60*1000 });
            res.end('{"login": ' + req.session.auth + ', "user": "' + req.session.user + '"}');
        }

    }

});

// sign out, redirect back home
app.get('/logout', function(req, res){
    req.session.auth = false;
    req.session.user = null;
    req.session.uid = null;
    req.session.save();
    res.clearCookie('auth', {path: '/'});
    res.redirect('/');
});

// dev obnly, used to show debugg information
app.get('/test', function(req, res){

    var message = "<h1>Debugg page</h1>";
    message += "<style>body{font-family: arial; background-color: #2d2d2d; color: #fff;}</style>"
    message += "<h2>Session</h2>";
    message += '<pre><code>' + JSON.stringify(req.session) + '</code></pre>';
    message += '<em>auth:</em> ' + req.session.auth;
    message += '<br /><em>user:</em> ' + req.session.user;
    message += '<br /><em>uid:</em> ' + req.session.uid;
    message += "<h2>Users</h2>";

    users = socket_api.getUsers();

    for (var i = users.length - 1; i >= 0; i--) {
        message += users[i] + "<br>";
    };

    res.end(message);

});

// 404 page, if no match above
app.get('*', function(req, res){
    res.status(404).render('404', {
        show_nav: true,
        login: req.session.auth,
        helpers: {
            title: function(){
            return settings.app.name + ' - 404'
            },
            page: function(){
            return url.parse(req.url).pathname
            }
        }
    });
});

// 500 error page, if something happens internaly
app.use(function(error, req, res, next) {
    res.status(500).render('error', {
        show_nav: false,
        helpers: {
            title: function(){
            return settings.app.name + ' - 500'
            },
            error: function(){return error.stack},
            msg: function(){return '500 &ndash; Internal server error'}
        }
    });
});

// start the server and listen on port setting
server.listen(settings.http.port, function(){
    _info('Hello! A webserver is running @ port ' + settings.http.port.toString().yellow);
});

//
//  SOCKET SERVER
//

// handle cookies from sockets
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

// set auth to localhost, and must be sign in, ony one player per account
io.set('authorization', function (handshakeData, accept) {

    try{
        var domain = handshakeData.headers.referer.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    }
    catch(e){

    }

    var cookies = parseCookies(handshakeData);
    try{
        var auth = cookies.auth;
    }
    catch(e){
        var auth = null;
    }

    var user = json_save.get_user_uid(auth);
    var exist = socket_api.userExist(user);

    if(!(domain == 'localhost' || domain == '10.60.24.206'))
        accept('host', false);
    else if(auth == null || user == null)
        accept('user', false);
    else if(exist)
        accept('duplicate', false);
    else 
        accept(null, true);
});

// socket on connection, set username and uid, start socket_api
io.on('connection', function(socket){

    var cookies = parseCookies(socket.handshake);
    socket.username = json_save.get_user_uid(cookies.auth);
    socket.uid = cookies.auth;
    socket_api(socket);

});

setInterval(function(){
    socket_api.interval(io);
}, 60*1000);