const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyIsLoggedIn = (req, res, next) => {
  try {
    const access_token = req.cookies.access_token || "";
    jwt.verify(access_token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) return next(err);
      req.user = decoded.data;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyIsLoggedIn };
