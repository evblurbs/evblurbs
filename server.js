var connect = require('connect');
var http = require('http');
var app = connect();

var compression = require('compression')
app.use(compression())

var static = require('serve-static');
app.use(static(__dirname + "/dist"));

http.createServer(app).listen(process.env.PORT || 80);
