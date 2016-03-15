var assert = require('assert');
var request = require('request');
var FormData = require('form-data');
var fs = require('fs');

var Entry = require('../../controllers/entry');
var modelHelper = require('../../lib/modelHelper');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/siso_server');

function testUpdate (id, formData, cb) {
    request.put(
        {
            url: 'http://localhost:4000/entry/' + id + '?column=news',
            formData: formData
        }, function (err, res, body) {
            if (err) throw err;
            console.log('changed..');
            modelHelper('news', function (err, model) {
                Entry.findById(model, id, function (err, entry) {
                    if (err) throw err;
                    assert.equal(formData.entry_title, entry.entry_title, 'Title should be same.');
                });
            });
        });
}

function createCase () {
    var dest01 = fs.createWriteStream('../../public/uploads/test01.txt');
    var dest02 = fs.createWriteStream('../../public/uploads/test02.txt');
    fs.createReadStream('./test01.txt').pipe(dest01);
    fs.createReadStream('./test02.txt').pipe(dest02);
    var count = 0;
    dest01.on('close', function () {
        if (++count == 2) {
            fn();
        }
    });
    dest02.on('close', function () {
        if (++count == 2) {
            fn();
        }
    });

    function fn() {
        modelHelper('case', function (err, model) {
            var entry = new model({
                type: 'case',
                date: new Date(),
                title: 'test',
                body: 'test',
                homeThumbSrc: '/uploads/test01.txt',
                caseStudiesThumbSrc: '/uploads/test02.txt'
            });

            entry.save(function (err) {
                if (err) throw err;
                console.log('saved');
                mongoose.connection.close();
            });
        });
    }
}

var id = '56e67d9b1ee91bbf0bdcfaeb';
//testUpdate( id, { entry_title: (new Date()).getSeconds() });
createCase();

