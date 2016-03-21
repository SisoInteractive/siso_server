var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type: String,
    title: String,
    body: String,
    date: Date,
    order: Number, //  to specified the detail page's html file
    homeThumbSrc: String,
    homeThumbMobileSrc: String,
    caseStudiesThumbSrc: String,
    caseStudiesThumbMobileSrc: String,
    toHome: Boolean,
    toHomeOrder: Number
});

module.exports = mongoose.model('Case', schema);