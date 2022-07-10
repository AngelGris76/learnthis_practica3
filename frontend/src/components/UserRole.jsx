import ROLE_OPTIONS from '../constants/roleOptions';
import style from './UserRole.module.css';

const STYLE_CLASS = {
  [ROLE_OPTIONS.TEACHER.value]: style.roleTeacher,
  [ROLE_OPTIONS.STUDENT.value]: style.roleStudent,
  [ROLE_OPTIONS.OTHER.value]: style.roleOther,
};

const getRoleValue = (role) => {
  switch (role) {
    case ROLE_OPTIONS.TEACHER.value:
      return ROLE_OPTIONS.TEACHER.text;
    case ROLE_OPTIONS.STUDENT.value:
      return ROLE_OPTIONS.STUDENT.text;
    default:
      return ROLE_OPTIONS.OTHER.text;
  }
};

const UserRole = ({ role, viewMode }) => {
  const roleMessage = getRoleValue(role);

  const roleModifier = viewMode === 'card' ? style.roleCard : '';

  return (
    <div className={`${style.role} ${roleModifier}`}>
      <span className={`${style.roleMessage} ${STYLE_CLASS[role]}`}>
        {roleMessage}
      </span>
    </div>
  );
};

export default UserRole;
