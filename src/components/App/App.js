import './App.css';
import React, { useEffect, useState, useCallback } from 'react';

import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  HOME_LINK,
  MOVIES_LINK,
  PROFILE_LINK,
  SAVED_MOVIES_LINK,
  SING_IN_LINK,
  SING_UP_LINK,
  LOGOUT_LINK,
  WINDOW_WIDTH_ONE_COLUMN_MOVIES,
  WINDOW_WIDTH_TWO_COLUMNS_MOVIES,
  SHORT_MOVIES_DURATION,
  HTTP_CODES,
  URL_IMAGES,
  TIMES_PRELOADER,
  SEED_DATA_TEXT,
  SEED_DATA_NUMBER,
  FOOTER_MENU,
} from '../../utils/config';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import { consoleDebug, getDurationText } from '../../utils/utils';
import Auth from '../Auth/Auth';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Error404 from '../Error404/Error404';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import MoviesSaved from '../Movies/MoviesSaved';
import Footer from '../Parts/Footer/Footer';
import Header from '../Parts/Header/Header';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute';

const { UNAUTHORIZED } = HTTP_CODES;

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [isMoviesFiltered, setIsMoviesFiltered] = useState(false);
  const [moviesSaved, setMoviesSaved] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyAuth, setIsVerifyAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isErrorApiMovies, setIsErrorApiMovies] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  const history = useHistory();
  const location = useLocation();

  const tokenCheck = useCallback(() => {
    try {
      MainApi
        .userMe()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(() => {
          setLoggedIn(false);
        });
    } catch (err) {
      setLoggedIn(false);
    } finally {
      setIsVerifyAuth(true);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([
        MainApi.userMe(),
        MoviesApi.getInitialMovies(),
        MainApi.getInitialMovies(),
      ])
        .then(([{ name, email }, items, savedItems]) => {
          setCurrentUser({
            name,
            email,
          });

          // todo: в брифе, нужно добавить данные в localstorage,
          //  но данные подгружаться с сервера по заданию
          localStorage.setItem('user', JSON.stringify({
            name,
            email,
          }));

          localStorage.setItem('movies', JSON.stringify(
            items.reduce((acc, i) => {
              if (!i.id || !i.image || !i.nameRU || !i.duration || !i.trailerLink) {
                return acc;
              }

              return [...acc, (Object.assign(i, {
                alt: i.nameRU.replace(/"/g, ''),
                name: i.nameRU,
                url: i.trailerLink,
                durationName: getDurationText(i.duration),
                image: {
                  urlFull: `${URL_IMAGES}${i.image.url}`,
                },
              }))];
            }, []),
          ));

          localStorage.setItem('moviesSaved', JSON.stringify(
            savedItems.reduce((acc, i) => {
              if (!i.movieId || !i.image || !i.nameRU || !i.duration || !i.trailer) {
                return acc;
              }

              return [...acc, (Object.assign(i, {
                alt: i.nameRU.replace(/"/g, ''),
                name: i.nameRU,
                id: i.movieId,
                url: i.trailer,
                durationName: getDurationText(i.duration),
                image: {
                  urlFull: i.image,
                },
              }))];
            }, []),
          ));

          setMoviesSaved(JSON.parse(localStorage.getItem('moviesSaved')));
        })
        .catch((err) => {
          if (err.status !== UNAUTHORIZED) {
            setIsErrorApiMovies(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  const getToken = useCallback(() => {
    MainApi
      .getToken()
      .catch(() => {});
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken, location]);

  function deleteMovie(movie) {
    const movieSavedCur = moviesSaved.filter((i) => i.id === movie.id)[0];

    MainApi
      .deleteMovie(movieSavedCur._id)
      .then((newMovie) => {
        setMoviesSaved((prevMovies) => prevMovies.filter(
          (c) => (c.id !== newMovie.movieId),
        ));
        setMovies((prevMovies) => prevMovies.map(
          (c) => (c.id === newMovie.movieId ? Object.assign(c, { saved: false }) : c),
        ));
      })
      .catch(() => {
        setIsErrorApiMovies(true);
      });
  }

  function addMovie(movie) {
    const movieCur = movies.filter((i) => i.id === movie.id)[0];

    const {
      country, director, duration, year, description,
      image, trailerLink, nameRU, nameEN, id,
    } = movieCur;

    const createMovie = {
      country: country || SEED_DATA_TEXT,
      director: director || SEED_DATA_TEXT,
      duration: duration || SEED_DATA_NUMBER,
      year: year || SEED_DATA_TEXT,
      description: description || SEED_DATA_TEXT,
      image: image.urlFull,
      trailer: trailerLink,
      thumbnail: image.urlFull,
      nameRU: nameRU || SEED_DATA_TEXT,
      nameEN: nameEN || nameRU || SEED_DATA_TEXT,
      movieId: id,
    };

    MainApi
      .addMovie(createMovie)
      .then((newMovie) => {
        setMoviesSaved((prevMovies) => [...prevMovies, {
          alt: newMovie.nameRU.replace(/"/g, ''),
          name: newMovie.nameRU,
          _id: newMovie._id,
          id: newMovie.movieId,
          url: newMovie.trailer,
          durationName: getDurationText(newMovie.duration),
          image: {
            urlFull: newMovie.image,
          },
        }]);
        setMovies((prevMovies) => prevMovies.map(
          (c) => (c.id === newMovie.movieId ? Object.assign(c, { saved: true }) : c),
        ));
      })
      .catch(() => {
        setIsErrorApiMovies(true);
      });
  }

  function handleMovieSave(movie) {
    const isSaved = moviesSaved.some((i) => i.id === movie.id);

    if (isSaved) {
      deleteMovie(movie);
    } else {
      addMovie(movie);
    }
  }

  function startPreloader(callback) {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      callback();
    }, TIMES_PRELOADER);
  }

  // Функция для определения кол-во фильмов для добавления по кнопке Еще.
  // (дополняет, если ряд неполный)
  function getCountCardsRow(moviesViewedSum) {
    let cardsRow = 3;
    if (window.innerWidth < WINDOW_WIDTH_ONE_COLUMN_MOVIES) {
      cardsRow = 1;
    } else if (window.innerWidth < WINDOW_WIDTH_TWO_COLUMNS_MOVIES) {
      if (moviesViewedSum % 2) {
        cardsRow = 3;
      } else {
        cardsRow = 2;
      }
    } else if (moviesViewedSum % 3) {
      cardsRow = 4;
    }

    return cardsRow;
  }

  function filterMovies({ inputMovies, query, shortFilms }) {
    return inputMovies.reduce(
      (acc, item) => {
        Object.assign(item, {
          saved: moviesSaved.some((itemSaved) => itemSaved.movieId === item.id),
        });

        if (
          ((query && item.nameRU.toLowerCase().indexOf(query) !== -1) || !query)
              && (!shortFilms || (shortFilms && item.duration <= SHORT_MOVIES_DURATION))) {
          return [...acc, item];
        }

        return acc;
      }, [],
    );
  }

  async function handleSearch({ query, shortFilms }) {
    const localMovies = await JSON.parse(localStorage.getItem('movies'));

    const searchMovies = filterMovies(
      { inputMovies: localMovies, query, shortFilms },
    );

    setMoviesFiltered(searchMovies);
    setIsMoviesFiltered(true);
    setMovies([]);

    const localMoviesSaved = JSON.parse(localStorage.getItem('moviesSaved'));

    const searchMoviesSaved = filterMovies(
      { inputMovies: localMoviesSaved, query, shortFilms },
    );

    setMoviesSaved([]);

    startPreloader(() => setMovies(
      searchMovies.slice(0, getCountCardsRow()),
    ));
    startPreloader(() => setMoviesSaved(
      searchMoviesSaved.slice(0, getCountCardsRow()),
    ));
  }

  function handleMoreMovies() {
    startPreloader(() => setMovies(
      moviesFiltered.slice(0, movies.length + getCountCardsRow(movies.length)),
    ));
  }

  function handleClearMessages() {
    setApiMessage('');
    setApiErrorMessage('');
  }

  function handleUpdateUser(data) {
    setIsLoading(true);

    MainApi
      .setUserInfo(data)
      .then(setCurrentUser)
      .then(() => {
        setApiMessage('Данные сохранены');
      })
      .catch((err) => {
        setApiErrorMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSignOut() {
    return MainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        history.push(HOME_LINK);
      })
      .catch(({ message }) => consoleDebug(message));
  }

  function handleLogin(data) {
    setIsLoading(true);

    MainApi
      .login(data)
      .then(() => {
        setLoggedIn(true);
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
        history.push(MOVIES_LINK);
      })
      .catch((err) => {
        setApiErrorMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister(data) {
    setIsLoading(true);

    MainApi
      .register(data)
      .then(() => {
        MainApi
          .login(data)
          .then(() => {
            setLoggedIn(true);
            setCurrentUser({
              name: data.name,
              email: data.email,
            });
            history.push(MOVIES_LINK);
          })
          .catch((err) => {
            setApiErrorMessage(err.message);
          });
      })
      .catch((err) => {
        setApiErrorMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Route strict path="/(|movies|saved-movies|profile)">
          <Header
            loggedIn={loggedIn}
          />
        </Route>
        <Switch>
          <Route exact strict path={SING_IN_LINK}>
            {!loggedIn && (
            <Auth
              title="Рады видеть!"
              homeLink={HOME_LINK}
            >
              <Login
                actionLink={MOVIES_LINK}
                registerLink={SING_UP_LINK}
                onLogin={handleLogin}
                isLoading={isLoading}
                error={apiErrorMessage}
                onClearMessages={handleClearMessages}
              />
            </Auth>
            )}
          </Route>
          <Route exact strict path={SING_UP_LINK}>
            {!loggedIn && (
            <Auth
              title="Добро пожаловать!"
              homeLink={HOME_LINK}
            >
              <Register
                actionLink={SING_IN_LINK}
                loginLink={SING_IN_LINK}
                onRegister={handleRegister}
                isLoading={isLoading}
                error={apiErrorMessage}
                onClearMessages={handleClearMessages}
              />
            </Auth>
            )}
          </Route>
          <Route
            exact
            path={HOME_LINK}
          >
            <Main />
          </Route>
          <ProtectedRoute
            exact
            strict
            path={MOVIES_LINK}
            component={Movies}
            loggedIn={loggedIn}
            movies={movies}
            errLoadingMovies={isErrorApiMovies}
            onMovieSave={handleMovieSave}
            redirectLink={HOME_LINK}
            isLoading={isLoading}
            isVerifyAuth={isVerifyAuth}
            moviesFiltered={moviesFiltered}
            moreMovies={handleMoreMovies}
            onSearch={handleSearch}
            isMoviesFiltered={isMoviesFiltered}
          />
          <ProtectedRoute
            exact
            strict
            path={SAVED_MOVIES_LINK}
            component={MoviesSaved}
            loggedIn={loggedIn}
            isVerifyAuth={isVerifyAuth}
            movies={moviesSaved}
            isSaved
            errLoadingMovies={isErrorApiMovies}
            onMovieSave={handleMovieSave}
            redirectLink={HOME_LINK}
            isLoading={isLoading}
            onSearch={handleSearch}
          />
          <Route
            exact
            strict
            path={PROFILE_LINK}
          >
            <ProtectedRoute
              exact
              strict
              path={MOVIES_LINK}
              component={Profile}
              loggedIn={loggedIn}
              isVerifyAuth={isVerifyAuth}
              isLoading={isLoading}
              redirectLink={HOME_LINK}
              actionLink={MOVIES_LINK}
              logoutLink={LOGOUT_LINK}
              onSignOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              error={apiErrorMessage}
              message={apiMessage}
              onClearMessages={handleClearMessages}
            />
          </Route>
          <Error404
            linkBack={HOME_LINK}
          />
        </Switch>
        <Route exact strict path="/(|movies|saved-movies)">
          <Footer
            menu={FOOTER_MENU}
          />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
