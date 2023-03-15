const { User } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.util.js");
const { jwtSign, jwtVerify } = require("../utils/jwt.util.js");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const newUser = await User.create({
    email,
    password: hashPassword(password),
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

const isAuthorized = async (req, res, next) => {
  const { authorization= ""} = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
  return res.status(401).json({ message: "Not authorized" });
}
  const decoded = jwtVerify(token);

  const user = await User.findById({ _id: decoded._id });

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;
  next();
};

module.exports = {
  register,
  login,
  logout,
  getUserByToken,
  isAuthorized,
};
