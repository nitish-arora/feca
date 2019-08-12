import React from "react";

import Login from "../../shared/components/login";
import * as Constants from "./../../constants/login-view";
import AuthHelper from "./../../utils/AuthHelper";
import "./login-view.css";

/** Container component for login form */
class LoginView extends React.Component {
  /** Instantiate the AuthHelper Class in order to utilize authentication methods */
  Auth = new AuthHelper();
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  /** event emitted from login component for handling submission of form */
  handleSubmit(user) {
    this.Auth.login(user)
      .then(res => {
        if (res["error"]) {
          this.setState({
            error: true,
            errorMessage: Constants[res.code]
          });
        } else {
          this.setState({ error: false });
          this.props.history.push("/dashboard");
        }
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: Constants["ERR_UNKNOWN_MESSAGE"]
        });
      });
  }

  /** event emitted from login component for setting error to be false when user change text values */
  handleValueChange() {
    this.setState({ error: false });
  }

  /** redirect user to home page who is already logged in */
  componentWillMount() {
    if (this.Auth.isLoggedIn()) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="ne-s-login-component-container">
        <div className="ne-s-logotype-item">
          <img
            className="ne-s-logotype-image"
            src="/netent-logotype.svg"
            data-fallback="/netent-logotype.svg"
            alt=""
          />
        </div>
        <Login
          meta={this.state}
          onSubmit={user => this.handleSubmit(user)}
          onValueChanges={() => this.handleValueChange()}
        />
      </div>
    );
  }
}

export default LoginView;
