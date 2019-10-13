import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/register" />
        </Switch>
      </div>
    );
  }
}

export default Routes;
