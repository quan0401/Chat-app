const ChatRoom = require("../models/ChatRoom");

const getMessages = async (req, res, next) => {
  try {
    const memberId = req.memberId;
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages };
