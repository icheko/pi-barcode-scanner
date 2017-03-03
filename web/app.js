/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

var express = require('express');
var router = require('./router');
var timeout = require('connect-timeout')
var scanRequest = require('./lib/scanRequest');
var usbScanner = require('node-usb-barcode-scanner').usbScanner;
var getDevices = require('node-usb-barcode-scanner').getDevices;

var app = express();
var port = 80;

app.use(timeout('15s'));
app.use(router);
app.use(logErrors);
app.use(haltOnTimedout);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}

app.listen(port, function(request, response){
  
    console.log('Express server listening on port ' + port);
    
    //get array of attached HID devices
    var connectedHidDevices = getDevices();
    
    //print devices
    console.log(connectedHidDevices);
    
    //initialize new usbScanner
    var scanner = new usbScanner({
      vendorId : 4660
    });
    
    //scanner emits a data event once a barcode has been read and parsed
    scanner.on("data", function(code){
      console.log();
    	console.log("Activity");
    	console.log("-----------------");
      console.log("Found Barcode: "+code);
      scanRequest.setBarcode(code);
      scanRequest.respond();
    });
    
    // display scanRequest status
    setInterval(function() {
      console.log();
    	console.log("Activity");
    	console.log("-----------------");
    	console.log("Client: "+( scanRequest.get() ? 'Connected' : 'Not connected'));
    	
    }, 2000);
    
});