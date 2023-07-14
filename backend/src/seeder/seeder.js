const connectDb = require("../config/connectDb");
const User = require("../models/UserModel");
const ChatRoom = require("../models/ChatRoomModel");
const Message = require("../models/MessageModel");

const user = require("./user");
const messages = require("./message");

const importData = async () => {
  try {
    connectDb();
    await User.deleteMany();

    await User.create({
      name: "quan0401",
      password: "$2a$10$mXa4hWGDtsvW28RvFY.Anu1RtgrYFlP/TJkSTY3fqRWT8og3rmn6G",
    });
    await User.create({
      name: "test",
      password: "$2a$10$mXa4hWGDtsvW28RvFY.Anu1RtgrYFlP/TJkSTY3fqRWT8og3rmn6G",
    });

    const insertedUsers = (await User.find()).map((user) =>
      user._id.toString()
    );
    console.log({ insertedUsers });

    await Message.deleteMany();
    const insertedMessages = (await Message.insertMany(messages)).map((msg) =>
      msg._id.toString()
    );
    console.log({ insertedMessages });

    await ChatRoom.deleteMany();
    const { _id: chatRoomId } = await ChatRoom.create({
      members: insertedUsers,
      messages: insertedMessages,
      lastMessage: insertedMessages[insertedMessages.length - 1],
    });

    const foundUsers = await User.find();
    console.log({ foundUsers });
    foundUsers.forEach((user) => {
      user.chatRooms = [chatRoomId];
      user.save();
    });

    // const foundChatRooms = await ChatRoom.find().populate("members messages");

    // const testUsers = await User.findById("64afbabb5fe4db468a831887").populate(
    //   "chatRooms"
    // );

    console.log("Seeder success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = importData;
