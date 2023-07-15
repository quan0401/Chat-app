const express = require("express");
const { getChatRoomById } = require("../controller/chatController");

const chatRoomRoutes = express.Router();

chatRoomRoutes.get("/:id", getChatRoomById);

module.exports = chatRoomRoutes;
