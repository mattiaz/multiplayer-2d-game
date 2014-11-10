//
//  REQUIRE, SETTINGS AND VAR
//

var sass    = require('node-sass-middleware');
var exphbs  = require('express3-handlebars');
var sockets = require('socket.io');
var express = require('express');
var colors  = require('colors');
var url     = require('url');
var fs      = require('fs');

var settings = {
    http: {
        port: 80
    },
    app: {
        name: '2D Game'
    }
};

var app = express();

var hbs = exphbs.create({
    extname: '.hb',
    defaultLayout: 'main',
    helpers: {
        name: function(){return settings.app.name;},
        title: function(){
            return settings.app.name + ' - Welcome'
        },
        show_nav: function(){return true;}
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

app.get('/', function(req, res, next){
    res.render('home', {show_nav:true});
});

app.get('/signup', function(req, res, next){
    res.render('signup', {show_nav:true});
});

app.get('*', function(req, res){
    res.status(404).render('404', {
        show_nav: true,
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

app.listen(settings.http.port, function(){
    console.log('Hello!'.cyan);
});