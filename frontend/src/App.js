import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" component={Routes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
