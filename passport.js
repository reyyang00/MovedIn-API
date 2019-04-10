var passport = require('passport');
var GooglePlusTokenStrategy = require('passport-google-plus-token');
var FacebookTokenStrategy = require('passport-facebook-token');
var JwTstrategy = require('passport-jwt').Strategy;
var LocalStorage = require('passport-local').Strategy;
var { ExtractJwt } = require('passport-jwt');
var { JWS_SECRET } = require('./configuration');
var User = require('./models/user');
var config = require('./configuration/index');

//JSON WEB TOKENS STRATEGY
passport.use(new JwTstrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWS_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        var user = await User.findById(payload.sub);


        //If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        //otherwise, return the user 
        done(null, user);

        //req.user
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStorage({
    usernameField: 'email'

}, async (email, password, done) => {
    try {
        console.log('email', email);

        //Find the user given the email
        var user = await User.findOne({ "local.email": email });

        //if not, handler it
        if (!user) {
            return done(null, false);
        }
        //check if the password is correct
        var isMatch = await user.isValidPassword(password);

        console.log('isMatch', isMatch);
        //if not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}))

//Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);

        //check whether this current user exists in our DB
        var existringUser = await User.findOne({ "google.id": profile.id });
        if (existringUser) {
            console.log('User already exists in our DB');
            return done(null, existringUser);
        }

        console.log('User does not exist in our DB, we are creating a new one ');


        //If new account
        var newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }

}));

//Facebook OAuth Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {

    console.log('called!');
    try {
        console.log('accessToken',accessToken);
        console.log('refreshToken',refreshToken);
        console.log('profile',profile);

         //check whether this current user exists in our DB
         var existringUser = await User.findOne({ "facebook.id": profile.id });
         if (existringUser) {
             console.log('User already exists in our DB');
             return done(null, existringUser);
         }
 
         console.log('User does not exist in our DB, we are creating a new one ');
 
 
         //If new account
         var newUser = new User({
             method: 'facebook',
             facebook: {
                 id: profile.id,
                 email: profile.emails[0].value
             }
         });
 
         await newUser.save();
         done(null, newUser);
        

    } catch (error) {
        done(error, false, error.message);
    }

}));