let socket = require("socket.io-client")("ws://localhost:8080");

const sendUserId = user_id => {
  socket.emit("initialize", user_id);
};

const loadInitialChatroomsData = cb => {
  socket.on("initial message data", data => {
    console.log("DATA_ONLOAD", data);
    cb(data);
  });

  // return () => {
  //   socket.removeEventListener("initial data", data => {
  //     cb(data);
  //   });
  // };
};

const loadInitialFriendsData = cb => {
  socket.on("friendlist data", data => {
    console.log("FRIENDLIST DATA", data);
    cb(data);
  });
};

// const loadInitialUsersData = cb => {
//   socket.on("initial user information", data => {
//     console.log("USER DATA", data);
//     cb(data);
//   });
// };

// send newly generated message:
const sendMessage = msg => {
  socket.emit("send message", msg);
};

export { sendUserId, loadInitialChatroomsData, loadInitialFriendsData, sendMessage, socket };
