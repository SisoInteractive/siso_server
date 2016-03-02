var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csurf = require('csurf');

var common = require('./routes/common');

var app = express();
var csrfProtection = csurf({ cookie: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  routes
app.use(require('./routes/routes'));

//  handle 404 and error
app.use(common.notfound);
app.use(common.error);

app.listen(3000);
module.exports = app;
