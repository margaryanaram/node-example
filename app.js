const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./helpers/logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '-=');

// environment variables
require('dotenv').load();

// passport init
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
const router = require('./routes');
app.use('/api', router);

// error handler
app.use((err, req, res, next) => {
  if(typeof err === 'object' && err.name === 'SequelizeValidationError') {
      let message = '';
      err.errors.map(error => {
          message += error.message+'\n';
      });

      res.status(400).json({
          success: false,
          message: message.slice(0, -1)
      });
  } else {
      console.log(err);
      const message = (typeof err === 'string') ? err : err.message;
      logger.error(message);
      res.status(500).json({
          success: false,
          message: 'Failed to process request'
      });
  }
});

// uncaught exceptions
process.on('uncaughtException', (exception) => {
    logger.error(exception.stack);
    if(process.env.NODE_ENV !== 'development') {
        process.exit(1);
    }

    return false;
});

module.exports = app;
