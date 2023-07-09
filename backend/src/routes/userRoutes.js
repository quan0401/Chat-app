const { registerUser, loginUser } = require("../controller/userController");
const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

module.exports = userRoutes;
