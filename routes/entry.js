var Entry = require('../controllers/entry');
var Case = require('../controllers/case');
var Career = require('../controllers/career');
var News = require('../controllers/news');
var modelHelper = require('../lib/modelHelper');
var tagsHelper = require('../lib/tagsHelper');
var formidable = require('formidable');
var fs = require('fs');
var fileHelper = require('../lib/fileHelper');

exports.form = function (req, res, next) {
    var column = req.param('column');
    if (!column) column = req.session.entryColumnHistory || 'case';
    if (['case', 'career', 'news'].indexOf(column) == -1) return next();

    var context = {
        state: {
            state: 'entry',
            column: column
        },
        title: '创建文章',
        entry: {
            title: '',
            body: ''
        }
    };

    //  init page tags
    context = tagsHelper(req.path, column, context);
    req.session.entryColumnHistory = column;

    res.status(200);
    res.render('page', context);
};

exports.editForm = function (req, res, next) {
    var id = req.param('id');
    modelHelper(req, function (err, model) {
        if (err) return next(err);
        model.findById(id, function (err, entry) {
            if (err) return next(err);
            if (!entry) return next();
            var column = req.param('column');
            var context = {
                state: {
                    state: 'entry',
                    column: column
                },
                entry: entry,
                title: '编辑文章'
            };
            res.render('page', context);
        });
    });
};

/**
 *  This router handles multiple columns via request queries:
 *  - case studies
 *  - careers
 *  - news
 * */
exports.submit = function (app) {
    return function (req, res, next) {
        //  handle incoming form data
        var form = new formidable.IncomingForm();
        form.uploadDir = app.get('root') + '/uploads';

        //  rename file
        form.on('file', function(field, file) {
            fs.rename(file.path, form.uploadDir + '/' + file.name);
        });

        //  parse request body data
        form.parse(req, function (err, fields, files) {
            if (err) return next(err);

            //console.dir(fields);
            //console.dir(files);

            var entry = {
                type: fields.entry_type,
                date: new Date(fields.entry_date),
                title: fields.entry_title,
                body: fields.entry_body,
                toHome: false,
                toHomeOrder: 0
            };

            //  column match via entry_type field
            switch (fields.entry_type) {
                case 'case':
                    entry.homeThumbSrc = '/uploads/' + files.entry_home.name;
                    entry.caseStudiesThumbSrc = '/uploads/' + files.entry_case.name;
                    entry = new Case(entry);
                    break;
                case 'career':
                    entry = new Career(entry);
                    break;
                case 'news':
                    entry = new News(entry);
                    break;
                default:
                    return next(new Error('Invalid entry type'));
            }

            //  save
            entry.save(function (err) {
                if (err) return next(err);
                console.log('entry saved');
                res.status(201);
                res.redirect('back');
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

        modelHelper(req, function (err, model) {
            if (err) return next(err);
            //  find entry
            model.findOne({_id: id}, function (err, doc) {
                if (err) return next(err);
                if (!doc) return next(new Error({message: 'Entry not found'}));

                var column = req.param('column');

                //  handle incoming form data
                var form = new formidable.IncomingForm();
                form.uploadDir = app.get('root') + '/uploads';

                //  rename file
                form.on('file', function(field, file) {
                    fs.rename(file.path, form.uploadDir + '/' + file.name);
                });

                //  updating
                form.parse(req, function (err, fields, files) {
                    if (err) return next(err);
                    console.log('updating..');
                    doc.title = fields.entry_title;
                    doc.body = fields.entry_body;

                    var oldHomeThumbSrc;
                    var oldCaseStudiesThumbSrc;

                    //  is files needs to update
                    if (files.entry_home) {
                        oldHomeThumbSrc = doc.homeThumbSrc;
                        doc.homeThumbSrc = '/uploads/' + files.entry_home.name;
                    }

                    if (files.entry_case) {
                        oldCaseStudiesThumbSrc = doc.caseStudiesThumbSrc;
                        doc.caseStudiesThumbSrc = '/uploads/' + files.entry_case.name;
                    }

                    //  update
                    doc.save(function (err) {
                        if (err) return next(err);

                        //  remove old files after updated
                        if (files.entry_home) {
                            fileHelper.removeFileAsync(app.get('root')+oldHomeThumbSrc, function (err) {
                                if (err) return next(err);
                            });
                        }

                        if (files.entry_case) {
                            fileHelper.removeFileAsync(app.get('root')+oldCaseStudiesThumbSrc, function (err) {
                                if (err) return next(err);
                            });
                        }

                        //  redirect
                        res.redirect('/admin');
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

        modelHelper(req, function (err, model) {
            if (err) return next(err);

            Entry.delete(model, id, function (err, entry) {
                if (err) return next(err);
                var column = req.param('column');

                if (entry) {
                    res.status(204);
                    res.send({message: 'Removed entry'});

                    //  remove case's related file
                    if (column == 'case') {
                        //  remove old files after updated
                        fileHelper.removeFileAsync(app.get('root')+ entry.homeThumbSrc, function (err) {
                            if (err) return next(err);
                        });
                        fileHelper.removeFileAsync(app.get('root')+ entry.caseStudiesThumbSrc, function (err) {
                            if (err) return next(err);
                        });
                    }
                } else {
                    res.status(404);
                    res.send({message: 'Entry not exist'});
                }

                // remove
            });
        });
    }
};
