var express = require('express');
var router = require('express-promise-router')();
var UserController = require('../controllers/users');
var { validateBody, schemas } = require('../helpers/routeHelper');
var passport = require('passport');
var passportConf = require('../passport');
var passportSignIn = passport.authenticate('local', { session: false });
var passportJWT = passport.authenticate('jwt', { session: false });


//restful APIs
router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UserController.signIn);

router.route('/secret')
    .get(passportJWT, UserController.secret);

module.exports = router;