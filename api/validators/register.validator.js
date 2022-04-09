const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
});

module.exports = registerSchema;
