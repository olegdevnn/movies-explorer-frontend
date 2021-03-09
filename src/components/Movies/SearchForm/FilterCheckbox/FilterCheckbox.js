import './FilterCheckbox.css';
import React from 'react';

const FilterCheckbox = () => (
  <label
    htmlFor="short-film"
    className="filter-checkbox"
  >
    <input
      type="checkbox"
      className="filter-checkbox__input"
      id="short-film"
    />
    <span className="filter-checkbox__text">Короткометражки</span>
  </label>
);

export default FilterCheckbox;
