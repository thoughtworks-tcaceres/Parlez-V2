import React, { useState, useContext, useEffect } from "react";
import "./UserProfile.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { socket } from "../../server_api";
import { ProfileContext, ChatViewContext } from "../../Context";
import axios from "axios";
import history from "../../history";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const SideList = side => {
  const classes = useStyles();
  const { masterState } = useContext(ChatViewContext);
  const { profileState, dispatchProfile } = useContext(ProfileContext);
  const [changeName, setChangeName] = useState("");
  const [changeAvatar, setChangeAvatar] = useState("");
  const [changeStatus, setChangeStatus] = useState("");

  const onChangeName = e => {
    setChangeName(e.target.value);
  };

  const onChangeAvatar = e => {
    setChangeAvatar(e.target.value);
  };

  const onChangeStatus = e => {
    setChangeStatus(e.target.value);
  };

  const nameHandler = () => {
    console.log("masterState INFORMATIONNNNNNNNNN~N~N~~~", masterState.userId);
    socket.emit("change name", {
      creatorUserId: masterState.userId,
      username: changeName
    });
  };

  useEffect(() => {
    socket.on("updated username data", data => {
      dispatchProfile({ type: "UPDATED_USERNAME", data });
      console.log("CHECKING FRONT END FOR RECEIVING DATA BACK", data);
      console.log("CHECKING FRONT END FOR RECEIVING DATA.username BACK", data.username);
    });
    socket.on("updated avatar data", data => {
      dispatchProfile({ type: "UPDATED_AVATAR", data });
      console.log("FRONT END SIDE FOR DATA", data);
    });
    socket.on("updated status data", data => {
      dispatchProfile({ type: "UPDATED_STATUS", data });
    });
  }, []);

  const urlHandler = () => {
    console.log("URL HANDLER DATA");
    socket.emit("change url", {
      creatorUserId: masterState.userId,
      avatar: changeAvatar
    });
  };

  const statusHandler = () => {
    socket.emit("change status", {
      creatorUserId: masterState.userId,
      status: changeStatus
    });
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3003/auth/logout", { withCredentials: true })
      .then(res => {
        if (res.data.msg === "You have been logged out.") {
          history.push("/login");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="sideDrawerBox" role="presentation">
      <div>
        <Grid container justify="center" alignItems="center" className="testGrid">
          <img
            style={{ height: "15em", width: "15em" }}
            alt="profile avatar"
            src={profileState.avatar}
            className="bigAvatarBox"
          />
        </Grid>
      </div>
      <div className="profileInfoBox">
        <h5 className="profileName">{profileState.username}</h5>
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
        <h5 className="profileName">{profileState.avatar}</h5>
        <div className="editProfileContent">
          <TextField
            id="standard-number"
            label="Edit Avatar URL"
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

        <h5 className="profileName">{profileState.status}</h5>
        <div className="editProfileContent">
          <TextField
            id="standard-number"
            label="Edit Status"
            value={changeStatus}
            onChange={onChangeStatus}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <button color="secondary" aria-label="edit" className="fab" onClick={statusHandler}>
            <EditIcon className="editBtnIcon" />
          </button>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SideList;
