import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";
import { makeStyles } from "@material-ui/core/styles";
import picbox from "../../assets/img/signup-image.jpg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { ChatViewContext } from "../../Context";
import history from "../../history";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "50px"
  }
}));

const SignUpPage = () => {
  // const state = {
  //   name: name,
  //   email: email,
  //   password: password
  // };

  const { masterState, dispatch } = useContext(ChatViewContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = useStyles();

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3003/auth/register",
        {
          username: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log("POST HERE TO CHECK ON LOGIN PAGE TO SEE RESPONSE", response.data);
        if (response.data.logged_in) {
          history.push("/chat");
        }
        // if (response.data["user_id"] === loginEmail) {
        //   history.push("/chat");
        // }
        else {
          alert("Email does not exist");
        }
        /**************************** TYLERS CODE ****************************/
        // if (
        //   response.data.logged_in &&
        //   masterState.loggedInStatus === "NOT_LOGGED_IN"
        // ) {
        //   //set state with user:res.data.user_id and loggedInStatus: true
        // } else if (
        //   !response.data.logged_in &&
        //   masterState.loggedInStatus === "LOGGED_IN"
        // ) {
        // }
        //set state with loggedInStatus: false, user: null
        /**************************** TYLERS CODE ****************************/
      })
      .catch(err => console.log("error:", err));
  };

  return (
    <div className="purple-square-container">
      <div className="red-square">
        <form onSubmit={onSubmit} className="input-box-area">
          <h1>Sign up</h1>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item></Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Username"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChangeName}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item></Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item></Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item></Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
            <Link to="/login">
              <Button variant="contained" color="primary" className={classes.button}>
                Login
              </Button>
            </Link>
          </div>
        </form>
        <div className="picture-container">
          <div>
            <img src={picbox} className="picture-box" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
