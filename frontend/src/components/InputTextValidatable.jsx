import style from './InputText.module.css';
import UpdateIcon from './UpdateIcon';
import PassIcon from './PassIcon';
import FailIcon from './FailIcon';
import { useEffect, useState } from 'react';
import validateUserName from '../libs/validateUserName';
import findUserByUserName from '../libs/api/findUserByUserName';

const VALIDATE_ICON_STYLE = {
  validating: style.validating,
  fail: style.fail,
  pass: style.pass,
};

const validatingUserName = async (userName, validateHandler, changeHandler) => {
  changeHandler(userName);
  if (!validateUserName(userName)) {
    validateHandler(true);
    return;
  }
  const data = await findUserByUserName(userName);
  if (data === userName) {
    validateHandler(true);
    return;
  }
  validateHandler(false);
};

const InputTextValidatable = ({
  label,
  value,
  error,
  isValidating,
  validateHandler,
  changeHandler,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const classModifier = error ? `${style.inputFieldError}` : '';

  let validateIconModifier;

  if (!isValidating) {
    validateIconModifier = error
      ? `${VALIDATE_ICON_STYLE.fail}`
      : `${VALIDATE_ICON_STYLE.pass}`;
  } else {
    validateIconModifier = ``;
  }

  const inputField = `${style.inputField} ${classModifier}`;

  useEffect(() => {
    let timeOutId;

    if (value !== inputValue) {
      timeOutId = setTimeout(() => {
        validateHandler('validating');
        validatingUserName(inputValue, validateHandler, changeHandler);
      }, 300);
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [value, inputValue, validateHandler, changeHandler]);

  return (
    <div className={style.inputContainer}>
      <label className={style.input}>
        <span className={style.inputLabel}>{label}</span>
        <input
          className={inputField}
          type='text'
          value={inputValue}
          onChange={(ev) => {
            setInputValue(ev.target.value);
          }}
        />
        <span className={`${style.validateIcon} ${validateIconModifier}`}>
          {isValidating !== 'initial' && isValidating && <UpdateIcon />}
          {!isValidating && !error && <PassIcon />}
          {!isValidating && error && <FailIcon />}
        </span>
      </label>
      {error && <p className={style.errorMessage}>Error</p>}
    </div>
  );
};

export default InputTextValidatable;
