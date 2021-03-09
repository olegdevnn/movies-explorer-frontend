import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import image from '../../images/demo-movie.png';
import ButtonMore from './ButtonMore/ButtonMore';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesNotFound from './MoviesNotFound/MoviesNotFound';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';

const Movies = ({ saved }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const data = {
      saved,
      url: 'http://youtube.com',
      image,
      title: '33 слова о дизайне - 33 слова о дизайне',
      alt: '33 слова о дизайне',
      duration: '1h 47m',
    };

    const moviesArray = [];
    for (let i = 1; i <= 12; i += 1) {
      moviesArray.push({ ...data, id: i });
    }
    setMovies(moviesArray);
  }, [saved]);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        movies={movies}
      />
      {isLoading && <Preloader />}
      <ButtonMore
        onClick={handleClick}
        arialLabel="Показать больше фильмов"
      >
        Еще
      </ButtonMore>
      {movies.length === 0
        && <MoviesNotFound message={!saved ? 'Фильмов не найдено' : 'Фильмы не сохранены'} />}
    </main>
  );
};

Movies.propTypes = {
  saved: PropTypes.bool,
};

Movies.defaultProps = {
  saved: false,
};

export default Movies;
