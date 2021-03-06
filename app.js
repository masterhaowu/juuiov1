var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var flash = require ('connect-flash');
var session = require ('express-session')
var async = require('async');
var crypto = require('crypto');

//routes
var index = require('./routes/index');
var users = require('./routes/users');
var logout = require('./routes/logout');
var emailsignup = require('./routes/emailsignup');
var emaillogin = require('./routes/emaillogin');
var facebook = require('./routes/facebook');
var forgotyourpassword = require('./routes/forgotyourpassword');
var resetyourpassword = require('./routes/resetyourpassword');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//require for passport
app.use(session({
  secret: 'thisisjustatestforappone',// session secret
  name: 'cookie_name',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(function(req,res,next){
  res.locals.messages = req.flash();
  next();
});

require('./config/passport')(passport); // pass passport for configuration

//routes
app.use('/', index);
app.use('/users', users);
app.use('/logout', logout);
app.use('/emailsignup', emailsignup);
app.use('/emaillogin', emaillogin);
app.use('/facebook', facebook);
app.use('/forgotyourpassword', forgotyourpassword);
app.use('/resetyourpassword', resetyourpassword);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, providing error in development and production
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = req.app.get('env') === 'production' ? err : {};  

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
