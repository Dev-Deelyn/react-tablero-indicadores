import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import User from 'types/User';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';


interface TableItemsProps {
  users?: User[];
  onClickEdit?: (item: User) => any;
  onClickDelete?: (item: User) => any;
  onClickDashboards?: (item: User) => any;
  onCancelDelete?: () => any;
  confirmDeleteUser?: User;
}

const TableItems: React.FC<TableItemsProps> = (props) => {
  const handleDelete = (user: User) => {
    if (user && props.onClickDelete) {
      props.onClickDelete(user)
    }
  }

  const handleAccess = (user: User) => {
    if (user && props.onClickDashboards) {
      props.onClickDashboards(user)
    }
  }

  // const handleEdit = (user: User) => {
  //   if (user && props.onClickEdit) {
  //     props.onClickEdit(user)
  //   }
  // }
  // console.log('onClickDelete:', props.onClickDelete);

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
          {props?.users?.map((user, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.profileType}</TableCell>
                <TableCell align="center">
                  {props?.onClickDelete && (
                    <IconButton color="secondary" onClick={() => handleDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {props?.onClickDashboards && (
                    <IconButton color="secondary" onClick={() => handleAccess(user)}>
                      <DashboardIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
              {props.confirmDeleteUser?.username === user.username && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" color="error" style={{ marginRight: 8 }}>
                        ¿Estás seguro de eliminar a {user.username}?
                      </Typography>
                      <IconButton color="primary" onClick={() => handleDelete(user)}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={props.onCancelDelete}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableItems