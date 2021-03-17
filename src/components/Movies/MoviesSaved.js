import React from 'react';

import PropTypes from 'prop-types';

import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesError from './MoviesError';
import MoviesMessage from './MoviesMessage/MoviesMessage';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';

const MoviesSaved = ({
  movies, isLoading, onMovieSave, onSearch, errLoadingMovies,

}) => {
  if (errLoadingMovies) {
    return <MoviesError onSearch={onSearch} />;
  }

  return (
    <main className="movies">
      <SearchForm
        onSearch={onSearch}
      />
      {movies.length > 0
        && (
        <MoviesCardList
          movies={movies}
          isSaved
          onMovieSave={onMovieSave}
        />
        )}
      {isLoading && <Preloader />}

      {movies.length === 0 && !isLoading
        && <MoviesMessage message="Фильмы не сохранены" />}
    </main>
  );
};

MoviesSaved.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  errLoadingMovies: PropTypes.bool.isRequired,
  onMovieSave: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MoviesSaved;
