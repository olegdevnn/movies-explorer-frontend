import './Header.css';
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import {
  HOME_LINK, PROJECT_NAME,
  SING_IN_LINK,
  SING_UP_LINK,
} from '../../../utils/config';
import Logo from '../Logo/Logo';
import Navigation from './Navigation/Navigation';

const Header = ({ loggedIn }) => {
  const { pathname } = useLocation();
  const [isMenu, setIsMenu] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);

  const isMenuHandle = () => {
    setIsMenu(!isMenu);
  };

  useEffect(() => {
    setIsMenu(false);
    setIsMainPage(pathname === '/');
  }, [pathname]);

  return (
    <header className={`header ${isMainPage ? 'header_theme_blue' : ''}`}>
      <Logo
        link={!isMainPage ? HOME_LINK : ''}
        name={PROJECT_NAME}
      />
      {!loggedIn && (
        <nav className="header__menu">
          <Link
            className="header__link header__link-signup"
            to={SING_UP_LINK}
          >
            Регистрация
          </Link>
          <Link
            className="header__link header__link-signin"
            to={SING_IN_LINK}
          >
            Войти
          </Link>
        </nav>
      )}
      {loggedIn && <div className={` ${isMenu ? 'header__menu-container' : ''}`} />}
      {loggedIn && (
        <Navigation
          isMenu={isMenu}
          isMainPage={isMainPage}
        />
      )}
      {loggedIn && (
        <button
          type="button"
          className={`header__button-menu
            ${isMainPage ? 'header__button-menu_main-page' : ''}
            ${isMenu ? 'header__button-menu-close' : ''}
        `}
          onClick={isMenuHandle}
          aria-label={!isMenu ? 'Открыть меню' : 'Закрыть меню'}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
