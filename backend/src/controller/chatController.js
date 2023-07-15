const ChatRoom = require("../models/ChatRoomModel");
const getChatRoomById = async (req, res, next) => {
  try {
    const { id: roomId } = req.params;
    if (!roomId) return res.status(400).send("Missing roomId");
    const foundRoom = await ChatRoom.findById(roomId)
      .populate("members")
      .populate({
        path: "messages",
        model: "Message",
        populate: {
          path: "owner",
          model: "User",
        },
      })
      .populate({
        path: "lastMessage",
        model: "Message",
        populate: {
          path: "owner",
          model: "User",
        },
      })
      .orFail();
    res.status(200).send({
      EC: 0,
      data: foundRoom,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getChatRoomById };
