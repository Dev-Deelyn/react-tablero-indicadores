import React, { useEffect, useState } from 'react';
// Se importan los componentes de Material UI para armar el modal y sus elementos.
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel
} from '@mui/material';

// Se importa el tipo para definir la forma de los datos del dashboard en el formulario.
import { DashboardForm } from 'types/Dashboard';
// Se importan los servicios para enviar la creación o edición de un dashboard.
import { sendCreateDashboard, sendEditDashboard } from 'services/DashboardServices';

// Se define la interfaz de las propiedades que recibirá el modal.
interface DashboardFormModalProps {
  item?: DashboardForm;           // Objeto con los datos del dashboard actual, usado en modo edición.
  show: boolean;                  // Controla si el modal se muestra o no.
  editMode?: boolean;             // Indica si el modal está en modo edición.
  onAccept: (form: Partial<DashboardForm>) => any; // Callback que se ejecuta al aceptar o guardar el formulario.
  onClose: () => any;             // Callback para cerrar el modal.
}

// Componente funcional que representa el modal para crear o editar dashboards.
const DashboardFormModal: React.FC<DashboardFormModalProps> = (props) => {
  // Estado local para almacenar los datos del formulario.
  const [form, setForm] = useState<Partial<DashboardForm>>({});

  // Maneja cambios en campos de texto (TextFields).
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    // Actualiza el estado asignando el valor al campo identificado por 'name'.
    setForm(prev => ({ ...prev, [name as string]: value }));
  };

  // Maneja cambios específicos de un Switch (campo booleano).
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    // Actualiza el estado con el valor booleano (checked) del interruptor.
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  // Función que se ejecuta al aceptar el formulario (al guardar).
  const handleAccept = async () => {
    try {
      if (props.editMode) {
        // En modo edición: se llama al servicio para editar el dashboard.
        // Se requiere que existan tanto el nombre actual (keyname) como el nuevo (newKeyname).
        if (form.keyname && form.newKeyname) {
          await sendEditDashboard(form.keyname, form.newKeyname);
        }
      } else {
        // En modo creación: se llama al servicio para crear el dashboard.
        // Se comprueba que exista un keyname y se crea el payload, incluyendo el valor
        // del campo show (visibilidad), que si no se define se considera false.
        if (form.keyname) {
          const payload = { keyname: form.keyname, show: form.show || false };
          await sendCreateDashboard(payload);
        }
      }
      // Se notifica al componente padre pasando el formulario, para que actualice la lista.
      props.onAccept(form);
      // Se cierra el modal una vez completada la operación.
      props.onClose();
    } catch (error) {
      // Se captura y muestra en consola cualquier error producido durante la operación.
      console.error('Error al guardar:', error);
    }
  };

  // useEffect se ejecuta cada vez que cambian las props 'editMode' o 'item'.
  // Inicializa el formulario dependiendo del modo del modal.
  useEffect(() => {
    if (props.editMode && props.item) {
      // En modo edición, se inicializa el formulario con el keyname actual.
      // Además se inicializa 'newKeyname' como cadena vacía para que el usuario ingrese el nuevo nombre.
      setForm({
        keyname: props.item.keyname,
        newKeyname: '' // Campo adicional solo utilizado en la edición.
      });
    } else {
      // En modo creación, se inicializa el formulario con valores por defecto.
      setForm({
        keyname: '',  // Campo vacío para ingresar el nombre del nuevo dashboard.
        show: false   // Valor por defecto de visibilidad.
      });
    }
  }, [props.editMode, props.item]);

  // Renderizado del componente: se configura un modal (Dialog) que se abre o cierra según la prop 'show'.
  return (
    <Dialog open={props.show} onClose={props.onClose}>
      {/* Título del modal varía según el modo (editar o agregar). */}
      <DialogTitle>{props.editMode ? 'Editar Tablero' : 'Agregar Tablero'}</DialogTitle>
      <DialogContent>
        {props.editMode ? (
          // Renderizado condicional: en modo edición, se presentan dos campos.
          <>
            {/* Campo que muestra el nombre actual del dashboard (deshabilitado para edición directa). */}
            <TextField
              margin="dense"
              name="keyname"
              label="Nombre actual del tablero"
              type="text"
              fullWidth
              value={form?.keyname || ''}
              disabled
            />
            {/* Campo para ingresar el nuevo nombre para editar el dashboard. */}
            <TextField
              margin="dense"
              name="newKeyname"
              label="Nuevo nombre del tablero"
              type="text"
              fullWidth
              value={form?.newKeyname || ''}
              onChange={handleChange}
            />
          </>
        ) : (
          // En modo creación, se muestran campos para ingresar los datos del nuevo dashboard.
          <>
            {/* Campo editable para ingresar el nombre del nuevo dashboard.
                autoFocus permite que este campo esté seleccionado al abrirse el modal.
            */}
            <TextField
              autoFocus
              margin="dense"
              name="keyname"
              label="Nombre del tablero"
              type="text"
              fullWidth
              value={form?.keyname || ''}
              onChange={handleChange}
            />
            {/* Interruptor (Switch) para definir si el tablero será visible. */}
            <FormControlLabel
              control={
                <Switch
                  name="show"
                  checked={form?.show || false}
                  onChange={handleSwitchChange}
                />
              }
              label="Mostrar tablero"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {/* Botón para cancelar, que simplemente cierra el modal. */}
        <Button onClick={props.onClose} color="primary">
          Cancelar
        </Button>
        {/* Botón para guardar los cambios o crear un dashboard, ejecutando 'handleAccept'. */}
        <Button onClick={handleAccept} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardFormModal;