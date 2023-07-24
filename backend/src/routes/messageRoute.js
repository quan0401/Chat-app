const express = require("express");
const {
  createMessage,
  uploadImageController,
  deleteAllMessages,
} = require("../controller/messageController");
const messageRoutes = express.Router();

const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

messageRoutes.post("/", createMessage);
messageRoutes.post("/upload", upload.single("my_file"), uploadImageController);
messageRoutes.delete("/all", deleteAllMessages);

module.exports = messageRoutes;
