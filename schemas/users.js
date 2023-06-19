const Joi = require("joi");

const { emailRegexp } = require("../constants/users");
const { subscriptionList } = require("../constants/users");

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

const userUpdateSchema = Joi.object({
  subscription: Joi.boolean().valid(...subscriptionList).required().messages({
  "any.required": `missing required "subscription" field`,
}),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema
};
