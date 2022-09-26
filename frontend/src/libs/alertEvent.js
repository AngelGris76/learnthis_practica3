import messageType from '../constants/messageType';

const EVENT_NAME = 'alert';

const alertSuscribe = (handler) => {
  document.addEventListener(EVENT_NAME, handler);
};

const alertUnsuscribe = (handler) => {
  document.removeEventListener(EVENT_NAME, handler);
};

const emitEvent = (kind, message) => {
  const event = new CustomEvent(EVENT_NAME, {
    detail: {
      type: kind,
      message,
    },
  });
  document.dispatchEvent(event);
};

const dispatchErrorAlert = (message) => emitEvent(messageType.error, message);

const dispatchSuccesAlert = (message) =>
  emitEvent(messageType.success, message);

export {
  dispatchSuccesAlert,
  dispatchErrorAlert,
  alertSuscribe,
  alertUnsuscribe,
};
