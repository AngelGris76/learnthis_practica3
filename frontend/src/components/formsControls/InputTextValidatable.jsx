import ValidatingIcons from '../ValidatingIcons';
import VALIDATE_VALUES from '../../constants/validateValues';
import style from './InputText.module.css';

const InputTextValidatable = ({
  label,
  value,
  error,
  isValidating,
  changeHandler,
}) => {
  let classModifier;

  let showError;

  if (!isValidating) {
    classModifier =
      error === VALIDATE_VALUES.fail ? `${style.inputFieldError}` : '';
    showError = error === VALIDATE_VALUES.fail;
  } else {
    classModifier = '';
  }

  const inputField = `${style.inputField} ${classModifier}`;

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
        />
        <ValidatingIcons error={error} isValidating={isValidating} />
      </label>
      {showError && <p className={style.errorMessage}>Error</p>}
    </div>
  );
};

export default InputTextValidatable;
