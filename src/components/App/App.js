import './App.css';
import React from 'react';

import { Route, Switch } from 'react-router';

import {
  HOME_LINK,
  MOVIES_LINK,
  PROFILE_LINK,
  SAVED_MOVIES_LINK,
  SING_IN_LINK,
  SING_UP_LINK,
  LOGOUT_LINK,
} from '../../utils/config';
import Auth from '../Auth/Auth';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Error404 from '../Error404/Error404';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Parts/Footer/Footer';
import Header from '../Parts/Header/Header';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="App">
      <Route strict path="/(|movies|saved-movies|profile)">
        <Header />
      </Route>
      <Switch>
        <Route exact strict path={SING_IN_LINK}>
          <Auth
            title="Рады видеть!"
            homeLink={HOME_LINK}
          >
            <Login
              actionLink={MOVIES_LINK}
              registerLink={SING_UP_LINK}
            />
          </Auth>
        </Route>
        <Route exact strict path={SING_UP_LINK}>
          <Auth
            title="Добро пожаловать!"
            homeLink={HOME_LINK}
          >
            <Register
              actionLink={SING_IN_LINK}
              loginLink={SING_IN_LINK}
            />
          </Auth>
        </Route>
        <Route
          exact
          path={HOME_LINK}
        >
          <Main />
        </Route>
        <Route
          exact
          strict
          path={MOVIES_LINK}
        >
          <Movies />
        </Route>
        <Route
          exact
          strict
          path={SAVED_MOVIES_LINK}
        >
          <Movies
            saved
          />
        </Route>
        <Route
          exact
          strict
          path={PROFILE_LINK}
        >
          <Profile
            actionLink={MOVIES_LINK}
            logoutLink={LOGOUT_LINK}
          />
        </Route>
        <Error404
          linkBack={HOME_LINK}
        />
      </Switch>
      <Route exact strict path="/(|movies|saved-movies)">
        <Footer />
      </Route>
    </div>
  );
}

export default App;
