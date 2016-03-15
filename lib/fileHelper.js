var fs = require('fs');

exports.removeFileSync = function (path, fn) {
    fs.exists(path, function (exists) {
        if (exists) {
            fs.unlinkSync(path, function (err) {
                if (err) return fn(err);
                return fn();
            });
        }
    });
};

exports.removeFileAsync = function (path, fn) {
    fs.exists(path, function (exists) {
        if (exists) {
            fs.unlink(path, function (err) {
                if (err) return fn(err);
                return fn();
            });
        }
    });
};