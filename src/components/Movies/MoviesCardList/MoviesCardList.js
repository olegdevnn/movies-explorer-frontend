import './MoviesCardList.css';
import React from 'react';

import PropTypes from 'prop-types';

import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ isSaved, movies, onMovieSave }) => (
  <ul className="movies-card-list">
    {movies.map((item) => (
      <MoviesCard
        key={item.id}
        movie={item}
        onMovieSave={onMovieSave}
        isSaved={isSaved}
      />
    ))}
  </ul>
);

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMovieSave: PropTypes.func.isRequired,
  isSaved: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  isSaved: false,
};

export default MoviesCardList;
