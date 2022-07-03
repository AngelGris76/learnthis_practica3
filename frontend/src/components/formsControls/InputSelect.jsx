import style from './InputSelect.module.css';

const InputSelect = ({ options, value, setter }) => {
  const optionList = Object.values(options).map(({ id, value, text }) => (
    <option className={style.option} key={id} value={value}>
      {text}
    </option>
  ));

  return (
    <select
      className={style.input}
      value={value}
      onChange={(ev) => setter(ev.target.value)}
    >
      {optionList}
    </select>
  );
};

export default InputSelect;
