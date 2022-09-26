import { useEffect, useState } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState();

  useEffect(() => {
    const handleMessage = (ev) => {
      setAlert(ev.detail);
    };
    document.addEventListener('alert', handleMessage);
    return () => document.removeEventListener('alert', handleMessage);
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timeOutID = setTimeout(() => setAlert(), 2500);
    return () => clearTimeout(timeOutID);
  }, [alert]);

  return alert;
};

export default useAlert;
