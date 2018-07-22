'use strict';

var formatters = require('../formatters');
var Method = require('../method');
var utils = require('../../utils/utils');

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

    var createDbot = new Method({
        name: 'createDbot',
        call: 'atn_createDbot',
        params: 2,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputDbotFormatter]
    });

     var getDbotByIndex = new Method({
        name: 'getDbotByIndex',
        call: 'atn_getDbotByIndex',
        params: 3,
        inputFormatter: [formatters.inputCallFormatter, utils.toHex, formatters.inputBlockNumberFormatter]
    });

    var changeName = new Method({
        name: 'changeName',
        call: 'atn_changeName',
        params: 3,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputAddressFormatter, utils.toHex]
    });

    var changeDomain = new Method({
        name: 'changeDomain',
        call: 'atn_changeDomain',
        params: 3,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputAddressFormatter, utils.toHex]
    });

    var addEndPoint = new Method({
        name: 'addEndPoint',
        call: 'atn_addEndPoint',
        params: 5,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputAddressFormatter, null, null, null]
    });
  
    var updateEndPoint = new Method({
        name: 'updateEndPoint',
        call: 'atn_updateEndPoint',
        params: 5,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputAddressFormatteri, null, null, null]
    });

    var deleteEndPoint = new Method({
        name: 'deleteEndPoint',
        call: 'atn_deleteEndPoint',
        params: 4,
        inputFormatter: [formatters.inputTransactionFormatter, formatters.inputAddressFormatter, null, null]
    });

    return [
        registerDbot,
        createDbot,
        getDbotByIndex,  
        changeName,
        changeDomain,
        addEndPoint,
        updateEndPoint,
        deleteEndPoint
    ];
};


module.exports = Atn;
