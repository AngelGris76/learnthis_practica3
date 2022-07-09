import { useContext } from 'react';
import BUTTON_TYPE from '../constants/buttonType';
import ITEMS_PER_PAGE from '../constants/itemsPerPage';
import FiltersContext from '../contexts/FiltersContext';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import Button from './formsControls/Button';
import InputSelect from './formsControls/InputSelect';
import style from './UserPagination.module.css';

const UserPagination = ({ totalPages, setLoading }) => {
  const { filters, setPage, setItemsPerPage } = useContext(FiltersContext);

  const decButtonDisable = filters.page === 1 || totalPages === 0;
  const incButtonDisable = filters.page === totalPages || totalPages === 0;

  return (
    <div className={style.paginationContainer}>
      <div className={style.selectContainer}>
        <InputSelect
          options={ITEMS_PER_PAGE}
          value={filters.itemsPerPage}
          setter={(newValue) => {
            setItemsPerPage(Number(newValue));
            setLoading();
          }}
        />
        <span className={style.selectDescriptor}>elementos por pagina</span>
      </div>
      <div className={style.buttonsContainer}>
        <Button
          disabled={decButtonDisable}
          type={BUTTON_TYPE.iconFilled}
          clickHandler={() => {
            setPage(filters.page - 1);
          }}
        >
          <ArrowLeft />
        </Button>
        <span>{`Pagina ${filters.page} de ${totalPages}`}</span>
        <Button
          disabled={incButtonDisable}
          type={BUTTON_TYPE.iconFilled}
          clickHandler={() => {
            setPage(filters.page + 1);
          }}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default UserPagination;
