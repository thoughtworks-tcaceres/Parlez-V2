import React, { useState } from "react";
import "./MsgChatBox.scss";

const MsgChatBox = () => {
  const [msgContent, setMsgContent] = useState("");

  const msgContentChange = e => {
    setMsgContent(e.target.value);
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
      console.log("this is the message that will be emitted :", msgContent);
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
