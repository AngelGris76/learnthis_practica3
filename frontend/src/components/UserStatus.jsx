import FailIcon from './icons/FailIcon';
import PassIcon from './icons/PassIcon';
import style from './UserStatus.module.css';

const UserStatus = ({ isActive }) => {
  const message = isActive ? 'Activo' : 'Inactivo';

  const statusModifier = isActive ? style.active : style.inactive;

  return (
    <div className={`${style.statusContainer} ${statusModifier}`}>
      {isActive && <PassIcon />}
      {!isActive && <FailIcon />}
      <p className={style.statusMessage}>{message}</p>
    </div>
  );
};

export default UserStatus;
