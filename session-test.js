var cookie_parser = require('cookie-parser');
var session       = require('express-session');
var express       = require('express');

var app = express();

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3000 }}))

app.use(function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.listen(80, function(){
    console.log('Hello!'.cyan);
});