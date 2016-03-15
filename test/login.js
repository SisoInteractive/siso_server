var request = require('request');

request.post('localhost:4000/user/login').form({
    user: 'sammok2003',
    pass: 'a123456..'
});