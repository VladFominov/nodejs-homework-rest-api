const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    jwtToken: { token: String },
    avatarURL: {
      type: String,
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", Users);

module.exports = {
  User,
};
