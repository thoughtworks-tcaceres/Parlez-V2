import React, { useState } from "react";
import classNames from "classnames";
import "./MsgChatBox.scss";

const MsgChatBox = () => {
  const [msgContent, setMsgContent] = useState("");

  const btnClass = classNames("far fa-paper-plane fa-3x", {
    disabledBtn: msgContent.length === 0,
    enabledBtn: msgContent.length !== 0
  });

  const msgContentChange = e => {
    setMsgContent(e.target.value);
  };

  const submitMessage = () => {
    if (msgContent.length > 0) {
      setMsgContent("");
      //socket msg for sending message
    }
  };

  const keyUpHandler = e => {
    if (e.key === "Enter") {
      submitMessage();
    }
  };

  return (
    <div id="chatArea">
      <textarea
        id="msgText"
        placeholder="Enter Message ..."
        onChange={msgContentChange}
        onKeyUp={keyUpHandler}
        value={msgContent}
        maxLength={255}
        rows={5}
        autoFocus
      ></textarea>
      <i id="submitBtn" className={btnClass} onClick={submitMessage}></i>
    </div>
  );
};

export default MsgChatBox;
