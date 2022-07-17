import validateName from '../libs/validateName';
import validateUserName from '../libs/validateUserName';

const createFormReducer = (state, action) => {
  switch (action.type) {
    case 'user_changed':
      return {
        id: action.value.id,
        name: { value: action.value.name, error: false },
        userName: { value: action.value.userName, error: false },
        active: action.value.isActive,
        role: action.value.role,
      };

    case 'role_changed':
      return { ...state, role: action.value };

    case 'isActive_changed':
      return { ...state, active: action.value };

    case 'name_changed': {
      const error = validateName(action.value);
      return { ...state, name: { value: action.value, error } };
    }

    case 'userName_changed': {
      const error = validateUserName(action.value);
      const newValidating = !error;
      return {
        ...state,
        validating: newValidating,
        userName: { value: action.value, error },
      };
    }

    case 'userName_async_error':
      return {
        ...state,
        validating: false,
        userName: { value: state.userName.value, error: action.value },
      };

    case 'perform_validating':
      return { ...state, validating: action.value };

    default:
      throw new Error('Invalida action');
  }
};

export default createFormReducer;
