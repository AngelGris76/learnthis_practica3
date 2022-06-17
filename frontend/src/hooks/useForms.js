import { useState } from 'react';
import INITIAL_FORMS_VALUE from '../constants/initialFormsValue';

const useForms = () => {
  const [showForm, setShowForm] = useState(INITIAL_FORMS_VALUE);

  const setShowUserDataForm = (newValue) => {
    const newForm = {
      showUserDataForm: newValue,
      showDeleteForm: false,
    };
    setShowForm(newForm);
  };

  const setShowDeleteForm = (newValue) => {
    const newForm = {
      showUserDataForm: false,
      showDeleteForm: newValue,
    };
    setShowForm(newForm);
  };

  const setCancelForm = () => {
    setShowForm(INITIAL_FORMS_VALUE);
  };

  return {
    ...showForm,
    setShowUserDataForm,
    setShowDeleteForm,
    setCancelForm,
  };
};

export default useForms;
