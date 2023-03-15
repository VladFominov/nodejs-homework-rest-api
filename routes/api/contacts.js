const express = require("express");

const validator = require("express-joi-validation").createValidator({});
const {
  getContacts,
  getByIdContact,
  appendContact,
  deletContact,
  updContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller.js");

const {
  addContactValidationSchema,
  updateContactValidationSchema,
  updateStatusContactValidationSchema,
} = require("../../validation/contacts.validation");
const  tryCatch = require('../../utils/try-catch');
const { isAuthorized } = require("../../controllers/users.controllers.js");
const contactsRouter = express.Router();

contactsRouter
  .get("/", isAuthorized, getContacts)
  .get("/:contactId", getByIdContact)
  .post(
    "/", isAuthorized,
    validator.body(addContactValidationSchema),
    tryCatch(appendContact)
  )
  .delete("/:contactId", deletContact)
  .put(
    "/:contactId",isAuthorized,
    validator.body(updateContactValidationSchema),
    tryCatch(updContact)
  )
  .patch(
    "/:contactId/favorite",
    validator.body(updateStatusContactValidationSchema),
    updateStatusContact
  );

module.exports = contactsRouter;
