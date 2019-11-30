var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var roommateSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    occupation: {
        type: String,
        required: true,

    },
    school: {
        type: String,

    },
    major: {
        type: String,

    },
    year_in_school: {
        type: String,

    },
    gender: {
        type: String,

    },
    age: {
        type: String,

    },
    budget: {
        type: String,

    },
    room_type_required: {
        type: String,

    },
    parking_needed: {
        type: String,

    },
    moved_in_date: {
        type: String,
    },
    lease_duration: {
        type: String,
    },
    ok_with_shaing_bathroom: {
        type: String,
    },
    pet_friendly: {
        type: String,
    },
    smoking_friendly: {
        type: String,
    },
    party_friendly: {
        type: String,
    },
    user_id: {
        type: String,
        required: true
    },
});


var Roommate = mongoose.model('roommate', roommateSchema);
module.exports = Roommate;