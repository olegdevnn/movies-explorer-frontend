import './FilterCheckbox.css';
import React from 'react';

import PropTypes from 'prop-types';

const FilterCheckbox = ({ onChange }) => {
  const handleChange = (e) => {
    const { checked } = e.target;
    onChange({ checked });
  };

  return (
    <label
      htmlFor="short-film"
      className="filter-checkbox"
    >
      <input
        type="checkbox"
        className="filter-checkbox__input"
        id="short-film"
        value="1"
        onChange={handleChange}
      />
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
};

FilterCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FilterCheckbox;
