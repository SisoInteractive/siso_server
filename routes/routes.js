var auth = require('../lib/middleware/auth');

module.exports = function (app) {
    var express = require('express');
    var router = express.Router();
    //  routes
    var index = require('./index');
    var entry = require('./entry');
    var admin = require('./admin');
    var user = require('./user');
    var api = require('./api');

    //  dependencie
    var page = require('../lib/page');
    var Entry = require('../controllers/entry');

    //  restrict login (except /user/login, /api at beginning)
    router.all(/(?=^\/(?!user\/login))(?=^\/(?!api))/, auth.restrict(app));

    //  entry
    router.get('/entry', entry.form(app));
    router.get('/entry/:id', entry.editForm(app));
    router.post('/entry', entry.submit(app));
    router.put('/entry/:id', entry.update(app));
    router.put('/entry/:id/pushHome', entry.pushHome);
    router.delete('/entry/:id', entry.delete);

    //  admin
    router.get('/admin', page(Entry.count), admin.list(app));

    //  user
    router.get('/user', user.home(app));
    router.get('/user/login', user.loginForm(app));
    router.post('/user/login', user.loginSubmit(app));
    router.get('/user/logout', user.logout);
    router.put('/user', user.update);

    //  api
    router.get('/api/v1/:column', api.list);

    //  home
    router.get('/', index.home(app));

    return router;
};

