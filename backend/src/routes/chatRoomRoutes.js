const express = require("express");
const { getChatRoomById } = require("../controller/chatRoomController");

const chatRoomRoutes = express.Router();

chatRoomRoutes.get("/:id", getChatRoomById);

module.exports = chatRoomRoutes;
