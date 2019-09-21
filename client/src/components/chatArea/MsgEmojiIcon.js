import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TagFaces from '@material-ui/icons/TagFaces';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

const MsgSubmitBtn = ({onClick,disabled})  => {
  const classes = useStyles();
  return (
    // <IconButton><TagFaces></TagFaces></IconButton>
      <Fab onClick={onClick} size="small" color="primary" aria-label="add" className={classes.margin}>
        <TagFaces />
      </Fab>
      )
}

export default MsgSubmitBtn;
