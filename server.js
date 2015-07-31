var connect = require('connect');
var http = require('http');
var https= require('https');
var vhost = require('vhost');
var serverStatic = require('serve-static');
var compression = require('compression');
var githubUtils = require('./sea-fewd/app/utils/githubUtils');
var axios = require('axios');

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

var githubOAuth = require('github-oauth')({
  githubClient: '23d58dfc41b20cb6f224',
  githubSecret: 'ee70b07f7b1587057e781e906739f3c515982cd4',
  baseURL: 'http://seafewd5.evblurbs.io',
  loginURI: '/login',
  callbackURI: '/callback',
  scope: 'user,repo' // optional, default scope is set to user 
});

require('http').createServer(function(req, res) {
  if (req.url.match(/login/)) {
    return githubOAuth.login(req, res)
  }
  else if (req.url.match(/callback/)) {
    return githubOAuth.callback(req, res)
  } else {
    return app(req, res)
  }
}).listen(process.env.PORT || 80);

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err);
});

githubOAuth.on('token', function(token, serverResponse) {
  githubUtils.login(token.access_token, serverResponse);
});

