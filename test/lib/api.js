var request = require('request');

function testInvalidLogin () {
    //  request without authentication
    request.post('http://localhost:4000/api/', function (error, response, body) {
        if (error) throw err;
        console.log(body, '\nShould be: Please login via basic auth\n\n');
    });

    //  request with wrong username and passworld
    request.post(
        'http://localhost:4000/api/',
        {
            'auth': {
                'user': 'sammok',
                'pass': 'wrongPassword'
            }
        },
        function (error, response, body) {
            if (error) throw err;
            console.log(body, '\nShould be: Invalid user, please check your username and password\n\n');
    });
}

function testValidLogin () {
    //  request with wrong username and passworld
    request.post(
        'http://localhost:4000/api/',
        {
            'auth': {
                'user': 'sammok',
                'pass': 'a123456..'
            }
        },
        function (error, response, body) {
            if (error) throw err;
            console.log(body);
        });
}

function testGetEntry (entry) {
    request.get(
        'http://localhost:4000/api/v1/' + entry,
        {
            'auth': {
                'user': 'sammok',
                'pass': 'a123456..'
            }
        },
        function (error, response, body) {
            if (error) throw err;
            console.log('Entries: ');
            console.log(body);
        });
}

testInvalidLogin();
testValidLogin();
testGetEntry('news');
testGetEntry('career');
testGetEntry('case');

