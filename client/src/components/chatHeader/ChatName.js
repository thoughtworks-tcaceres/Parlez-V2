import React, { useContext } from "react";
import "./ChatName.scss";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button";
import { ChatViewContext } from "../../Context";

const SingleChatName = props => {
  const { masterState, dispatch } = useContext(ChatViewContext);
  let selectedChat = masterState.chatrooms.find(chat => masterState.activeChat === chat.id);

  return (
    <Button className="chatNameButton" onClick={() => console.log("hello")}>
      <p className="chatName">{selectedChat ? selectedChat.name : null} </p>
    </Button>
  );
};

export default SingleChatName;
