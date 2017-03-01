/*
 * Copyright (C) Contract Services Administration Trust Fund - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

var express = require('express');
var router = express.Router();
var controller = require('../controller');

router.route('/')
    .get(controller.app.default);

router.route('/scan')
    .get(controller.scanner.get);

module.exports = router;