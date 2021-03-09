import './Profile.css';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Profile = ({ actionLink, logoutLink }) => {
  const [data, setData] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(actionLink);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="profile__fieldset">
          <label htmlFor="name" className="profile__label">
            Имя
            <input
              type="text"
              value={data.name}
              placeholder="Имя"
              className="profile__input"
              id="name"
              onChange={handleChange}
              size="3"
              required
              minLength="2"
              maxLength="30"
            />
          </label>
          <label htmlFor="email" className="profile__label">
            Почта
            <input
              type="email"
              className="profile__input"
              pattern=".+@.+\.[a-z]{2,}$"
              value={data.email}
              placeholder="E-Mail"
              id="email"
              onChange={handleChange}
              size="3"
              required
              minLength="2"
              maxLength="30"
            />
          </label>
        </fieldset>
        <div>
          <button
            type="submit"
            className="profile__button-save"
          >
            Редактировать
          </button>
          <Link
            to={logoutLink}
            className="profile__link"
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </main>
  );
};

Profile.propTypes = {
  actionLink: PropTypes.string.isRequired,
  logoutLink: PropTypes.string.isRequired,
};

export default Profile;
