import { useState } from 'react';
import SHOW_FORMS_VALUES from '../constants/showFormsValues';

const useForms = () => {
  const [showForm, setShowForm] = useState(SHOW_FORMS_VALUES.usersFilters);

  const setShowUserDataForm = () => {
    setShowForm(SHOW_FORMS_VALUES.userDataForm);
  };

  const setShowDeleteForm = () => {
    setShowForm(SHOW_FORMS_VALUES.userDeleteForm);
  };

  const setCancelForm = () => {
    setShowForm(SHOW_FORMS_VALUES.usersFilters);
  };

  return {
    showForm,
    setShowUserDataForm,
    setShowDeleteForm,
    setCancelForm,
  };
};

export default useForms;
