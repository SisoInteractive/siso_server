var Entry = require('./entry');
var caseModel = require('../models/case');

function Case (obj) {
    var caseEntry = new Entry(obj, caseModel);
    return caseEntry;
}

module.exports = Case;

