import './Promo.css';
import React from 'react';

import globe from '../../../images/globe.svg';

const Promo = () => (
  <section className="promo">
    <img src={globe} className="promo__main-illustration" alt="Глобус из тегов" />
    <div className="promo__info">
      <h1 className="promo__title">
        Учебный проект студента факультета
        {' '}
        <span className="promo__together">Веб-разработки</span>
        .
      </h1>
      <p className="promo__description">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
    </div>
    <a href="#aboutProject" className="promo__link">Узнать больше</a>
  </section>
);

export default Promo;
