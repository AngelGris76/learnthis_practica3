import { useEffect, useState } from 'react';
import BUTTON_TYPE from '../constants/buttonType';
import deleteUserById from '../libs/api/deleteUserById';
import findUserById from '../libs/api/findUserById';
import Button from './Button';

import style from './DeleteUserForm.module.css';

const getDataById = async (id, setName) => {
  const data = await findUserById(id);
  setName(data.name);
};

const DeleteUserForm = ({ userId, cancelClick, setLoading }) => {
  const [name, setName] = useState('');

  const deleteUser = async (id) => {
    await deleteUserById(id);
    setLoading();
    cancelClick();
  };

  useEffect(() => {
    getDataById(userId, setName);
  }, [userId]);

  return (
    <div className={style.formContainer}>
      <p
        className={style.message}
      >{`¿Estás seguro que quieres eliminar al usuario ${name}?`}</p>
      <div className={style.buttonContainer}>
        <Button type={BUTTON_TYPE.secondary} clickHandler={cancelClick}>
          Cancelar
        </Button>
        <Button
          type={BUTTON_TYPE.primary}
          clickHandler={() => {
            deleteUser(userId);
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
