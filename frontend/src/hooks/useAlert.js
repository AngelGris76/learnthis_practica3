import { useEffect, useState } from 'react';
import { alertSuscribe, alertUnsuscribe } from '../libs/alertEvent';

const useAlert = () => {
  const [alert, setAlert] = useState();

  useEffect(() => {
    const callbackFunction = (message) => setAlert(message);
    const handleMessage = alertSuscribe(callbackFunction);

    return () => alertUnsuscribe(handleMessage);
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timeOutID = setTimeout(() => setAlert(), 2500);
    return () => clearTimeout(timeOutID);
  }, [alert]);

  return alert;
};

export default useAlert;
