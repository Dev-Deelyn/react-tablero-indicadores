import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel,
  Collapse,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import User, { DashboardAccess } from 'types/User';
import { getAllDashboards } from 'services/DashboardServices';
import {
  updateUserAccess,
} from 'services/UserServices';

interface SectionType {
  _id: string;
  keyname: string;
}

interface DashboardType {
  _id: string;
  keyname: string;
  icon: string;
  sections: SectionType[];
}

interface AccessState {
  [dashboardId: string]: {
    enabled: boolean;
    sections: { [sectionId: string]: boolean };
  };
}

interface UserAccessModalProps {
  item?: User;
  show: boolean;
  onAccept: () => any;
  onClose: () => any;
}

const UserAccessModal: React.FC<UserAccessModalProps> = ({
  item,
  show,
  onAccept,
  onClose,
}) => {
  const [dashboards, setDashboards] = useState<DashboardType[]>([]);
  const [accessState, setAccessState] = useState<AccessState>({});
  const [initialAccessState, setInitialAccessState] = useState<AccessState>({});
  const [expanded, setExpanded] = useState<{ [dashId: string]: boolean }>({});

  console.log(item)

  useEffect(() => {
    if (show && item) {
      loadDashboards();
    }
  }, [show, item]);

  const loadDashboards = async () => {
    try {
      const res = await getAllDashboards();
      if (res.data) {
        const dashboardsData = res.data as DashboardType[];
        setDashboards(dashboardsData);

        const init: AccessState = {};
        dashboardsData.forEach((dash) => {
          const acc = item?.access.find((a) => a.dashboard === dash._id);
          init[dash._id] = {
            enabled: !!acc,
            sections: dash.sections.reduce((m, sec) => {
              m[sec._id] = acc ? acc.sections.includes(sec._id) : false;
              return m;
            }, {} as Record<string, boolean>),
          };
        });

        setAccessState(init);
        setInitialAccessState(JSON.parse(JSON.stringify(init)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getAccessChanges = () => {
    const added: DashboardAccess[] = [];
    const removed: string[] = [];
    const updated: DashboardAccess[] = [];

    for (const dashId of Object.keys(accessState)) {
      const before = initialAccessState[dashId];
      const now = accessState[dashId];
      const selectedSecs = Object.keys(now.sections).filter((s) => now.sections[s]);

      if (!before.enabled && now.enabled) {
        added.push({ dashboard: dashId, sections: selectedSecs });
      }
      if (before.enabled && !now.enabled) {
        removed.push(dashId);
      }
      if (before.enabled && now.enabled) {
        const diff = selectedSecs.filter((s) => before.sections[s] !== now.sections[s]);
        if (diff.length) {
          updated.push({ dashboard: dashId, sections: selectedSecs });
        }
      }
    }

    return { added, removed, updated };
  };

  const handleDashboardToggle = (dashId: string) =>
    setAccessState((prev) => {
      const cur = prev[dashId];
      const en = !cur.enabled;
      const secs = en ? cur.sections : Object.fromEntries(Object.keys(cur.sections).map((s) => [s, false]));
      return { ...prev, [dashId]: { enabled: en, sections: secs } };
    });

  const handleSectionToggle = (dashId: string, secId: string) =>
    setAccessState((prev) => {
      const cur = prev[dashId];
      const newVal = !cur.sections[secId];
      return {
        ...prev,
        [dashId]: {
          enabled: cur.enabled || newVal,
          sections: { ...cur.sections, [secId]: newVal },
        },
      };
    });

  const handleSave = async () => {
    if (!item?._id) return;
    const userId = item._id;

    // Construir el array completo a partir de accessState:
    const fullAccess = Object.entries(accessState)
    .filter(([_, state]) => state.enabled) // Solo tomamos dashboards habilitados
    .map(([dashboard, state]) => ({
      dashboard,
      sections: Object.entries(state.sections)
        .filter(([, hasAccess]) => hasAccess)
        .map(([sectionId]) => sectionId),
    }));

    console.log('Array final', fullAccess)

    try {
      await updateUserAccess(userId, fullAccess);
      onAccept();
      onClose();
    } catch (e) {
      console.error('Error al guardar access completo:', e);
    }
  };


  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Gestionar Accesos</DialogTitle>
      <DialogContent>
        <Container>
          {dashboards.map((dash) => (
            <Box key={dash._id} mb={2} border={1} borderRadius={2} p={1} borderColor="grey.300">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  {dash.icon && <Icon icon={dash.icon} style={{ fontSize: 24, marginRight: 8 }} />}
                  <Typography variant="subtitle1">{dash.keyname}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={accessState[dash._id]?.enabled || false}
                        onChange={() => handleDashboardToggle(dash._id)}
                      />
                    }
                    label="Acceso"
                  />
                  <IconButton onClick={() => setExpanded((e) => ({ ...e, [dash._id]: !e[dash._id] }))}>
                    {expanded[dash._id] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={expanded[dash._id]}>
                <Box ml={4} mt={1}>
                  {dash.sections.map((sec) => (
                    <FormControlLabel
                      key={sec._id}
                      control={
                        <Switch
                          disabled={!accessState[dash._id]?.enabled}
                          checked={accessState[dash._id]?.sections[sec._id] || false}
                          onChange={() => handleSectionToggle(dash._id, sec._id)}
                        />
                      }
                      label={sec.keyname}
                    />
                  ))}
                </Box>
              </Collapse>
            </Box>
          ))}
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserAccessModal;
