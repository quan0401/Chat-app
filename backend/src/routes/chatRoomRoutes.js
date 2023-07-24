const express = require("express");
const {
  getChatRoomById,
  clearAllMessagesInChatRoom,
} = require("../controller/chatRoomController");
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const { updateToRead } = require("../service/messageServices");
const ChatRoom = require("../models/ChatRoomModel");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const chatRoomRoutes = express.Router();

chatRoomRoutes.use(verifyIsLoggedIn);

chatRoomRoutes.get("/:id", getChatRoomById);
chatRoomRoutes.delete("/:id", clearAllMessagesInChatRoom);

chatRoomRoutes.post("/test", async (req, res, next) => {
  try {
    const { roomId, userId } = req.body;

    // null for non-existent user
    const userExist = await User.exists({ _id: userId });
    if (userExist === null) return;
    const foundRoom = await ChatRoom.findById(roomId)
      .select("messages")
      .orFail();

    // await Message.deleteMany();
    // foundRoom.messages = [];
    // await foundRoom.save();

    const messages = await Message.find({
      _id: { $in: foundRoom.messages },
    }).select("read");

    messages.forEach(async (msg) => {
      const userExistId = userExist._id.toString();
      if (msg.read.indexOf(userExistId) === -1) {
        msg.read.push(userExistId);
      }
      await msg.save();
    });

    res.send({ userExist, foundRoom, messages });
  } catch (error) {
    next(error);
  }
});

module.exports = chatRoomRoutes;
