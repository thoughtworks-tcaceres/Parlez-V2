import React, { useContext } from "react";
import ContactListItem from "./ContactListItems";
import { ChatViewContext, NtfContext } from "../../Context";

// helper to shorten message length:
const recentMessage = message => {
  const hide = "...";
  let conciseMessage = message
    .trim()
    .split(" ")
    .slice(0, 7)
    .join(" ");
  const finalMessage = (conciseMessage += hide);
  return message.length >= 50 ? finalMessage : message;
};

const ContactList = () => {
  const { masterState, dispatch } = useContext(ChatViewContext);
  const { dispatchNtf } = useContext(NtfContext);

  const ContactListItems =
    masterState.chatrooms.length > 0
      ? masterState.chatrooms.map(chat => {
          if (chat.messages.length > 0) {
            let recentMessageTime = `${recentMessage(chat.messages[chat.messages.length - 1].content)}
          ${chat.messages[0].created_at}`;
            return (
              <ContactListItem
                key={chat.id}
                id={chat.id}
                chatType={chat.type}
                chatName={chat.name}
                chatAvatar={chat.avatar}
                selected={masterState.activeChat === chat.id}
                recentMessage={recentMessageTime}
                onClick={() => {
                  dispatch({
                    type: "ACTIVATE_CHAT",
                    id: chat.id
                  });
                  dispatchNtf({ type: "CLEAR_NOTIF", id: chat.id });
                  dispatchNtf({ type: "ACTIVATE_CHAT", id: chat.id });
                }}
              />
            );
          }
        })
      : [];

  return (
    <section>
      <ul style={{ padding: 0 }}>{ContactListItems}</ul>
    </section>
  );
};

export default ContactList;
