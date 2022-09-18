import { useContext } from 'react';
import BUTTON_TYPE from '../constants/buttonType';
import FormsContext from '../contexts/FormsContext';
import deleteUserById from '../libs/api/deleteUserById';
import Button from './formsControls/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ cancelForms, currentUser }) => {
  const { setLoading } = useContext(FormsContext);

  const deleteUser = async (id) => {
    await deleteUserById(id);
    setLoading();
    cancelForms();
  };

  return (
    <form className={style.deleteFormContainer}>
      <p
        className={style.message}
      >{`¿Estás seguro que quieres eliminar al usuario ${currentUser.name}?`}</p>
      <Button type={BUTTON_TYPE.secondary} clickHandler={() => cancelForms()}>
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
    </form>
  );
};

export default UserDeleteForm;
