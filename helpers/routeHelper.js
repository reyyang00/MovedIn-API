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
            location: Joi.string().required(),
            furniture: Joi.boolean(),
            minLeaseDuration: Joi.number().required(),
            wifi: Joi.boolean(),
            capacity: Joi.number(),
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
            gender: Joi.string().required(),
            age: Joi.number().required(),
            budget: Joi.number().required(),
            room_type: Joi.string().required(),
            parking: Joi.boolean().required(),
            lease_term: Joi.string().required(),
            share_bathroom: Joi.boolean().required(),
            share_bedroom: Joi.boolean().required(),
            pet: Joi.boolean().required(),
            smoking: Joi.string().required(),
            party: Joi.boolean().required(),
            capacity: Joi.number().required(),







            token: [Joi.string(), Joi.number()]

        }),


    }
}