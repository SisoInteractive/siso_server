var Entry = require('../controllers/entry');
var modelHelper = require('../lib/modelHelper');
var tagsHelper = require('../lib/tagsHelper');
var utils = require('../lib/utils');

exports.list = function (req, res, next) {
    var context = {
        state: {
            state: 'admin',
            navAdminClass: 'active'
        },
        title: '当前文章栏目'
    };

    modelHelper(req, function (err, model) {
        if (err) return next(err);
        //  init page tags
        var column = req.param('column');
        context = tagsHelper(req.path, column, context);

        //  skip the page.from, and limit page.perpage to get the entries
        Entry.getRange(model, req.page.from, req.page.perpage, function (err, entries) {
            if (err) return next(err);
            if (!entries) return next(); // 404

            var curYear = new Date().getFullYear();
            //  reformat date
            context.entries = entries.map(function (entry) {
                var isPastYear = entry.date.getFullYear() < curYear;
                entry.formatedDate = utils.formatDate(entry.date, isPastYear ? 'yyyy%mm%dd' : 'mm%dd');
                return entry;
            });

            res.status = 200;
            res.render('page', context);
        });
    });
};

