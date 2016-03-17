var Entry = require('../controllers/entry');
var modelHelper = require('../lib/modelHelper');

exports.list = function (req, res, next) {
    modelHelper(req, function (err, model) {
        if (err) {
            res.status(400);
            res.setHeader({'Content-Type': 'application/json'});
            return res.send({message: 'Invalid column'});
        }

        Entry.getAll(model, function (err, entries) {
            if (err) return next(err);
            if (!entries) {
                res.status(404);
                res.setHeader({'Content-Type': 'application/json'});
                res.send({message: 'Entries not found'});
            }
            res.status(200);
            res.send({result: entries});
        });
    });
};