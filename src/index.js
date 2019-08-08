import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import App from "./components/App";
import Dashboard from "./components/dashboard";
import Logout from "./components/logout";
import Notfound from "./components/notfound";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router basename={process.env.PUBLIC_URL}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={App} />
        <Route
          path="/home"
          render={() =>
            !!localStorage.getItem("id_token") ? (
              <Dashboard />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route path="/logout" component={Logout} />
        <Route component={Notfound} />
      </Switch>
    </React.Fragment>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
