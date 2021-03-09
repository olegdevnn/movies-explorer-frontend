import React from 'react';

import './Button.css';
import PropTypes from 'prop-types';

const Button = ({
  children, button, ariaLabel, isActive,
}) => (
  <button
    type={button ? 'button' : 'submit'}
    className={`button ${!isActive ? 'button_disabled' : ''}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

Button.propTypes = {
  ariaLabel: PropTypes.string,
  button: PropTypes.bool,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  button: false,
  isActive: true,
  ariaLabel: '',
};

export default Button;
