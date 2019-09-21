import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Send from "@material-ui/icons/Send";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

const MsgSubmitBtn = ({ onClick, disabled }) => {
  const classes = useStyles();
  return (
    <Fab
      onClick={onClick}
      disabled={disabled}
      size="medium"
      color="primary"
      aria-label="add"
      className={classes.margin}
    >
      <Send />
    </Fab>
  );
};

export default MsgSubmitBtn;
