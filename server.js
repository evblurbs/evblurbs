var connect = require('connect');
var http = require('http');
var vhost = require('vhost');

// app for evblurbs.io
var mainapp = connect();
// app for fewd
var fewdapp = connect();

var compression = require('compression');
mainapp.use(compression());
fewdapp.use(compression());

// set static directories
var static = require('serve-static');
mainapp.use(static(__dirname + "/dist"));
fewdapp.use(static(__dirname + "/fewdapp"));

// app for all apps
var app = connect();
app.use(vhost('seafewd5.evblurbs.io', fewdapp));
app.use(vhost('www.evblurbs.io', mainapp));
app.use(vhost('evblurbs.io', mainapp));

http.createServer(app).listen(process.env.PORT || 80);
