import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SessionExpiredModal: React.FC<Props> = ({ open, onClose, onConfirm }) => (
  <Dialog
  open={open}
  onClose={(event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      onClose();
    }
  }}
  disableEscapeKeyDown
>
  <DialogTitle>Sesión expirada</DialogTitle>
  <DialogContent>
    Tu sesión ha caducado. Por favor vuelve a iniciar sesión para continuar.
  </DialogContent>
  <DialogActions>
    <Button onClick={onConfirm} color="primary" autoFocus>
      Ir al login
    </Button>
  </DialogActions>
</Dialog>

);

export default SessionExpiredModal;
