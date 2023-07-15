require("dotenv").config();
const { verify } = require("jsonwebtoken");
const userRoutes = require("./userRoutes");
const express = require("express");
const app = express();
const chatRoomRoutes = require("./chatRoomRoutes");

app.use("/user", userRoutes);
app.use("/chatRoom", chatRoomRoutes);

app.get("/logout", (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .send({ EC: 0, message: "Clear cookie" });
});

app.get("/get-token", (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    const decoded = verify(access_token, process.env.JWT_SECRET);
    return res.status(200).send({
      EC: 0,
      data: decoded.data,
    });
  } catch (error) {
    return res.status(401).send({
      EC: 1,
      message: "Unauthorized",
    });
  }
});

module.exports = app;
