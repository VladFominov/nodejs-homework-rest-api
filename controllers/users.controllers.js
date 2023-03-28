const { User } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.util.js");
const { jwtSign } = require("../utils/jwt.util.js");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");


const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    email,
    password: hashPassword(password),
    avatarURL,
  });

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: newUser._id,
    },
    {
      jwtToken: jwtSign({ _id: newUser._id }),
    },
    { new: true }
  ).select("-password");

  res.send({
    user: {
      email,
      subscription: updatedUser.subscription,
    },
  });
  // jwtToken: updatedUser.jwtToken
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  res.send({
    jwtToken: user.jwtToken,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const {_id} = req.user;
   await User.findOneAndUpdate(
    _id,
    { jwtToken: "" }
  );
  res.status(204).json({ massage: "No Content" });
};

const getUserByToken = async (req, res) => {
  const {email, subscription} = req.user;
  res.json({
    email,
  subscription,
});
};

const avatarDir = path.join(__dirname, "../", "public", "avatars")

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload, () => {
    Jimp.read(tempUpload)
  .then((img) => {
    return img
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(tempUpload); // save
  })
  .catch((err) => {
    console.error(err);
  });
  }); 
  
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
}

module.exports = {
  register,
  login,
  logout,
  getUserByToken,
  updateAvatar,
};
