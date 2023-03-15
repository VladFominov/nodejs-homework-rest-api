const jwt = require("jsonwebtoken");

const jwtSign = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '30d'});
    return token;
};

const jwtVerify = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = {
  jwtSign,
  jwtVerify,
};
