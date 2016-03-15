var Entry = require('./entry');
var model = require('../models/career');

function Career (obj) {
    var careerEntry = new Entry(obj, model);
    return careerEntry;
}

module.exports = Career;
