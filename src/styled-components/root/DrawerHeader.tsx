import { styled } from '@mui/material/styles';

export default styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));