var JWT = require('jsonwebtoken');
var User = require('../models/user')

var { JWS_SECRET } = require('../configuration')

signToken = (user) => {
    return JWT.sign({
        iss: 'MovedIn',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    }, JWS_SECRET);
}
module.exports = {

    signUp: async (req, res, next) => {
        // get user's input Email & Paswword
        var { email, password } = req.body;
        console.log(req.body);
        // check if there is a user with the same email
        var foundUser = await User.findOne({ "local.email": email });

        if (foundUser) {
            return res.status(403).json({ error: 'Email is already existed' });
        }

        //create a new user
        var newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();


        //Generate the token
        var token = signToken(newUser);
        //Respond with token
        res.status(200).json({ token });

    },


    signIn: async (req, res, next) => {
        //generate token
        var token = signToken(req.user)
        console.log('Successful login!');
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        var token = signToken(req.user)
        console.log('req.user', req.user);
        res.status(200).json({ token });
    },


    facebookOAuth: async (req, res, next) => {
        console.log('Facebook Successful login!');
        var token = signToken(req.user)
        console.log('req.user', req.user);
        res.status(200).json({ token });
    },

    secret: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ secret: 'resource' });
    }

}
