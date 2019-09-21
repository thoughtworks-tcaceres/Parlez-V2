import React, { useState, useContext } from "react";
import Drawer from "@material-ui/core/Drawer";

import "./UserAvatar.scss";
import UserProfile from "./UserProfile";
import { ProfileContext } from "../../Context";

const TemporaryDrawer = () => {
  const [sideDrawer, setSideDrawer] = useState(false);
  const { profileState } = useContext(ProfileContext);

  return (
    <div>
      <img alt={"avatar"} src={profileState.avatar} className="userAvatar" onClick={() => setSideDrawer(true)} />
      <Drawer
        open={sideDrawer}
        onClose={() => {
          setSideDrawer(false);
        }}
      >
        {UserProfile()}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
