var chai = require('chai');
var assert = chai.assert;
var u = require('./helpers/test.utils.js');
var Atn = require('../packages/web3-atn');
var atn = new Atn();

describe('web3.atn', function() {
    describe('methods', function() {
        u.methodExists(atn, 'countDbot');
        u.methodExists(atn, 'getDbotByIndex');
        u.methodExists(atn, 'registerDbot');
    });
});
