import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dashboard, { DashboardForm } from 'types/Dashboard';
import { getAllDashboards } from 'services/DashboardServices';
import DashboardTable from 'components/dashboard/DashboardTable';
import DashboardFormModal from 'components/dashboard/DashboardFormModal';

// Componente principal que gestiona la lista de dashboards,
// la apertura del modal para creación/edición y la interacción con la API.
const DashboardList = () => {
  // Estado para controlar la visibilidad del modal
  const [open, setOpen] = useState<boolean>(false);
  // Estado para almacenar el dashboard seleccionado, en caso de edición.
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | undefined>();
  // Estado que contiene la lista de dashboards obtenidos del backend.
  const [listDashboard, setListDashboard] = useState<Dashboard[]>([]);

  // Función para abrir el modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el modal y limpiar la selección si existe
  const handleClose = () => {
    setSelectedDashboard(undefined);
    setOpen(false);
  };

  // Función asincrónica para obtener todos los dashboards mediante el servicio.
  const getDashboards = async () => {
    // Llama al servicio que obtiene los dashboards.
    const { data: dashboards } = await getAllDashboards();
    // Si se reciben dashboards, se actualiza el estado con la lista.
    if (dashboards) {
      setListDashboard(dashboards);
    }
  };

  // Función auxiliar para refrescar la lista de dashboards.
  const refreshListDashboards = () => {
    getDashboards();
  };

  // Función que se ejecuta cuando se desea editar un dashboard.
  // Recibe el dashboard a editar, lo guarda en el estado y abre el modal.
  const handleEditDashboard = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    handleOpen();
  };

  // useEffect para cargar la lista de dashboards cuando se monta el componente.
  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <div>
      {/* Botón para abrir el modal en modo creación de dashboard */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Tablero
      </Button>

      {/* Modal que permite crear o editar un dashboard.
          - show: determina si el modal está visible.
          - editMode: se activa si hay un dashboard seleccionado (modo edición).
          - item: datos del dashboard a editar, castado a DashboardForm.
          - onAccept: callback que se ejecuta al guardar el formulario.
          - onClose: callback para cerrar el modal.
      */}
      <DashboardFormModal
        show={open}
        editMode={!!selectedDashboard}
        item={selectedDashboard as DashboardForm}
        onAccept={(form) => {
          console.log('Formulario recibido:', form);
          refreshListDashboards(); // Refresca la lista tras guardar cambios.
        }}
        onClose={handleClose}
      />

      {/* Tabla que muestra la lista de dashboards.
          Recibe la lista de dashboards y una función para iniciar la edición.
      */}
      <DashboardTable
        dashboards={listDashboard}
        onClickEdit={handleEditDashboard}
        onVisibilityToggle={refreshListDashboards} // <== Pasamos la función que refseca la lista
      />
    </div>
  );
};

export default DashboardList;