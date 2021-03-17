import React from 'react';

import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, isVerifyAuth, loggedIn, redirectLink, ...props
}) => {
  if (!isVerifyAuth) {
    return null;
  }

  return (
    <Route>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      { loggedIn ? <Component {...props} /> : <Redirect to={redirectLink} from="/" />}
    </Route>
  );
};

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isVerifyAuth: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  redirectLink: PropTypes.string.isRequired,
};

export default ProtectedRoute;
