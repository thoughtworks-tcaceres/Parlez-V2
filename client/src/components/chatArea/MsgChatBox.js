import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import MsgEmojiIcon from "./MsgEmojiIcon";
import MsgSubmitBtn from "./MsgSubmitBtn";
import MsgInputField from "./MsgInputField";

import { ChatViewContext, MsgContext } from "../../Context";
import { sendMessage } from "../../server_api";

const MsgChatBox = () => {
  const { masterState } = useContext(ChatViewContext);
  const { msgState, dispatch } = useContext(MsgContext);

  const message = {
    userId: masterState.userId,
    chatroomId: masterState.activeChat,
    content: msgState.newMessage
  };

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    container: {
      display: "flex",
      alignItems: "center",
      margin: "0",
      border: "1px black solid",
      width: "100%"
    },
    emoji: {
      padding: "1em"
    }
  }));
  const classes = useStyles();

  const addEmoji = e => {
    console.log("COUNT", msgState.charCount);
    dispatch({ type: "MSG_AND_EMOJI", data: msgState.newMessage + e.native });
    dispatch({ type: "UPDATE_COUNT", data: msgState.charCount + 1 });
    dispatch({ type: "DISPLAY_COUNT" });
    dispatch({ type: "CHECK_COUNT" });
  };

  // const handleEnterKeyPress = event => {
  //   if (event.key === "Enter") {
  //     console.log("enter press here! ");
  //   }
  // };

  return (
    <Box className={classes.container}>
      <Box className={classes.emoji}>
        <MsgEmojiIcon
          onClick={() => {
            dispatch({ type: "SHOW_EMOJI" });
          }}
        ></MsgEmojiIcon>
      </Box>
      <MsgInputField></MsgInputField>
      {msgState.showEmoji ? (
        <span
          style={{
            position: "absolute",
            bottom: 107
          }}
        >
          <Picker
            onSelect={addEmoji}
            emojiTooltip={true}
            showSkinTones={false}
            showPreview={false}
            color="#2952a3"
            autoFocus={true}
          />
        </span>
      ) : null}
      <Box className={classes.emoji}>
        <MsgSubmitBtn
          disabled={msgState.msgBtnStatus}
          onClick={e => {
            e.preventDefault();
            sendMessage(message);
            dispatch({ type: "MESSAGE_SENT" });
          }}
        ></MsgSubmitBtn>
      </Box>
    </Box>
  );
};

export default MsgChatBox;
