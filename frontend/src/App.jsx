import { useState } from 'react';
import DeleteUserForm from './components/DeleteUserForm';
import Pagination from './components/Pagination';
import UserDataForm from './components/UserDataForm';
import UserFilters from './components/UserFilters';
import UserGrid from './components/UserGrid';
import INITIAL_USER_DATA from './constants/initialUserData';
import FiltersContext from './contexts/FiltersContext';
import FormsContext from './contexts/FormsContext';
import useFilter from './hooks/useFilters';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';
import {
  getOnlyActiveUsers,
  orderUsers,
  paginateUsers,
  searchUser,
} from './libs/api/filtersFunctions';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const {
    filters,
    setOnlyActive,
    setSortBy,
    setSearchTerm,
    setPage,
    setItemsPerPage,
  } = useFilter();

  const { users, error, isLoading, setLoading } = useUsers();

  const {
    showUserDataForm,
    showDeleteForm,
    setShowUserDataForm,
    setShowDeleteForm,
    setCancelForm,
  } = useForms();

  const addUserHandler = () => {
    setCurrentUser(INITIAL_USER_DATA);
    setShowUserDataForm(true);
  };

  const editUserHandler = (newCurrentUser) => {
    setCurrentUser(newCurrentUser);
    setShowUserDataForm(true);
  };

  const deleteHandler = (newCurrentUser) => {
    setCurrentUser(newCurrentUser);
    setShowDeleteForm(true);
  };

  let filteredUsers = getOnlyActiveUsers(users, filters.onlyActive);
  filteredUsers = searchUser(filteredUsers, filters.searchTerm);
  filteredUsers = orderUsers(filteredUsers, filters.sortBy);

  const { paginatedUsers, totalPages } = paginateUsers(
    filteredUsers,
    filters.page,
    filters.itemsPerPage
  );

  const showFilters = !(showUserDataForm || showDeleteForm);

  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Listado de usuarios</h1>

      <FiltersContext.Provider
        value={{
          filters,
          setOnlyActive,
          setSortBy,
          setSearchTerm,
          setPage,
          setItemsPerPage,
        }}
      >
        {showFilters && <UserFilters addUserHandler={addUserHandler} />}
        {showUserDataForm && (
          <UserDataForm
            cancelClick={() => {
              setCancelForm();
            }}
            currentUser={currentUser}
            setLoading={setLoading}
          />
        )}
        {showDeleteForm && (
          <DeleteUserForm
            currentUser={currentUser}
            cancelClick={() => {
              setCancelForm();
            }}
            setLoading={setLoading}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        <FormsContext.Provider value={{ editUserHandler, deleteHandler }}>
          {!isLoading && <UserGrid users={paginatedUsers} error={error} />}
        </FormsContext.Provider>

        {!isLoading && users && (
          <Pagination totalPages={totalPages} setLoading={setLoading} />
        )}
      </FiltersContext.Provider>
    </div>
  );
};

export default App;
