import './Portfolio.css';
import React from 'react';

const Portfolio = () => (
  <section className="portfolio">
    <p className="portfolio__title">Портфолио</p>
    <nav>
      <ul className="portfolio__sites">
        <li className="portfolio__site">
          <a href="/#" className="portfolio__site-link">Статичный сайт</a>
        </li>
        <li className="portfolio__site">
          <a href="/#" className="portfolio__site-link">Адаптивный сайт</a>
        </li>
        <li className="portfolio__site">
          <a href="/#" className="portfolio__site-link">Одностраничное приложение</a>
        </li>
      </ul>
    </nav>
  </section>
);

export default Portfolio;
