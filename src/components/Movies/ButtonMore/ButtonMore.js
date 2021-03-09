import './ButtonMore.css';
import React from 'react';

import PropTypes from 'prop-types';

const ButtonMore = ({ children, onClick, arialLabel }) => (
  <section className="button-more">
    <button
      type="button"
      className="button-more__button"
      onClick={onClick}
      aria-label={arialLabel}
    >
      {children}
    </button>
  </section>
);

ButtonMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  arialLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ButtonMore;
