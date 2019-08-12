import React from "react";
import { withRouter } from "react-router-dom";
import Profile from "./../../shared/components/profile";
import IFrame from "./../../shared/components/iframe";
import SideNav from "./../../shared/components/sidenav";

import Home from "@material-ui/icons/Home";
import TrendingUp from "@material-ui/icons/TrendingUp";

import "./dashboard.css";
import AuthHelper from "./../../utils/AuthHelper";

/** array of links to be passed in sidenav component in order to display the options of sidenav*/
const links = [
  {
    header: "Home",
    link: "",
    icon: <Home />
  },
  {
    header: "Mosh Programming",
    link: "https://programmingwithmosh.com/",
    icon: <TrendingUp />
  },
  {
    header: "Cas",
    link: "https://cas.netent.com/cas/view",
    icon: <TrendingUp />
  },
  {
    header: "mcm",
    link:
      "http://mcm-mcm-test.sta-openshift-app.nix.cydmodule.com/mcm/view/casino-properties",
    icon: <TrendingUp />
  }
];

/** Component to be displayed on successfull login */
class Dashboard extends React.Component {
  /** Instantiate the AuthHelper Class in order to utilize authentication methods */
  Auth = new AuthHelper();
  constructor(props) {
    super(props);
    this.state = {
      src: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSidenavClick = this.handleSidenavClick.bind(this);
  }

  /** event emitted from sidenav for handling logout functionality */
  handleLogout = () => {
    this.Auth.logout().then(() => {
      this.props.history.push("/logout");
    });
  };

  /** event emitted from sidenav for handling the clicking on sidenav options */
  handleSidenavClick(link) {
    this.setState({ src: link }); //setting the link for iframe
  }

  render() {
    const user = this.Auth.getParsedToken();
    return (
      <div className="ne-s-main-container">
        <SideNav
          links={links}
          onSidenavClick={link => this.handleSidenavClick(link)}
          src="/netent-logotype.svg"
        />
        <div className="ne-s-sidenav-target-container">
          <div className="ne-s-target-toolbar">
            {user.username ? (
              <Profile user={user} onLogout={() => this.handleLogout()} />
            ) : null}
          </div>
          <div className="ne-s-sidenav-outlet">
            {this.state.src ? (
              <IFrame src={this.state.src} />
            ) : (
              <div className="home-title">Home</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
