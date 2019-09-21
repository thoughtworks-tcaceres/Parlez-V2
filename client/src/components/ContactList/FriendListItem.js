import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChatAvatar from "./ChatAvatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const FriendListItem = props => {
  return (
    <li onClick={props.onClick}>
      <ListItem button>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <ListItemAvatar>
            <ChatAvatar avatar={props.avatar} />
          </ListItemAvatar>
          <ListItemText primary={props.name} />
        </div>
      </ListItem>
    </li>
  );
};

export default FriendListItem;
