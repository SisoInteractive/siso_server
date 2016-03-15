exports.home = function (req, res, next) {

};

exports.loginForm = function (req, res) {
    var context = {
        state: {
            state: 'user.login',
            title: '登录系统'
        }
    };
    res.status(200);
    res.render('page', context);
};

exports.loginSubmit = function (req, res) {
    console.log(req.body);
    //var context = {
    //    state: {
    //        state: 'user.login',
    //        title: '登录系统'
    //    }
    //};
    //res.status(200);
    //res.render('page', context);
    res.send(req.body);
};

exports.update = function (req, res, next) {};