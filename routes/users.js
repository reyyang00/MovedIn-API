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


//restful APIs
router.route('/addUserPro')
    .post(UserController.updateUserPro);

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/homePage')
  .post(UserController.getAllUserInfo);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UserController.signIn);

router.route('/oauth/google')
    .post(passportGoogle, UserController.googleOAuth);

router.route('/oauth/facebook')
    .post(facebookToken, UserController.facebookOAuth);



//demo
router.route('/secret')
    .get(passportJWT, UserController.secret);



// below two APIs can be called after user being authenticated
router.route('/getrooms')
    .get(passportJWT, UserController.secret);

router.route('/getroommates')
    .get(passportJWT, UserController.secret);

module.exports = router;
