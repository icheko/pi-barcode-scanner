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
var util = require('util');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 80;
var scanner;
var connectedHidDevices;

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

io.on('connection', function(client){
    
    // only allow a single connection
    if(Object.keys(io.sockets.connected).length > 1){
      console.log('Only one client allowed. Disconnecting client.');
      client.disconnect(true);
      return;
    }
    
    var timeout = setTimeout(function(){
      console.log("Timeout reached. Disconnecting client.");
      client.disconnect(true);
    }, 60000);
  
    if( util.inspect(scanner.listeners('data')).length == 2 ){
      
      scanner.on("data", function(code){
        console.log();
        console.log("Activity");
        console.log("-----------------");
        console.log("Found Barcode: "+code);
        io.emit('barcode', code);
      });

    }

    client.on('barcode-received', function(success){
        if(success){
          clearTimeout(timeout);
          client.disconnect(true);
          console.log('Barcode received. Disconnecting client.');
        }
        
    });
    
    client.on('force-disconnect', function(){
      clearTimeout(timeout);
      client.disconnect(true);
      console.log('Client wished to disconnect.');
    });

});

server.listen(port, function(request, response){
  
    console.log('Express server listening on port ' + port);

    //get array of attached HID devices
    connectedHidDevices = getDevices();

    //print devices
    console.log(connectedHidDevices);

    //initialize new usbScanner
    scanner = new usbScanner({
      vendorId : 4660
    });
    
});