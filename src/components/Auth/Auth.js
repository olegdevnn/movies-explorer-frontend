import React from 'react';

import './Auth.css';
import PropTypes from 'prop-types';

import { PROJECT_NAME } from '../../utils/config';
import Logo from '../Parts/Logo/Logo';

const Auth = ({ homeLink, children, title }) => (
  <main className="auth">
    <Logo
      link={homeLink}
      name={PROJECT_NAME}
    />
    <h2 className="auth__title">{title}</h2>
    {children}
  </main>
);

Auth.propTypes = {
  homeLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Auth;
