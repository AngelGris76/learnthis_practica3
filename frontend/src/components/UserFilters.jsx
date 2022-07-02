import Button from './Button';
import InputSearch from './InputSearch';
import InputSelect from './InputSelect';
import ORDER_FILTER from '../constants/orderFilter';
import BUTTON_TYPE from '../constants/buttonType';
import CheckBox from './CheckBox';

import style from './UserFilters.module.css';
import { useContext } from 'react';
import FiltersContext from '../contexts/FiltersContext';

const UserFilters = ({ addUserHandler }) => {
  const { filters, setSortBy, setOnlyActive } = useContext(FiltersContext);

  const selectOptions = !filters.onlyActive
    ? ORDER_FILTER
    : Object.values(ORDER_FILTER).filter(({ value }) => value !== 'active');

  return (
    <div className={style.formFilterContainer}>
      <div className={style.formFilterUp}>
        <InputSearch />
        <InputSelect
          options={selectOptions}
          value={filters.setSortBy}
          setter={setSortBy}
        />
      </div>
      <div className={style.formFilterDown}>
        <CheckBox
          label='Mostrar sólo activos'
          value={filters.onlyActive}
          setter={setOnlyActive}
        />
        <Button type={BUTTON_TYPE.primary} clickHandler={addUserHandler}>
          Añadir usuario
        </Button>
      </div>
    </div>
  );
};

export default UserFilters;
