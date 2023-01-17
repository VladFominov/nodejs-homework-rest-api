const express = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { getContacts, getByIdContact, appendContact, deletContact, updContact } = require("../../controllers/contacts.controller.js");

const router = express.Router();

const schema = Joi.object(
  {
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  },
  { abortEarly: false }
);

router
  .get("/", getContacts)
  .get("/:contactId", getByIdContact)
  .post("/", validator.body(schema), appendContact)
  .delete("/:contactId", deletContact)
  .put("/:contactId",validator.body(schema), updContact);

module.exports = router;
