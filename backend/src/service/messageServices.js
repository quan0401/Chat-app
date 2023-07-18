const Message = require("../models/MessageModel");
const ChatRoom = require("../models/ChatRoomModel");

const updateToRead = async (roomId, userId) => {
  try {
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
  } catch (error) {
    console.log("updateToRead error");
    return error;
  }
};
module.exports = { updateToRead };
