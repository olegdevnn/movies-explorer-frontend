import React from 'react';

import './Link.css';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';

const Link = ({
  to, name,
}) => <ReactLink to={to} className="link">{name}</ReactLink>;

Link.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Link;
