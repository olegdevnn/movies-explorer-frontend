import './Profile.css';
import React, {
  useContext, useEffect,
} from 'react';

import PropTypes from 'prop-types';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../Parts/useFormWithValidation';

const Profile = ({
  onUpdateUser, onSignOut, error, message, onClearMessages, isLoading,
}) => {
  const {
    values, errors, isValid, setIsValid, handleChange, setValues,
  } = useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  };

  const handleFocus = () => onClearMessages();

  useEffect(() => {
    if (values.name === currentUser.name
        && values.email === currentUser.email) {
      setIsValid(false);
    }
  }, [values, currentUser, setIsValid]);

  return (
    <main className="profile">
      <h2 className="profile__title">
        Привет,
        {' '}
        {currentUser.name}
        !
      </h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="profile__fieldset">
          <label htmlFor="name" className="profile__label">
            Имя
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Имя"
              value={values.name || ''}
              required
              pattern="^[a-zA-Z- ]+$"
              size="3"
              minLength="2"
              maxLength="30"
              className="profile__input"
              onChange={handleChange}
              onFocus={handleFocus}
              disabled={isLoading}
            />

          </label>
          <span className="profile__input-error">
            {errors.name}
          </span>
          <label htmlFor="email" className="profile__label">
            Почта
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-Mail"
              value={values.email || ''}
              required
              size="3"
              minLength="8"
              maxLength="30"
              className="profile__input"
              onChange={handleChange}
              onFocus={handleFocus}
              disabled={isLoading}
            />
          </label>
          <span className="profile__input-error">
            {errors.email}
          </span>
        </fieldset>
        <div>
          {error && (
          <p className="profile__message profile__message_error">
            {error}
          </p>
          )}
          {message && (
          <p className="profile__message">
            {message}
          </p>
          )}
          <button
            type="submit"
            className={`profile__button-save 
              ${!isValid ? 'profile__button-save_disabled' : ''}
            `}
            disabled={!isValid || isLoading}
          >
            Редактировать
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="profile__button-logout"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
};

Profile.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onClearMessages: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  error: '',
  message: '',
};

export default Profile;
