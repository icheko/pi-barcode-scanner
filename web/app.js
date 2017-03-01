/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

var express = require('express');
var router = require('./router');

var app = express();
var port = 80;

app.use(router);

app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});