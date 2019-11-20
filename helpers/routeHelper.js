// joi is a freawork to valide the data before calling APIs
var Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            var result = Joi.validate(req.body, schema);
            JSON.stringify(req.body)
            console.log(req.body);
            if (result.error) {
                // console.log(req.header);
                // console.log(req.body);
                console.log('hello');
                return res.status(400).json(result.error);
            }
            if (!req.value) { req.valaue = {}; }
            req.valaue['body'] = result.value;
            next();
        }
    },

    //define a user input object 
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),

        roomSchema: Joi.object().keys({
            price: Joi.number().required(),
            gender_prefered: Joi.string().required(),
            home_type: Joi.string().required(),
            city: Joi.string().required(),
            utility: Joi.boolean().required(),
            cooking: Joi.boolean().required(),
            pet: Joi.boolean().required(),
            party: Joi.boolean().required(),
            smoking: Joi.boolean().required(),
            parking: Joi.boolean().required(),
            funiture: Joi.boolean().required(),
            bathroom: Joi.boolean().required(),
            walk_in_closet: Joi.boolean().required(),
            lease_term: Joi.boolean().required(),
            move_in_date: Joi.boolean().required(),
            token: [Joi.string(), Joi.number()]

        }),
        getRoomSchema: Joi.object().keys({
            location: Joi.string().required()
        }),

        roommateSchema: Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            city: Joi.string().required(),
            occupation: Joi.string().required(),
            gender: Joi.string(),
            age: Joi.number(),
            budget: Joi.number(),
            room_type: Joi.string(),
            parking: Joi.boolean(),
            moved_in_date: Joi.string(),
            lease_term: Joi.string(),
            share_bathroom: Joi.boolean(),
            share_bedroom: Joi.boolean(),
            pet: Joi.boolean(),
            smoking: Joi.boolean(),
            party: Joi.boolean(),
            capacity: Joi.number(),
            token: [Joi.string(), Joi.number()]
        }),


    }
}