import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import { MsgContext } from "../../Context";
import { ChatViewContext, MsgContext } from "../../Context";
import { sendMessage } from "../../server_api";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const MsgInputField = () => {
  const { masterState } = useContext(ChatViewContext);
  const { msgState, dispatch } = useContext(MsgContext);

  const message = {
    userId: masterState.userId,
    chatroomId: masterState.activeChat,
    content: msgState.newMessage
  };

  const classes = useStyles();
  // const [values, setValues] = useState("");
  // const [charCount, setCharCount] = useState("0 characters");

  const handleChange = event => {
    // setValues(event.target.value);

    dispatch({ type: "NEW_MESSAGE", data: event.target.value });
    dispatch({ type: "UPDATE_COUNT", data: event.target.value.length });
    dispatch({ type: "DISPLAY_COUNT" });
    if (msgState.charCount !== 0) {
      dispatch({ type: "CHECK_COUNT" });
    }
    // setCharCount(`${event.target.value.length.toString()} characters`);
  };

  const handleEnterKeyPress = event => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      sendMessage(message);
      dispatch({ type: "MESSAGE_SENT" });
      // dispatch({ type: "MESSAGE_RESET" });
    }
  };

  return (
    <TextField
      id="message-input-field"
      label="Enter Message"
      placeholder="Start typing ..."
      multiline
      helperText={msgState.countDisplay}
      rows="4"
      value={msgState.newMessage}
      onChange={handleChange}
      onKeyUp={handleEnterKeyPress}
      margin="normal"
      fullWidth={true}
      variant="outlined"
    />
  );
};

export default MsgInputField;
