var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type: String,
    title: String,
    body: String,
    date: Date,
    index: Number
});

module.exports = mongoose.model('News', schema);

