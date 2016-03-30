var photoModel = require('../models/photo');

function Photo (obj) {
    this.model = photoModel;
    for (var key in obj) {
        this[key] = obj[key];
    }
}

Photo.prototype.save = function (fn) {
    var photo = this;
    this.model.create(photo, function (err) {
        if (err) return fn(err);
        fn();
    });
};

Photo.delete = function (model, id, fn) {
    model.findById(id, function (err, photo) {
        if (err) return fn(err);
        if (!photo) return fn(null, false);

        photo.remove(function (err) {
            if (err) return fn(err);
            fn(null, photo);
        });
    });
};

Photo.getAll = function (fn) {
    photoModel.find({}, function (err, photos) {
        if (err) return fn(err);
        fn(null, photos);
    });
};

module.exports = Photo;

