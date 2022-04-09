const Joi = require("joi");

const loginSchema = Joi.object({
    username: Joi.string().lowercase().required(),
    password: Joi.string().required(),
});

module.exports = loginSchema;
