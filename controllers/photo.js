var photoModel = require('../models/photo');

function Photo (obj) {
    this.model = photoModel;
    for (var key in obj) {
        this[key] = obj[key];
    }
}

Photo.prototype.save = function (fn) {
    var photo = this;
    this.model.create(photo, function (err, photoData) {
        photo._id = photoData._id;
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
    photoModel.find({order: {$gt: -1}}).sort({order: 1}).exec(function (err, photos) {
        if (err) return fn(err);
        photoModel.find({order: -1}).exec(function (err, photosUnsorted) {
            if (err) return fn(err);
            fn(null, photos.concat(photosUnsorted));
        });
    });
};

module.exports = Photo;

