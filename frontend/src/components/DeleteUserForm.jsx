import BUTTON_TYPE from '../constants/buttonType';
import deleteUserById from '../libs/api/deleteUserById';
import Button from './Button';
import style from './DeleteUserForm.module.css';

const DeleteUserForm = ({ currentUser, cancelClick, setLoading }) => {
  const deleteUser = async (id) => {
    await deleteUserById(id);
    setLoading();
    cancelClick();
  };

  return (
    <div className={style.formContainer}>
      <p
        className={style.message}
      >{`¿Estás seguro que quieres eliminar al usuario ${currentUser.name}?`}</p>
      <div className={style.buttonContainer}>
        <Button type={BUTTON_TYPE.secondary} clickHandler={cancelClick}>
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
      <Button type={BUTTON_TYPE.iconCancel} clickHandler={cancelClick}>
        X
      </Button>
    </div>
  );
};

export default DeleteUserForm;
