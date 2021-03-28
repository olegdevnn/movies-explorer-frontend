import React from 'react';

import PropTypes from 'prop-types';

import useFormWithValidation from '../../Parts/useFormWithValidation';
import Button from '../Button/Button';
import Error from '../Error/Error';
import Fieldset from '../Fieldset/Fieldset';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Link from '../Link/Link';
import Text from '../Text/Text';

const Login = ({
  onLogin, registerLink, error, onClearMessages, isLoading,
}) => {
  const {
    values, errors, isValid, handleChange,
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  const handleFocus = () => onClearMessages();

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Input
          type="email"
          id="email"
          name="email"
          title="E-mail"
          placeholder="E-mail"
          value={values.email}
          errorMessage={errors.email}
          required
          minLength={8}
          maxLength={30}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={isLoading}
        />
        <Input
          type="password"
          name="password"
          id="password"
          title="Пароль"
          placeholder="Пароль"
          value={values.password}
          errorMessage={errors.password}
          required
          minLength={8}
          maxLength={30}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={isLoading}
        />
      </Fieldset>
      <div>
        {error && <Error>{error}</Error>}
        <Button
          isActive={isValid && !isLoading}
        >
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
  error: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  registerLink: PropTypes.string.isRequired,
  onClearMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  error: '',
};

export default Login;
