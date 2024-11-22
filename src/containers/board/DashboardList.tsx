import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dashboard from 'types/Dashboard';
import { getAllDashboards } from 'services/DashboardServices';
import DashboardTable from 'components/dashboard/DashboardTable';

const DashboardList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | undefined>();
  const [listDashboard, setListDashboard] = useState<Dashboard[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDashboard(undefined)
    setOpen(false)
  }

  const getUsuarios = async () => {
    const dashboard: Dashboard[] = await getAllDashboards();
    setListDashboard(dashboard)
  }

  // const refreshListUsers = () => {
  //   getUsuarios()
  // }

  const handleEditUser = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    handleOpen()
  }

  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Tablero
      </Button>

      {/* <UserFormModal show={open} item={selectedDashboard} onAccept={refreshListUsers} onClose={handleClose} /> */}
      <DashboardTable dashboards={listDashboard} onClickEdit={handleEditUser} />
    </div>
  );
};

export default DashboardList;
