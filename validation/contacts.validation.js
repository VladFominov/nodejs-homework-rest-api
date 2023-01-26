const Joi = require("joi");


const addContactValidationSchema = Joi.object(
  {
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  },
  { abortEarly: false }
);
const updateContactValidationSchema = Joi.object(
  {
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  },
  { abortEarly: false }
);
const updateStatusContactValidationSchema = Joi.object(
  {
    favorite: Joi.boolean().required(),
  },
  { abortEarly: false }
);

module.exports = {
  addContactValidationSchema,
  updateContactValidationSchema,
  updateStatusContactValidationSchema,
};