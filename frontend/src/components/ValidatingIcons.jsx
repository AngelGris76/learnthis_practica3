import VALIDATE_VALUES from '../constants/validateValues';
import FailIcon from './icons/FailIcon';
import PassIcon from './icons/PassIcon';
import UpdateIcon from './icons/UpdateIcon';
import style from './ValidatingIcons.module.css';

const VALIDATE_ICON_STYLE = {
  validating: style.validating,
  fail: style.fail,
  pass: style.pass,
};

const ValidatingIcons = ({ isValidating, error }) => {
  let validateIconModifier;

  let showError;

  if (!isValidating) {
    validateIconModifier = `${VALIDATE_ICON_STYLE[error]}`;
    showError = error === VALIDATE_VALUES.fail;
  } else {
    validateIconModifier = ``;
  }

  return (
    <span className={`${style.validateIcon} ${validateIconModifier}`}>
      {isValidating !== VALIDATE_VALUES.initial && isValidating && (
        <UpdateIcon />
      )}
      {!isValidating && !showError && <PassIcon />}
      {!isValidating && showError && <FailIcon />}
    </span>
  );
};

export default ValidatingIcons;
