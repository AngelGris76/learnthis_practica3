import { useState } from 'react';
import Button from './formsControls/Button';
import UserRole from './UserRole';
import UserStatus from './UserStatus';
import BUTTON_TYPE from '../constants/buttonType';
import VIEW_MODE from '../constants/viewMode';
import Modal from './Modal';
import ThreeDotsIcon from './icons/ThreeDotsIcon';
import DropDownMenu from './DropDownMenu';

import style from './User.module.css';

const User = ({ id, name, userName, isActive, role, picture, viewMode }) => {
  const user = { id, name, userName, isActive, role, picture };

  const [modalContent, setModalContent] = useState();
  const [dropDownOpened, setDropDownOpened] = useState(false);

  const containerModifier =
    viewMode === VIEW_MODE.card ? style.userContainerCard : '';
  const dataModifier = viewMode === VIEW_MODE.card ? style.userDataCard : '';
  const userModifier = viewMode === VIEW_MODE.card ? style.userInfoCard : '';
  const restModifier = viewMode === VIEW_MODE.card ? style.restCard : '';

  return (
    <>
      <Modal cancel={() => setModalContent()}>{modalContent}</Modal>
      <div className={`${style.userContainer} ${containerModifier}`}>
        <div className={`${style.userData} ${dataModifier}`}>
          <div className={style.imageContainer}>
            <img
              className={style.avatar}
              src={picture || './images/userPicture.svg'}
              alt='User Avatar'
            />
          </div>
          <div className={`${style.userInfo} ${userModifier}`}>
            <p className={style.name}>{name}</p>
            <p className={style.userName}>{`@${userName}`}</p>
          </div>
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
                  setDropDownOpened(true);
                }}
              >
                <ThreeDotsIcon width={'4px'} />
              </Button>
            </span>
          </div>
        </div>
        {dropDownOpened && (
          <DropDownMenu
            setDropDownOpened={setDropDownOpened}
            setModalContent={setModalContent}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default User;
