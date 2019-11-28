var Room = require('../models/room');
var jwtDecode = require('jwt-decode');

module.exports = {

    createRoom: async (req, res, next) => {
        // get user's input Email & Paswword
        var { price, price_range, gender_prefered, room_type, city, utility_include, cooking, pet, party, smoking, parking, furniture, bathroom, min_lease_duration, move_in_date, token } = req.body;


        var headerToken = req.headers.authorization;
        console.log(headerToken);


        var decoded = jwtDecode(token);
        console.log(decoded.sub);
        var user_id = decoded.sub;
        //create a new user
        var newRoom = new Room({
            price: price,
            price_range: price_range,
            gender_prefered: gender_prefered,
            room_type: room_type,
            city: city,
            utility_include: utility_include,
            cooking: cooking,
            pet: pet,
            party: party,
            smoking: smoking,
            parking: parking,
            furniture: furniture,
            bathroom: bathroom,
            min_lease_duration: min_lease_duration,
            move_in_date: move_in_date,
            user_id: user_id
        });
        await newRoom.save();


        //Generate the token
        var message = "room create successful";
        //Respond with token
        res.status(200).json({ message });

    },

    getAllRoomsWithoutAuthenticated: async (req, res, next) => {
        // get user's input room location
        var city = req.headers.authorization;
        console.log(city);


        var allRoomsWithinLocation = {};
        // if user input location then search by location
        if (location === "") {
            allRoomsWithinLocation = await Room.find();
        } else {
            allRoomsWithinLocation = await Room.find({ "city": city }).select('_id price room_type city');;
        }


        console.log(allRoomsWithinLocation);
        //Respond with token
        res.status(200).json({ allRoomsWithinLocation });

    },

    // 
    getTheRoomsAfterAuthenticated: async (req, res, next) => {
        // get token from request header
        var token = req.headers.authorization;
        console.log('token is: ', req.headers.authorization);

        //decode the token to get the user's id
        var decoded = jwtDecode(token);
        console.log('user id: ', decoded.sub);
        var user_id = decoded.sub;

        // get the room id for the details of this room
        var room_id = req.headers.room_id;
        console.log(room_id);


        var room = await Room.findById(room_id);

        //If user doesn't match the room's user_id, handle it
        var message = '';
        if (room.user_id !== user_id) {
            message = 'No authtization to access to this room detail';
        } else {
            res.status(200).json({ room });
        }
    },

    deleteTheRoomBeingAuthenticated: async (req, res, next) => {

        // get the user id by decode the token
        var token = req.headers.authorization;
        console.log('token is: ', req.headers.authorization);
        var decoded = jwtDecode(token);
        console.log('user id: ', decoded.sub);
        var user_id = decoded.sub;

        //get the target room id to delete

        var room_id = req.headers.room_id;
        console.log(room_id);

        // find if the target room is belong's to the current user, if it is then delete no handler it.
        var room = await Room.findById(room_id);

        //If user doesn't match the room's user_id, handle it
        var message = '';
        if (room.user_id !== user_id) {
            message = 'the room does not belong to you'
        } else {

            Room.deleteOne({ "_id": room_id }, function (err) { });
            message = 'delete successfully'
        }
        res.status(200).json({ message });

    }




}