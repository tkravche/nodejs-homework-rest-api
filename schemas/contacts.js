const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "any.required": `missing required "email" field`,
    }),

  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
  }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
    "any.required": `missing required "favorite" field`,
  }),
});

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema
};
