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

    city: {
        type: String,
        required: true,
    },

    occupation: {
        type: String,

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
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    budget: {
        type: String,
        required: true,
    },
    room_type_required: {
        type: String,
        required: true
    },
    parking_needed: {
        type: String,
        required: true
    },
    moved_in_date: {
        type: String,
        required: true
    },
    lease_duration: {
        type: String,
        required: true
    },
    ok_with_shaing_bathroom: {
        type: String,
        required: true
    },
    pet_friendly: {
        type: String,
        required: true
    },
    smoking_friendly: {
        type: String,
        required: true
    },
    party_friendly: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
});


var Roommate = mongoose.model('roommate', roommateSchema);
module.exports = Roommate;