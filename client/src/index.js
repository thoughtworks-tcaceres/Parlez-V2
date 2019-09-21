import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ChatViewProvider, FriendProvider, MsgProvider, NtfProvider,  ProfileProvider } from "./Context";


let socket = require("socket.io-client")("ws://localhost:8080");

ReactDOM.render(
  <NtfProvider>
    <ChatViewProvider>
      <FriendProvider>
        <MsgProvider>
        <ProfileProvider>
          <App />
      </ProfileProvider>
        </MsgProvider>
      </FriendProvider>
    </ChatViewProvider>
  </NtfProvider>,
  document.getElementById("root")
);
