import React from "react";
import AuthHelper from "./AuthHelper";

const withAuth = (AuthComponent) => {
    const Auth = new AuthHelper();

    return class AuthWrapped extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                userData: null,
                loaded: false
            };
        }

        componentDidMount() {
            if (!Auth.isLoggedIn()) {
                this.props.history.replace("/");
            } else {
                try {
                    const userData = Auth.getParsedToken();
                    this.setState({
                        userData: userData,
                        loaded: true
                    })
                } catch (err) {
                    console.log(err);
                    Auth.logout().then(() => {
                        this.props.histroy.replace("/");
                    });
                }
            }
        }

        render() {
            if (this.state.loaded === true) {
                if (this.state.userData) {
                    return (
                        <AuthComponent history={this.props.history} userData={this.state.userData} />
                    )
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }
}

export default withAuth;