var express = require('express');
var router = require('express-promise-router')();
var UserController = require('../controllers/users');
var { validateBody, schemas } = require('../helpers/routeHelper');
var passport = require('passport');
var passportConf = require('../passport');
var passportSignIn = passport.authenticate('local', { session: false });
var passportJWT = passport.authenticate('jwt', { session: false });
var passportGoogle = passport.authenticate('googleToken', { session: false });
var facebookToken = passport.authenticate('facebookToken', { session: false });


// below two APIs can be called after user being authenticated
router.route('/getrooms')
    .post(validateBody(schemas.roomSchema), UserController.signUp);




module.exports = router;