const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const mongoose = require('mongoose');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(app.router);
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendfile(__dirname + '/public/index.html');
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/bankek', function (err) {
  if (err) {
    throw err;
  } else {
    console.log(chalk.green('MongoDB connected'));
  }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(chalk.green(`API running on localhost:${port}`)));
