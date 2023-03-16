const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      default: null,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    phone: {
      type: String,
      unique: true,
      default: null,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("Contact", Contacts);


module.exports = {
  Contact,
};
