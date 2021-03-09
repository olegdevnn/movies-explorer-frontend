import './Error404.css';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Error404 = ({ linkBack }) => (
  <main className="error404">
    <div className="error404__info">
      <h2 className="error404__title">404</h2>
      <p className="error404__description">Страница не найдена</p>
    </div>
    <Link to={linkBack} className="error404__link-back">Назад</Link>
  </main>
);

Error404.propTypes = {
  linkBack: PropTypes.string.isRequired,
};

export default Error404;
