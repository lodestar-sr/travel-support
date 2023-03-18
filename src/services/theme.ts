import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#C7D1F4',
      dark: '#7786D2'
    },
    secondary: {
      main: '#FFFFFF',
      light: '#E5E7EB',
      dark: '#374151'
    },
    error: {
      main: '#FF0000',
    },
  },
  typography: {
    fontWeightRegular: 500,
    fontFamily: ['Inter', 'sans-serif'].join(','),
    body1: {
      fontSize: 14,
    }
  },
})
