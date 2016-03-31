var Photo = require('../controllers/photo');
var fs = require('fs');
var modelHelper = require('../lib/modelHelper');
var fileHelper = require('../lib/fileHelper');
var formidable = require('formidable');

exports.form = function (app) {
    return function (req, res, next) {
        var context = {
            state: {
                state: 'photo'
            },
            globalVariables: {
                path: app.get('path')
            },
            title: '员工照片',
            memberListToString: function () {
                return JSON.stringify(this.memberList);
            }
        };

        Photo.getAll(function (err, photos) {
            if (err) return next(err);
            context.memberList = photos;

            res.status = 200;
            res.render('page', context);
        });
    }
};

exports.submit = function (app) {
    return function (req, res, next) {
        //  specified upload dir
        var uploadDir = app.get('root') + '/uploads';
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

        //  handle incoming form data
        var form = new formidable.IncomingForm();
        form.uploadDir = uploadDir;
        form.maxFieldsSize = 2 * 1024 * 1024;

        //  parse request body data
        form.parse(req, function (err, fields, files) {
            if (err) return next(err);
            if (!files.photoSrc) {
                res.status(400);
                return res.send({message: 'Wrong upload value'});
            }

            //  rename file
            for (var i in files) {
                //  create union file name
                if (files[i].size) {
                    files[i].name = new Date().getTime() + Math.random().toFixed(5)*100000 + '.' + files[i].type.split('/')[1];
                    fs.rename(files[i].path, form.uploadDir + '/' + files[i].name);
                }
            }

            var photo = {
                name: fields.name,
                position: fields.position,
                positionEnglish: fields.positionEnglish,
                photoSrc: '/uploads/' + files.photoSrc.name,
                order: -1
            };

            var photoData = new Photo(photo);
            photoData.save(function (err) {
                if (err) return next(err);
                res.status(201);
                res.send({message: 'Success created', data: JSON.stringify(photo)});
            });
        });
    }
};

exports.update = function (app) {
    return function (req, res, next) {
        var id = req.param('id');
        id = id ? id.match(/^[0-9a-fA-F]{24}$/) : '';

        if (!id) {
            res.status(400);
            res.send({message: 'Invalid entry id'});
            return;
        }

        req.params.column = 'photo';
        modelHelper(req, function (err, model) {
            if (err) return next(err);
            //  find photo
            model.findOne({_id: id}, function (err, doc) {
                if (err) return next(err);
                if (!doc) return next(new Error({message: 'Entry not found'}));

                //  specified upload dir
                var uploadDir = app.get('root') + '/uploads';
                if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

                //  handle incoming form data
                var form = new formidable.IncomingForm();
                form.uploadDir = uploadDir;
                form.maxFieldsSize = 2 * 1024 * 1024;

                //  parse request body data
                form.parse(req, function (err, fields, files) {
                    if (err) return next(err);

                    //  rename file
                    for (var i in files) {
                        //  create union file name
                        if (files[i].size) {
                            files[i].name = new Date().getTime() + Math.random().toFixed(5)*100000 + '.' + files[i].type.split('/')[1];
                            fs.rename(files[i].path, form.uploadDir + '/' + files[i].name);
                        }
                    }

                    doc.name = fields.name;
                    doc.position = fields.position;
                    doc.positionEnglish = fields.positionEnglish;

                    if (files.photoSrc) {
                        doc.photoSrc = '/uploads/' + files.photoSrc.name;
                    }

                    doc.save(function (err) {
                        if (err) return next(err);

                        res.status(201);
                        res.send({message: 'Success updated', data: JSON.stringify(doc)});
                    });
                });
            });
        });
    }
};

exports.delete = function (app) {
    return function (req, res, next) {
        //  Is valid _id object format?
        var id = req.param('id');
        id = id ? id.match(/^[0-9a-fA-F]{24}$/) : '';

        if (!id) {
            res.status(400);
            res.send({message: 'Invalid entry id'});
            return;
        }

        req.params.column = 'photo';
        modelHelper(req, function (err, model) {
            if (err) return next(err);

            Photo.delete(model, id, function (err, photo) {
                if (err) return next(err);
                var column = req.param('column');

                if (photo) {
                    res.status(204);
                    res.send({message: 'Removed photo'});

                    //  remove case's related file
                    fileHelper.removeFileAsync(app.get('root')+ photo.photoSrc, function (err) {
                        if (err) return next(err);
                    });
                } else {
                    res.status(404);
                    res.send({message: 'Entry not exist'});
                }

                // remove
            });
        });
    }
};

