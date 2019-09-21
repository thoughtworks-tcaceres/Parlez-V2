import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { socket } from "../../server_api";
import { ChatViewContext } from "../../Context";

const RoundSettingsButton = props => {
  const { masterState, dispatch } = useContext(ChatViewContext);

  const singleChatOptions = ["Delete Chat", "Close"];
  const groupChatOptions = ["Leave Group", "Delete Chat", "Close"];

  const [popupElementSingle, setPopupElementSingle] = useState(false);
  const [popupElementGroup, setPopupElementGroup] = useState(false);
  const openSingle = Boolean(popupElementSingle); // sets popupElement to true
  const openGroup = Boolean(popupElementGroup);

  // const handleClick = id => {
  //   console.log("Clicked with id", id);
  //   dispatch({ type: "ACTIVATE_SETTINGS" });
  //   console.log("check clicked", masterState);
  // };

  const handleClickSingle = event => {
    setPopupElementSingle(event.currentTarget);
  };

  const handleClickGroup = event => {
    setPopupElementGroup(event.currentTarget);
  };

  const handleCloseSingle = (option, id) => {
    console.log("CLICKED THIS ID:", id);
    if (option === "Delete Chat") {
      console.log("DELETE");
      socket.emit("delete chatroom button", id);
    } else {
      setPopupElementSingle(false);
    }
  };

  const handleCloseGroup = (option, id) => {
    console.log("CLICKED THIS ID:", id);

    if (option === "Leave Group") {
      socket.emit("leave chatroom", {
        user_id: masterState.userId,
        chatroom_id: id
      });
      setPopupElementGroup(false);
    } else if (option === "Delete Chat") {
      socket.emit("delete chatroom button", id);
      setPopupElementGroup(false);
    } else {
      setPopupElementGroup(false);
    }
  };

  const renderMenu = (
    <>
      <Menu
        anchorEl={popupElementSingle}
        open={openSingle}
        onClose={handleCloseSingle}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 200
          }
        }}
      >
        {singleChatOptions.map(option => (
          <MenuItem key={option} onClick={() => handleCloseSingle(option, props.chatId)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={popupElementGroup}
        open={openGroup}
        onClose={handleCloseGroup}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 200
          }
        }}
      >
        {groupChatOptions.map(option => (
          <MenuItem key={option} onClick={() => handleCloseGroup(option, props.chatId)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const settingBtnStyle = {
    zIndex: 1,
    margin: "5px 0px 0px 170px",
    padding: "0"
  };

  return (
    <>
      <IconButton
        onClick={props.chatType === "group" ? handleClickGroup : handleClickSingle}
        disabled={props.selected}
        style={settingBtnStyle}
      >
        <MoreVertIcon />
      </IconButton>

      {renderMenu}
    </>
  );
};

export default RoundSettingsButton;
