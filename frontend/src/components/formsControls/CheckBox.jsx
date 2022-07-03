import style from './CheckBox.module.css';

const CheckBox = ({ label = '', value, setter }) => {
  return (
    <label className={style.inputContainer}>
      <input
        className={style.input}
        type='checkbox'
        checked={value}
        onChange={(ev) => {
          const newValue = ev.target.checked;
          setter(newValue);
        }}
      />
      <span className={style.inputLabel}>{label}</span>
    </label>
  );
};

export default CheckBox;
