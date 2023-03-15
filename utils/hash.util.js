const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};