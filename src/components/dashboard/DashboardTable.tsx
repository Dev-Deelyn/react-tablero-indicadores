import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Dashboard from 'types/Dashboard';

interface DashboardTableProps {
  dashboards: Dashboard[];
  onClickEdit?: (item: Dashboard) => any;
  onClickDelete?: (item: Dashboard) => any;
}

const DashboardTable: React.FC<DashboardTableProps> = (props) => {
  const handleDelete = (dashboard: Dashboard) => {
    if (dashboard && props.onClickDelete) {
      props.onClickDelete(dashboard)
    }
  }

  const handleEdit = (dashboard: Dashboard) => {
    if (dashboard && props.onClickEdit) {
      props.onClickEdit(dashboard)
    }
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Visible</TableCell>
            <TableCell align="center" width={'160px'}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dashboards.map((dashboard, index) => (
            <TableRow key={index}>
              <TableCell>{dashboard.keyname}</TableCell>
              <TableCell>{dashboard.show ? 'SI' : 'NO'}</TableCell>
              <TableCell align="center">
                {
                  props.onClickEdit &&
                  <IconButton color="primary" onClick={() => handleEdit(dashboard)}>
                    <EditIcon />
                  </IconButton>
                }
                {
                  props?.onClickDelete &&
                  <IconButton color="secondary" onClick={() => handleDelete(dashboard)}>
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

export default DashboardTable