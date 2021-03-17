import React, { useCallback } from 'react';

import { verifyStrongPassword } from '../../utils/utils';

export default function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    setIsValid(target.closest('form').checkValidity());
    setValues({ ...values, [name]: value });

    if (name === 'password') {
      const isVerifyPassword = verifyStrongPassword(value);
      setErrors({
        ...errors,
        [name]: !isVerifyPassword ? 'Пароль слишком легкий (должен включать a-z,A-Z,0-9 и знак)' : '',
      });
      setIsValid(isVerifyPassword);
    } else if (name === 'name') {
      setErrors({
        ...errors,
        [name]: target.validity.patternMismatch
          ? 'Имя должно содержать a-zA-Z- и пробел' : '',
      });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, handleChange, errors, isValid, resetForm, setValues, setIsValid,
  };
}
