import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import StockDashboard from './components/StockDashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StockDashboard />
    </ThemeProvider>
  );
}

export default App;
