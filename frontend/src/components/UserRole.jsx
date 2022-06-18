import ROLE_OPTIONS from '../constants/roleOptions';
import style from './UserRole.module.css';

const STYLE_CLASS = {
  teacher: style.roleTeacher,
  student: style.roleStudent,
  other: style.roleOther,
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

const UserRole = ({ role }) => {
  const roleMessage = getRoleValue(role);

  return (
    <div className={`${style.role}`}>
      <span className={`${style.roleMessage} ${STYLE_CLASS[role]}`}>
        {roleMessage}
      </span>
    </div>
  );
};

export default UserRole;
