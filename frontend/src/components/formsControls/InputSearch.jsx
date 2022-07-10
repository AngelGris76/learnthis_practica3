import { useEffect, useState } from 'react';
import style from './InputSearch.module.css';

const InputSearch = ({ filters, filtersSetters }) => {
  const { searchTerm } = filters;
  const { setSearchTerm } = filtersSetters;
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term !== searchTerm) {
      const timeOutId = setTimeout(() => {
        setSearchTerm(term);
      }, 300);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [term, setSearchTerm, searchTerm]);

  return (
    <div className={style.inputSearchContainer}>
      <input
        className={style.inputSearch}
        type='text'
        placeholder='Buscar...'
        value={term}
        onChange={(ev) => {
          setTerm(ev.target.value);
        }}
      />
    </div>
  );
};

export default InputSearch;
