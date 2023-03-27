const { jwtVerify } = require("../utils/jwt.util.js");
const { User } = require("../models/user.model");

const isAuthorized = async (req, res, next) => {
  const { authorization = "" } = req.headers;
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

module.exports = isAuthorized;
