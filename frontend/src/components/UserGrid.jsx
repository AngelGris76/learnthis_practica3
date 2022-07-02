import User from './User';

const UserGrid = ({ users, error }) => {
  if (error) {
    return <p>Error al cargar los datos</p>;
  }
  if (!users.length) {
    return <p>No hay registros</p>;
  }
  const usersRendered = users.map(({ id, name, userName, isActive, role }) => (
    <User
      id={id}
      key={id}
      name={name}
      userName={userName}
      isActive={isActive}
      role={role}
    />
  ));
  return <div>{usersRendered}</div>;
};

export default UserGrid;
