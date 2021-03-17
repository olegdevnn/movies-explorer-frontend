import React from 'react';

import './Input.css';

import PropTypes from 'prop-types';

const Input = ({
  id, title, type, value, placeholder,
  errorMessage, required, pattern, name,
  minLength, maxLength, onChange, onFocus,
  disabled,
}) => (
  <label
    htmlFor={id}
    className="input"
  >
    {title}
    <input
      type={type}
      name={name}
      className={`input__input ${errorMessage ? 'input__input_error' : ''}`}
      id={id}
      pattern={pattern || null}
      value={value}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      size="2"
    />
    {errorMessage && <span className="input__error">{errorMessage}</span> }
  </label>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  errorMessage: '',
  pattern: null,
  required: false,
  type: 'text',
  minLength: 2,
  maxLength: 30,
  onFocus: null,
  disabled: false,
};

export default Input;
