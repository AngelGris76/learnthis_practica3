import VALIDATE_VALUES from '../constants/validateValues';
import style from './InputText.module.css';

const InputText = ({ label, value, changeHandler, validateHandler, error }) => {
  const classModifier =
    error === VALIDATE_VALUES.fail ? `${style.inputFieldError}` : '';
  const inputField = `${style.inputField} ${classModifier}`;

  const showError = error === VALIDATE_VALUES.fail;

  return (
    <div className={style.inputContainer}>
      <label className={style.input}>
        <span className={style.inputLabel}>{label}</span>
        <input
          className={inputField}
          type='text'
          value={value}
          onChange={(ev) => {
            changeHandler(ev.target.value);
          }}
          onBlur={() => {
            validateHandler(value);
          }}
        />
      </label>
      {showError && <p className={style.errorMessage}>Error</p>}
    </div>
  );
};

export default InputText;
