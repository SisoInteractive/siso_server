var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    position: String,
    positionEnglish: String,
    photoSrc: String,
    order: Number
});

module.exports = mongoose.model('Photo', schema);