/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

var libPrefix = "[jsonResponse] - ";
var response;
var responseObject;
var httpCode;
var barcode;

var jsonResponse = {
    
    setResponse : function(res){
      response = res;
      return this;
    },
    
    setCode : function(code){
      httpCode = code;
      return this;
    },
    
    setMsg : function(msg){
      responseObject.msg = msg;
      return this;
    },
    
    setBarcode : function(code){
      responseObject.barcode = code;
      return this;
    },
    
    init : function(){
      httpCode = null;
      responseObject = {
        'msg' : null
      };
    },
    
    log : function(msg){
      console.log(libPrefix + msg);
    },
    
    send : function(){
      this.log("Sending response");
    	if (response) {
    	  
    	  if(httpCode)
    	    response.status(httpCode);
        
        this.log("Response: "+JSON.stringify(responseObject));
        
        response
         .type('json')
         .send(JSON.stringify(responseObject));
         
        this.log("Response sent");
    	}
    	
    	this.init();
    }
    
}
jsonResponse.init();

module.exports = jsonResponse;