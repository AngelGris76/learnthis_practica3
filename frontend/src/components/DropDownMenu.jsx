import { useEffect, useRef } from 'react';
import PencilIcon from './icons/PencilIcon';
import PictureIcon from './icons/PictureIcon';
import TrashIcon from './icons/TrashIcon';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';
import style from './DropDownMenu.module.css';
import UserEditPhotoForm from './UserEditPhotoForm';

const DropDownMenu = ({ setDropDownOpened, setModalContent, user }) => {
  const dropDownReference = useRef(null);

  useEffect(() => {
    const handler = (ev) => {
      if (!dropDownReference.current.contains(ev.target))
        setDropDownOpened(false);
    };

    document.body.addEventListener('click', handler, { capture: true });

    return () => {
      document.body.removeEventListener('click', handler, { capture: true });
    };
  }, [setDropDownOpened, dropDownReference]);

  return (
    <ul className={style.dropDownMenu} ref={dropDownReference}>
      <li
        className={style.dropDownMenuItem}
        onClick={() => {
          setModalContent(
            <UserEditForm
              currentUser={user}
              cancelForms={() => setModalContent()}
            />
          );
          setDropDownOpened();
        }}
      >
        <PencilIcon width='20px' />
        <span>Editar</span>
      </li>
      <li
        className={style.dropDownMenuItem}
        onClick={() => {
          setModalContent(
            <UserEditPhotoForm
              cancelForms={() => setModalContent()}
              currentUser={user}
            />
          );
          setDropDownOpened();
        }}
      >
        <PictureIcon width='20px' />
        <span>Cambiar foto</span>
      </li>
      <li
        className={style.dropDownMenuItem}
        onClick={() => {
          setModalContent(
            <UserDeleteForm
              cancelForms={() => setModalContent()}
              currentUser={user}
            />
          );
          setDropDownOpened();
        }}
      >
        <TrashIcon width='20px' />
        <span>Eliminar</span>
      </li>
    </ul>
  );
};

export default DropDownMenu;
