"use strict";

var _ = require('underscore');
var utils = require('web3-utils');
var Iban = require('web3-eth-iban');

var inputTransactionFormatter = function (options) {

    options = _txInputFormatter(options);

    // check from, only if not number, or object
    if (!_.isNumber(options.from) && !_.isObject(options.from)) {
        options.from = options.from || (this ? this.defaultAccount : null);

        if (!options.from && !_.isNumber(options.from)) {
            throw new Error('The send transactions "from" field must be defined!');
        }

        options.from = inputAddressFormatter(options.from);
    }

    return options;
};

var inputAddressFormatter = function (address) {
    var iban = new Iban(address);
    if (iban.isValid() && iban.isDirect()) {
        return iban.toAddress().toLowerCase();
    } else if (utils.isAddress(address)) {
        return '0x' + address.toLowerCase().replace('0x','');
    }
    throw new Error('Provided address "'+ address +'" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can\'t be converted.');
};

var inputDefaultBlockNumberFormatter = function (blockNumber) {
    if (this && (blockNumber === undefined || blockNumber === null)) {
        return this.defaultBlock;
    }
    if (blockNumber === 'genesis' || blockNumber === 'earliest') {
        return '0x0';
    }
    return inputBlockNumberFormatter(blockNumber);
};

var inputBlockNumberFormatter = function (blocknumber) {
    if (blocknumber === undefined) {
        return undefined;
    } else if (isPredefinedBlockNumber(blocknumber)) {
        return blocknumber;
    }
    return (utils.ishexstrict(blocknumber)) ? ((_.isstring(blocknumber)) ? blocknumber.tolowercase() : blocknumber) : utils.numbertohex(blocknumber);
};

var isPredefinedBlockNumber = function (blockNumber) {
    return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
};
 
var inputCallFormatter = function (options){

    options = _txInputFormatter(options);

    var from = options.from || (this ? this.defaultAccount : null);

    if (from) {
        options.from = inputAddressFormatter(from);
    }


    return options;
};

var _txInputFormatter = function (options){

    if (options.to) { // it might be contract creation
        options.to = inputAddressFormatter(options.to);
    }

    if (options.data && options.input) {
        throw new Error('You can\'t have "data" and "input" as properties of transactions at the same time, please use either "data" or "input" instead.');
    }

    if (!options.data && options.input) {
        options.data = options.input;
        delete options.input;
    }

    if(options.data && !utils.isHex(options.data)) {
        throw new Error('The data field must be HEX encoded data.');
    }

    // allow both
    if (options.gas || options.gasLimit) {
        options.gas = options.gas || options.gasLimit;
    }

    ['gasPrice', 'gas', 'value', 'nonce'].filter(function (key) {
        return options[key] !== undefined;
    }).forEach(function(key){
        options[key] = utils.numberToHex(options[key]);
    });

    return options;
};

var outputDbotFormatter = function() {

};

module.exports = {
    inputDefaultBlockNumberFormatter: inputDefaultBlockNumberFormatter,
    inputBlockNumberFormatter: inputBlockNumberFormatter,
    inputCallFormatter: inputCallFormatter,
    inputTransactionFormatter: inputTransactionFormatter,
    inputAddressFormatter: inputAddressFormatter,
    outputDbotFormatter: outputDbotFormatter 
};
