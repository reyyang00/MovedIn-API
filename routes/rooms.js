var express = require('express');
var router = require('express-promise-router')();
var RoomController = require('../controllers/rooms');
var { validateBody, schemas } = require('../helpers/routeHelper');
var passport = require('passport');
var passportConf = require('../passport');
var passportSignIn = passport.authenticate('local', { session: false });
var passportJWT = passport.authenticate('jwt', { session: false });
var passportGoogle = passport.authenticate('googleToken', { session: false });
var facebookToken = passport.authenticate('facebookToken', { session: false });


// below two APIs can be called after user being authenticated
router.route('/creatroom')
    .post(passportJWT, validateBody(schemas.roomSchema), RoomController.createRoom);


router.route('/getrooms')
    .get(RoomController.getAllRoomsWithoutAuthenticated);


router.route('/gettheroom')
    .get(passportJWT, RoomController.getTheRoomsAfterAuthenticated);

module.exports = router;