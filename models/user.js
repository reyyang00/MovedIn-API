var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;


//create a schema
var userScheme = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true,
    },

    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String,
        }
    },
    google: {
        //google server's id
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        //facebook server's id
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
});


//hash password before store into our database
userScheme.pre('save', async function (next) {
    try {

        if (this.method !== 'local') {
            next();
        }
        //generate a salt
        var salt = await bcrypt.genSalt(10);

        //generate a password hash(salt + hash)
        var passwordHash = await bcrypt.hash(this.local.password, salt);
        //re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        next();

    } catch (error) {
        next(error);
    }
});

userScheme.methods.isValidPassword = async function (newPassword) {
    try {
        console.log('this.local.password', this.local.password);
        console.log('newPassword', newPassword);
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

//create a model
var User = mongoose.model('user', userScheme);
// Export the model
module.exports = User;


//export the model

//module.exports =UserPro;

// var constants = {
//     UserModel : mongoose.model('user', userScheme),
//     UserProModel: mongoose.model('userPro',userProSchema),
// };

