import React from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

import './index.css';
import App from './App.jsx';

const theme = createTheme({
  palette: {
    background: {
      default: "#e4f0e2",
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StyledEngineProvider injectFirst>
                <LocalizationProvider dateAdapter={AdapterDayjs}
                                      adapterLocale="en-gb">
                    <App />
                </LocalizationProvider>
            </StyledEngineProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
