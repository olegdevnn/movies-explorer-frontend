import React from 'react';

import './Text.css';

import PropTypes from 'prop-types';

const Text = ({ children }) => <p className="text">{children}</p>;

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Text;
