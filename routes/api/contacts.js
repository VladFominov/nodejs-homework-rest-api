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
const router = express.Router();

router
  .get("/", getContacts)
  .get("/:contactId", getByIdContact)
  .post(
    "/",
    validator.body(addContactValidationSchema),
    tryCatch(appendContact)
  )
  .delete("/:contactId", deletContact)
  .put(
    "/:contactId",
    validator.body(updateContactValidationSchema),
    tryCatch(updContact)
  )
  .patch(
    "/:contactId/favorite",
    validator.body(updateStatusContactValidationSchema),
    updateStatusContact
  );

module.exports = router;
