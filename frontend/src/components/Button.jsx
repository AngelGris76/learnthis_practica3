import style from './Button.module.css';

const Button = ({
  type,
  children,
  clickHandler,
  disabled = false,
  error = false,
}) => {
  let buttonClass = `${style[type]}`;

  if (error) {
    const extraType = `${[type]}Error`;
    buttonClass = `${buttonClass} ${style[extraType]}`;
  }

  if (disabled) {
    const extraType = `${[type]}Disable`;
    buttonClass = `${buttonClass} ${style[extraType]}`;
  }

  const buttonType = type === 'primarySubmit' ? 'submit' : 'button';
  let buttonInnerStyle;

  if (type === 'icon' || type === 'iconFilled') {
    buttonInnerStyle = style.innerData;
  } else {
    buttonInnerStyle = '';
  }

  return (
    <button
      className={buttonClass}
      type={buttonType}
      disabled={disabled}
      onClick={clickHandler}
    >
      <span className={buttonInnerStyle}>{children}</span>
    </button>
  );
};

export default Button;
