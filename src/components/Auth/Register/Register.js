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

const Register = ({
  onRegister, loginLink, error, onClearMessages, isLoading,
}) => {
  const {
    values, errors, isValid, handleChange,
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.password) {
      return;
    }

    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  const handleFocus = () => onClearMessages();

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Input
          type="text"
          id="name"
          name="name"
          title="Имя"
          placeholder="Имя"
          value={values.name}
          errorMessage={errors.name}
          required
          pattern="^[a-zA-Z- ]+$"
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={isLoading}
        />
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
          id="password"
          name="password"
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
          isActive={isValid}
        >
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
  error: PropTypes.string,
  onRegister: PropTypes.func.isRequired,
  loginLink: PropTypes.string.isRequired,
  onClearMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Register.defaultProps = {
  error: '',
};

export default Register;
