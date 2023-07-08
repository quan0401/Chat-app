const connectDb = require("../config/connectDb");
const User = require("../models/UserModel");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/MessageModel");

const importData = async () => {
  try {
    connectDb();
    // await User.deleteMany();
    // const result = await User.insertMany([
    //   { name: "Gourav" },
    //   { name: "Kartik" },
    //   { name: "Niharika" },
    // ]);
    await Message.deleteMany();
    const result = await Message.insertMany([
      { owner: "64a928cdd5405dc3042fd802", content: "bla bla" },
    ]);
    const chatRoom = [];
    result.forEach((item) => {
      chatRoom.push({ message: item });
    });
    await ChatRoom.deleteMany();
    await ChatRoom.insertMany(chatRoom);
    const result1 = await ChatRoom.find().populate("message");

    console.log("Seeder success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = importData;
