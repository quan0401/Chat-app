const {
  registerUser,
  loginUser,
  userTest,
  getUserAndChatRoomData,
} = require("../controller/userController");
const express = require("express");
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.use(verifyIsLoggedIn);

userRoutes.get("/", getUserAndChatRoomData);

userRoutes.get("/test", userTest);

module.exports = userRoutes;
