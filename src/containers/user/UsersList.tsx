import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import User from 'types/User';
import UserFormModal from 'components/user/UserFormModal';
import { getAllUsers } from 'services/UserServices';
import TableItems from 'components/user/TableItems';

const UserList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [listUsers, setListUsers] = useState<User[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(undefined)
    setOpen(false)
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

  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Usuario
      </Button>

      <UserFormModal show={open} item={selectedUser} onAccept={refreshListUsers} onClose={handleClose} />
      <TableItems users={listUsers} onClickEdit={handleEditUser} onClickDashboards={() => { }} />
    </div>
  );
};

export default UserList;
