import { useContext } from 'react';
import BUTTON_TYPE from '../constants/buttonType';
import FormsContext from '../contexts/FormsContext';
import { dispatchErrorAlert, dispatchSuccesAlert } from '../libs/alertEvent';
import deleteUserById from '../libs/api/deleteUserById';
import Button from './formsControls/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ cancelForms, currentUser }) => {
  const { setLoading } = useContext(FormsContext);

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
          deleteUser(currentUser.id, cancelForms, setLoading);
        }}
      >
        Eliminar usuario
      </Button>
    </form>
  );
};

const deleteUser = async (id, cancelForms, setLoading) => {
  const { error } = await deleteUserById(id);
  if (error) dispatchErrorAlert('Error al eliminar usuario');
  else {
    dispatchSuccesAlert('Usuario eliminado con exito');
    setLoading();
  }
  cancelForms();
};

export default UserDeleteForm;
