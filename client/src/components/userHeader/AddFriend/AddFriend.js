import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./AddFriend.scss";
import Button from "@material-ui/core/Button";
import { socket } from "../../../server_api";
import { FriendContext } from "../../../Context";
import pencil from "../../../../src/assets/img/pencil.svg";
import human from "../../../../src/assets/img/human.svg";
import email from "../../../../src/assets/img/email.svg";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
}));

const AddFriend = () => {
  const { dispatchFriend } = useContext(FriendContext);

  const classes = useStyles();

  const [showFriends, setShowFriends] = useState({
    username: null,
    email: null,
    avatar: null,
    status: null,
    id: null
  });
  const [addEmail, setAddEmail] = useState("");

  const onChangeEmail = e => {
    setAddEmail(e.target.value);
  };

  const handleSubmit = () => {
    const data = { email: addEmail };
    socket.emit("search friend", data);
    setShowFriends({
      username: null,
      email: null,
      avatar: null,
      status: null,
      id: null
    });
  };

  const handleFriendSubmit = () => {
    socket.emit("add new friend", showFriends);
  };

  useEffect(() => {
    socket.on("found friend", data => {
      console.log("WHAT IS THE DATA", data);
      setShowFriends(data);
    });
    socket.on("friendlist data", data => {
      dispatchFriend({ type: "ADD_FRIEND", data });
      console.log("CHECKING IN SOCKET TO SEE WAHT DATA IS", data);
    });
  }, []);

  return (
    <div className="addContainer">
      <TextField
        id="standard-search"
        label="Enter Email"
        type="search"
        className={classes.textField}
        margin="normal"
        onChange={onChangeEmail}
        value={addEmail}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
      {showFriends.username && (
        <div className="foundFriendBox">
          <div>
            <img
              style={{ height: "15em", width: "15em" }}
              src={showFriends.avatar}
              alt={showFriends.username}
              className="foundFriendAvatar"
            />
          </div>
          <p className="resultLine">
            <img src={human} alt="pencil" className="iconSize" />: {showFriends.username}
          </p>
          <p className="resultLine">
            <img src={email} alt="pencil" className="iconSize" />: {showFriends.email}
          </p>
          <p className="resultLine">
            <img src={pencil} alt="pencil" className="iconSize" />: {showFriends.status}
          </p>
          <Button variant="contained" color="primary" onClick={handleFriendSubmit}>
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
