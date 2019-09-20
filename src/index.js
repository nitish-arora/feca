import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

import App from "./pages/App";
import Dashboard from "./pages/dashboard";
import Logout from "./pages/logout";
import Notfound from "./pages/notfound";
import * as serviceWorker from "./serviceWorker";



const routing = (
  <Router basename={process.env.PUBLIC_URL}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
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
