import React from "react";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";

import "./logout.css";
import * as Constants from "./../../constants/index";

/** Component to show the logout page with the button to go to login page  */
class Logout extends React.Component {
  render() {
    return (
      <div className="ne-s-logout-container">
        <div className="ne-s-logotype-item">
          <img
            className="ne-s-logotype-image"
            src="https://www.netent.com/en/wp-content/themes/netent_corp/assets/img/logotype/netent-logotype.svg"
            data-fallback="../../assets/icons/netent-logotype-fallback.png"
            alt=""
          />
        </div>
        <div className="ne-s-logout-page">
          <div className="ne-s-logout-toolbar">
            <h2>
              <span>{Constants.LOGOUT_TITLE}</span>
            </h2>
          </div>
          <h2>{Constants.LOGOUT_MESSAGE}</h2>
          <h3>{Constants.LOGOUT_SECOND_MESSAGE}</h3>
          <Button
            variant="contained"
            className="ne-s-netent-button"
            onClick={() => this.props.history.push("/")}
          >
            {Constants.LOGOUT_LOGIN_BUTTON}
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Logout);
