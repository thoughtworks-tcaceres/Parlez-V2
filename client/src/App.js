import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import LoginPage from "../src/views/Login/LoginPage";
import HomePage from "../src/components/HomePage";
import RegisterPage from "../src/views/Register/RegisterPage";
import history from "./history";
import "./app.scss";

const App = () => {
  return (
    <div className="body">
      <Router history={history}>
        <Switch>
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/chat" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
