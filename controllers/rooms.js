var roomModel = require('../models/room');

module.exports = {

    createRoom: async (req, res, next) => {
        // get user's input Email & Paswword
        var { price, location, furniture, minLeaseDuration, wifi, capacity } = req.body;


        //create a new user
        var newRoom = new roomModel({
            price: price,
            location: location,
            furniture: furniture,
            minLeaseDuration: minLeaseDuration,
            wifi: wifi,
            capacity: capacity

        });
        await newRoom.save();


        //Generate the token
        var message = "room create successful";
        //Respond with token
        res.status(200).json({ message });

    },

    getAllRoomsWithoutAuthenticated: async (req, res, next) => {
        // get user's input room location
        var { location } = req.body;


        var allRoomsWithinLocation = {};
        // if user input location then search by location
        if (location === "") {
            allRoomsWithinLocation = await roomModel.find();
        } else {
            allRoomsWithinLocation = await roomModel.find({ "location": location });
        }

        //Respond with token
        res.status(200).json({ allRoomsWithinLocation });

    },
    getTheRoomsAfterAuthenticated: async (req, res, next) => {
        // get user's input room location
        var { location } = req.body;

        var theRoom = {};

        theRoom = await roomModel.find({ "location": location });

        var messge = "hello";
        //Respond with token
        res.status(200).json({ location });

    },




}