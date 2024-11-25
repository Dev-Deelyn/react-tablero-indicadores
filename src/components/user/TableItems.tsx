import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import User from 'types/User';
import React from 'react';

interface TableItemsProps {
  users: User[];
  onClickEdit?: (item: User) => any;
  onClickDelete?: (item: User) => any;
}

const TableItems: React.FC<TableItemsProps> = (props) => {
  const handleDelete = (user: User) => {
    if (user && props.onClickDelete) {
      props.onClickDelete(user)
    }
  }

  const handleEdit = (user: User) => {
    if (user && props.onClickEdit) {
      props.onClickEdit(user)
    }
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tipo de usuario</TableCell>
            <TableCell align="center" width={'160px'}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.profileType}</TableCell>
              <TableCell align="center">
                {
                  props.onClickEdit &&
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                }
                {
                  props?.onClickDelete &&
                  <IconButton color="secondary" onClick={() => handleDelete(user)}>
                    <DeleteIcon />
                  </IconButton>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableItems