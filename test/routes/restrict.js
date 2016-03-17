var assert = require('assert');
var a = '/user';
var b = '/user/login';
var c = '/users';
var d = '/api';
var e = '/api/a';

var f = '/home';
var g = '/home';

function testReg(reg) {
    assert.equal(reg.test(a), true, 'Should be true');
    assert.equal(reg.test(b), false, 'Should be false');
    assert.equal(reg.test(c), true, 'Should be true');
    assert.equal(reg.test(d), false, 'Should be false');
    assert.equal(reg.test(e), false, 'Should be false');
    assert.equal(reg.test(f), true, 'Should be true');
    assert.equal(reg.test(g), true, 'Should be true');
}

testReg(/(?=^\/(?!user\/login))(?=^\/(?!api))/);
