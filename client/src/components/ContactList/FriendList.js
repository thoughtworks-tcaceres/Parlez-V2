import React, { useContext } from "react";
import FriendListItem from "./FriendListItem";
import { FriendContext } from "../../Context";

const FriendList = () => {
  const { friendState, dispatchFriend } = useContext(FriendContext);

  const handleClick = friend_id => {
    dispatchFriend({
      type: "SELECT_FRIEND",
      data: friend_id
    });
  };

  const FriendListItems =
    friendState.friends.length > 0 &&
    friendState.friends.map(friend => {
      return (
        <FriendListItem
          key={friend.id}
          id={friend.id}
          email={friend.email}
          name={friend.username}
          avatar={friend.avatar}
          onClick={() => handleClick(friend.id)}
        />
      );
    });

  return (
    <section>
      <ul style={{ padding: 0 }}>{FriendListItems}</ul>
    </section>
  );
};

export default FriendList;
