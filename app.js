var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var cors = require('cors');
var csurf = require('csurf');
var methodOverride = require('method-override');

var common = require('./routes/common');
var user = require('./lib/middleware/user');
var auth = require('./lib/middleware/auth');

//  app
var app = express();
var csrfProtection = csurf({ cookie: true });

//  app config
var environment = process.env.NODE_ENV;
app.set('root', path.join(__dirname, 'public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
if (environment == 'production') {
    app.set('path', 'admin.sisobrand.com:4000');
}

if (environment == 'development') {
    app.set('path', 'localhost:4000');
}

//  mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/siso_server');

//  middleware setup
var corsOptions = {
    origin: true
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'siso system', store: new RedisStore }));
app.use(express.static(app.get('root')));
app.use(methodOverride('_method'));

app.use(user);
app.use('/api', auth.api);

//  routes
app.use(require('./routes/routes')(app));

//  handle 404 and error
app.use(common.notfound);
app.use(common.error);

//  run app
app.set('port', 4000);
app.listen(app.get('port'), function () {
    console.log('server running at http://localhost:' + app.get('port'));

    //  auto open browser
    //var spawn = require('child_process').spawn;
    //spawn('open', ['http://localhost:4000']);
});
module.exports = app;
