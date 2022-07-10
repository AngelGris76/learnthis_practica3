import { useContext } from 'react';
import FormsContext from '../contexts/FormsContext';
import Button from './formsControls/Button';
import UserRole from './UserRole';
import UserStatus from './UserStatus';
import BUTTON_TYPE from '../constants/buttonType';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import style from './User.module.css';

const User = ({ id, name, userName, isActive, role, viewMode }) => {
  const { setCurrentUser, setShowDeleteForm, setShowUserEditForm } =
    useContext(FormsContext);

  const containerModifier = viewMode === 'card' ? style.userContainerCard : '';
  const userModifier = viewMode === 'card' ? style.userInfoCard : '';
  const restModifier = viewMode === 'card' ? style.restCard : '';

  return (
    <div className={`${style.userContainer} ${containerModifier}`}>
      <div className={`${style.userInfo} ${userModifier}`}>
        <p className={style.name}>{name}</p>
        <p className={style.userName}>{`@${userName}`}</p>
      </div>
      <div className={`${style.restContainer} ${restModifier}`}>
        <div className={style.detailContainer}>
          <UserStatus isActive={isActive} />
          <UserRole role={role} viewMode={viewMode} />
        </div>
        <div className={style.buttonContainer}>
          <span>
            <Button
              type={BUTTON_TYPE.icon}
              clickHandler={() => {
                setCurrentUser({ id, name, userName, isActive, role });
                setShowUserEditForm();
              }}
            >
              <PencilIcon />
            </Button>
          </span>
          <span className={style.trash}>
            <Button
              type={BUTTON_TYPE.icon}
              error={true}
              clickHandler={() => {
                setCurrentUser({ id, name });
                setShowDeleteForm();
              }}
            >
              <TrashIcon />
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
