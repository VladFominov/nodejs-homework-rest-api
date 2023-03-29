const express = require("express");
const validator = require("express-joi-validation").createValidator({});
const {
  register,
  login,
  logout,
  getUserByToken,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/users.controllers");
const isAuthorized = require("../../middlewares/isAuthorized");
const tryCatch = require("../../utils/try-catch");
const usersRouter = express.Router();
const upload = require("../../middlewares/upload");

const emailSchema = require("../../validation/user.validation");

usersRouter
  .get("/current", isAuthorized, tryCatch(getUserByToken))
  .post("/register", tryCatch(register))
  .get("/verify/:verificationToken", tryCatch(verifyEmail))
  .post("/verify", validator.body(emailSchema), tryCatch(resendVerifyEmail))
  .post("/login", tryCatch(login))
  .post("/logout", isAuthorized, tryCatch(logout))
  .patch(
    "/avatars",
    isAuthorized,
    upload.single("avatar"),
    tryCatch(updateAvatar)
  );

module.exports = usersRouter;
