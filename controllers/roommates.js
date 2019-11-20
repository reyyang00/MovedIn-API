var Roommate = require('../models/roommate');
var jwtDecode = require('jwt-decode');

module.exports = {

    createRoommate: async (req, res, next) => {
        // get user's input Email & Paswword
        var { first_name, last_name, city, occupation, gender, age, budget, room_type, parking, moved_in_date, lease_term, share_bathroom, share_bedroom, pet, smoking, party, capacity, token } = req.body;


        var decoded = jwtDecode(token);
        console.log(decoded.sub);
        var user_id = decoded.sub;
        //create a new user
        var newRoommate = new Roommate({
            first_name: first_name,
            last_name: last_name,
            city: city,
            occupation: occupation,
            gender: gender,
            age: age,
            budget: budget,
            room_type: room_type,
            parking: parking,
            moved_in_date: moved_in_date,
            lease_term: lease_term,
            share_bathroom: share_bathroom,
            share_bedroom: share_bedroom,
            pet: pet,
            smoking: smoking,
            party: party,
            capacity: capacity,
            user_id: user_id
        });
        await newRoommate.save();


        //Generate the token
        var message = "roommate create successful";
        //Respond with token
        res.status(200).json({ message });
    },

    getAllRoommatesWithoutAuthenticated: async (req, res, next) => {
        // get user's input room location
        var { location } = req.body;


        var allRoommatesWithinLocation = {};
        // if user input location then search by location
        if (location === "") {
            allRoomsWithinLocation = await Roommate.find();
        } else {
            allRoomsWithinLocation = await Roommate.find({ "location": location }).select('_id first_name last_name city budget');
        }



        //Respond with token
        res.status(200).json({ allRoomsWithinLocation });
    },

    // 
    getTheDeatialRoommateBeingAuthenticated: async (req, res, next) => {
        // get token from request header
        var token = req.headers.authorization;
        console.log('token is: ', req.headers.authorization);

        //decode the token to get the user's id
        var decoded = jwtDecode(token);
        console.log('user id: ', decoded.sub);
        var user_id = decoded.sub;

        // get the room id for the details of this room
        var roommate_id = req.headers.roommate_id;
        console.log(roommate_id);


        var roommate = await Roommate.findById(roommate_id);

        //If user doesn't match the room's user_id, handle it
        var message = '';
        if (roommate.user_id !== user_id) {
            message = 'No authtization to access to this room detail';
        } else {
            res.status(200).json({ roommate });
        }
    },

    deleteTheRoommateBeingAuthenticated: async (req, res, next) => {

        // get the user id by decode the token
        var token = req.headers.authorization;
        console.log('token is: ', req.headers.authorization);
        var decoded = jwtDecode(token);
        console.log('user id: ', decoded.sub);
        var user_id = decoded.sub;

        //get the target room id to delete

        var roommate_id = req.headers.roommate_id;
        console.log(roommate_id);

        // find if the target room is belong's to the current user, if it is then delete no handler it.
        var roommate = await Roommate.findById(roommate_id);

        //If user doesn't match the room's user_id, handle it
        var message = '';
        if (roommate.user_id !== user_id) {
            message = 'the room does not belong to you'
        } else {

            Roommate.deleteOne({ "_id": roommate_id }, function (err) { });
            message = 'delete successfully'
        }
        res.status(200).json({ message });

    }




}