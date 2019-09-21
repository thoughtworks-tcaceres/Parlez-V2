import React from "react";

const avatarStyle = {
  borderRadius: "50%",
  height: "60px"
};

const ChatAvatar = props => {
  return (
    <section>
      <img
        style={avatarStyle}
        src={props.avatar}
        alt={"Chat Avatar"}
        onClick={props.onClick}
      ></img>
    </section>
  );
};

export default ChatAvatar;
