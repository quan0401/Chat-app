const ChatRoom = require("./models/ChatRoomModel");
const Message = require("./models/MessageModel");

const onlineUser = {};

const socketIO = () => {
  io.on("connection", (socket) => {
    socket.on("User online", ({ userId }) => {
      onlineUser[userId] = socket.id;
    });

    socket.on("User ofline", (userId) => {
      console.log("User ofline: ", userId);
      delete onlineUser[userId];
    });

    socket.on(
      "User sends message",
      async ({ senderId, content, roomId, receivers }, cb) => {
        try {
          const foundChatRoom = await ChatRoom.findById(roomId).orFail();

          let message = await Message.create({
            content: content,
            owner: senderId,
          });

          foundChatRoom.lastMessage = message._id;
          foundChatRoom.messages.push(message._id);

          await foundChatRoom.save();

          message = await message.populate("owner");

          cb(message);

          receivers.forEach((receiver) => {
            if (onlineUser.hasOwnProperty(receiver._id)) {
              socket
                .to(onlineUser[receiver._id])
                .emit("User sends message", message);
            }
          });
        } catch (error) {
          console.log("socket error: ", error);
        }
      }
    );

    socket.on("disconnect", () => {
      Object.entries(onlineUser).forEach((arr) => {
        if (arr[1] === socket.id) {
          delete onlineUser[arr[0]];
        }
      });
    });
  });
};

// const onlineUser = {};

// const socketIO = () => {
//   io.on("connection", (socket) => {
//     socket.on("User online", ({ userId, userChatRooms }) => {
//       onlineUser[userId] = {
//         socketId: socket.id,
//         chatRooms: userChatRooms,
//       };
//     });

//     socket.on("User ofline", (userId) => {
//       console.log("User ofline: ", userId);
//       delete onlineUser[userId];
//     });

//     socket.on(
//       "User sends message",
//       async ({ senderId, content, roomId, receivers }, cb) => {
//         try {
//           console.log({ receivers });
//           // const foundChatRoom = await ChatRoom.findById(roomId).orFail();

//           // let message = await Message.create({
//           //   content: content,
//           //   owner: senderId,
//           // });

//           // foundChatRoom.lastMessage = message._id;
//           // foundChatRoom.messages.push(message._id);

//           // await foundChatRoom.save();

//           // message = await message.populate("owner");

//           // cb(message);

//           // if (onlineUser.hasOwnProperty(receivers[0]._id)) {
//           //   socket
//           //     .to(onlineUser[receivers[0]._id])
//           //     .emit("User sends message", message);
//           // }
//         } catch (error) {
//           console.log("socket error: ", error);
//         }
//       }
//     );

//     socket.on("disconnect", () => {
//       Object.entries(onlineUser).forEach((arr) => {
//         if (arr[1].socketId === socket.id) {
//           delete onlineUser[arr[0]];
//         }
//       });
//     });
//   });
// };
module.exports = socketIO;
