import './Footer.css';
import React from 'react';

import PropTypes from 'prop-types';

const Footer = ({ menu }) => (
  <footer className="footer">
    <p className="footer__title">
      Учебный проект Яндекс.Практикум х BeatFilm.
    </p>
    <div className="footer__columns">
      <div className="footer__column">
        <p className="footer__copyright">
          &copy;
          {' '}
          {new Date().getFullYear()}
        </p>
      </div>
      <div className="footer__column">
        <nav>
          <ul className="footer__column-links">
            {menu.map(({ link, name }) => (
              <li
                className="footer__column-item"
                key={link}
              >
                <a
                  className="footer__column-link"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Footer;
