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
    var column = model.column;
    var pushHomeEntries = [];

    if (column == 'case') {
        //  get push home entries
        model
            .find({ pushHome: true})
            .sort({ date: -1 })
            .exec(function (err, entries) {
                if (err) return fn(err);
                pushHomeEntries = entries;
                //  get another entries
                var skipAmount = from >= perpage ? from - pushHomeEntries.length : from;
                if (skipAmount < 0) skipAmount = 0;
                model.find({ pushHome: false})
                    .sort({date: -1})
                    .skip(skipAmount)
                    .limit(perpage - pushHomeEntries.length)
                    .exec(function (err, entries) {
                        if (err) return fn(err);
                        fn(null, pushHomeEntries.concat(entries));
                    });
            });
        return;
    }

    model.find({})
        .sort({date: -1})
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

Entry.countPushHome = function (req, fn) {
    modelHelper(req, function (err, model) {
        if (err) return fn(err);
        model.count({pushHome: true}, fn);
    });
};

Entry.getAll = function (model, fn) {
    var column = model.column;
    var pushHomeEntries = [];

    if (column == 'case') {
        //  get push home entries
        model
            .find({ pushHome: true})
            .sort({ date: -1 })
            .exec(function (err, entries) {
                if (err) return fn(err);
                pushHomeEntries = entries;
                //  get another entries
                model.find({ pushHome: false})
                    .sort({date: -1})
                    .exec(function (err, entries) {
                        if (err) return fn(err);
                        fn(null, pushHomeEntries.concat(entries));
                    });
            });
        return;
    }

    model.find({})
        .sort({date: -1})
        .exec(function (err, entries) {
            if (err) return fn(err);
            fn(null, entries);
        });
};

module.exports = Entry;
