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
      { owner: "64a928cdd5405dc3042fd803", content: "nope nope" },
    ]);

    const chatRoom = { message: [], member: [] };
    result.forEach((item) => {
      chatRoom.message.push(item);
      chatRoom.member.push(item.owner._id.toString());
    });
    await ChatRoom.deleteMany();
    const resultChatRoom = await ChatRoom.insertMany([chatRoom]);

    User.find({
      _id: { $in: ["64a928cdd5405dc3042fd802", "64a928cdd5405dc3042fd803"] },
    })
      .then((users) => {
        users.forEach((user) => {
          // user.chatRoom.push(resultChatRoom[0]._id.toString());
          user.chatRoom = [resultChatRoom[0]._id.toString()];

          user.save().then((res) => console.log(res));
        });
      })
      .catch((error) => {
        console.log(error);
      });

    const result1 = await ChatRoom.find().populate("message member");

    console.log("Seeder success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = importData;
