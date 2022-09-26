import messageType from '../constants/messageType';

const EVENT_NAME = 'alert';

const alertSuscribe = (handler) => {
  document.addEventListener(EVENT_NAME, handler);
};

const alertUnsuscribe = (handler) => {
  document.removeEventListener(EVENT_NAME, handler);
};

const dispatchErrorAlert = (message) => {
  const event = new CustomEvent(EVENT_NAME, {
    detail: {
      type: messageType.error,
      message,
    },
  });
  document.dispatchEvent(event);
};

const dispatchSuccesAlert = (message) => {
  const event = new CustomEvent(EVENT_NAME, {
    detail: {
      type: messageType.success,
      message,
    },
  });
  document.dispatchEvent(event);
};

export {
  dispatchSuccesAlert,
  dispatchErrorAlert,
  alertSuscribe,
  alertUnsuscribe,
};
