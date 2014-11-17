//
//  REQUIRE, SETTINGS AND VAR
//

var cookie_parser = require('cookie-parser');
var json_save     = require('./util/save.js');
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

var db_users = new json_db("save/users", true, true);
var app = express();

json_save.import_users(db_users);

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

app.engine('.hb', hbs.engine);
app.set('view engine', '.hb');

//
//  HTTP SERVER
//

app.use('/public/css',
    sass({
        src: __dirname + '/public/css/',
        debug: false,
        outputStyle: 'compressed'
    })
);

app.use('/public', express.static(__dirname + '/public'));
app.use(cookie_parser());

app.use(session({
    secret: '3xT3rM!NAT3',
    cookie: {
        maxAge: 1*1000
    },
    name: 'session',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next){

    json_save.add_user(db_users, 'Bosse');

    if(req.session.auth){

    }
    else{
        req.session.auth = false;
    }

    next();
});

app.get('/', function(req, res, next){
    res.render('home', {show_nav:true, login:false});
});

app.get('/signup', function(req, res, next){
    res.render('signup', {
        show_nav:true,
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

app.get('/play', function(req, res, next){
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
});

app.post('*', function(req, res){
    res.end('POST')
});

app.get('*', function(req, res){
    res.status(404).render('404', {
        show_nav: true,
        login: false,
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

app.listen(settings.http.port, function(){
    console.log('Hello!'.cyan);
});