var express = require('express');
var router = require('express-promise-router')();
var UserController = require('../controllers/users');


router.route('/signup')
    .post(UserController.signUp);

router.route('/signin')
    .post(UserController.signIn);

router.route('/secret')
    .get(UserController.secret);


module.exports = router;