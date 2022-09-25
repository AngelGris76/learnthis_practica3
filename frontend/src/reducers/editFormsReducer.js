import USER_FORM_OPTIONS from '../constants/userFormOptions';
import validateName from '../libs/validateName';
import validateUserName from '../libs/validateUserName';

const editFormReducer = (state, action) => {
  switch (action.type) {
    case USER_FORM_OPTIONS.userChanged:
      return {
        id: action.value.id,
        name: { value: action.value.name, error: false },
        userName: { value: action.value.userName, error: false },
        active: action.value.isActive,
        role: action.value.role,
      };

    case USER_FORM_OPTIONS.roleChanged:
      return { ...state, role: action.value };

    case USER_FORM_OPTIONS.isActiveChanged:
      return { ...state, active: action.value };

    case USER_FORM_OPTIONS.nameChanged: {
      const error = validateName(action.value);
      return { ...state, name: { value: action.value, error } };
    }

    case USER_FORM_OPTIONS.userNameChanged: {
      const error = validateUserName(action.value);
      const newValidating = !error;
      return {
        ...state,
        validating: newValidating,
        userName: { value: action.value, error },
      };
    }

    case USER_FORM_OPTIONS.userNameAsyncError:
      return {
        ...state,
        validating: false,
        userName: { value: state.userName.value, error: action.value },
      };

    case USER_FORM_OPTIONS.performValidating:
      return { ...state, validating: action.value };

    default:
      throw new Error('Invalida action');
  }
};

export default editFormReducer;
