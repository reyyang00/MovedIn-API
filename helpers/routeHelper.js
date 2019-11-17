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
            capacity: Joi.number()
        }),
        getRoomSchema: Joi.object().keys({
            location: Joi.string().required()
        })
    }
}