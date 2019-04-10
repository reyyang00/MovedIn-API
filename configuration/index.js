const dotenv = require('dotenv');



//load the .env file
dotenv.config();



module.exports = {
    JWS_SECRET: process.env.JWS_SECRET,

    oauth: {
        google: {
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET
        },
        facebook: {
            clientID: process.env.FACEBOOK_CLIENTID,
            clientSecret: process.env.FACEBOOK_CLIENTSECRET
        }
    }
};