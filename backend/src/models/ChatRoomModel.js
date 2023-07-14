const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatRoomSchema = new Schema(
  {
    roomName: { type: String, default: "" },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        nickName: { type: String, default: "" },
        ref: "User",
        unique: true,
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);
const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

module.exports = ChatRoom;
