import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default DrawerHeader