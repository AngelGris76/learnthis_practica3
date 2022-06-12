import { useState } from 'react';
import Pagination from './components/Pagination';
import AddUserForm from './components/AddUserForm';
import UserFilters from './components/UserFilters';
import UserGrid from './components/UserGrid';
import FiltersContext from './contexts/FiltersContext';
import useFilter from './hooks/useFilters';
import useForms from './hooks/useForms';
import useUsers from './hooks/useUsers';
import EditUserForm from './components/EditUserFomr';

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
    showAddForm,
    showEditForm,
    showDeleteForm,
    setShowAddForm,
    setShowEditForm,
    setShowDeleteForm,
    setCancelForm,
  } = useForms();

  const addUserHandler = () => {
    setUserId();
    setShowAddForm(true);
  };

  const editUserHandler = () => {
    setShowEditForm(true);
  };

  const cancelHandler = () => {
    setCancelForm();
  };

  const deleteHandler = () => {
    setShowDeleteForm(true);
  };

  const totalPages = Math.ceil(totalUsers / filters.itemsPerPage);

  const showFilters = !(showAddForm || showEditForm || showDeleteForm);

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
        {showAddForm && (
          <AddUserForm cancelClick={cancelHandler} userData={userId} />
        )}
        {showEditForm && <EditUserForm />}
        {showDeleteForm && <DeleteUserForm />}
        {isLoading && <p>Cargando...</p>}
        {!isLoading && <UserGrid users={usersInfo} />}
        {!isLoading && usersInfo && (
          <Pagination totalPages={totalPages} setLoading={setLoading} />
        )}
      </FiltersContext.Provider>
    </div>
  );
};

export default App;
