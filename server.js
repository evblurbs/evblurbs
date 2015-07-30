var connect = require('connect');
var http = require('http');
var vhost = require('vhost');
var serverStatic = require('serve-static');
var compression = require('compression');

// app for evblurbs.io
var mainapp = connect();
// app for fewd
var fewdapp = connect();

// set static directories
mainapp.use(serverStatic(__dirname + "/dist"));
fewdapp.use(serverStatic(__dirname + "/sea-fewd/dist"));

// app for all apps
var app = connect();
app.use(compression());
app.use(vhost('seafewd5.evblurbs.io', fewdapp));
app.use(vhost('www.evblurbs.io', mainapp));
app.use(vhost('evblurbs.io', mainapp));

http.createServer(app).listen(process.env.PORT || 80);
