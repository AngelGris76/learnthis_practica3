import { useContext } from 'react';
import BUTTON_TYPE from '../constants/buttonType';
import FormsContext from '../contexts/FormsContext';
import deleteUserById from '../libs/api/deleteUserById';
import Button from './formsControls/Button';
import style from './DeleteUserForm.module.css';

const DeleteUserForm = () => {
  const { setCancelForm, currentUser, setLoading } = useContext(FormsContext);

  const deleteUser = async (id) => {
    await deleteUserById(id);
    setLoading();
    setCancelForm();
  };

  return (
    <>
      <p
        className={style.message}
      >{`¿Estás seguro que quieres eliminar al usuario ${currentUser.name}?`}</p>
      <div className={style.buttonContainer}>
        <Button type={BUTTON_TYPE.secondary} clickHandler={setCancelForm}>
          Cancelar
        </Button>
        <Button
          type={BUTTON_TYPE.primary}
          clickHandler={() => {
            deleteUser(currentUser.id);
          }}
        >
          Eliminar usuario
        </Button>
      </div>
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={setCancelForm}>
        X
      </Button>
    </>
  );
};

export default DeleteUserForm;
