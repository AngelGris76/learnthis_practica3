import { useState } from 'react';
import DeleteUserForm from './components/DeleteUserForm';
import Pagination from './components/Pagination';
import UserDataForm from './components/UserDataForm';
import UserFilters from './components/UserFilters';
import UserGrid from './components/UserGrid';
import FiltersContext from './contexts/FiltersContext';
import FormsContext from './contexts/FormsContext';
import useFilter from './hooks/useFilters';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';

const App = () => {
  const [userId, setUserId] = useState();
  const {
    filters,
    setOnlyActive,
    setOrder,
    setSearchTerm,
    setPage,
    setItemsPerPage,
  } = useFilter();
  const { usersInfo, isLoading, totalUsers, setLoading } = useUsers(filters);

  const {
    showUserDataForm,
    showDeleteForm,
    setShowUserDataForm,
    setShowDeleteForm,
    setCancelForm,
  } = useForms();

  const addUserHandler = () => {
    setUserId();
    setShowUserDataForm(true);
  };

  const editUserHandler = (id) => {
    setUserId(id);
    setShowUserDataForm(true);
  };

  const cancelHandler = () => {
    setCancelForm();
  };

  const deleteHandler = (id) => {
    setUserId(id);
    setShowDeleteForm(true);
  };

  const totalPages = Math.ceil(totalUsers / filters.itemsPerPage);

  const showFilters = !(showUserDataForm || showDeleteForm);

  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Listado de usuarios</h1>

      <FiltersContext.Provider
        value={{
          filters,
          setOnlyActive,
          setOrder,
          setSearchTerm,
          setPage,
          setItemsPerPage,
        }}
      >
        {showFilters && (
          <UserFilters
            onlyActive={filters.onlyActive}
            addUserHandler={addUserHandler}
          />
        )}
        {showUserDataForm && (
          <UserDataForm
            cancelClick={cancelHandler}
            userId={userId}
            setLoading={setLoading}
          />
        )}
        {showDeleteForm && (
          <DeleteUserForm
            userId={userId}
            cancelClick={cancelHandler}
            setLoading={setLoading}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        <FormsContext.Provider value={{ editUserHandler, deleteHandler }}>
          {!isLoading && <UserGrid users={usersInfo} />}
        </FormsContext.Provider>

        {!isLoading && usersInfo && (
          <Pagination totalPages={totalPages} setLoading={setLoading} />
        )}
      </FiltersContext.Provider>
    </div>
  );
};

export default App;
