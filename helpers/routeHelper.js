// joi is a freawork to valide the data before calling APIs
var Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            var result = Joi.validate(req.body, schema);
            JSON.stringify(req.body);

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
            price_range: Joi.string().required().allow('', null).insensitive().lowercase(),
            gender_prefered: Joi.string().required().allow('', null).insensitive().lowercase(),
            room_type: Joi.string().required().allow('', null).insensitive().lowercase(),
            city: Joi.string().required().insensitive().lowercase(),
            utility_include: Joi.string().required().allow('', null).insensitive().lowercase(),
            cooking: Joi.string().required().allow('', null).insensitive().lowercase(),
            pet: Joi.string().required().allow('', null).insensitive().lowercase(),
            party: Joi.string().required().allow('', null).insensitive().lowercase(),
            smoking: Joi.string().required().allow('', null).insensitive().lowercase(),
            parking: Joi.string().required().allow('', null).insensitive().lowercase(),
            furniture: Joi.string().required().allow('', null).insensitive().lowercase(),
            bathroom: Joi.string().required().allow('', null).insensitive().lowercase(),
            min_lease_duration: Joi.string().required().allow('', null).insensitive().lowercase(),
            move_in_date: Joi.string().required().allow('', null).insensitive().lowercase(),
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
            school: Joi.string().required().allow('', null),
            major: Joi.string().required().allow('', null),
            year_in_school: Joi.string().required().allow('', null),
            gender: Joi.string().required().allow('', null),
            age: Joi.string().required().allow('', null),
            budget: Joi.string().required().allow('', null),
            room_type_required: Joi.string().required().allow('', null),
            parking_needed: Joi.string().required().allow('', null),
            moved_in_date: Joi.string().required().allow('', null),
            lease_duration: Joi.string().required().allow('', null),
            ok_with_shaing_bathroom: Joi.string().required().allow('', null),
            pet_friendly: Joi.string().required().allow('', null),
            smoking_friendly: Joi.string().required().allow('', null),
            party_friendly: Joi.string().required().allow('', null),
            token: [Joi.string(), Joi.number()]
        }),
        roommateGetDetialPageSchema: Joi.object().keys({
            roommate_id: Joi.string().required()
        }),
        roomGetDetialPageSchema: Joi.object().keys({
            roommate_id: Joi.string().required()
        })
    }
}