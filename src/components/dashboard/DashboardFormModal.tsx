import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Switch, FormControlLabel } from '@mui/material';
import { DashboardForm } from 'types/Dashboard';
import { sendCreateDashboard, sendEditDashboard } from 'services/DashboardServices';


interface DashboardFormModalProps {
  item?: DashboardForm; // Ahora usa DashboardForm para soportar newKeyname
  show: boolean;
  editMode?: boolean; // Modo edición
  onAccept: (form: Partial<DashboardForm>) => any;
  onClose: () => any;
}

const DashboardFormModal: React.FC<DashboardFormModalProps> = (props) => {
  const [form, setForm] = useState<Partial<DashboardForm>>({});

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name as string]: value }));
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleAccept = async () => {
    try {
      if (props.editMode) {
        // Modo edición: llamar al servicio para editar
        if (form.keyname && form.newKeyname) {
          await sendEditDashboard(form.keyname, form.newKeyname);
        }
      } else {
        // Modo creación: llamar al servicio para crear
        if (form.keyname) {
          const payload = { keyname: form.keyname, show: form.show || false };
          await sendCreateDashboard(payload);
        }
      }
      props.onAccept(form); // Pasar el formulario al método onAccept del padre
      props.onClose();      // Cerrar el modal
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };
  

  useEffect(() => {
    if (props.editMode && props.item) {
      // Inicializar en modo edición
      setForm({
        keyname: props.item.keyname,
        newKeyname: '', // Campo adicional solo para editar
      });
    } else {
      // Inicializar en modo creación
      setForm({
        keyname: '',
        show: false,
      });
    }
  }, [props.editMode, props.item]);

  return (
    <Dialog open={props.show} onClose={props.onClose}>
      <DialogTitle>{props.editMode ? 'Editar Tablero' : 'Agregar Tablero'}</DialogTitle>
      <DialogContent>
        {props.editMode ? (
          <>
            {/* Campo deshabilitado para el nombre actual */}
            <TextField
              margin="dense"
              name="keyname"
              label="Nombre actual del tablero"
              type="text"
              fullWidth
              value={form?.keyname || ''}
              disabled
            />
            {/* Campo para el nuevo nombre */}
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
          <>
            {/* Campos para crear un tablero */}
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
        <Button onClick={props.onClose} color="primary">Cancelar</Button>
        <Button onClick={handleAccept} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardFormModal;
