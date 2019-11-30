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


// the POST API for creating a room into our mongoDB
router.route('/creatroom')
    .post(passportJWT, validateBody(schemas.roomSchema), RoomController.createRoom);


// the GET API for get all the rooms
router.route('/getrooms')
    .get(RoomController.getAllRoomsWithoutAuthenticated);
// the GET API to fetch all current users' Roommate Posts
router.route('/getroompost')
      .get(passportJWT,RoomController.getRoomPostBeingAuthenticated);

//  GET API for get the room's details
router.route('/gettheroom')
    .post(passportJWT, validateBody(schemas.roomGetDetialPageSchema), RoomController.getTheRoomsAfterAuthenticated);

//  DELETE API for delete a room document from mongoDB
router.route('/deletetheroom')
    .delete(passportJWT, RoomController.deleteTheRoomBeingAuthenticated);



module.exports = router;
