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
    pushHome: Boolean,
    pushHomeOrder: Number
});

module.exports = mongoose.model('Case', schema);