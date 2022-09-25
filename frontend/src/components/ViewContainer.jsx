import { useState } from 'react';
import VIEW_MODE from '../constants/viewMode';
import UserList from './UserList';
import UserViewMode from './UserViewMode';

const ViewContainer = ({ isLoading, users, error }) => {
  const [viewMode, setViewMode] = useState(VIEW_MODE.row);

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <UserViewMode viewMode={viewMode} setViewMode={setViewMode} />
      )}
      {!isLoading && (
        <UserList users={users} error={error} viewMode={viewMode} />
      )}
    </div>
  );
};

export default ViewContainer;
