var JWT = require('jsonwebtoken');
//var UserModel = require('../models/user')
//var UserProModel= require('../models/user')
var constants = require('../models/user');
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

    getUserPro: async (req,res,next)=>{
       var {userEmail}= req.body;
       var user = await constants.UserProModel.findOne({"email":userEmail});
       if(!user){return res.json({ error: "You Haven't set up your User Profile yet" });
       }
       res.status(200).json({user});

    },

    updateUserPro: async (req,res,next) =>{

          var{nameToDisplay, city, state,occupation, gender,budget,roomtype,role,email} = req.body;
          // console.log(user);
          var foundUserProfile =await constants.UserProModel.findOne({"email":email});
          console.log(foundUserProfile);
          if(foundUserProfile){
              await constants.UserProModel.deleteOne({email:email});
              res.send('userprofile found!');

          }

          var newUserPro= new constants.UserProModel({
              nameToDisplay: nameToDisplay,
              city:city,
              state:state,
              occupation:occupation,
              gender:gender,
              budget:budget,
              roomtype:roomtype,
              role:role,
              email:email
          });
          // console.log(user);
          await newUserPro.save();

    },

    getAllUserInfo: async (req,res,next)=>{

       var {email} = req.body;
       var currentUser = await constants.UserProModel.findOne({"email":email});
       var city = currentUser.city;
       var state = currentUser.state;
       var allusers= await constants.UserProModel.find({"city":city,"state":state});

       res.status(200).json({allusers});


    },

    signUp: async (req, res, next) => {
            // get user's input Email & Paswword
            var { email, password } = req.body;


            // check if there is a user with the same email
            var foundUser = await constants.UserModel.findOne({ "local.email": email });
            if (foundUser) {
                return res.status(403).json({ error: 'Email is already existed' });
            }

            //create a new user
            var newUser = new constants.UserModel({
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
