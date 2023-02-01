import React from 'react';
import Routes from './utils/Routing/Routing';
import './App.css';
 
import { createTheme, ThemeProvider } from '@material-ui/core';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255, 90, 95, 1)'
    },
  }
});

const App = () =>{

  useEffect(()=>{
    const initialZoom = document.body.style.zoom
    if(window.innerWidth <= 1300)
      document.body.style.zoom = '70%'
    return () => { document.body.style.zoom = initialZoom }
  }, [])

  return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
  );
};

export default App;
