var User = require('../user');

module.exports = function (req, res, next) {
    if (req.remoteUser) return next();

    var uid = req.session.uid;
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