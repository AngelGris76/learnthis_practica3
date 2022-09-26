import { useContext } from 'react';
import FormsContext from '../contexts/FormsContext';
import usePicture from '../hooks/usePicture';
import { dispatchErrorAlert, dispatchSuccesAlert } from '../libs/alertEvent';
import updateUserById from '../libs/api/updateUserById';
import fileToDataURL from '../libs/fileToDataURL';
import Button from './formsControls/Button';
import PencilIcon from './icons/PencilIcon';
import PictureIcon from './icons/PictureIcon';
import style from './UserPictureForm.module.css';

const ALLOWED_MIME_TYPE = ['image/jpeg', 'image/png'];
const MAX_SIZE = 102400;

const UserPictureForm = ({ currentUser, cancelForms }) => {
  const { avatar, setError, setPicture } = usePicture(currentUser.picture);
  const { setLoading, filtersDispatch } = useContext(FormsContext);

  let colorClass;

  if (avatar.name) colorClass = style.success;
  if (avatar.error) colorClass = style.error;

  return (
    <form
      className={style.editPhotoForm}
      onSubmit={(ev) =>
        handleSubmit(
          ev,
          currentUser,
          avatar.url,
          cancelForms,
          setLoading,
          filtersDispatch
        )
      }
    >
      <span className={style.photoContainer}>
        {!avatar.name && <PictureIcon width='2.25rem' />}
        {avatar.name && <img src={avatar.url} className={style.photo} />}
      </span>
      <span className={`${style.description} ${colorClass}`}>
        {!avatar.error && !avatar.name && 'JPG/PNG | Máx 100Kb'}
        {!avatar.error && avatar.name}
        {avatar.error !== null && avatar.error}
      </span>
      <label className={style.inputContainer}>
        <PencilIcon width='1rem' />
        <input
          type='file'
          className={style.inputFile}
          accept={ALLOWED_MIME_TYPE.join()}
          onChange={(ev) => {
            handleChange(ev, setError, setPicture);
          }}
        />
      </label>
      <Button type='primarySubmit' disabled={!avatar.name}>
        Actualizar foto
      </Button>
    </form>
  );
};

const handleChange = async (ev, setError, setPicture) => {
  const file = ev.target.files[0];

  if (!file) return setPicture();

  if (!ALLOWED_MIME_TYPE.includes(file.type)) return setError('Sólo JPG/PNG');

  if (file.size > MAX_SIZE) return setError('Máximo 100Kb');

  const dataURL = await fileToDataURL(file);
  setPicture(file.name, dataURL);
};

const handleSubmit = async (
  ev,
  user,
  newData,
  cancelForms,
  setLoading,
  filtersDispatch
) => {
  ev.preventDefault();
  const { error } = await updateUserById(user.id, { picture: newData });
  if (error) dispatchErrorAlert('Error al modificar usuario');
  else {
    dispatchSuccesAlert('Usuario modificado con exito');
    setLoading();
  }
  cancelForms();
  filtersDispatch({ type: 'page', value: 1 });
};

export default UserPictureForm;
