import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dashboard, { DashboardForm } from 'types/Dashboard';
import { getAllDashboards } from 'services/DashboardServices';
import DashboardTable from 'components/dashboard/DashboardTable';
import DashboardFormModal from 'components/dashboard/DashboardFormModal';

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

  const getDashboards = async () => {
    const { data: dashboards } = await getAllDashboards();
    if (dashboards) {
      setListDashboard(dashboards)
    }
  }

  const refreshListDashboards = () => {
    getDashboards()
  }

  const handleEditDashboard = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    handleOpen()
  }

  useEffect(() => {
    getDashboards()
  }, [])

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Tablero
      </Button>

      <DashboardFormModal
        show={open}
        editMode={!!selectedDashboard}
        item={selectedDashboard as DashboardForm}
        onAccept={(form) => {
          console.log('Formulario recibido:', form);
          refreshListDashboards(); // Refrescar la lista después de guardar
        }}
        onClose={handleClose}
      />

      <DashboardTable dashboards={listDashboard} onClickEdit={handleEditDashboard} />
    </div>
  );
};

export default DashboardList;
