import FailIcon from './icons/FailIcon';
import PassIcon from './icons/PassIcon';
import style from './UserStatus.module.css';

const UserStatus = ({ isActive }) => {
  const message = isActive ? 'Activo' : 'Inactivo';

  const statusModifier = isActive ? style.active : style.inactive;
  const Icon = isActive ? PassIcon : FailIcon;

  return (
    <div className={`${style.statusContainer} ${statusModifier}`}>
      <Icon />
      <p className={style.statusMessage}>{message}</p>
    </div>
  );
};

export default UserStatus;
