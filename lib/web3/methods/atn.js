'use strict';

var formatters = require('../formatters');
var Method = require('../method');

var Atn = function Atn(web3) {
    this._requestManager = web3._requestManager;

    var self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });
    
}

var methods = function () {
    var registerDbot = new Method({
        name: 'registerDbot',
        call: 'atn_registerDbot',
        params: 2,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputAddressFormatter]
    });

    var countDbot = new Method({
        name: 'countDbot',
        call: 'atn_countDbot',
        params: 2,
        inputFormatter: [formatters.inputCallFormatter, formatters.inputDefaultBlockNumberFormatter]
    });

    return [
        registerDbot,
        countDbot
    ];
};


module.exports = Atn;
