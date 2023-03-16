const express = require("express");

// const validator = require("express-joi-validation").createValidator({});
const {
  register,
  login,
  logout,
  getUserByToken,
  isAuthorized,
} = require("../../controllers/users.controllers");

// const {
//   addContactValidationSchema,
//   updateContactValidationSchema,
//   updateStatusContactValidationSchema,
// } = require("../../validation/contacts.validation");

const tryCatch = require("../../utils/try-catch");
const usersRouter = express.Router();

usersRouter
  .get("/current", isAuthorized, tryCatch(getUserByToken))
  .post(
    "/register",
    tryCatch(register)
  )
  .post(
    "/login",
    tryCatch(login)
  )
  .post(
    "/logout", 
    isAuthorized,
    tryCatch(logout)
  );

  
module.exports = usersRouter;
