import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardSearch from './DashboardSearch';
import reel from '../icons/reel.svg';

import './Header.css';

const theme = createTheme({
    palette: {
        auth: {
          main: "#b8860b",
          contrastText: "#fff"
        }
    },
    background: "#f7df1e",
    color: "#24292e",
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'black',
                    paddingLeft: '0px !important'
                }
            }
        }
    }
});

const DashboardHeader = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <img className="reel-logo" src={reel} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <div className='header-title'>Reel Talk</div>
                        </Typography>
                        <DashboardSearch />
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
};

export default DashboardHeader;