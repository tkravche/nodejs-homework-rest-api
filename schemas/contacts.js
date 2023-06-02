const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "any.required": `"email" must exist`,
    }),

  phone: Joi.string().required().messages({
    "any.required": `"phone" must exist`,
  }),
});

module.exports = {
  contactAddSchema,
};
