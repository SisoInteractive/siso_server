var User = require('../user');

module.exports = function (req, res, next) {
    var uid = req.session.uid;
    console.log('========================= expires: ', req.session.cookie.expires);
    console.log('========================= maxAge: ', req.session.cookie.maxAge);
    if (!uid) {
        req.user = res.locals.user = false;
        return next();
    }

    User.get(uid, function (err, user) {
        if (err) return next(err);
        req.user = res.locals.user = user;
        next();
    });
};