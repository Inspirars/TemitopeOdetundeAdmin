var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session")
const passport = require("passport");
const MongoStore = require('connect-mongo');

require('dotenv').config()


var formRouter = require('./routes/form');
var dashboardRouter = require('./routes/dashboard');
var postCreateEdit = require('./routes/postCreateEdit')
var deleteRouter = require('./routes/deletePost')

var app = express();

let mongoString = process.env.MONGOSTRING

main()
.then( ()=> console.log("connected to db"))
.catch( err => console.log(err))


async function main(){
  await mongoose.connect(mongoString)
  
}
var client = mongoose.connection.getClient()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: process.env.SECRETS, 
  resave: false, 
  saveUninitialized: true, 
  store : MongoStore.create({
    client,
    dbName : "sessionStore"
  }),
  cookie : {
    maxAge : 60 * 60 * 24 * 1000
  }
}));

require("./config/passport")
app.use(passport.initialize())
app.use(passport.session());

app.use('/', dashboardRouter);
app.use('/', formRouter);
app.use("/", postCreateEdit)
app.use("/", deleteRouter)

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

module.exports = app;
