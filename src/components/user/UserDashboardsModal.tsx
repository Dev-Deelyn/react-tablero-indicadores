import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import React from 'react'
import User from 'types/User';

interface UserDashboardsModalProps {
  item?: User;
  show: boolean;
  editMode?: boolean;
  onAccept: () => any
  onClose: () => any
}

const UserDashboardsModal: React.FC<UserDashboardsModalProps> = (props) => {

  const handleModalOnClose: DialogProps["onClose"] = (_, reason) => {
    if (reason && reason === "backdropClick")
      return;
    handleClose()
  }

  const handleClose = () => {
    props.onClose()
  }

  return (
    <Dialog open={props.show} onClose={handleModalOnClose}>
      <DialogTitle>{props.editMode ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
      <DialogContent>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        <Button onClick={() => { }} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDashboardsModal