const bcrypt = require("bcryptjs");

// Store hash in your password DB.

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash); // true
};
module.exports = { hashPassword, comparePassword };
