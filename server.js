var connect = require('connect');
var http = require('http');
var vhost = require('vhost');
var serverStatic = require('serve-static');

// app for evblurbs.io
var mainapp = connect();
// app for fewd
var fewdapp = connect();

var compression = require('compression');
//mainapp.use(compression());
//fewdapp.use(compression());

// set static directories
mainapp.use(serverStatic("dist"));
fewdapp.use(serverStatic("fewdapp"));

// app for all apps
var app = connect();
app.use(compression());
app.use(vhost('seafewd5.evblurbs.io', fewdapp));
app.use(vhost('www.evblurbs.io', mainapp));
app.use(vhost('evblurbs.io', mainapp));
//app.use(serverStatic(__dirname + '/dist'));
http.createServer(app).listen(process.env.PORT || 80);
