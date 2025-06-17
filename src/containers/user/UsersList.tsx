import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import User from 'types/User';
import UserFormModal from 'components/user/UserFormModal';
import { getAllUsers, deleteUser } from 'services/UserServices';
import TableItems from 'components/user/TableItems';
import UserAccessModal from 'components/user/UserAccessModal';

const UserList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openAccess, setOpenAccess] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [listUsers, setListUsers] = useState<User[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(undefined)
    setOpen(false)
  }

  const handleOpenAccess = (user: User) => {
    setSelectedUser(user);
    setOpenAccess(true);
  };

  const handleCloseAccess = () => {
    setSelectedUser(undefined);
    setOpenAccess(false);
  }


  const getUsuarios = async () => {
    const { data } = await getAllUsers();
    if (data) {
      setListUsers(data)
    }
  }

  const refreshListUsers = () => {
    getUsuarios()
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    handleOpen()
  }

  const handleDeleteUser = async (user: User) => {
    try {
      await deleteUser(user.username, user.email);
      setListUsers((prevUsers) => prevUsers.filter((u) => u.username !== user.username));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Usuario
      </Button>

      <UserFormModal show={open} item={selectedUser} onAccept={refreshListUsers} onClose={handleClose} />
      <TableItems
        users={listUsers}
        onClickEdit={handleEditUser}
        onClickDashboards={handleOpenAccess}
        onClickDelete={handleDeleteUser}
      />
      <UserAccessModal show={openAccess} item={selectedUser} onAccept={refreshListUsers} onClose={handleCloseAccess}/>
    </div>
  );
};

export default UserList;
