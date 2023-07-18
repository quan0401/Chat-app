const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // String is shorthand for {type: String}
    content: { type: String, required: true },
    read: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
