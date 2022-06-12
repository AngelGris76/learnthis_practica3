import { useState } from 'react';
import INITIAL_FORMS_VALUE from '../constants/initialFormsValue';

const useForms = () => {
  const [showForm, setShowForm] = useState(INITIAL_FORMS_VALUE);

  const setShowAddForm = (newValue) => {
    const newForm = {
      showAddForm: newValue,
      showEditForm: false,
      showDeleteForm: false,
    };
    setShowForm(newForm);
  };

  const setShowEditForm = (newValue) => {
    const newForm = {
      showAddForm: false,
      showEditForm: newValue,
      showDeleteForm: false,
    };
    setShowForm(newForm);
  };

  const setShowDeleteForm = (newValue) => {
    const newForm = {
      showAddForm: false,
      showEditForm: false,
      showDeleteForm: newValue,
    };
    setShowForm(newForm);
  };

  const setCancelForm = () => {
    setShowForm(INITIAL_FORMS_VALUE);
  };

  return {
    ...showForm,
    setShowAddForm,
    setShowEditForm,
    setShowDeleteForm,
    setCancelForm,
  };
};

export default useForms;
