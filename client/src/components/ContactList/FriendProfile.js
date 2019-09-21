import React, { useContext, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import VideocamIcon from "@material-ui/icons/Videocam";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./FriendProfile.scss";

import { FriendContext, ChatViewContext } from "../../Context";
import { socket } from "../../server_api";

const FriendProfile = () => {
  const { friendState, dispatchFriend } = useContext(FriendContext);
  const { masterState } = useContext(ChatViewContext);

  let id = "";
  let username = "";
  let avatar = "";
  let status = "";

  friendState.friends.map(friend => {
    if (friend.id === friendState.selectedFriend) {
      id = friend.id;
      username = friend.username;
      avatar = friend.avatar;
      status = friend.status;
    }
  });

  const handleSubmit = (friend_id, friend_username, friend_avatar) => {
    socket.emit("create single chat", {
      type: "single",
      name: friend_username,
      creatorUserId: masterState.userId,
      usersArr: [friend_id, masterState.userId],
      avatar: friend_avatar
    });
  };

  const handleDelete = friend_id => {
    socket.emit("delete friend", friend_id);
  };

  useEffect(() => {
    socket.on("friendlist data", data => {
      dispatchFriend({ type: "LOAD_FRIENDS", data });
      dispatchFriend({ type: "DELETED_FRIEND" });
    });
  });

  return (
    <Card className="friendCardContainer">
      <CardActionArea className="friendProfileContainer">
        <CardMedia component="img" alt={username} height="300" src={avatar} className="friendProfileContainerImg" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {status}
          </Typography>
        </CardContent>
        <CardActions>
          <Fab
            variant="extended"
            aria-label="delete"
            color="primary"
            onClick={() => handleSubmit(id, username, avatar)}
          >
            <AddIcon />
            Message
          </Fab>
          {/* <Fab variant="extended" aria-label="delete" color="primary">
          <KeyboardVoiceIcon />
          Voice Call
        </Fab>
        <Fab variant="extended" aria-label="delete" color="primary">
          <VideocamIcon />
          Video Call
        </Fab> */}
          <Fab variant="extended" aria-label="delete" color="secondary" onClick={() => handleDelete(id)}>
            <HighlightOffIcon />
            Delete
          </Fab>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default FriendProfile;
