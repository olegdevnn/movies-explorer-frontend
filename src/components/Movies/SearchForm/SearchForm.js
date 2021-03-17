import './SearchForm.css';
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [shortFilms, setShortFilms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.closest('form').checkValidity()) {
      onSearch({
        query,
        shortFilms,
      });
    }
  };

  const handleChange = (e) => setQuery(e.target.value);
  const handleClick = ({ checked }) => {
    setShortFilms((prevState) => {
      onSearch({
        query,
        shortFilms: !prevState,
      });

      return checked;
    });
  };

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search">
          <input
            type="text"
            id="search"
            className="search-form__input"
            placeholder="Фильм"
            minLength="1"
            maxLength="100"
            value={query}
            onFocus={(e) => {
              if (query.length === 0) {
                e.target.setCustomValidity('Нужно ввести ключевое слово');
              }
            }}
            onChange={(e) => {
              e.target.setCustomValidity('');
              handleChange(e);
            }}
            size="1"
            required
          />
          <button
            type="submit"
            className="search-form__button"
          >
            Найти
          </button>
        </div>
        <FilterCheckbox
          onChange={handleClick}
        />
      </form>
      <hr className="search-form__hr" />
    </section>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
