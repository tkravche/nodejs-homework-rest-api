const Joi = require("joi");

const userRegisterSchema = Joi.object({
    email: Joi.string()
    .required()
    .messages({
      "any.required": `missing required "email" field`,
    }),

  password: Joi.string().required().messages({
    "any.required": `missing required "password" field`,
  }),
});

const userLoginSchema = Joi.object({
    email: Joi.string()
    .required()
    .messages({
      "any.required": `missing required "email" field`,
    }),

  password: Joi.string().required().messages({
    "any.required": `missing required "password" field`,
  }),
});

module.exports = {
    userRegisterSchema,
    userLoginSchema
};
