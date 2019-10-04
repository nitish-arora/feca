import React from "react";
import PropTypes from "prop-types";
import "./sidenav.css";
import Menu from "@material-ui/icons/Menu";
import classNames from "classnames";

/**
 * Component for creating sidenav
 *
 * links: array that provide the links of side-navigation
 * onSidenavClick: event emitted on clicking of options in side nav
 *
 * ---js---
 * links: [
 *  {
 *      header: 'HEADER_TEXT'
 *      link: 'URL_TO_OPEN'
 *      icon: 'REACT_COMPONENT_OF_ICON',
 *      containsLogin: true | false //boolean (specify whether selected option contains login functionality or not)
 *  }
 * ]
 *
 * ---html---
 * <SideNav links={links} onSidenavClick={link => handleSidenavClick(link)} />
 */

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      isSidenavOpened: true
    };
    this.sideNavRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  /** setting up first option as default selected option of sidenav */
  componentWillMount() {
    const { links } = this.props;
    this.setState({ selectedOption: links[0] });
    this.props.onSidenavClick(links[0]);
  }

  /** triggered on sidenav's option click */
  handleClick(link) {
    this.setState({ selectedOption: link });
    this.props.onSidenavClick(link);

  }

  hidesidenav(isSidenavOpened) {
    this.setState({
      isSidenavOpened: !isSidenavOpened
    });
    if(this.state.isSidenavOpened) {
      this.sideNavRef.current.style.width = "0";
    } else {
      this.sideNavRef.current.style.width = "250px";
    }
    this.props.onSidenavToggle(this.state.isSidenavOpened);
  }

  render() {
    const { links, src } = this.props;
    const { selectedOption } = this.state;
    const sidenavIconContainerClasses = classNames(
      'sidenav-toggle-container',
      {
        'sidenav-menu-icon-minimized': !this.state.isSidenavOpened
      }
    )
    return (
      <React.Fragment>
        <div className={sidenavIconContainerClasses}>
          <div
            className='sidenav-menu-icon'
            onClick={() => this.hidesidenav(this.state.isSidenavOpened)}
          >
            <Menu />
          </div>
        </div>
        <div ref={this.sideNavRef} className={"ne-s-sidenav-container"}>
          <div className="ne-s-menu-container">
            <div className={"ne-s-logotype-item"}>
              <img
                src={
                  src ||
                  "https://www.netent.com/en/wp-content/themes/netent_corp/assets/img/logotype/netent-logotype.svg"
                }
                alt=""
              />
            </div>
          </div>
          <div className={"ne-s-tree"}>
            {links.map((link, i) => (
              <div
                key={link.header}
                className={`menu-list ${
                  selectedOption.header === link.header ? "selected-sidenav" : ""
                  }`}
                onClick={() => this.handleClick(link)}
              >
                {link["icon"] ? (
                  <span className="nav-icon">{link.icon}</span>
                ) : null}
                <span className="text-header">{link.header}</span>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/** setting validations on props received from parent component */
SideNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.element // icon should be react component
    })
  ).isRequired,
  src: PropTypes.string,
  containsLogin: PropTypes.bool
};

export default SideNav;
