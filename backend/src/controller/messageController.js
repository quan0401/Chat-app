const ChatRoom = require("../models/ChatRoomModel");
const Message = require("../models/MessageModel");

const createMessage = async (req, res, next) => {
  try {
    const { userId, content, roomId } = req.body;
    if (!userId || !content || !roomId)
      res
        .status(400)
        .send({ EC: 1, message: "Missing userId or content or roomId" });

    const foundChatRoom = await ChatRoom.findById(roomId).orFail();

    let message = await Message.create({
      content: content,
      owner: userId,
    });

    foundChatRoom.messages.push(message._id);
    await foundChatRoom.save();

    message = await message.populate("owner");

    res.status(200).send({
      EC: 0,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage };
