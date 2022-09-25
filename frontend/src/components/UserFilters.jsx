import { useContext, useState } from 'react';
import {
  onlyActiveChanged,
  searchTermChanged,
  sortByChanged,
} from '../actions/createFormActionsBuilder';
import Button from './formsControls/Button';
import InputSearch from './formsControls/InputSearch';
import InputSelect from './formsControls/InputSelect';
import CheckBox from './formsControls/CheckBox';
import ORDER_FILTER from '../constants/orderFilter';
import BUTTON_TYPE from '../constants/buttonType';
import FormsContext from '../contexts/FormsContext';
import Modal from './Modal';
import UserCreateForm from './UserCreateForm';

import style from './UserFilters.module.css';

const UserFilters = ({ filters, dispatch }) => {
  const { setLoading } = useContext(FormsContext);
  const [showCreateForm, setShowUserCreateForm] = useState();

  const selectOptions = !filters.onlyActive
    ? ORDER_FILTER
    : Object.values(ORDER_FILTER).filter(
        ({ value }) => value !== ORDER_FILTER.ACTIVE.value
      );

  return (
    <>
      <Modal
        cancel={() => {
          setShowUserCreateForm(false);
        }}
      >
        {showCreateForm && (
          <UserCreateForm
            cancelForms={() => {
              setShowUserCreateForm(false);
            }}
          />
        )}
      </Modal>
      <div className={style.formFilterContainer}>
        <div className={style.formFilterUp}>
          <InputSearch
            searchTerm={filters.searchTerm}
            setSearchTerm={(term) => {
              setLoading();
              dispatch(searchTermChanged(term));
            }}
          />
          <span>
            <InputSelect
              options={selectOptions}
              value={filters.sortBy}
              setter={(order) => {
                setLoading();
                dispatch(sortByChanged(order));
              }}
            />
          </span>
        </div>
        <div className={style.formFilterDown}>
          <CheckBox
            label='Mostrar sólo activos'
            value={filters.onlyActive}
            setter={(onlyActive) => {
              setLoading();
              dispatch(onlyActiveChanged(onlyActive));
            }}
          />
          <Button
            type={BUTTON_TYPE.primary}
            clickHandler={() => {
              setShowUserCreateForm(true);
            }}
          >
            Añadir usuario
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserFilters;
