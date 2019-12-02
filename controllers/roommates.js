var Roommate = require('../models/roommate');
var jwtDecode = require('jwt-decode');

module.exports = {

    createRoommate: async (req, res, next) => {
        console.log('createRommate API called');
        // get user's input Email & Paswword
<<<<<<< HEAD
        var { first_name, last_name, email, city, occupation, school, major, year_in_school, gender, age, budget, room_type_required, parking_needed, moved_in_date, lease_duration, ok_with_shaing_bathroom, pet_friendly, smoking_friendly, party_friendly, token } = req.body; 
=======
        var { email,first_name, last_name, city, occupation, school, major, year_in_school, gender, age, budget, room_type_required, parking_needed, moved_in_date, lease_duration, ok_with_shaing_bathroom, pet_friendly, smoking_friendly, party_friendly, token } = req.body;
>>>>>>> 829ae4d33b5d783c61fc8ca753af62ba0facefa3

        var headerToken = req.headers.authorization;
        // console.log(headerToken);


        var decoded = jwtDecode(token);
        console.log(decoded.sub);
        var user_id = decoded.sub;
        //create a new user
        var newRoommate = new Roommate({
            first_name: first_name,
            email:email,
            last_name: last_name,
            email: email,
            city: city,
            occupation: occupation,
            school: school,
            major: major,
            year_in_school: year_in_school,
            gender: gender,
            age: age,
            budget: budget,
            room_type_required: room_type_required,
            parking_needed: parking_needed,
            moved_in_date: moved_in_date,
            lease_duration: lease_duration,
            ok_with_shaing_bathroom: ok_with_shaing_bathroom,
            pet_friendly: pet_friendly,
            smoking_friendly: smoking_friendly,
            party_friendly: party_friendly,
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
        var city = req.headers.authorization;



        var allRoommatesWithinLocation = {};
        // if user input location then search by location
        if (city === "") {
            allRoommatesWithinLocation = await Roommate.find();
        } else {
            allRoommatesWithinLocation = await Roommate.find({ "city": city }).select('_id first_name last_name city budget');
        }



        //Respond with token
        res.status(200).json({ allRoommatesWithinLocation });
    },

    //
    getTheDeatialRoommateBeingAuthenticated: async (req, res, next) => {
        // get token from request header
        console.log('I got here');
        var { roommate_id } = req.body;

        console.log(roommate_id);

        var roommate = await Roommate.findById(roommate_id);

        //If user doesn't match the room's user_id, handle it
        if (roommate) {
            res.status(200).json({ roommate });
        } else {
            res.status(401).json();
        }
    },

    getRoommatePostBeingAuthenticated: async (req, res, next) => {
        // get token from request header
        var token = req.headers.authorization;
        console.log('token is: ', req.headers.authorization);

        //decode the token to get the user's id
        var decoded = jwtDecode(token);
        console.log('user id: ', decoded.sub);
        var user_id = decoded.sub;

        // get the roommate id for the details of this room
        // var roommate_id = req.headers.roommate_id;
        // console.log(roommate_id);

        var allRoommates = {};
        // if user input location then search by location

        allRoommates = await Roommate.find({ "user_id": user_id });
        //.select('_id first_name last_name city budget')



        // var roommate = await Roommate.findById(roommate_id);

        //If user doesn't match the room's user_id, handle it
        var message = '';
        if (allRoommates.length === 0) {
            message = 'You have no Roommate Posts';
            res.status(200).json({ allRoommates });
        } else {
            res.status(200).json({ allRoommates });
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
