import BUTTON_TYPE from '../constants/buttonType';
import ITEMS_PER_PAGE from '../constants/itemsPerPage';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import Button from './formsControls/Button';
import InputSelect from './formsControls/InputSelect';
import style from './UserPagination.module.css';

const UserPagination = ({
  totalUsers,
  setLoading,
  actualPage,
  itemsPerPage,
  setPage,
  setItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const decButtonDisable = actualPage === 1 || totalPages === 0;
  const incButtonDisable = actualPage === totalPages || totalPages === 0;

  return (
    <div className={style.paginationContainer}>
      <div className={style.selectContainer}>
        <span className={style.inputSelectContainer}>
          <InputSelect
            options={ITEMS_PER_PAGE}
            value={itemsPerPage}
            setter={(newValue) => {
              setItemsPerPage(Number(newValue));
              setLoading();
            }}
          />
        </span>
        <span className={style.selectDescriptor}>elementos por pagina</span>
      </div>
      <div className={style.buttonsContainer}>
        <Button
          disabled={decButtonDisable}
          type={BUTTON_TYPE.iconFilled}
          clickHandler={() => {
            setPage(actualPage - 1);
            setLoading();
          }}
        >
          <ArrowLeft />
        </Button>
        <span>{`Pagina ${actualPage} de ${totalPages}`}</span>
        <Button
          disabled={incButtonDisable}
          type={BUTTON_TYPE.iconFilled}
          clickHandler={() => {
            setPage(actualPage + 1);
            setLoading();
          }}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default UserPagination;
