import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { socket } from "../../../server_api";
import { FriendContext, ChatViewContext } from "../../../Context";
import "./CreateChat.scss";
import FriendList from "../../ContactList/FriendList";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
}));

const handleSubmit = () => {};

const GroupFriendList = props => {
  const classes = useStyles();

  const { friendState, dispatchFriend } = useContext(FriendContext);
  const { masterState } = useContext(ChatViewContext);

  const [friendlist, setFriendlist] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleGroupSubmit = () => {
    console.log("GROUP SUBMIT CLICKED");
    let user_arr = friendlist.push(masterState.userId);
    socket.emit("create group chat", {
      type: "group",
      name: name,
      creatorUserId: masterState.userId,
      usersArr: friendlist,
      avatar: avatar
    });
  };

  const friend = friendState.friends.map(friend => {
    return (
      <div className="groupCheckBoxForm">
        <input
          type="checkbox"
          value={friend.id}
          onClick={() => {
            setFriendlist([...friendlist, friend.id]);
          }}
        />
        <img src={friend.avatar}></img>
        <p>{friend.username}</p>
      </div>
    );
  });

  return (
    <div className="addGroupContainer">
      <div className="addGroupContainerInside">
        <form>
          <input type="text" placeholder="Enter group name..." value={name} onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="Avatar URL..." value={avatar} onChange={e => setAvatar(e.target.value)} />
          <div className="friendSection">{friend}</div>
        </form>
      </div>
      <Button variant="contained" color="primary" onClick={handleGroupSubmit}>
        Create
      </Button>
    </div>
  );
};

export default GroupFriendList;
