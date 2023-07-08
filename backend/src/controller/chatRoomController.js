const ChatRoom = require("../models/ChatRoom");

const getMessages = async (req, res, next) => {
  try {
    const memberId = req.memberId;
    await ChatRooma();
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages };
