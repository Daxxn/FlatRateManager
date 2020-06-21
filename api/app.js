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
const { nextTick } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

const checkAuth = process.env.AUTH_DEV === false 
  ? (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(405).json({ message: 'must log in first.' });
    }
  } 
  : (req, res, next) => {
    console.log('auth dev mode. auth OFF!')
    next();
};

// app.use(function(req, res, next) {
//   checkAuth(req, res, next);
// });

app.use('/', indexRouter);
app.use('/users', checkAuth, usersRouter);
app.use('/jobs', checkAuth, jobRouter);
app.use('/vehicles', checkAuth, vehicleRouter);


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
