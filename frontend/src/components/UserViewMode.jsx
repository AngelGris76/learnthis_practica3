import CardView from './icons/CardView';
import RowView from './icons/RowView';
import Separator from './icons/Separator';
import style from './UserViewMode.module.css';

const UserViewMode = ({ viewMode, setViewMode }) => {
  let cardModifier;
  let rowModifier;

  if (viewMode === 'row') {
    rowModifier = style.rowActive;
    cardModifier = style.cardInactive;
  } else {
    rowModifier = style.rowInactive;
    cardModifier = style.cardActive;
  }

  return (
    <form className={style.buttonContainer}>
      <label className={`${style.card} ${cardModifier}`}>
        <CardView />
        <input
          className={style.control}
          type='radio'
          name='viewmode'
          checked={viewMode === 'card'}
          onChange={() => {
            setViewMode('card');
          }}
        />
      </label>
      <Separator />
      <label className={`${style.row} ${rowModifier}`}>
        <RowView />
        <input
          className={style.control}
          type='radio'
          name='viewmode'
          checked={viewMode === 'row'}
          onChange={() => {
            setViewMode('row');
          }}
        />
      </label>
    </form>
  );
};

export default UserViewMode;
