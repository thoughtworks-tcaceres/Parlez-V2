import React, { useContext, useEffect, Fragment } from "react";
import ContactList from "./ContactList/ContactList";
import FriendList from "./ContactList/FriendList";
import FriendProfile from "./ContactList/FriendProfile";
import SearchBar from "./ContactList/SearchBar";
import ChatHeader from "./ContactList/ChatHeader";
import MsgChatBox from "./chatArea/MsgChatBox";
import MsgChatItemList from "./chatArea/MsgChatItemList";
import ChatAvatar from "./chatHeader/ChatAvatar";
import ChatName from "./chatHeader/ChatName";
import history from "../history";
import "./HomePage.scss";

import { ChatViewContext, FriendContext, ProfileContext, NtfContext } from "../Context";

import UserAvatar from "./userHeader/UserAvatar";
import UserButton from "./userHeader/UserAddButton";
import Divider from "@material-ui/core/Divider";
import img1 from "../assets/img/dog1.png";
import img2 from "../assets/img/dog2.png";
import img3 from "../assets/img/dog3.png";
import img4 from "../assets/img/dog4.png";
import img5 from "../assets/img/dog5.png";
// import Header from "../components/chatHeader/ChatNameContainer";

import axios from "axios";
import { sendUserId, loadInitialChatroomsData, loadInitialFriendsData, receiveMessage, socket } from "../server_api";

const HomePage = () => {
  const { ntfState, dispatchNtf } = useContext(NtfContext);
  const { masterState, dispatch } = useContext(ChatViewContext);
  const { friendState, dispatchFriend } = useContext(FriendContext);
  const { profileState, dispatchProfile } = useContext(ProfileContext);

  console.log("HOME_PG", masterState);
  console.log("FRIEND_STATE", friendState);

  useEffect(() => {
    axios
      .get("http://localhost:3003/auth/checkloggedin", {
        withCredentials: true
      })
      .then(res => {
        console.log("res", res);
        if (res.data.logged_in) {
          dispatch({
            type: "SIGNUP",
            id: res.data.user_id,
            data: res.data.logged_in
          });
          loadInitialChatroomsData(data => {
            console.log("bleep bloop", data);
            dispatch({
              type: "LOAD_INITIAL_DATA",
              data
            });
          });
          sendUserId(res.data.user_id);
        } else {
          console.log(" AM HERE POTATO", res);
          console.log(" AM HERE POTATO", masterState);
          history.push("/login");
        }
      })
      .catch(err => console.log("error:", err));

    if (masterState.isLoggedIn) {
      console.log("LOOOGGED IN");
    }

    loadInitialFriendsData(data => {
      dispatchFriend({
        type: "LOAD_FRIENDS",
        data
      });
    });

    socket.on("new chatroom message", data => {
      dispatch({ type: "ADD_MESSAGE", data });
      dispatchNtf({ type: "SET_NOTIFICATION", id: data.id });
    });

    socket.on("to be disconnected", () => {
      alert("we have been disconnected");
    });

    socket.on("delete my message", data => {
      let chatroom_id = data.chatroom;
      let message_id = data.message.id;
      dispatch({
        type: "DELETE_MESSAGE",
        chatroom_id: chatroom_id,
        message_id: message_id
      });
    });

    socket.on("delete owner message", data => {
      let chatroom_id = data.chatroom;
      let message_id = data.message.id;
      let message = data.message;
      console.log("DELETE OWNER MESSAGE", data);
      dispatch({
        type: "UPDATE_DELETE_MESSAGE",
        chatroom_id: chatroom_id,
        message_id: message_id,
        message: message
      });
    });

    socket.on("delete viewable messages", data => {
      let chatroom_id = data;
      dispatch({
        type: "DELETE_CHATROOM",
        chatroom_id: chatroom_id
      });
    });
  }, []);

  socket.on("initial user information", data => {
    console.log("USER DATA", data);
    dispatchProfile({
      type: "USER_INFO",
      data
    });
  });

  return (
    <body className="layout">
      <div className="contactsArea">
        <div className="userHeader">
          <UserAvatar />
          <UserButton />
        </div>

        <Fragment>
          <ChatHeader />
        </Fragment>
        <Divider />
        <Fragment>
          <SearchBar />
        </Fragment>
        <div className="friendListBox">{masterState.friendsView ? <FriendList /> : <ContactList />}</div>
      </div>

      <div className="chatContainer">
        <div className="chatBox">
          {masterState.activeChat ? (
            <div className="chatAvatar">
              <ChatAvatar />
              <ChatName />
            </div>
          ) : null}

          {masterState.activeChat && masterState.chatrooms.length > 0 && !masterState.friendsView ? (
            <>
              <div id="chatAreaId" className="chatArea">
                <MsgChatItemList />
              </div>
            </>
          ) : masterState.friendsView && friendState.selectedFriend ? (
            <FriendProfile />
          ) : (
            <div className="emptyChat">
              <Fragment className="emptyChatImgBox">
                <img
                  src={
                    "https://4.bp.blogspot.com/-8cTk5eTBXoU/Wzm1yo66orI/AAAAAAAiUxI/jJ0cU6ToKXYSZ8yWZVu4XGNucH_Hm4XzgCLcBGAs/s1600/AW1297298_04.gif"
                  }
                  alt="dog"
                  className="emptyChatImg"
                />
              </Fragment>
            </div>
          )}
        </div>
        {masterState.activeChat ? (
          <div className="chatInput">
            <MsgChatBox />
          </div>
        ) : null}
      </div>
    </body>
  );
};

export default HomePage;
