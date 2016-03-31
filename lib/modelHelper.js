var Models = require('../models/models');

module.exports = function (req, fn) {
    var model;
    var column = req.param('column');

    if (!column) {
        req.path == '/admin'
            ? column = req.params.column = req.session.adminColumnHistory || 'case'
            : column = req.params.column = 'case';
    }

    switch (column) {
        case 'case':
            model = Models.caseModel;
            break;
        case 'career':
            model = Models.careerModel;
            break;
        case 'news':
            model = Models.newsModel;
            break;
        case 'photo':
            model = Models.photoModel;
            break;
    }

    if (!model) return fn(new Error('Invalid column'));

    //  add model specification
    model.column = column;

    //  save cur column to session
    if (req.path == '/admin') (req.session.adminColumnHistory = column);
    return fn(null, model);
};