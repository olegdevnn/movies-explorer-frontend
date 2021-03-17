import './SearchForm.css';
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onSearch, queryFilters }) => {
  const [query, setQuery] = useState('');
  const [shortFilms, setShortFilms] = useState(false);

  useEffect(() => {
    setQuery(queryFilters.query);
    setShortFilms(queryFilters.shortFilms);
  }, [queryFilters]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.closest('form').checkValidity()) {
      onSearch({
        query,
        shortFilms,
      });
    }
  };

  const handleChange = (e) => {
    e.target.setCustomValidity('');
    setQuery(e.target.value);
  };

  const handleShortFilmsClick = ({ checked }) => {
    setShortFilms(checked);
    onSearch({
      query,
      shortFilms: checked,
    });
  };

  const handleFocus = (e) => {
    if (query.length === 0) {
      e.target.setCustomValidity('Нужно ввести ключевое слово');
    }
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
            onFocus={handleFocus}
            onChange={handleChange}
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
          onChange={handleShortFilmsClick}
        />
      </form>
      <hr className="search-form__hr" />
    </section>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  queryFilters: PropTypes.shape({
    query: PropTypes.string,
    shortFilms: PropTypes.bool,
  }),
};

SearchForm.defaultProps = {
  queryFilters: {
    query: '',
    shortFilms: false,
  },
};

export default SearchForm;
