var redis = require('redis');
var User = require('../../lib/user');
var assert = require('assert');
var db = redis.createClient();

function clear () {
    db.del('user:ids');
    db.del('user:1');
}

function createUser () {
    clear();

    var tobi = new User({
        name: 'sammok',
        pass: 'a123456..',
        nickname: '狼哥哥',
        age: (new Date()).getSeconds()
    });

    tobi.save(function (e) {
        if (e) throw e;
        User.getByName('Tobi', function (err, user) {
            if (err) throw err;
            console.dir(user);
        })
    });
}


createUser();

//  login
//  $ curl -d name=sammok -d pass=a123456.. http://localhost:4000/user/login -X POST




