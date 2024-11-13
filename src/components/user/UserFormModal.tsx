import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material';
import User, { UserForm } from 'types/User';
import { sendCreateUser } from 'services/UserServices';

interface UserFormModalProps {
  item?: User;
  show: boolean;
  editMode?: boolean;
  onAccept: () => any
  onClose: () => any
}

const UserFormModal: React.FC<UserFormModalProps> = (props) => {
  const [form, setForm] = useState<Partial<UserForm>>({})
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAccept = async () => {
    const user = Object.assign({}, form);
    user.profileType = 'invitado'
    const userCreated = await sendCreateUser(user as UserForm)
    if (userCreated) {
      props.onClose()
      props.onAccept()
    }
  }

  const handleModalOnClose: DialogProps["onClose"] = (_, reason) => {
    if (reason && reason === "backdropClick")
      return;
    handleClose()
  }

  const handleClose = () => {
    props.onClose()
  }

  useEffect(() => {
    if (props.item) {
      setIsEdit(true)
      setForm(new UserForm(props.item))
    } else {
      setIsEdit(false)
      setForm(new UserForm({}))
    }
  }, [props.item])

  return (
    <Dialog open={props.show} onClose={handleModalOnClose}>
      <DialogTitle>{props.editMode ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Nombre"
          type="text"
          fullWidth
          value={form?.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={form?.email}
          onChange={handleChange}
        />
        {
          !isEdit && (
            <TextField
              margin="dense"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              value={form?.password}
              onChange={handleChange}
            />
          )
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        <Button onClick={handleAccept} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserFormModal