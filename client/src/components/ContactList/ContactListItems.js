import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ChatAvatar from "./ChatAvatar";
import ChatSettingsButton from "./RoundSettingsButton";
import Badge from "@material-ui/core/Badge";
import { Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ChatViewContext, NtfContext } from "../../Context";

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 0,
    maxHeight: 200,
    maxWidth: 500,
    "&:hover": {
      boxShadow: "0 4px 8px 0 grey"
    }
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiCardHeader: {
      action: {
        opacity: "1"
      }
    }
  }
});

// const theme2 = createMuiTheme({
//   overrides: {
//     MuiCardHeader: {
//       action: {
//         opacity: "0"
//       }
//     }
//   }
// });

const useStyles_two = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    backgroundColor: "lightGrey"
  }
}));

const listStyle = {
  listStyle: "none"
  // display: "flex"
};

// const settingBtnStyle = {
//   zIndex: 1,
//   border: "solid black 2px"
// };

const ContactListItem = props => {
  const { masterState } = useContext(ChatViewContext);
  const { ntfState } = useContext(NtfContext);
  // console.log('CONTACT-LIST-ITEMS', masterState);

  const classes = useStyles();
  const classes_two = useStyles_two();

  return (
    <li style={listStyle}>
      <Card onClick={props.onClick} className={props.selected ? classes_two.card : classes.card}>
        <ChatSettingsButton chatType={props.chatType} chatId={props.id} />
        <ThemeProvider theme={theme}>
          <CardHeader
            avatar={
              <>
                <Badge badgeContent={ntfState[props.id]} color="secondary" />
                <ChatAvatar avatar={props.chatAvatar} />
              </>
            }
            title={<Typography varaiant="h1">{props.chatName}</Typography>}
            subheader={props.recentMessage}
          />
        </ThemeProvider>
      </Card>
    </li>
  );
};

export default ContactListItem;
