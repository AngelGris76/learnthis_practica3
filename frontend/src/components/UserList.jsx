import User from './User';
import style from './UserList.module.css';

const UserList = ({ users, error, viewMode }) => {
  if (error) {
    return <p>Error al cargar los datos</p>;
  }
  if (!users.length) {
    return <p>No hay registros</p>;
  }

  const viewModifier = viewMode === 'card' ? style.userContainerCard : '';

  const usersRendered = users.map(
    ({ id, name, userName, isActive, role, picture }) => (
      <User
        id={id}
        key={id}
        name={name}
        userName={userName}
        isActive={isActive}
        role={role}
        picture={picture}
        viewMode={viewMode}
      />
    )
  );
  return (
    <div className={`${style.userContainer} ${viewModifier}`}>
      {usersRendered}
    </div>
  );
};

export default UserList;
