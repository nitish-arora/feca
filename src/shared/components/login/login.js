import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./login.css";
import * as Constants from "./../../constants/login";

/**
 * Component to display login form with submit functionality and validation
 *
 * ---js----
 *
 * meta: is an object how the form is setup
 * onSubmit: is called when submit is triggered
 * onValueChange: is called when input field value is being changed
 *
 * meta: {
 *  usernameLabel: "USERNAME", //string
 *  passwordLabel: "PASSWORD", //string
 *  loginBtnLabel: "LOGIN", //string
 *  error: true | false, //boolean
 *  errorMessage: "INCORRECT_EMAIL_OR_PASSWORD" //string
 * }
 *
 * handleSubmit(credentials) {
 *  // do stuff with login credentials
 * }
 *
 * handleValueChange() {
 *  // do stuff with login form input value changes
 * }
 *
 * --- html ---
 *
 * <Login meta={meta} onSubmit={event => handleSubmit(event)} onValueChanges={() => handleValueChange()} />
 */

class Login extends React.Component {
  constructor(props) {
    super(props);

    /** default states of login form fields */
    this.state = {
      username: "",
      password: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** fired off every time the user enters something into the input fields */
  onFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.onValueChanges();
  }

  /** fired off when user submit the forms */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const { meta } = this.props;
    return (
      <div className="ne-s-login-form-container">
        <div className="ne-s-login-form">
          <div className="ne-s-login-form-toolbar">
            <h2>
              <span>{Constants.LOGIN_TITLE}</span>
            </h2>
          </div>
          <form
            className="ne-s-login-form"
            id="ne-s-login-form"
            onSubmit={this.handleSubmit}
          >
            <div className="form-field">
              <TextField
                id="user-input"
                name="username"
                value={this.state.username}
                onChange={this.onFieldChange}
                label={
                  meta["usernameLabel"] && !!meta["usernameLabel"] //checking property exist in meta and it is not empty
                    ? meta["usernameLabel"]
                    : Constants.USERNAME
                }
                margin="normal"
              />
            </div>
            <div className="form-field">
              <TextField
                id="password-input"
                type="password"
                name="password"
                value={this.state.password}
                label={
                  meta["passwordLabel"] && !!meta["passwordLabel"]
                    ? meta["passwordLabel"]
                    : Constants.PASSWORD
                }
                onChange={this.onFieldChange}
                margin="normal"
              />
            </div>
          </form>
          <Button
            variant="contained"
            type="submit"
            id="submit-button"
            form="ne-s-login-form"
            className={
              this.state.username.trim() !== "" && this.state.password !== ""
                ? "not-disabled"
                : "disabled"
            }
            disabled={
              this.state.username.trim() === "" || this.state.password === ""
            }
          >
            {meta["loginBtnLabel"] && !!meta["loginBtnLabel"]
              ? meta.loginBtnLabel
              : Constants.LOGIN}
          </Button>

          {meta.error && (
            <div className="error" id="login-error">
              {meta.errorMessage || Constants.INCORRECT_EMAIL_OR_PASSWORD}
            </div>
          )}
        </div>
      </div>
    );
  }
}

/** setting validations on props received from parent component */
Login.propTypes = {
  meta: PropTypes.shape({
    usernameLabel: PropTypes.string,
    passwordLabel: PropTypes.string,
    loginBtnLabel: PropTypes.string,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }),
  onValueChanges: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Login;
