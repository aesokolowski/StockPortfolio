module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `Connection established: ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(`Connection closed: ${socket.id}`);
    });
  });
};
