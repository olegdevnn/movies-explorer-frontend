import './MoviesNotFound.css';
import React from 'react';

import * as PropTypes from 'prop-types';

const MoviesNotFound = ({ message }) => (
  <section className="movies-not-found">
    <h2 className="movies-not-found__title">{message}</h2>
  </section>
);
MoviesNotFound.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MoviesNotFound;
