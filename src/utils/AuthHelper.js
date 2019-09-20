import decode from "jwt-decode";
import HttpHelper from "./HttpHelper";
import * as Api from "./../constants/api";

/** class providing methods for authentication purpose */
class AuthHelper {
  Http = new HttpHelper(); // instantiate HttpHelper class in order to use http related functionality

  /** getting the token from api server using fetch api */
  login = user => {
    const isLoggedIn = this.isLoggedIn();
    const token = this.getToken();
    return this.Http.fetch(
      `${Api.LOGIN}`,
      {
        method: "POST",
        body: JSON.stringify(user)
      },
      isLoggedIn,
      token
    ).then(res => {
      if (res["token"]) {
        this.setToken(res.token);
      }
      return Promise.resolve(res);
    });
  };

  /** checking if there is saved token and it's still valid */
  isLoggedIn = () => {
    const token = this.getToken();
    return !!token && !!this.isTokenExpired(token);
  };

  /** checking if token is expired */
  isTokenExpired = token => {
    try {
      const jwtExp = decode(token).exp;
      const exp = new Date(0);
      exp.setUTCSeconds(jwtExp);
      if (exp < Date.now()) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  /** saves user token to localstorage */
  setToken = idToken => {
    localStorage.setItem("id_token", idToken);
  };

  /** retrieves user token from local storage */
  getToken = () => {
    return localStorage.getItem("id_token");
  };

  /** clear user token from localstorage */
  logout = () => {
    localStorage.removeItem("id_token");
    return Promise.resolve();
  };

  /** decoding the token using jwt-decode package */
  getParsedToken = () => {
    let { sub: username, auth } = decode(this.getToken());
    let role = auth[0].role;
    return { username, role };
  };
}

export default AuthHelper;
