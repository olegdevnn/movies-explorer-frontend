import React from 'react';

import './Error.css';

import PropTypes from 'prop-types';

const Error = ({ children }) => <p className="error">{children}</p>;

Error.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Error;
