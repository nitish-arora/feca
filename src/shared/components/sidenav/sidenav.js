import React from "react";
import PropTypes from "prop-types";
import "./sidenav.css";

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
 *      icon: 'REACT_COMPONENT_OF_ICON'
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
      selectedOption: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /** setting up first option as default selected option of sidenav */
  componentWillMount() {
    const { links } = this.props;
    this.setState({ selectedOption: links[0] });
    this.props.onSidenavClick(links[0]["link"]);
  }

  /** triggered on sidenav's option click */
  handleClick(link) {
    this.setState({ selectedOption: link });
    this.props.onSidenavClick(link.link);
  }

  render() {
    const { links, src } = this.props;
    const { selectedOption } = this.state;
    return (
      <div className="ne-s-sidenav-container">
        <div className="ne-s-logotype-item">
          <img
            src={
              src ||
              "https://www.netent.com/en/wp-content/themes/netent_corp/assets/img/logotype/netent-logotype.svg"
            }
            alt=""
          />
        </div>
        <div className="ne-s-tree">
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
  src: PropTypes.string
};

export default SideNav;