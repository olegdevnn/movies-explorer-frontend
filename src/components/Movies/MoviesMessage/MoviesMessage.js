import './MoviesMessage.css';
import React from 'react';

import PropTypes from 'prop-types';

const MoviesMessage = ({ message }) => (
  <section className="movies-message">
    <h2 className="movies-message__title">{message}</h2>
  </section>
);
MoviesMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MoviesMessage;
