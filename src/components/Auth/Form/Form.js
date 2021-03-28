import React from 'react';

import './Form.css';

import PropTypes from 'prop-types';

const Form = ({ children, onSubmit }) => (
  <form
    className="form"
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Form;
