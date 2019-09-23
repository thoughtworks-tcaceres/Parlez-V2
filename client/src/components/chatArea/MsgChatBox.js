import React, { useState } from "react";
import "./MsgChatBox.scss";

const MsgChatBox = () => {
  const [msgContent, setMsgContent] = useState("");

  const msgContentChange = e => {
    console.log("MESSAGE CONTENT 1: ", msgContent);
    setMsgContent(e.target.value);
    console.log("MESSAGE CONTENT 2: ", msgContent);
  };

  const submitMessage = () => {
    if (msgContent.length > 0) {
      //send message
      setMsgContent("");
    }
  };

  const keyUpHandler = e => {
    if (e.key === "Enter") {
      submitMessage();
      setMsgContent("");
    }
  };

  return (
    <div>
      <textarea
        id="msgText"
        placeholder="Enter Message ..."
        onChange={msgContentChange}
        onKeyUp={keyUpHandler}
        value={msgContent}
        maxLength={255}
        rows={5}
        autoFocus
        style={{ resize: "none" }}
      ></textarea>
      <i id="submitBtn" className="far fa-paper-plane fa-3x" onClick={submitMessage}></i>
    </div>
  );
};

export default MsgChatBox;
