var auth = require('basic-auth');
var User = require('../user');

exports.restrict = function (req, res, next) {
    if (!req.user) {
        req.session.redirectUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(302);
        res.redirect('/user/login');
    } else {
        next();
    }
};

exports.api = function (req, res, next) {
    var credentials = auth(req);
    if (!credentials) {
        res.status(403);
        return res.send({result: 'Please login via basic auth'});
    }

    User.authenticate(credentials.name, credentials.pass, function (err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(403);
            return res.send({result: 'Invalid user, please check your username and password'});
        }

        console.log(user);
        req.remoteUser = user;
        next();
    });
};