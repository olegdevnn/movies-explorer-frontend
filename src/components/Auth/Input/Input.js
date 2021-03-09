import React, { useState } from 'react';

import './Input.css';
import PropTypes from 'prop-types';

const Input = ({
  id, title, type, value: defaultValue, placeholder, isError, required,
  minLength, maxLength,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e) => setValue(e.target.value);

  return (
    <label
      htmlFor={id}
      className="input"
    >
      {title}
      <input
        type={type}
        className={`input__input ${isError ? 'input__input_error' : ''}`}
        id={id}
        pattern={type === 'email' ? '.+@.+\\.[a-z]{2,}$' : null}
        value={value}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        size="2"
      />
      { isError && <span className="input__error">Что-то пошло не так...</span> }
    </label>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  isError: false,
  required: false,
  type: 'text',
  minLength: 2,
  maxLength: 30,
};

export default Input;
