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

    },
    room_type: {
        type: String,

    },

    city: {
        type: String,

    },
    utility_include: {
        type: String,

    },
    cooking: {
        type: String,

    },
    pet: {
        type: String,

    },
    party: {
        type: String,

    },
    smoking: {
        type: String,

    },
    parking: {
        type: String,

    },
    furniture: {
        type: String,

    },
    bathroom: {
        type: String,

    },
    min_lease_duration: {
        type: String,

    },
    move_in_date: {
        type: String,

    },
    user_id: {
        type: String,
        required: true
    }
});


var Room = mongoose.model('room', roomSchema);
module.exports = Room;