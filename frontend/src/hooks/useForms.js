import { useState } from 'react';
import SHOW_FORMS_VALUES from '../constants/showFormsValues';

const useForms = () => {
  const [showForm, setShowForm] = useState(SHOW_FORMS_VALUES.usersFilters);

  const setShowUserCreateForm = () => {
    setShowForm(SHOW_FORMS_VALUES.userCreateForm);
  };

  const setShowUserEditForm = () => {
    setShowForm(SHOW_FORMS_VALUES.userEditForm);
  };

  const setShowDeleteForm = () => {
    setShowForm(SHOW_FORMS_VALUES.userDeleteForm);
  };

  const setShowFilters = () => {
    setShowForm(SHOW_FORMS_VALUES.usersFilters);
  };

  return {
    showForm,
    setShowUserCreateForm,
    setShowUserEditForm,
    setShowDeleteForm,
    setShowFilters,
  };
};

export default useForms;
