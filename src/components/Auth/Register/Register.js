import React from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Link from '../Link/Link';
import Text from '../Text/Text';

const Register = ({ actionLink, loginLink }) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(actionLink);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Input
          title="Имя"
          id="name"
          placeholder="Имя"
          value="Виталий"
          required
          minLength={2}
          maxLength={30}
        />
        <Input
          title="E-mail"
          placeholder="E-mail"
          type="email"
          id="email"
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
          value="11111111111111"
          isError
          required
          minLength={2}
          maxLength={30}
        />
      </Fieldset>
      <div>
        <Button>
          Зарегистрироваться
        </Button>
        <Text>
          Уже зарегистрированы?
          {' '}
          <Link
            to={loginLink}
            name="Войти"
          />
        </Text>
      </div>
    </Form>
  );
};

Register.propTypes = {
  actionLink: PropTypes.string.isRequired,
  loginLink: PropTypes.string.isRequired,
};

export default Register;
