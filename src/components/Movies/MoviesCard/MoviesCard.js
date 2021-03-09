import './MoviesCard.css';
import React from 'react';

import PropTypes from 'prop-types';

const MoviesCard = ({
  movie: {
    saved, url, image, title, alt, duration,
  },
}) => (
  <li className="movies__item">
    <h2 className="movies__title">{title}</h2>
    <time dateTime={duration} className="movies__duration">{duration}</time>
    <button
      type="button"
      aria-label={!saved ? 'Сохранить фильм' : 'Удалить из сохраненных'}
      className={`movies__button-favorite 
            ${saved ? 'movies__button-favorite_delete' : ''}
            `}
    />
    <a
      href={url}
      className="movies__link"
      target="youtube"
    >
      <img
        src={image}
        alt={alt}
        className="movies__image"
      />
    </a>
  </li>
);

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    saved: PropTypes.bool,
  }).isRequired,
};

export default MoviesCard;
