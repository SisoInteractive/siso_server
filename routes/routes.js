var express = require('express');
var router = express.Router();
//  routes
var index = require('./index');
var entry = require('./entry');
var admin = require('./admin');
var user = require('./user');
var login = require('./login');
var api = require('./api');

//  home
router.get('/', index.home);

//  entry
router.get('/entry/', entry.form);
router.post('/entry/', entry.submit);
router.put('/entry/:id', entry.update);
router.delete('/entry/:id', entry.delete);

//  admin
router.get('/admin/', admin.list);

//  user
router.get('/user', user.home);
router.put('/user', user.update);

//  login
router.get('/login', login.form);
router.post('/login', login.submit);

//  api
router.get('/api/v1/:column', api.list);

module.exports = router;