var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },
    furniture: Boolean,
    minLeaseDuration: Number,
    wifi: Boolean,
    capacity: Number
});


var Room = mongoose.model('room', roomSchema);
module.exports = Room;