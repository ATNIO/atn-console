"use strict";

var core = require('web3-core');
var Method = require('web3-core-method');
var utils = require('web3-utils');
var formatter = require('./helpers');
var Net = require('web3-net');

var Atn = function Atn() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);
    
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
    };

    this.net = new Net(this.currentProvider);


   [
        new Method({
            name: 'countDbot',
            call: 'atn_countDbot',
            params: 0,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getDbotByIndex',
            call: 'atn_getDbotByIndex',
            params: 3,
            inputFormatter: [formatter.inputCallFormatter, formatter.inputDefaultBlockNumberFormatter, formatter.inputDbotIndexFormatter],
            outputFormatter: formatter.outputDbotFormatter
        }),
        new Method({
            name: 'registerDbot',
            call: 'atn_registerDbot',
            params: 2,
            inputFormatter: [formatter.inputTransactionFormatter, formatter.inputAddressFormatter]
        })
    ].forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager);
    });

};

core.addProviders(Atn);


module.exports = Atn;


