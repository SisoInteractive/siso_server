var caseModel = require('../models/case');

function Case (obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

Case.prototype.save = function (fn) {
    var entry = this;
    entry.date = new Date();
    caseModel.create(entry, function (err) {
        if (err) return fn(err);
        fn();
    });
};

Case.update = function (id, update, fn) {
    var entry = this;
    caseModel.update(
        { _id: id},
        update,
        function (err) {
            if (err) return fn(err);
            fn();
        }
    );
};

Case.findById = function (id, fn) {
    caseModel.findById(id, function (err, entry) {
        if (err) return fn(err);
        fn(null, entry);
    });
};

Case.delete = function (id, fn) {
    caseModel.findById(id, function (err, entry) {
        if (err) return fn(err);
        // if entry not exist, set false for result
        if (!entry) return fn(null, false);
        entry.remove(function (err) {
            if (err) return fn(err);
            fn(null, true);
        });
    });
};

Case.list = function (fn) {
    caseModel.find({}, function (err, entries) {
        if (err) return fn(err);
        fn(null, entries);
    });
};

module.exports = Case;
