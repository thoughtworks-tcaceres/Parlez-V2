import React, { useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import ChatProfile from "./ChatProfile";
import { ChatViewContext } from "../../Context";
import { socket } from "../../server_api";

export default function TemporaryDrawer() {
  const { masterState, dispatch } = useContext(ChatViewContext);

  let selectedChat = masterState.chatrooms.find(chat => masterState.activeChat === chat.id);

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    socket.emit("fetch chatroom participants", masterState.activeChat);
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div className="chatSideDrawerBox" role="presentation">
      <ChatProfile />
    </div>
  );

  return (
    <div>
      <img
        alt={"avatar"}
        src={selectedChat ? selectedChat.avatar : null}
        className="chatAvatar"
        onClick={toggleDrawer("left", true)}
      />
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
