import { useState } from 'react';

const usePicture = (picture) => {
  const [avatar, setAvatar] = useState({
    error: null,
    name: null,
    url: picture,
  });

  const setError = (error) => {
    setAvatar({ error });
  };

  const setPicture = (name, url) => {
    setAvatar({ error: false, name, url });
  };

  return { avatar, setError, setPicture };
};

export default usePicture;
