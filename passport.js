var passport = require('passport');
var JwTstrategy = require('passport-jwt').Strategy;
var LocalStorage = require('passport-local').Strategy;
var { ExtractJwt } = require('passport-jwt');
var { JWS_SECRET } = require('./configuration');
var User = require('./models/user');

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
        //Find the user given the email
        var user = await User.findOne({ email });

        //if not, handler it
        if (!user) {
            return done(null, false);
        }
        //check if the password is correct
        var isMatch = await user.isValidPassword(password);
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