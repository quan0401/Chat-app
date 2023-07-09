const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatRoomSchema = new Schema(
  {
    roomName: String,
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    member: [
      {
        type: Schema.Types.ObjectId,
        nickName: String,
        ref: "User",
        unique: true,
      },
    ],
    message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);
const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

module.exports = ChatRoom;
