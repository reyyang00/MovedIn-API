//create a UserProfile schema-- 10/29 by Angela
var userProSchema = new Schema({
    nameToDisplay: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
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
    budget: {
        type: Number,
        required: true,
    },
    roomtype: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});