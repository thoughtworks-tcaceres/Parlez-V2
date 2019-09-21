import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import "./ChatProfile.scss";
import { ChatViewContext, FriendContext } from "../../Context";
import { socket } from "../../server_api";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const ChatProfile = () => {
  const classes = useStyles();

  const { masterState, dispatch } = useContext(ChatViewContext);
  let selectedChat = masterState.chatrooms.find(chat => masterState.activeChat === chat.id);

  const [changeName, setChangeName] = useState("");
  const [changeAvatar, setChangeAvatar] = useState("");
  const [show, setShow] = useState(false);
  const [GroupList, setGroupList] = useState([]);

  const handleAddClick = () => {
    setShow(!false);
  };

  const onChangeName = e => {
    setChangeName(e.target.value);
  };

  const onChangeAvatar = e => {
    setChangeAvatar(e.target.value);
  };

  const nameHandler = () => {
    socket.emit("change chat name", {
      chatroomId: masterState.activeChat,
      name: changeName
    });
  };

  const urlHandler = () => {
    socket.emit("change chat avatar", {
      chatroomId: masterState.activeChat,
      avatar: changeAvatar
    });
  };

  useEffect(() => {
    socket.on("updated chat data", data => {
      console.log("UPDATED CHATROOM DATA", data);
      dispatch({ type: "UPDATE_CHATROOM", data });
    });

    socket.on("get chatroom participants", data => {
      console.log("GET PARTICIPANTS", data);
      setGroupList(data);
    });
  }, []);

  console.log("GROUPLIST", GroupList);

  // buttonclick > socket.emit('fetch chatroom participants')
  // socket.on('get chatroom participants')

  /************************************ ADD MORE FRIENDS DIV *************************************/

  const { friendState, dispatchFriend } = useContext(FriendContext);

  const [friendlist, setFriendlist] = useState([]);

  const handleGroupSubmit = () => {
    console.log("GROUP SUBMIT CLICKED");
    socket.emit("add chatroom participants", {
      id: masterState.activeChat,
      usersArr: friendlist
    });
  };

  const Check = val => {
    return val === undefined;
  };

  const friend = friendState.friends.map(friend => {
    if (GroupList.findIndex(list => list.user_id === friend.id) === -1) {
      return (
        <>
          <input
            type="checkbox"
            value={friend.id}
            onClick={() => {
              setFriendlist([...friendlist, friend.id]);
            }}
          />
          <img src={friend.avatar}></img>
          {friend.username}
        </>
      );
    }
  });

  console.log("AAAAAABBBBBOOOOVVVEEEEEEE");
  console.log("FRIEND.LENGTH", friend.every(Check));

  /************************************ ADD MORE FRIENDS DIV *************************************/

  return (
    <div className="sideDrawerBox" role="presentation">
      <div>
        <Grid container justify="center" alignItems="center" className="testGrid">
          <img style={{height:'15em',width:'15em'}} alt="friends avatar" src={selectedChat ? selectedChat.avatar : null} className="bigAvatarBox" />
        </Grid>
      </div>
      <div className="profileInfoBox">
        <h5 className="profileName">{selectedChat ? selectedChat.name : null}</h5>
        {/* <h5 className="profileName">friends status</h5> */}

        <div className="editProfileContent">
          <TextField
            id="standard-number"
            label="Edit Name"
            value={changeName}
            onChange={onChangeName}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <button color="secondary" aria-label="edit" className="fab" onClick={nameHandler}>
            <EditIcon />
          </button>
        </div>
        <h5 className="profileName">Change Avatar</h5>
        <div className="editProfileContent">
          <TextField
            id="standard-number"
            label="URL"
            value={changeAvatar}
            onChange={onChangeAvatar}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <button color="secondary" aria-label="edit" className="fab" onClick={urlHandler}>
            <EditIcon />
          </button>
        </div>
        {selectedChat && selectedChat.type === "group" ? (
          <div className="ChatProfileDrawerBtns">
            <div>
              <h3>Members</h3>
              {GroupList.map(list => {
                return <ul>{list.username}</ul>;
              })}
            </div>
            <button color="secondary" aria-label="edit" className="fab" onClick={handleAddClick}>
              <AddIcon />
            </button>

            {show ? (
              friend.every(Check) ? (
                alert("All your friends are in this group chat already!")
              ) : (
                <div>
                  <form>{friend}</form>
                  <button onClick={handleGroupSubmit}>Create</button>
                </div>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatProfile;
