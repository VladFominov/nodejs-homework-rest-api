const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.eyz7i1x.mongodb.net/db-contacts?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));


app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err?.error?.isJoi) {
    return res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  }

  if (err?.code === 11000) {
    return res.status(400).json({ message: "Duplicate key error" });
  }

  if (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
