var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type: String,
    title: String,
    body: String,
    date: Date,
    homeThumbSrc: String,
    caseStudiesThumbSrc: String,
    toHome: Boolean,
    toHomeOrder: Number
});

module.exports = mongoose.model('Case', schema);