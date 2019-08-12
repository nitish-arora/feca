import * as Api from './../constants/api';

class HttpHelper {
  /** performs api call with required headers */
  fetch = (url, options, isLoggedIn, token) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // setting authorization header ( Authorization: Bearer xxxxx.xxxxx.xxxx )
    if (isLoggedIn) {
      headers["Authorization"] = "Bearer " + token;
    }

    return fetch(`${Api.DOMAIN}${url}`, {
      headers,
      ...options
    })
      .then(this.checkStatus)
      .then(response => response.json());
  };

  /** checking response status */
  checkStatus = response => {
    if (
      (response.status >= 200 && response.status < 300) ||
      response.status === 401
    ) {
      // returning response intact in case of status between 200 &  300 and for status 401
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}

export default HttpHelper;
