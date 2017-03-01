/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

// var usbScanner = require('usbScanner');
var usbScanner = require('node-usb-barcode-scanner');
// var getDevices = require('../usbscanner').getDevices;

var app = {

    default : function(req, res){
        res.send("Hi friend. I'm alive.");
    }

}

var scanner = {

    get : function(req, res){
        res.send("Hi buddy");
    }

}

module.exports.app = app;
module.exports.scanner = scanner;