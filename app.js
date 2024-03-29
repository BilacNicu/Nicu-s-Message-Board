var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

var app = express();

var allRouter = require('./routes/routes.js');

const db = "mongodb+srv://nicubilac:LexusGS3503.5@messageboard.jxctys4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect( db )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api/routes', allRouter);
app.use('/', allRouter);
// Serve static files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Catch-all handler for the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  let error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: error
  });

});

const listenPort = 8080; // PORT = 3000 in the .env file
app.listen(listenPort, '0.0.0.0', () => {
  console.log(`Server listening on port ${listenPort}`);
});

module.exports = app;
