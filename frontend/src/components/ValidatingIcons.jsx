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

  let iconClass;

  if (!error) {
    iconClass = 'pass';
  } else {
    iconClass = 'fail';
  }

  if (!isValidating) {
    validateIconModifier = `${VALIDATE_ICON_STYLE[iconClass]}`;
  } else {
    validateIconModifier = ``;
  }

  if (error === undefined) {
    return null;
  }

  return (
    <span className={`${style.validateIcon} ${validateIconModifier}`}>
      {isValidating && <UpdateIcon />}
      {isValidating === false && !error && <PassIcon />}
      {isValidating === false && !!error && <FailIcon />}
    </span>
  );
};

export default ValidatingIcons;
