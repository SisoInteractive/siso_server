module.exports = function (fn, perpage) {
    perpage = perpage || 10;
    return function (req, res, next) {
        var page = Math.max(
            parseInt(req.param('page') || '1', 10),
            1
        );

        fn(req, function (err, total) {
            if (err) return next(err);
            req.page = res.locals.page = {
                column: req.param('column'),
                number: page,
                perpage: perpage,
                pergroup: 10,
                from: (page-1) * perpage,
                to: (page-1) * perpage + perpage - 1,
                total: total,
                count: Math.ceil(total / perpage),
                toString: function () {
                    return JSON.stringify(this);
                }
            };
            next();
        });
    }
};