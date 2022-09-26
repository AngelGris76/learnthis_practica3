import messageType from '../constants/messageType';
import FailIcon from './icons/FailIcon';
import PassIcon from './icons/PassIcon';
import useAlert from '../hooks/useAlert';

import style from './AlertBox.module.css';

const BG_COLOR = {
  [messageType.success]: style.success,
  [messageType.error]: style.error,
};

const ICON = {
  [messageType.success]: PassIcon,
  [messageType.error]: FailIcon,
};

const AlertMessage = () => {
  const alert = useAlert();

  if (!alert) return null;

  const Icon = ICON[alert.type];
  const bgColor = BG_COLOR[alert.type];

  return (
    <div className={`${style.messageContainer} ${bgColor}`}>
      <Icon width='2.25rem' />
      <span>{alert.message}</span>
    </div>
  );
};

export default AlertMessage;
