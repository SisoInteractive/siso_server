var Models = require('../models/models');

module.exports = function (column, fn) {
    var model;
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
    }

    if (!model) return fn(new Error('Invalid column'));

    fn(null, model);
};