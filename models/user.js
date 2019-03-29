var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

//create a schema
var userScheme = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userScheme.pre('save', async function (next) {
    try {
        //generate a salt
        var salt = await bcrypt.genSalt(10);

        //generate a password hash(salt + hash)
        var passwordHash = await bcrypt.hash(this.password, salt);
        //re-assign hashed version over original, plain text password
        this.password = passwordHash;
        next();

    } catch (error) {
        next(error);
    }
});

userScheme.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//create a model
var User = mongoose.model('user', userScheme);
//export the model
module.exports = User;