import { useEffect, useState } from 'react';
import { alertSuscribe, alertUnsuscribe } from '../libs/alertEvent';

const useAlert = () => {
  const [alert, setAlert] = useState();

  useEffect(() => {
    const handleMessage = (ev) => {
      setAlert(ev.detail);
    };

    alertSuscribe(handleMessage);
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
