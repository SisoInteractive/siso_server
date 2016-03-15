module.exports = function (app) {
    var express = require('express');
    var router = express.Router();
    //  routes
    var index = require('./index');
    var entry = require('./entry');
    var admin = require('./admin');
    var user = require('./user');
    var login = require('./login');
    var api = require('./api');

    //  dependencies
    var page = require('../lib/page');
    var Entry = require('../controllers/entry');

    //  global
    router.all('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
    });

    //  home
    router.get('/', index.home);

    //  entry
    router.get('/entry', entry.form);
    router.get('/entry/:id', entry.editForm);
    router.post('/entry', entry.submit(app));
    router.put('/entry/:id', entry.update(app));
    router.delete('/entry/:id', entry.delete(app));

    //  admin
    router.get('/admin', page(Entry.count), admin.list);

    //  user
    router.get('/user', user.home);
    router.get('/user/login', user.loginForm);
    router.post('/user/login', user.loginSubmit);
    router.put('/user', user.update);

    //  login
    router.get('/login', login.form);
    router.post('/login', login.submit);

    //  api
    router.get('/api/v1/:column', api.list);

    return router;
};

