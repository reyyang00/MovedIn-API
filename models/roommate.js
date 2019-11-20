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
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    room_type: {
        type: String,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    moved_in_date: {
        type: String,
        required: true
    },
    lease_term: {
        type: String,
        required: true
    },
    share_bathroom: {
        type: Boolean,
        required: true
    },
    share_bedroom: {
        type: Boolean,
        required: true
    },
    pet: {
        type: Boolean,
        required: true
    },
    smoking: {
        type: Boolean,
        required: true
    },
    party: {
        type: Boolean,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
});


var Roommate = mongoose.model('roommate', roommateSchema);
module.exports = Roommate;