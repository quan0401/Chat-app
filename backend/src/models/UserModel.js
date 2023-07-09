const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // String is shorthand for {type: String}
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    chatRoom: [{ type: Schema.Types.ObjectId, ref: "ChatRoom", unique: true }],
    email: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ name: 1 });
const User = mongoose.model("User", userSchema);

module.exports = User;
