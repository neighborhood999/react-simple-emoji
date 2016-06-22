import React, { PropTypes } from 'react';

const SelectorBox = ({ show, style, children }) => (
  <div id="showing" style={show ? style : { display: 'none' }}>
    {children}
  </div>
);

SelectorBox.propTypes = {
  show: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default SelectorBox;
