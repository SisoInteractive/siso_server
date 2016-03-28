var User = require('../lib/user');

exports.home = function (app) {
    return function (req, res, next) {
        var context = {
            state: {
                state: 'user',
                title: '欢迎回来'
            },
            globalVariables: {
                path: app.get('path')
            }
        };
        res.status(200);
        res.render('page', context);
    }
};

exports.loginForm = function (app) {
    return function (req, res) {
        if (!req.user) {
            var context = {
                state: {
                    state: 'user.login',
                    title: '登录系统'
                },
                globalVariables: {
                    path: app.get('path')
                }
            };
            res.status(200);
            res.render('page', context);
        } else {
            res.status(302);
            res.redirect('back');
        }
    }
};

exports.loginSubmit = function (app) {
    return function (req, res, next) {
        var name = req.param('name');
        var pass = req.param('pass');
        var remember = req.param('remember');
        //console.log(req.body, name, pass);
        User.authenticate(name, pass, function (err, user) {
            if (err) return next(err);
            if (user) {
                req.session.uid = user.id;

                if (remember == 'true') {
                    var time = new Date();
                    req.session.cookie.expires = new Date(time.getFullYear(), time.getMonth(), time.getDate()+7)
                } else {
                    req.session.cookie.expires = false;
                }

                var homePage = req.protocol + '://' + req.get('path');
                var redirectUrl = req.session.redirectUrl || homePage;
                res.status(200);
                res.send({message: 'OK: login success', redirect: redirectUrl});
            } else {
                res.status(401);
                res.send({message: 'Unauthorized: wrong username or password'});
            }
        })
    }
};

exports.logout = function (req, res, next) {
    if (req.session.uid) {
        req.session.destroy(function (err) {
            if (err) next(err);
            console.log('destroyed the session');
            res.status(302);
            res.redirect('/');
        });
    } else {
        res.status(302);
        res.redirect('/');
    }
};

exports.update = function (req, res, next) {
    if (req.params.length == 0) {
        res.status(400);
        return res.send({result: 'Invalid nickname'});
    }

    var nickname = req.param('nickname');
    var password = req.param('password');

    nickname && (req.user.nickname = nickname);
    password && (req.user.pass = password);

    req.user.update(function (err) {
        if (err) {
            res.status(500);
            return res.send({result: 500});
        }

        res.status(200);
        return res.send({result: 'Success changed nickname'});
    });
};