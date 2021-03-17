import React from 'react';

import PropTypes from 'prop-types';

import MoviesMessage from './MoviesMessage/MoviesMessage';
import SearchForm from './SearchForm/SearchForm';

const MoviesError = ({
  onSearch,
}) => (
  <main className="movies">
    <SearchForm
      onSearch={onSearch}
    />
    <MoviesMessage message={`
        Во время запроса произошла ошибка.\n
        Возможно, проблема с соединением или сервер недоступен.\n
        Подождите немного и попробуйте ещё раз.`}
    />
  </main>
);

MoviesError.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MoviesError;
