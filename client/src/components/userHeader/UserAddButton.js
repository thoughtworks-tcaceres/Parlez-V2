import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddFriend from "./AddFriend/AddFriend";
import AddButton from "../../assets/img/plus.png";
import CreateChat from "../userHeader/NewChat/CreateChat";
import "./UserAddButton.scss";
import { height } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "fixed",
    left: "40%",
    top: "0px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    overflow: "scroll",
    bottom: "0px",
    height: "400px",
    padding: "50px"
  }
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [addButton, setAddButton] = useState(false);

  function handleClick(event) {
    setAddButton(event.currentTarget);
  }

  function handleClose() {
    setAddButton(null);
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [chatModal, setChatModal] = React.useState(false);

  const handleChatModalClose = () => {
    setChatModal(false);
  };

  const handleChatModalOpen = () => {
    setChatModal(true);
  };

  function handleModalOpen() {
    setModalShow(true);
  }

  function handleModalClose() {
    setModalShow(false);
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <img src={AddButton} className="addButton" />
      </Button>
      <Menu id="simple-menu" anchorEl={addButton} keepMounted open={Boolean(addButton)} onClose={handleClose}>
        <MenuItem onClick={handleModalOpen} onClose={handleModalClose}>
          Add New Friends
        </MenuItem>
        <MenuItem onClick={handleChatModalOpen} onClose={handleChatModalClose}>
          Create New Chat
        </MenuItem>
      </Menu>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalShow}
        onClose={handleModalClose}
        className="addFriendModal"
      >
        <div className={classes.paper}>
          <AddFriend />
        </div>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={chatModal}
        onClose={handleChatModalClose}
        className="createChatModal"
      >
        <div className={classes.paper}>
          <CreateChat />
        </div>
      </Modal>
    </div>
  );
}
