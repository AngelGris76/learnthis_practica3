import USER_FORM_OPTIONS from '../constants/userFormOptions';

const userChanged = (newUser) => ({
  type: USER_FORM_OPTIONS.userChanged,
  value: newUser,
});

const roleChanged = (newRole) => ({
  type: USER_FORM_OPTIONS.roleChanged,
  value: newRole,
});

const isActiveChanged = (newIsActive) => ({
  type: USER_FORM_OPTIONS.isActiveChanged,
  value: newIsActive,
});

const nameChanged = (newName) => ({
  type: USER_FORM_OPTIONS.nameChanged,
  value: newName,
});

const userNameChanged = (newUserName) => ({
  type: USER_FORM_OPTIONS.userNameChanged,
  value: newUserName,
});

const userNameAsyncError = (newError) => ({
  type: USER_FORM_OPTIONS.userNameAsyncError,
  value: newError,
});

const performValidating = (validating) => ({
  type: USER_FORM_OPTIONS.performValidating,
  value: validating,
});

export {
  userChanged,
  roleChanged,
  isActiveChanged,
  nameChanged,
  userNameChanged,
  userNameAsyncError,
  performValidating,
};
