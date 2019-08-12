import React from "react";
import PropTypes from "prop-types";

import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountBox from "@material-ui/icons/AccountBox";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import "./profile.css";
import * as Constants from "./../../constants/profile";

/**
 * Component to display the current user's profile.
 *
 * user: the user to display
 * onLogout: emits on logout
 *
 * ---js---
 * user: {
 *  username: 'USER_NAME',
 *  role: 'ROLE'
 * }
 *
 * handleLogout() {
 *  // handle logout
 * }
 *
 * ---html---
 * <Profile user={user} onLogout={() => handleLogout()} />
 */

//themeing the material ui components
const useStyles = makeStyles(theme =>
  createStyles({
    icon: {
      margin: theme.spacing(1),
      fontSize: 18
    }
  })
);

function Profile(props) {
  const classes = useStyles();
  return (
    <div className="ne-s-profile-container">
      <div className="profile-toolbar">
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={Constants.ACCOUNT}
        >
          <div className="account-logo">
            <AccountBox className={classes.icon} />
          </div>
        </Tooltip>
        <div className="ne-s-text-name">{`${props.user.username}`}</div>
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={Constants.LOGOUT}
        >
          <div className="ne-s-logout-btn" onClick={props.onLogout}>
            <ExitToApp className={classes.icon} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

/** setting validations on props received from parent component */
Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    role: PropTypes.string
  }),
  onLogout: PropTypes.func
};

export default Profile;
