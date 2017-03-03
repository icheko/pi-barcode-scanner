/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

var scanRequest = require('../lib/scanRequest');
var jsonResponse = require('../lib/jsonResponse');

var app = {

    default : function(req, res){
        scanner.reply(res, 200, "Hi friend. I'm alive.");
    }
    
}

var scanner = {

    get : function(req, res){
        
        // only one request is allowed
      	if(scanRequest.get()){
      	  scanner.reply(res, 420, "Wooa. Chill man.");
      	  return;
      	}
      	
      	scanRequest.add(res);
      	
      	req.once('timeout', function () {
      	  scanRequest.reset();
          scanner.reply(res, 408, "Timeout");
        });
        
    },
    
    reply : function(res, httpCode, msg){
      jsonResponse
        .setResponse(res)
        .setCode(httpCode)
        .setMsg(msg)
        .send();
    }

}

module.exports.app = app;
module.exports.scanner = scanner;