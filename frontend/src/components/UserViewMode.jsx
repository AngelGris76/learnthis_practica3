import VIEW_MODE from '../constants/viewMode';
import CardView from './icons/CardView';
import RowView from './icons/RowView';
import Separator from './icons/Separator';
import style from './UserViewMode.module.css';

const UserViewMode = ({ viewMode, setViewMode }) => {
  let cardModifier;
  let rowModifier;

  if (viewMode === VIEW_MODE.row) {
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
          checked={viewMode === VIEW_MODE.card}
          onChange={() => {
            setViewMode(VIEW_MODE.card);
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
          checked={viewMode === VIEW_MODE.row}
          onChange={() => {
            setViewMode(VIEW_MODE.row);
          }}
        />
      </label>
    </form>
  );
};

export default UserViewMode;
