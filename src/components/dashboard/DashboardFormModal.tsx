import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  Switch,
  FormControlLabel,
  Container,
  Collapse,
  Box
} from '@mui/material';
import { Icon } from '@iconify/react';
import materialSymbolsData from '@iconify/json/json/material-symbols.json';
import { FixedSizeGrid as Grid } from 'react-window';
import { DashboardForm } from 'types/Dashboard';
import { sendCreateDashboard, sendEditDashboard } from 'services/DashboardServices';

interface DashboardFormModalProps {
  item?: DashboardForm;
  show: boolean;
  editMode?: boolean;
  onAccept: (form: Partial<DashboardForm>) => any;
  onClose: () => any;
}

// Definición mínima para tipar el JSON de Material Symbols
interface MaterialSymbols {
  prefix: string;
  icons: Record<string, unknown>;
  categories: Record<string, string[]>;
}


const iconData = materialSymbolsData as MaterialSymbols;

const allowedCategories = ["Actions", "Activities", "Business", "Maps", "Travel", "UI Actions"];

const allowedIcons = new Set<string>();
allowedCategories.forEach((category) => {
  const iconsInCategory = iconData.categories[category];
  if (iconsInCategory) {
    iconsInCategory.forEach((iconKey) => allowedIcons.add(iconKey));
  }
});

// Filtrado para obtener únicamente los íconos Regular:
// Es decir, aquellos que NO terminen con ningún sufijo adicional.
const iconsList = Object.keys(iconData.icons)
  .filter((key) => {
    const nonRegularSuffixes = ['-rounded', '-sharp', '-outline', '-outline-rounded', '-outline-sharp'];
    const isRegular = !nonRegularSuffixes.some(suffix => key.endsWith(suffix));
    const inAllowedCategory = allowedIcons.has(key);
    return isRegular && inAllowedCategory;
  })
  .map((key) => `${iconData.prefix}:${key}`);


const DashboardFormModal: React.FC<DashboardFormModalProps> = (props) => {
  const [form, setForm] = useState<Partial<DashboardForm>>({});
  const [showIconPicker, setShowIconPicker] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAccept = async () => {
    try {
      if (props.editMode) {
        const dashboardId = form._id || props.item?._id;
        if (dashboardId) {
          await sendEditDashboard(
            dashboardId,
            form.newKeyname || undefined,
            form.show,
            form.icon || undefined
          );
        }
      } else {
        if (form.keyname) {
          const payload = { keyname: form.keyname, show: form.show || false, icon: form.icon || '' };
          await sendCreateDashboard(payload);
        }
      }
      props.onAccept(form);
      props.onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleCancel = () => {
    if (props.editMode && props.item) {
      // En modo edición, reseteamos el formulario a los valores de props.item
      setForm({
        ...props.item,
        newKeyname: ''
      });
    } else {
      // En modo creación, reiniciamos el formulario a sus valores por defecto
      setForm({
        keyname: '',
        show: false,
        icon: ''
      });
    }
    props.onClose();
  };
  

  useEffect(() => {
    if (props.editMode && props.item) {
      setForm({
        keyname: props.item.keyname,
        newKeyname: '',
        icon: props.item.icon || ''
      });
    } else {
      setForm({
        keyname: '',
        show: false,
        icon: ''
      });
    }
  }, [props.editMode, props.item]);

  const handleIconSelect = (iconName: string) => {
    setForm((prev) => ({ ...prev, icon: iconName }));
    setShowIconPicker(false);
  };

  return (
    <Dialog open={props.show} onClose={props.onClose}>
      <DialogTitle>{props.editMode ? 'Editar Tablero' : 'Agregar Tablero'}</DialogTitle>
      <DialogContent>
        {props.editMode ? (
          <>
            <TextField
              margin="dense"
              name="keyname"
              label="Nombre actual del tablero"
              type="text"
              fullWidth
              value={form?.keyname || ''}
              disabled
            />
            <TextField
              margin="dense"
              name="newKeyname"
              label="Nuevo nombre del tablero"
              type="text"
              fullWidth
              value={form?.newKeyname || ''}
              onChange={handleChange}
            />
            <Container style={{ marginTop: '10px' }}>
              <Button variant="outlined" onClick={() => setShowIconPicker((prev) => !prev)}>
                {form.icon ? 'Cambiar ícono' : 'Seleccionar ícono'}
              </Button>
              {form.icon && (
                <Box mt={1}>
                  <Icon icon={form.icon} style={{ fontSize: '36px', color: '#000' }} />
                </Box>
              )}
              <Collapse in={showIconPicker}>
                <Grid
                  columnCount={4}
                  columnWidth={80}
                  height={220}
                  rowCount={Math.ceil(iconsList.length / 4)}
                  rowHeight={80}
                  width={340}
                  style={{ marginTop: '10px' }}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const iconIndex = rowIndex * 4 + columnIndex;
                    if (iconIndex >= iconsList.length) return null;
                    const iconName = iconsList[iconIndex];
                    return (
                      <div style={style} key={iconName}>
                        <Button
                          onClick={() => handleIconSelect(iconName)}
                          style={{ minWidth: 'auto', padding: 8 }}
                        >
                          <Icon icon={iconName} style={{ fontSize: '36px', color: '#000' }} />
                        </Button>
                      </div>
                    );
                  }}
                </Grid>
              </Collapse>
            </Container>
          </>
        ) : (
          <>
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
                <Switch name="show" checked={form?.show || false} onChange={handleSwitchChange} />
              }
              label="Mostrar tablero"
            />
            <Container style={{ marginTop: '10px' }}>
              <Button variant="outlined" onClick={() => setShowIconPicker((prev) => !prev)}>
                {form.icon ? 'Cambiar ícono' : 'Seleccionar ícono'}
              </Button>
              {form.icon && (
                <Box mt={1}>
                  <Icon icon={form.icon} style={{ fontSize: '36px', color: '#000' }} />
                </Box>
              )}
              <Collapse in={showIconPicker}>
                <Grid
                  columnCount={4}
                  columnWidth={80}
                  height={220}
                  rowCount={Math.ceil(iconsList.length / 4)}
                  rowHeight={80}
                  width={340}
                  style={{ marginTop: '10px' }}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const iconIndex = rowIndex * 4 + columnIndex;
                    if (iconIndex >= iconsList.length) return null;
                    const iconName = iconsList[iconIndex];
                    return (
                      <div style={style} key={iconName}>
                        <Button
                          onClick={() => handleIconSelect(iconName)}
                          style={{ minWidth: 'auto', padding: 8 }}
                        >
                          <Icon icon={iconName} style={{ fontSize: '36px', color: '#000' }} />
                        </Button>
                      </div>
                    );
                  }}
                </Grid>
              </Collapse>
            </Container>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAccept} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardFormModal;
