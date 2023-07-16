const express = require("express");
const { createMessage } = require("../controller/messageController");

const messageRoutes = express.Router();

messageRoutes.post("/", createMessage);

module.exports = messageRoutes;
