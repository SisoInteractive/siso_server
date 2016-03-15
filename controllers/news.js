var Entry = require('./entry');
var newsModel = require('../models/news');

function News (obj) {
    var newsEntry = new Entry(obj, newsModel);
    return newsEntry;
}

module.exports = News;

