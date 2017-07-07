var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.dev.js');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/patterns/:lang/get', function(req, res) {
  res.sendFile(path.join(__dirname, 'patterns_' + req.params.lang + '.json'));
});

app.listen(3001, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3001/');
});
