import React, { useContext, useEffect } from "react";
import ContactButton from "./ContactButton";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import RecentActorsRoundedIcon from "@material-ui/icons/RecentActorsRounded";
import "./ChatHeader.scss";
import { ChatViewContext, FriendContext } from "../../Context";
import ChatBubble from "../../assets/img/chatbubble.png";
import Contacts from "../../assets/img/contacts1.png";
import { socket } from "../../server_api";

const ChatHeader = () => {
  const { dispatch } = useContext(ChatViewContext);
  const { dispatchFriend } = useContext(FriendContext);

  const handleChatClick = () => {
    dispatch({ type: "CHAT_VIEW" });
  };

  const handleFriendsClick = () => {
    dispatch({ type: "FRIENDS_VIEW" });
    socket.emit("fetch friend list");
  };

  useEffect(() => {
    socket.on("friendlist data", data => {
      dispatchFriend({ type: "LOAD_FRIENDS", data });
    });
  }, []);

  return (
    <div className="chat_header">
      <div className="chat_button">
        <ContactButton onClick={handleChatClick}>
          <img src={ChatBubble} className="chatImg" />
        </ContactButton>
      </div>
      <div className="contacts_button">
        <ContactButton onClick={handleFriendsClick}>
          <img src={Contacts} className="chatImg" />
        </ContactButton>
      </div>
    </div>
  );
};

export default ChatHeader;
