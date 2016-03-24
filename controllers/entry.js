var modelHelper = require('../lib/modelHelper');

function Entry (obj, model) {
    this.model = model;
    for (var key in obj) {
        this[key] = obj[key];
    }
}

Entry.prototype.save = function (fn) {
    var entry = this;
    this.model.create(entry, function (err) {
        if (err) return fn(err);
        fn();
    });
};

Entry.update = function (model, id, update, fn) {
    model.update(
        { _id: id},
        update,
        function (err) {
            if (err) return fn(err);
            fn();
        }
    );
};

Entry.findById = function (model, id, fn) {
    model.findById(id, function (err, entry) {
        if (err) return fn(err);
        fn(null, entry);
    });
};

Entry.delete = function (model, id, fn) {
    model.findById(id, function (err, entry) {
        if (err) return fn(err);
        // if entry not exist, set false for result
        if (!entry) return fn(null, false);

        entry.remove(function (err) {
            if (err) return fn(err);
            fn(null, entry);
        });
    });
};

Entry.getRange = function (model, from, perpage, fn) {
    model
        .find({})
        .sort({order: 1})
        .skip(from)
        .limit(perpage)
        .exec(function (err, entries) {
            if (err) return fn(err);
            fn(null, entries);
        });
};

//  count documents via req.query's column property
Entry.count = function (req, fn) {
    modelHelper(req, function (err, model) {
        if (err) return fn(err);
        model.count({}, fn);
    });
};

Entry.getAll = function (model, fn) {
    var result = model.find({});

    if (model.column == 'case') {
        result = result.sort({order: 1});
    } else {
        result = result.sort({date: -1});
    }

    result.exec(function (err, entries) {
        if (err) return fn(err);
        fn(null, entries);
    });
};

module.exports = Entry;
