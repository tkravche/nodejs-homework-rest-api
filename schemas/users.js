const Joi = require("joi");

const { emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": `missing required "email" field`,
  }),

  password: Joi.string().required().messages({
    "any.required": `missing required "password" field`,
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
  }),

  password: Joi.string().required().messages({
    "any.required": `missing required "password" field`,
  }),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
};
