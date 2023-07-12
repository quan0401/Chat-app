const socketIO = () => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("hello", (data) => {
      console.log({ data });
    });
  });
};
module.exports = socketIO;
