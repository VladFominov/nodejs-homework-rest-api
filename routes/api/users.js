const express = require("express");


// const validator = require("express-joi-validation").createValidator({});
const {
  register,
  login,
  logout,
  getUserByToken,
  updateAvatar,
} = require("../../controllers/users.controllers");
 const isAuthorized = require("../../middlewares/isAuthorized");
const tryCatch = require("../../utils/try-catch");
const usersRouter = express.Router();
const upload =  require("../../middlewares/upload");

usersRouter
  .get("/current", isAuthorized, tryCatch(getUserByToken))
  .post("/register", tryCatch(register))
  .post("/login", tryCatch(login))
  .post("/logout", isAuthorized, tryCatch(logout))
  .patch("/avatars", isAuthorized, upload.single("avatar"), tryCatch(updateAvatar));

  
module.exports = usersRouter;
