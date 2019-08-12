import React from "react";
import "./App.css";
import LoginView from "./login-view";

/** component rendered on starting of app */
function App(props) {
  return <LoginView history={props.history}/>;
}

export default App;
