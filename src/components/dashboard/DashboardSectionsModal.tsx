import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  Switch,
  TextField,
  IconButton,
  Collapse,
  Box,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@iconify/react';

import { DashboardForm } from 'types/Dashboard';
import Sections from 'types/Sections';

import { sendEditSection, sendCreateSection, sendDeleteSection } from 'services/SectionsServices';
import { sendAddSection } from 'services/DashboardServices';

interface SectionsModalProps {
  open: boolean;
  dashboard?: DashboardForm;
  onClose: () => void;
}

const DashboardSectionsModal: React.FC<SectionsModalProps> = ({ dashboard, open, onClose }) => {
  // Estado para las secciones; se actualiza cuando llega dashboard.sections.
  const [sections, setSections] = useState<Sections[]>(dashboard?.sections ?? []);
  // Modo de edición para cada sección: guardará el nuevo keyname.
  const [editingSections, setEditingSections] = useState<Record<string, { newKeyname: string }>>({});
  // Estado para el collapse del formulario "Agregar Sección".
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionShow, setNewSectionShow] = useState(true);
  // Estado para el id de la sección que se está a punto de eliminar (para mostrar confirmación).
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (dashboard?.sections) {
      setSections(dashboard.sections);
    }
  }, [dashboard]);

  // Actualiza la visibilidad de una sección.
  const handleToggleVisibility = async (sectionId: string, currentValue: boolean) => {
    try {
      setSections(prev =>
        prev.map(section =>
          section._id === sectionId ? { ...section, show: !currentValue } : section
        )
      );
      await sendEditSection(sectionId, undefined, !currentValue);
    } catch (error) {
      console.error("Error al actualizar visibilidad", error);
    }
  };

  // Inicia el modo edición de una sección.
  const handleStartEditing = (sectionId: string, currentKeyname: string) => {
    setEditingSections(prev => ({ ...prev, [sectionId]: { newKeyname: currentKeyname } }));
  };

  // Actualiza el TextField en el modo edición.
  const handleChangeEditing = (sectionId: string, value: string) => {
    setEditingSections(prev => ({ ...prev, [sectionId]: { newKeyname: value } }));
  };

  // Cancela el modo edición.
  const handleCancelEditing = (sectionId: string) => {
    setEditingSections(prev => {
      const copy = { ...prev };
      delete copy[sectionId];
      return copy;
    });
  };

  // Guarda el cambio de nombre y actualiza la sección mediante la API.
  const handleSaveEditing = async (sectionId: string) => {
    try {
      const updatedName = editingSections[sectionId].newKeyname;
      const updatedSection = await sendEditSection(sectionId, updatedName);
      setSections(prev =>
        prev.map(section =>
          section._id === sectionId ? { ...section, keyname: updatedSection.keyname } : section
        )
      );
      handleCancelEditing(sectionId);
    } catch (error) {
      console.error("Error actualizando la sección", error);
    }
  };

  // Maneja la eliminación de una sección: muestra confirmación y luego llama a la API.
  const handleDeleteSection = async (sectionId: string) => {
    try {
      await sendDeleteSection(sectionId);
      setSections(prev => prev.filter(section => section._id !== sectionId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error eliminando la sección", error);
    }
  };

  // Agrega una nueva sección y actualiza la lista en el dashboard.
  const handleAddNewSection = async () => {
    try {
      const createdSection = await sendCreateSection({ keyname: newSectionName, show: newSectionShow });
      if (dashboard?._id) {
        // Extraemos los _id de las secciones actuales (asegurados).
        const sectionIds = sections.map(sec => sec._id!);
        const updatedDashboard = await sendAddSection(
          dashboard._id,
          [...sectionIds, createdSection._id]
        );
        setSections(updatedDashboard.sections);
      }
      setNewSectionName('');
      setNewSectionShow(true);
      setAddingSection(false);
    } catch (error) {
      console.error("Error agregando nueva sección", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Secciones de:{" "}
        {dashboard?.icon && (
          <Icon
            icon={dashboard.icon}
            style={{ fontSize: '24px', marginRight: 8, verticalAlign: 'middle' }}
          />
        )}
        {dashboard?.keyname || ''}
      </DialogTitle>
      <DialogContent>
        <Container>
          {/* Encabezados para las columnas */}
          <Box display="flex" alignItems="center" mb={1} fontWeight="bold">
            <Box width={80}>
              <Typography variant="subtitle2">Visible</Typography>
            </Box>
            <Box flexGrow={1}>
              <Typography variant="subtitle2">Nombre</Typography>
            </Box>
            <Box width={140}>
              <Typography variant="subtitle2">Acciones</Typography>
            </Box>
          </Box>
          {sections.filter(section => section._id).map((section) => {
            const sectionId = section._id!;
            return (
              <React.Fragment key={sectionId}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box width={80}>
                    <Switch
                      checked={section.show}
                      onChange={() => handleToggleVisibility(sectionId, section.show)}
                      color="primary"
                    />
                  </Box>
                  <Box flexGrow={1}>
                    {editingSections[sectionId] ? (
                      <TextField
                        value={editingSections[sectionId].newKeyname}
                        onChange={(e) => handleChangeEditing(sectionId, e.target.value)}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="body1">{section.keyname}</Typography>
                    )}
                  </Box>
                  <Box width={140} display="flex" alignItems="center">
                    {editingSections[sectionId] ? (
                      <>
                        <IconButton color="primary" onClick={() => handleSaveEditing(sectionId)}>
                          <CheckIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleCancelEditing(sectionId)}>
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton color='primary' onClick={() => handleStartEditing(sectionId, section.keyname)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color='secondary' onClick={() => setConfirmDeleteId(sectionId)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Box>
                {/* Confirmación inline para eliminar una sección */}
                {confirmDeleteId === sectionId && (
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    mb={2}
                    mt={-1} // Opcional, para ajustar el espacio vertical
                  >
                    <Typography variant="body2" color="error" style={{ marginRight: 8 }}>
                      ¿Estás seguro de eliminar esta sección?
                    </Typography>
                    <IconButton color="primary" onClick={() => handleDeleteSection(sectionId)}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => setConfirmDeleteId(null)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </React.Fragment>
            );
          })}
          {/* Formulario para agregar nueva sección */}
          <Box mt={2}>
            <Button variant="outlined" onClick={() => setAddingSection(!addingSection)}>
              {addingSection ? 'Cancelar' : 'Agregar Sección'}
            </Button>
            <Collapse in={addingSection}>
              <Box display="flex" alignItems="center" mt={2}>
                <TextField
                  label="Nombre de Sección"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  size="small"
                  variant="outlined"
                  style={{ marginRight: 8, flexGrow: 1 }}
                />
                <Box mr={1}>
                  <Typography variant="body2">Visible</Typography>
                </Box>
                <Switch
                  checked={newSectionShow}
                  onChange={(e) => setNewSectionShow(e.target.checked)}
                  color="primary"
                />
                <IconButton color="primary" onClick={handleAddNewSection}>
                  <CheckIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    setAddingSection(false);
                    setNewSectionName('');
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Collapse>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardSectionsModal;
