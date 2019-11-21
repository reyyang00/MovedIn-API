var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({

    price: {
        type: Number,
        required: true
    },
    price_range: {
        type: String,
    },

    gender_prefered: {
        type: String,
        required: true
    },
    room_type: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    utility_include: {
        type: String,
        required: true
    },
    cooking: {
        type: String,
        required: true
    },
    pet: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    smoking: {
        type: String,
        required: true
    },
    parking: {
        type: String,
        required: true
    },
    furniture: {
        type: String,
        required: true
    },
    bathroom: {
        type: String,
        required: true
    },
    min_lease_duration: {
        type: String,
        required: true
    },
    move_in_date: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});


var Room = mongoose.model('room', roomSchema);
module.exports = Room;