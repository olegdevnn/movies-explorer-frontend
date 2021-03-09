import React from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Link from '../Link/Link';
import Text from '../Text/Text';

const Login = ({ actionLink, registerLink }) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(actionLink);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Input
          title="E-mail"
          placeholder="E-mail"
          id="email"
          type="email"
          value="pochta@yandex.ru"
          required
          minLength={2}
          maxLength={30}
        />
        <Input
          title="Пароль"
          placeholder="Пароль"
          type="password"
          id="password"
          required
          minLength={2}
          maxLength={30}
        />
      </Fieldset>
      <div>
        <Button>
          Войти
        </Button>
        <Text>
          Ещё не зарегистрированы?
          {' '}
          <Link
            to={registerLink}
            name="Регистрация"
          />
        </Text>
      </div>
    </Form>
  );
};

Login.propTypes = {
  actionLink: PropTypes.string.isRequired,
  registerLink: PropTypes.string.isRequired,
};

export default Login;
