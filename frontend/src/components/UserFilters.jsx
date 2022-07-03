import Button from './formsControls/Button';
import InputSearch from './formsControls/InputSearch';
import InputSelect from './formsControls/InputSelect';
import ORDER_FILTER from '../constants/orderFilter';
import BUTTON_TYPE from '../constants/buttonType';
import CheckBox from './formsControls/CheckBox';

import style from './UserFilters.module.css';
import { useContext } from 'react';
import FormsContext from '../contexts/FormsContext';
import INITIAL_USER_DATA from '../constants/initialUserData';
import SHOW_FORMS_VALUES from '../constants/showFormsValues';

const UserFilters = ({ filters, filtersSetters, showForm }) => {
  const { setSortBy, setOnlyActive } = filtersSetters;
  const { setCurrentUser, setShowUserDataForm } = useContext(FormsContext);

  const selectOptions = !filters.onlyActive
    ? ORDER_FILTER
    : Object.values(ORDER_FILTER).filter(
        ({ value }) => value !== ORDER_FILTER.ACTIVE.value
      );

  if (showForm !== SHOW_FORMS_VALUES.usersFilters) {
    return null;
  }

  return (
    <div className={style.formFilterContainer}>
      <div className={style.formFilterUp}>
        <InputSearch filters={filters} filtersSetters={filtersSetters} />
        <InputSelect
          options={selectOptions}
          value={filters.sortBy}
          setter={setSortBy}
        />
      </div>
      <div className={style.formFilterDown}>
        <CheckBox
          label='Mostrar sólo activos'
          value={filters.onlyActive}
          setter={setOnlyActive}
        />
        <Button
          type={BUTTON_TYPE.primary}
          clickHandler={() => {
            setCurrentUser(INITIAL_USER_DATA);
            setShowUserDataForm();
          }}
        >
          Añadir usuario
        </Button>
      </div>
    </div>
  );
};

export default UserFilters;
