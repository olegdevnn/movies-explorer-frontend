import React from 'react';

import './Fieldset.css';

import PropTypes from 'prop-types';

const Fieldset = ({ children }) => <fieldset className="fieldset">{children}</fieldset>;

Fieldset.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Fieldset;
