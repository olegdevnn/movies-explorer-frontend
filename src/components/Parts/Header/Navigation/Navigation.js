import './Navigation.css';
import React from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  PROFILE_LINK,
  SAVED_MOVIES_LINK,
  MOVIES_LINK,
  HOME_LINK,
} from '../../../../utils/config';

const Navigation = ({ isMenu }) => {
  const menu = [
    {
      name: 'Фильмы',
      link: MOVIES_LINK,
    },
    {
      name: 'Сохранённые фильмы',
      link: SAVED_MOVIES_LINK,
    },
  ];

  return (
    <nav className={`navigation ${isMenu ? 'navigation_active' : ''}`}>
      <div className="navigation__links">
        <NavLink
          key="main"
          to={HOME_LINK}
          className={`navigation__link ${!isMenu ? 'navigation__link_visible' : ''}`}
        >
          Главная
        </NavLink>
        {menu.map(({ link, name }) => (
          <NavLink
            key={link}
            to={link}
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            {name}
          </NavLink>
        ))}
      </div>
      <NavLink
        key="profile"
        to={PROFILE_LINK}
        className="navigation__link navigation__link-profile"
        activeClassName="navigation__link-profile_active"
      >
        Аккаунт
      </NavLink>
    </nav>
  );
};

Navigation.propTypes = {
  isMenu: PropTypes.bool.isRequired,
};

export default Navigation;
