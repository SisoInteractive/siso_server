exports.restrict = function (req, res, next) {
    if (!req.user) {
        req.session.redirectUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(302);
        res.redirect('/user/login');
    } else {
        next();
    }
};