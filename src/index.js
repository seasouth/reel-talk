import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  background: "#f7df1e",
  color: "#24292e",
  components: {
    MuiRating: {
      styleOverrides: {
        label: {
          marginTop: '4px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          borderRadius: '8px'
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          maxHeight: '30%'
        }
      }
    },
  }
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
