var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({

    price: {
        type: Number,
        required: true
    },
    gender_prefered: {
        type: String,
        required: true
    },
    home_type: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    utility: {
        type: Boolean,
        required: true
    },
    cooking: {
        type: Boolean,
        required: true
    },
    pet: {
        type: Boolean,
        required: true
    },
    party: {
        type: Boolean,
        required: true
    },
    smoking: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    furniture: {
        type: Boolean,
        required: true
    },
    bathroom: {
        type: Boolean,
        required: true
    },
    walk_in_closet: {
        type: Boolean,
        required: true
    },
    lease_term: {
        type: Number,
        required: true
    },
    move_in_date: {
        type: String,
        required: true
    },
    user_id: String
});


var Room = mongoose.model('room', roomSchema);
module.exports = Room;