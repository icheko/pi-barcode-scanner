/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

var express = require('express');
var jsonResponse = require('./jsonResponse');
var libPrefix = "[scanRequest] - ";
var response = null;
var barcode = "";

var scanRequest = {
    
    add : function(req){
      if(!response)
        response = req;
    },
    
    get : function(){
      return response;
    },
    
    getBarcode : function(){
      return barcode;
    },
    
    setBarcode : function(code){
      barcode = code;
      return this;
    },
    
    reset : function(){
      barcode = "";
      response = null;
    },
    
    log : function(msg){
      console.log(libPrefix + msg);
    },
    
    respond : function(){
      this.log("Process response");
    	if (response) {
        jsonResponse
          .setResponse(response)
          .setMsg('Barcode received')
          .setBarcode(barcode)
          .send();
    	}else{
    	  this.log("No connected clients");
    	}
    	this.reset();
    }
    
}

module.exports = scanRequest;