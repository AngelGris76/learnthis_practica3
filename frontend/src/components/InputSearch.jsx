import { useContext, useEffect, useState } from 'react';
import FiltersContext from '../contexts/FiltersContext';
import style from './InputSearch.module.css';

const InputSearch = () => {
  const { filters, setSearchTerm } = useContext(FiltersContext);
  const { searchTerm } = filters;
  const [term, setTerm] = useState(searchTerm);

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
