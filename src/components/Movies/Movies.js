import React from 'react';

import PropTypes from 'prop-types';

import ButtonMore from './ButtonMore/ButtonMore';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesError from './MoviesError';
import MoviesMessage from './MoviesMessage/MoviesMessage';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';

const Movies = ({
  movies, isLoading, moreMovies, onMovieSave, onSearch,
  moviesFiltered, errLoadingMovies, isMoviesFiltered,
}) => {
  if (errLoadingMovies) {
    return <MoviesError onSearch={onSearch} />;
  }

  if (!isMoviesFiltered) {
    return (
      <main className="movies">
        <SearchForm
          onSearch={onSearch}
        />
        {isLoading && <Preloader />}
        {!isLoading && <MoviesMessage message="Начните искать фильмы" />}
      </main>
    );
  }

  return (
    <main className="movies">
      <SearchForm
        onSearch={onSearch}
      />
      {(movies.length > 0) && (
        <MoviesCardList
          movies={movies}
          onMovieSave={onMovieSave}
        />
      )}
      {isLoading && <Preloader />}

      {moviesFiltered.length > movies.length && !isLoading
        && (
        <ButtonMore
          onClick={moreMovies}
          arialLabel="Показать больше фильмов"
        >
          Еще
        </ButtonMore>
        )}
      {movies.length === 0 && !isLoading
        && <MoviesMessage message="Ничего не найдено" />}
    </main>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  moreMovies: PropTypes.func.isRequired,
  isMoviesFiltered: PropTypes.bool.isRequired,
  errLoadingMovies: PropTypes.bool.isRequired,
  onMovieSave: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesFiltered: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
