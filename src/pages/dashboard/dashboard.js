import React from "react";
import { withRouter } from "react-router-dom";
import Profile from "./../../shared/components/profile";
import IFrame from "./../../shared/components/iframe";
import SideNav from "./../../shared/components/sidenav";

import Home from "@material-ui/icons/Home";
import TrendingUp from "@material-ui/icons/TrendingUp";

import "./dashboard.css";
import AuthHelper from "./../../utils/AuthHelper";
import withAuth from "./../../utils/withAuth";

/** array of links to be passed in sidenav component in order to display the options of sidenav*/
const links = [
  {
    header: "Home",
    link: "",
    icon: <Home />,
    containsLogin: false,
  },
  {
    header: "Mosh Programming",
    link: "https://programmingwithmosh.com/",
    icon: <TrendingUp />,
    containsLogin: false,
  },
  {
    header: "Cas",
    link: "https://cas.netent.com/cas/view",
    icon: <TrendingUp />,
    containsLogin: false,
  },
  {
    header: "mcm",
    link: "http://mcm-mcm-common-ui-test.sta-openshift-app.nix.cydmodule.com/mcm/view/casino-properties",
    icon: <TrendingUp />,
    containsLogin: true,
  }
];

/** Component to be displayed on successfull login */
class Dashboard extends React.Component {
  /** Instantiate the AuthHelper Class in order to utilize authentication methods */
  Auth = new AuthHelper();
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      containsLogin: false,
      eventType: null,
      selectedSideNavData: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSidenavClick = this.handleSidenavClick.bind(this);
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("message", this.iframeListener);
  }

  iframeListener = (event) => {
    // const { selectedSideNavData } = this.state;
    const domains = ["https://nitish-arora.github.io", "http://mcm-mcm-common-ui-test.sta-openshift-app.nix.cydmodule.com"];
    if (!domains.includes(event.origin)) return;
    const { isChildLoaded, isStorageDeleted } = event.data;
    const { eventType } = this.state;
    if (isChildLoaded) {
      this.postMessageToIFrame({
        action: "save",
        key: "token",
        value: localStorage.getItem("id_token"),
      });
    } else if (isStorageDeleted && eventType === "logout") {
      this.props.history.push("/logout");
    }
    /** ---- TBD ---- */
    // else if (isStorageDeleted && eventType === "tab") {
    //   this.setState({ src: selectedSideNavData.link, containsLogin: selectedSideNavData.containsLogin });
    // }
    /** !---- TBD ---- */
  }

  /** listener for data sent by url opened in iframe */

  /** event emitted from sidenav for handling logout functionality */
  handleLogout = () => {
    this.setState({ eventType: "logout" });
    this.Auth.logout().then(() => {
      if (this.state.containsLogin) {
        this.postMessageToIFrame({
          action: "delete",
          key: "token",
        });
      } else {
        this.props.history.push("/logout");
      }
    });
  };

  /** post the message to the url opened in iframe */
  postMessageToIFrame = ({ action, key, value }) => {
    const iframeRef = this.iframeRef.current;
    if (iframeRef) {
      iframeRef.contentWindow.postMessage({
        action: action,
        key: key,
        value: value,
      }, "*");
    }
  }

  /** event emitted from sidenav for handling the clicking on sidenav options */
  handleSidenavClick(selectedOption) {
    /** ---- TBD ---- */

    // this.setState({ eventType: "tab", selectedSideNavData: selectedOption });
    // if (!this.state.containsLogin) {
    //   this.setState({ src: selectedOption.link, containsLogin: selectedOption.containsLogin }); //setting the link for iframe
    //   return;
    // }
    // this.postMessageToIFrame({
    //   action: "delete",
    //   key: "token",
    // });

    /** !---- TBD ---- */

    this.setState({ src: selectedOption.link, containsLogin: selectedOption.containsLogin }); //setting the link for iframe
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.iframeListener);
  }

  render() {
    const { userData: user } = this.props;
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
              <IFrame ref={this.iframeRef} src={this.state.src} className={this.state.containsLogin ? 'contains-login' : ""} />
            ) : (
                <div className="home-title">Home</div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(withRouter(Dashboard));
