require("dotenv").config();
const { default: mongoose } = require("mongoose");
const ChatRoom = require("../models/ChatRoomModel");

const getChatRoomById = async (req, res, next) => {
  try {
    const { id: roomId } = req.params;
    const limit = req.query.limit || 5;
    const skip = req.query.skip || 5;
    if (!roomId) return res.status(400).send("Missing roomId");
    const foundRoom = await ChatRoom.findById(roomId)
      .populate("members")
      .populate({
        path: "messages",
        model: "Message",
        options: {
          limit: limit ? limit : 10,
          sort: { createdAt: -1 },
          skip: skip ? skip : 0,
        },
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

    const [result] = await ChatRoom.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(roomId) } },
      {
        $project: {
          messagesCount: { $size: "$messages" },
        },
      },
    ]);

    // console.log(foundRoom);
    res.status(200).send({
      EC: 0,
      data: foundRoom,
      messagesCount: result.messagesCount,
    });
  } catch (error) {
    next(error);
  }
};

const clearAllMessagesInChatRoom = async (req, res, next) => {
  try {
    const room = await ChatRoom.findById(req.params.id);
    room.messages = [];
    const result = await room.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getChatRoomById, clearAllMessagesInChatRoom };
