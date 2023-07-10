const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAuthToken = (data, expiration) => {
  return jwt.sign(
    {
      data: data,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = { generateAuthToken };
