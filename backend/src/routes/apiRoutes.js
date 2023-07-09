const userRoutes = require("./userRoutes");
const express = require("express");
const app = express();

app.use("/user", userRoutes);

module.exports = app;
