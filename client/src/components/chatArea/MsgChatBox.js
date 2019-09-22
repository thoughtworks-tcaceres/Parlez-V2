import React, { useState } from "react";

const MsgChatBox = () => {
  const [msgContent, setMsgContent] = useState("");

  const msgContentChange = e => {
    setMsgContent(e.target.value);
    console.log(msgContent);
  };

  return (
    <div>
      <textarea
        placeholder="Enter Message ..."
        onChange={msgContentChange}
        value={msgContent}
        maxLength={255}
        rows={5}
      ></textarea>
      <i class="far fa-paper-plane fa-3x"></i>
    </div>
  );
};

export default MsgChatBox;
