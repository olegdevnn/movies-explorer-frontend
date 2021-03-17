import './MoviesCard.css';
import React from 'react';

import PropTypes from 'prop-types';

const MoviesCard = ({
  movie: {
    saved, id, url, image, name, alt, duration, durationName,
  },
  onMovieSave,
  isSaved,
}) => {
  const handleClick = () => {
    onMovieSave({ id });
  };

  return (
    <li className="movies__item">
      <h2 className="movies__title">{name}</h2>
      <time dateTime={duration} className="movies__duration">{durationName}</time>
      <button
        type="button"
        aria-label={!saved ? 'Сохранить фильм' : 'Удалить из сохраненных'}
        className={`movies__button-favorite
             ${!isSaved && saved ? 'movies__button-favorite_saved' : ''} 
             ${isSaved ? 'movies__button-favorite_delete' : ''}
            `}
        onClick={handleClick}
      />
      <a
        href={url}
        className="movies__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={image.urlFull}
          alt={alt}
          className="movies__image"
        />
      </a>
    </li>
  );
};

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    image: PropTypes.shape({
      urlFull: PropTypes.string,
    }),
    name: PropTypes.string,
    alt: PropTypes.string,
    duration: PropTypes.number,
    durationName: PropTypes.string,
    saved: PropTypes.bool,
  }),
  onMovieSave: PropTypes.func.isRequired,
  isSaved: PropTypes.bool,
};

MoviesCard.defaultProps = {
  movie: {
    url: '',
    image: {
      urlFull: '',
    },
    nameRU: '',
    alt: '',
    duration: 0,
    durationName: '',
    saved: false,
  },
  isSaved: false,
};

export default MoviesCard;
