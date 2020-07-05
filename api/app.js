require('dotenv/config');
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const jobRouter = require('./routes/Jobs');
const vehicleRouter = require('./routes/Vehicles');
const infoRouter = require('./routes/info');

const checkAuthentication = require('./checkAuth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
}));

// Checks for a logged in user before sending data
// from the specified endpoints.
app.use(['/jobs', '/vehicles'], checkAuthentication);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', jobRouter);
app.use('/vehicles', vehicleRouter);
app.use('/info', infoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.DB_CONNECT, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
  console.log('Error: ', err);
})

module.exports = app;
