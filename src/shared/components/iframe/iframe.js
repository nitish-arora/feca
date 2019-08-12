import React from "react";
import PropTypes from "prop-types";
/**
 * Component to display src in a iframe
 *
 * src: link to open in iframe
 * height: height of iframe
 * width: width of iframe
 *
 * ---js----
 *
 * src: 'url',
 * width: '100%',
 * height: '80%'
 *
 * --- html ---
 *
 * <IFrame src={src} height={height} width={width} />
 */

class IFrame extends React.Component {
  render() {
    const { src, width, height } = this.props;
    return (
      <iframe
        title="sidenav-outlet"
        src={src}
        width={width ? width : "100%"}
        height={height ? height : "100%"}
        frameBorder="0"
      />
    );
  }
}

/** setting validations on props received from parent component */
IFrame.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
};

export default IFrame;
